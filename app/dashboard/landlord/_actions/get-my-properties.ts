"use server"
import { apiFetch } from "../../../../utils/apiFetch";

import { ApiResponse } from "@/types"
import { PropertyMeta, PropertyResponse } from "@/types/property"
import { cookies } from "next/headers"

export async function getMyProperties({
  page = 1,
  limit = 10,
  search = "",
}: {
  page?: number
  limit?: number
  search?: string
} = {}): Promise<ApiResponse<PropertyResponse[], PropertyMeta>> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value || null

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: "User not logged in.",
      data: null,
      meta: {totalRevenue: 0, activeProperties: 0, totalBookingsThisMonth: 0}
    }
  }

  const searchParams = new URLSearchParams()
  if (page) searchParams.set("page", String(page))
  if (limit) searchParams.set("limit", String(limit))
  if (search) searchParams.set("searchTerm", search)

  const query = searchParams.toString()
  const endpoint = `properties/my-properties${query ? `?${query}` : ""}`

  const res = await apiFetch(endpoint, {
    headers: {
      Authorization: accessToken
    },
    cache: "no-store",
    next: {
      tags: ["my-properties"],
    },
  })

  const result = (await res.json()) as ApiResponse<PropertyResponse[], PropertyMeta>
  return result
}
