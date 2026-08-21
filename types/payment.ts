import { PaymentStatus, RentalRequestStatus } from ".";

export type PaymentProvider = "STRIPE" | "SSLCOMMERZ";

export interface PaymentHistory {
  id: string;
  transactionId: string;
  rentalRequestId: string;
  amount: string;
  provider: PaymentProvider;
  status: PaymentStatus;
  currency: string;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TenantPaymentHistory extends PaymentHistory {
  rentalRequest: {
    id: string;
    tenantId: string;
    propertyId: string;
    moveInDate: string;
    message: string | null;
    status: RentalRequestStatus;
    createdAt: string;
    updatedAt: string;
    property: {
      title: string;
      location: string;
    };
  };
}
