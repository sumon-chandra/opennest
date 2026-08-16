"use server"
import { apiFetch } from "../../../utils/apiFetch";
import { ApiResponse } from "@/types"
import { PropertyResponse } from "@/types/property"

export async function getProperty(id: string) {
  const response = await apiFetch(`/properties/${id}`, {
    cache: "no-store",
  })
  
  if (!response.ok) {
    return null
  }
  
  const data = (await response.json()) as ApiResponse<PropertyResponse>
  return data
}