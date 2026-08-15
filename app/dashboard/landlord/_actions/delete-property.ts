"use server"
import { apiFetch } from "../../../../utils/apiFetch";

import { ApiResponse } from "@/types"
import { cookies } from "next/headers"
import { revalidateTag } from "next/cache"

export async function deleteProperty(id: string): Promise<ApiResponse<null>> {
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
    `properties/${id}`,
    {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    },
  )

  const result = (await res.json()) as ApiResponse<null>

  if (result.success) {
    revalidateTag("my-properties", "max")
    revalidateTag("properties", "max")
  }

  return result
}
