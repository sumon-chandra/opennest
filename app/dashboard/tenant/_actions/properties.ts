"use server"

import { ApiResponse } from "@/types"
import { Property } from "@/types/property"
import { apiFetch } from "@/utils/apiFetch"
import { cookies } from "next/headers"

export const getFavoriteProperties = async () => {
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

    const res = await apiFetch("properties/favorites", {
        method: "GET",
        headers: {
            Authorization: accessToken
        },
    })

    if (!res.ok) {
        throw new Error("Failed to fetch favorite properties")
    }

    const data = await res.json() as ApiResponse<Property[], null>
    return data
}

export const removeFavoriteProperties = async (id: string) => {
    try {
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

        const res = await apiFetch(`properties/favorites/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: accessToken
            },
        })

        if (!res.ok) {
            throw new Error("Failed to remove favorite property")
        }

        const data = await res.json()
        return data as Property[]
    } catch (error) {
        console.log(error)
        return []
    }
}

export const addFavoriteProperty = async (propertyId: string) => {
    try {
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

        const res = await apiFetch(`properties/favorites`, {
            method: "POST",
            headers: {
                Authorization: accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ propertyId }),
        })

        if (!res.ok) {
            throw new Error("Failed to add favorite property")
        }

        const data = await res.json()
        return data as Property[]
    } catch (error) {
        console.log(error)
        return []
    }
}