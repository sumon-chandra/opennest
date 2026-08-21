"use server"

import { ApiResponse } from "@/types"
import { apiFetch } from "@/utils/apiFetch"
import { cookies } from "next/headers"

export const createPaymentSession = async (rentalRequestId: string) => {
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
    const res = await apiFetch(`payments/checkout/${rentalRequestId}`, {
      method: "POST",
      headers: {
        Authorization: accessToken,
      },
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      return {
        success: false,
        statusCode: res.status,
        message: errorData?.message || "Failed to initiate payment",
        data: null,
      }
    }

    const data = await res.json() as ApiResponse<string, null>
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
