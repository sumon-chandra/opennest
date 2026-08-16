"use server"
import { apiFetch } from "../../../../utils/apiFetch";

import { ApiResponse } from "@/types"
import { PropertyResponse } from "@/types/property"
import { cookies } from "next/headers"

export async function getMyProperties(): Promise<ApiResponse<PropertyResponse[]>> {
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

  const result = (await res.json()) as ApiResponse<PropertyResponse[]>
  return result
}
