"use server"

import { ApiResponse } from "@/types"
import { TenantStats } from "@/types/user"
import { apiFetch } from "@/utils/apiFetch"
import { cookies } from "next/headers"

export const getTenantStats = async () => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value || null

    if(!accessToken){
        return null
    }

    const res = await apiFetch("users/me/tenant-stats", {
        method: "GET",
        headers: {
            Authorization: accessToken,
        },
    })

    if(!res.ok){
        throw new Error("Failed to fetch tenant stats")
    }

    const data = await res.json() as ApiResponse<TenantStats, null>
    return data
}