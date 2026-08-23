"use server"

import { ApiResponse } from "@/types"
import { RentalRequest } from "@/types/requests"
import { apiFetch } from "@/utils/apiFetch"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

import { PaginatedMeta } from "@/types"

export const getLandlordRentalRequests = async ({
  page = 1,
  limit = 10,
  search = "",
}: {
  page?: number
  limit?: number
  search?: string
} = {}) => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value || null

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: "User not logged in.",
      data: null,
      meta: null,
    }
  }

  const searchParams = new URLSearchParams()
  if (page) searchParams.set("page", String(page))
  if (limit) searchParams.set("limit", String(limit))
  if (search) searchParams.set("searchTerm", search)

  const query = searchParams.toString()
  const endpoint = `rental-requests${query ? `?${query}` : ""}`

  try {
    const res = await apiFetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    })

    if (!res.ok) {
      throw new Error("Failed to fetch rental requests")
    }

    const data = (await res.json()) as ApiResponse<RentalRequest[], PaginatedMeta>
    return data
  } catch (error: any) {
    return {
      success: false,
      statusCode: 500,
      message: error.message || "An unexpected error occurred",
      data: null,
      meta: null,
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
