"use server"

import { ApiResponse } from "@/types"
import { LandlordPaymentHistory } from "@/types/payment"
import { apiFetch } from "@/utils/apiFetch"
import { cookies } from "next/headers"

export const getPaymentList = async () => {
      const cookieStore = await cookies()
      const accessToken = cookieStore.get("accessToken")?.value || null
    
      if (!accessToken) {
        return {
          success: false,
          statusCode: 401,
          message: "User not logged in.",
          data: null,
        }
      }

      try {
        const res = await apiFetch("payments",{
          method:"GET",
          headers:{
            Authorization:accessToken,
          },
        })
        if(!res.ok){
            throw new Error("Failed to fetch payments")
        }
        const data = (await res.json()) as ApiResponse<LandlordPaymentHistory[], null>
        return data
        
      } catch (error:any) {
        return{
          success: false,
          statusCode: 500,
          message: error.message || "An unexpected error occurred",
          data: null,
        }
      }
}