"use server"

import { ApiResponse } from "@/types"
import { RentalRequest } from "@/types/requests"
import { apiFetch } from "@/utils/apiFetch"
import { cookies } from "next/headers"

export const myRentalRequests = async () => {
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

  const res = await apiFetch("rental-requests/my-properties", {
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
}
