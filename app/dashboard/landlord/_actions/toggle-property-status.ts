"use server"
import { apiFetch } from "@/utils/apiFetch";
import { cookies } from "next/headers"
import { revalidateTag, revalidatePath } from "next/cache"
import { ApiResponse } from "@/types"

export async function togglePropertyStatus(id: string, currentStatus: string): Promise<ApiResponse<any>> {
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

  const newStatus = currentStatus === "AVAILABLE" ? "UNAVAILABLE" : "AVAILABLE"

  try {
    const res = await apiFetch(`properties/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ status: newStatus }),
    })

    const result = (await res.json()) as ApiResponse<any>

    if (result.success) {
      revalidateTag("my-properties", "max")
      revalidateTag("properties", "max")
      revalidatePath("/dashboard/landlord/properties")
    }

    return result
  } catch (error: any) {
    return {
      success: false,
      statusCode: 500,
      message: error.message || "An error occurred while updating status.",
      data: null,
    }
  }
}
