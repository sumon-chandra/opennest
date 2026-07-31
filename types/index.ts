export type Role = "ADMIN" | "LANDLORD" | "TENANT"
export type UserStatus = "ACTIVE" | "BANNED"

export interface ApiResponse<T> {
  success: boolean
  statusCode: number
  message: string
  data: T | null
}
