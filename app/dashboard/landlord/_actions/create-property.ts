"use server"

import { ApiResponse } from "@/types"
import { Property } from "@/types/property"
import { cookies } from "next/headers"
import { revalidateTag } from "next/cache"

export interface CreatePropertyPayload {
  title: string
  description: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  area?: number | null
  thumbnail: string
  images: string[]
  amenities: string[]
  status: "AVAILABLE" | "RENTED" | "UNAVAILABLE"
  categoryId: string
  featured: boolean
}

export async function createProperty(
  payload: CreatePropertyPayload,
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
    `${process.env.BACKEND_API_URL}/api/v1/properties`,
    {
      method: "POST",
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
