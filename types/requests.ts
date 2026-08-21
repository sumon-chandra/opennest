import { PaymentStatus, RentalRequestStatus } from ".";

export interface RentalRequest {
     id: string;
    property: string;
    landlord: string;
    dateApplied: string;
    status: RentalRequestStatus;
    paymentStatus: PaymentStatus;
    paymentId: string | null;
    moveInDate: string;
}