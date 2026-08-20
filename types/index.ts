export type Role = "ADMIN" | "LANDLORD" | "TENANT"
export type UserStatus = "ACTIVE" | "BANNED"
export type PropertyStatus = "AVAILABLE" | "RENTED" | "UNAVAILABLE"
export type PaymentStatus = "PENDING" | "PAID" | "FAILED"

export interface ApiResponse<T, M = Record<string, any>> {
  success: boolean
  statusCode: number
  message: string
  data: T | null
  meta?: M | null
}
