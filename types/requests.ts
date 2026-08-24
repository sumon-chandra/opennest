import { PaymentStatus, RentalRequestStatus } from ".";
import { PaymentHistory } from "./payment";
import { Property } from "./property";
import { User } from "./user";


export interface RentalRequest {
     id: string;
    property: Pick<Property, "title" | "description" | "price" | "status">    ;
    tenant: User;
    payment: PaymentHistory
    dateApplied: string;
    status: RentalRequestStatus;
    paymentStatus: PaymentStatus;
    paymentId: string | null;
    moveInDate: string;
    message?: string | null;
}

export interface TenantRentalRequest {
    id: string;
    propertyId: string;
    property: string;
    landlord: string;
    dateApplied: string;
    status: RentalRequestStatus;
    paymentStatus: PaymentStatus;
    paymentId: null;
    moveInDate: string;
    hasReviewed?: boolean;
}
