"use server"

import { ApiResponse } from "@/types"
import { Category } from "@/types/category"

export async function getCategories(): Promise<ApiResponse<Category[]>> {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/v1/categories`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24, // 24h — categories rarely change
        tags: ["categories"],
      },
    },
  )

  if (!res.ok) {
    return {
      success: false,
      statusCode: res.status,
      message: "Failed to fetch categories",
      data: null,
    }
  }

  const result = (await res.json()) as ApiResponse<Category[]>
  return result
}
