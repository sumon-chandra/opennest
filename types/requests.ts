import { PaymentStatus, RentalRequestStatus } from ".";
import { Property } from "./property";


export interface RentalRequest {
     id: string;
    property: Pick<Property, "title" | "description" | "price" | "status">    ;
    landlord: string;
    dateApplied: string;
    status: RentalRequestStatus;
    paymentStatus: PaymentStatus;
    paymentId: string | null;
    moveInDate: string;
}