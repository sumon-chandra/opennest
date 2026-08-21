export type Role = "ADMIN" | "LANDLORD" | "TENANT"
export type UserStatus = "ACTIVE" | "BANNED"
export type PropertyStatus = "AVAILABLE" | "RENTED" | "UNAVAILABLE"
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED"
export type RentalRequestStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED" | "COMPLETED"

export interface ApiResponse<T, M = Record<string, any>> {
  success: boolean
  statusCode: number
  message: string
  data: T | null
  meta?: M | null
}
