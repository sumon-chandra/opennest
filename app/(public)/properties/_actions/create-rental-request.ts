"use server"

import { ApiResponse } from "@/types"
import { apiFetch } from "@/utils/apiFetch"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export const createRentalRequest = async (payload: {
  propertyId: string;
  message: string;
  moveInDate: string;
}) => {
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        return {
            success: false,
            statusCode: res.status,
            message: errorData?.message || "Failed to create rental request",
            data: null,
        }
    }

    revalidatePath("/dashboard/tenant/requests")
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
