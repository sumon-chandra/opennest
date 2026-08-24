"use server"

import { ApiResponse } from "@/types"
import { RentalRequest, TenantRentalRequest } from "@/types/requests"
import { apiFetch } from "@/utils/apiFetch"
import { cookies } from "next/headers"

import { PaginatedMeta } from "@/types"

export const myRentalRequests = async ({
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
    }
  }

  const searchParams = new URLSearchParams()
  if (page) searchParams.set("page", String(page))
  if (limit) searchParams.set("limit", String(limit))
  if (search) searchParams.set("searchTerm", search)

  const query = searchParams.toString()
  const endpoint = `rental-requests/my-properties${query ? `?${query}` : ""}`

  const res = await apiFetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: accessToken,
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch rental requests")
  }

  const data = (await res.json()) as ApiResponse<
    TenantRentalRequest[],
    PaginatedMeta
  >
  console.log({ TenantRentalRequests: data.data })
  return data
}
