export type Role = "ADMIN" | "LANDLORD" | "TENANT"
export type UserStatus = "ACTIVE" | "BANNED"
export type PropertyStatus = "AVAILABLE" | "RENTED" | "UNAVAILABLE"

export interface ApiResponse<T> {
  success: boolean
  statusCode: number
  message: string
  data: T | null
}
