"use server"

import { ApiResponse } from "@/types"
import { RentalRequest } from "@/types/requests"
import { apiFetch } from "@/utils/apiFetch"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export const getLandlordRentalRequests = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value || null

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: "User not logged in.",
      data: null,
    }
  }

  try {
    const res = await apiFetch("rental-requests", {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    })

    if (!res.ok) {
      throw new Error("Failed to fetch rental requests")
    }

    const data = (await res.json()) as ApiResponse<RentalRequest[], null>
    return data
  } catch (error: any) {
    return {
      success: false,
      statusCode: 500,
      message: error.message || "An unexpected error occurred",
      data: null,
    }
  }
}

export const updateRentalRequestStatus = async (
  requestId: string,
  status: "APPROVED" | "REJECTED"
) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value || null

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: "User not logged in.",
      data: null,
    }
  }

  try {
    const res = await apiFetch(`rental-requests/update-status/${requestId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ status }),
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      return {
        success: false,
        statusCode: res.status,
        message: errorData?.message || "Failed to update request status",
        data: null,
      }
    }

    revalidatePath("/dashboard/landlord/requests")
    const data = (await res.json()) as ApiResponse<any, null>
    return data
  } catch (error: any) {
    return {
      success: false,
      statusCode: 500,
      message: error.message || "An unexpected error occurred",
      data: null,
    }
  }
}
