import { Property } from "./property";
import { User } from "./user";

export interface Review {
  id: string;
  rating: number;
  comment?: string | null;
  tenantId: string;
  tenant: User;
  propertyId: string;
  property: Property;
  createdAt: Date;
  updatedAt: Date;
}