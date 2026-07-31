import { Role, UserStatus } from "."
export interface User {
  id: string
  name: string
  email: string
  avatar: string
  phone: string
  role: Role
  password: string
  status: UserStatus
  createdAt: Date
  updateAt: Date
}

export interface UserLoginToken {
  accessToken: string
  refreshToken: string
}
