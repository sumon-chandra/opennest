"use server"

import { ApiResponse } from "@/types"
import { Property } from "@/types/property"
import { cookies } from "next/headers"
import { revalidateTag } from "next/cache"
import { CreatePropertyPayload } from "./create-property"

export async function updateProperty(
  id: string,
  payload: Partial<CreatePropertyPayload>,
): Promise<ApiResponse<Property>> {
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

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/v1/properties/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload),
    },
  )

  const result = (await res.json()) as ApiResponse<Property>

  if (result.success) {
    revalidateTag("my-properties", "max")
    revalidateTag("properties", "max")
  }

  return result
}
