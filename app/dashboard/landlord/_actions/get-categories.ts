"use server"
import { apiFetch } from "../../../../utils/apiFetch";

import { ApiResponse } from "@/types"
import { Category } from "@/types/category"

export async function getCategories(): Promise<ApiResponse<Category[]>> {
  const res = await apiFetch(
    `categories`,
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
