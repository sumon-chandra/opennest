"use server"
import { apiFetch } from "../../../../utils/apiFetch";

import { ApiResponse } from "@/types"
import { PropertyMeta, PropertyResponse } from "@/types/property"
import { cookies } from "next/headers"

export async function getMyProperties(): Promise<ApiResponse<PropertyResponse[], PropertyMeta>> {
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

  const res = await apiFetch(
    `properties/my-properties`,
    {
      headers: {
        Authorization: accessToken
      },
      cache: "no-store",
      next: {
        tags: ["my-properties"],
      },
    },
  )

  const result = (await res.json()) as ApiResponse<PropertyResponse[], PropertyMeta>
  return result
}
