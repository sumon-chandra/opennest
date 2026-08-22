import { PaymentStatus, RentalRequestStatus } from ".";
import { RentalRequest } from "./requests";

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

export interface LandlordPaymentHistory extends PaymentHistory {
  rentalRequest: {
    id: string;
    tenantId: string;
    propertyId: string;
    moveInDate: string;
    message: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    tenant: Tenant;
    property: Property;
  }
}

interface Tenant {
  id: string;
  name: string;
  email: string;
}

interface Property {
  title: string;
  location: string;
  landlord: Landlord;
}

interface Landlord {
  id: string;
  name: string;
  email: string;
}