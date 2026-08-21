import { PaymentStatus, RentalRequestStatus, Role, UserStatus } from "."
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

export interface TenantStats {
    totalBooked: number;
    totalPendingRequests: number;
    totalSavedProperties: number;
    totalInvestedAmount: number;
    latestRentalRequests: LatestTenantRentalRequest[]
}

export interface LatestTenantRentalRequest {
        paymentStatus: PaymentStatus;
        property: {
            title: string;
            location: string;
            price: number;
        };
        payment: {
            id: string;
            status: PaymentStatus;
        } | null;
        id: string;
        status: RentalRequestStatus;
        createdAt: string;
        updatedAt: string;
        tenantId: string;
        propertyId: string;
        moveInDate: string;
        message: string | null;
}