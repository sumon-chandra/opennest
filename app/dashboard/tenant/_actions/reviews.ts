"use server"

import { apiFetch } from "@/utils/apiFetch"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { ApiResponse } from "@/types"
import { Review } from "@/types/reviews"

export async function createReview(data: {
  propertyId: string
  rating: number
  comment: string
}) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    return {
      success: false,
      message: "You must be logged in to post a review",
    }
  }

  try {
    const res = await apiFetch("/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(data),
    })

    const result = await res.json()

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to create review",
      }
    }

    revalidatePath("/dashboard/tenant/requests")
    return {
      success: true,
      message: "Review added successfully",
      data: result.data,
    }
  } catch (error: any) {
    console.error("Error creating review:", error)
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    }
  }
}

export async function getMyReviews () {
    const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value

  if (!accessToken) {
    return {
      success: false,
      message: "You must be logged in to post a review",
    }
  }

  try {
    const res = await apiFetch("/reviews/my-reviews", {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    })

    const result = await res.json() as ApiResponse<Review[], null>

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch reviews",
      }
    }

    return result
  } catch (error: any) {
    console.error("Error fetching reviews:", error)
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
      data: null
    }
  }
}