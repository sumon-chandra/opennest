"use server"

import { ApiResponse } from "@/types"
import { TenantPaymentHistory } from "@/types/payment"
import { apiFetch } from "@/utils/apiFetch"
import { cookies } from "next/headers"

export const getTenantPaymentHistory = async()=>{
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

        const res = await apiFetch(`payments/my-payments`, {
            method: "GET",
            headers: {
                Authorization: accessToken,
            },
        })

        if (!res.ok) {
            throw new Error("Failed to fetch payment history")
        }

        const data = await res.json() as ApiResponse<TenantPaymentHistory[], null>
        return data
}