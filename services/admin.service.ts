"use server"

import { apiFetch } from "@/utils/apiFetch"
import { isAccessTokenExist } from "@/services/refresh-token"
import { ApiResponse, PropertyStatus, UserStatus } from "@/types"
import { AdminStatistics, AdminReview } from "@/types/admin"
import { User } from "@/types/user"
import { Property } from "@/types/property"
import { RentalRequest } from "@/types/requests"

// ─── Statistics ──────────────────────────────────────────────
export async function getAdminStatistics() {
  const accessToken = await isAccessTokenExist()

  const res = await apiFetch("/admin/statistics", {
    headers: {
      Authorization: accessToken!,
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
  })

  const result = (await res.json()) as ApiResponse<AdminStatistics>
  return result
}

// ─── Users ───────────────────────────────────────────────────
export async function getAllUsers(params?: { page?: number; limit?: number; search?: string }) {
  const accessToken = await isAccessTokenExist()

  const searchParams = new URLSearchParams()
  if (params?.page) searchParams.set("page", String(params.page))
  if (params?.limit) searchParams.set("limit", String(params.limit))
  if (params?.search) searchParams.set("searchTerm", params.search)

  const query = searchParams.toString()
  const endpoint = `/users${query ? `?${query}` : ""}`

  const res = await apiFetch(endpoint, {
    headers: {
      Authorization: accessToken!
    },
    cache: "no-store",
  })

  const result = (await res.json()) as ApiResponse<User[]>
  return result
}

export async function updateUserStatus(userId: string, status: UserStatus) {
  const accessToken = await isAccessTokenExist()

  const res = await apiFetch(`admin/users/${userId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken!,
    },
    body: JSON.stringify({ status }),
    cache: "no-store",
  })

  const result = (await res.json()) as ApiResponse<User>
  return result
}

// ─── Properties ──────────────────────────────────────────────
export async function getAllProperties(params?: { page?: number; limit?: number; search?: string }) {
  const accessToken = await isAccessTokenExist()

  const searchParams = new URLSearchParams()
  if (params?.page) searchParams.set("page", String(params.page))
  if (params?.limit) searchParams.set("limit", String(params.limit))
  if (params?.search) searchParams.set("searchTerm", params.search)

  const query = searchParams.toString()
  const endpoint = `/properties${query ? `?${query}` : ""}`

  const res = await apiFetch(endpoint, {
    headers: {
      Authorization: accessToken!,
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
  })

  const result = (await res.json()) as ApiResponse<Property[]>
  return result
}

export async function updatePropertyStatus(propertyId: string, status: PropertyStatus) {
  const accessToken = await isAccessTokenExist()

  const res = await apiFetch(`/admin/properties/${propertyId}/status`, {
    method: "PATCH",
    headers: {
      Authorization: accessToken!,
      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
    cache: "no-store",
  })

  const result = (await res.json()) as ApiResponse<Property>
  return result
}

// ─── Reviews ─────────────────────────────────────────────────
export async function getAllReviews(params?: { page?: number; limit?: number }) {
  const accessToken = await isAccessTokenExist()

  const searchParams = new URLSearchParams()
  if (params?.page) searchParams.set("page", String(params.page))
  if (params?.limit) searchParams.set("limit", String(params.limit))

  const query = searchParams.toString()
  const endpoint = `/admin/reviews${query ? `?${query}` : ""}`

  const res = await apiFetch(endpoint, {
    headers: {
      Authorization: accessToken!,
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
  })

  const result = (await res.json()) as ApiResponse<AdminReview[]>
  return result
}

export async function deleteReview(reviewId: string) {
  const accessToken = await isAccessTokenExist()

  const res = await apiFetch(`/admin/reviews/${reviewId}`, {
    method: "DELETE",
    headers: {
      Authorization: accessToken!,
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
  })

  const result = (await res.json()) as ApiResponse<null>
  return result
}

// ─── Rental Requests (Admin) ─────────────────────────────────
export async function getAllRentalRequestsAdmin(params?: { page?: number; limit?: number; search?: string }) {
  const accessToken = await isAccessTokenExist()

  const searchParams = new URLSearchParams()
  if (params?.page) searchParams.set("page", String(params.page))
  if (params?.limit) searchParams.set("limit", String(params.limit))
  if (params?.search) searchParams.set("searchTerm", params.search)

  const query = searchParams.toString()
  const endpoint = `/rental-requests${query ? `?${query}` : ""}`

  const res = await apiFetch(endpoint, {
    headers: {
      Authorization: accessToken!,
    },
    cache: "no-store",
  })

  const result = (await res.json()) as ApiResponse<RentalRequest[]>
  return result
}
