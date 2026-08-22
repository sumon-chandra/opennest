"use server"

import { apiFetch } from "../../../utils/apiFetch"
import { ApiResponse } from "@/types"
import { Category } from "@/types/category"

export async function getCategories(): Promise<ApiResponse<Category[]>> {
  try {
    const res = await apiFetch(`categories`, {
      next: {
        revalidate: 60 * 60 * 6, // 6 hours
        tags: ["categories"],
      },
    })

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
  } catch (error: any) {
    console.error("[getCategories] Error:", error)
    return {
      success: false,
      statusCode: 500,
      message: error.message || "Failed to fetch categories",
      data: null,
    }
  }
}
