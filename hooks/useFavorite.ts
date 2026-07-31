"use client"

import { useCallback, useEffect, useState } from "react"

const FAVORITE_STORAGE_KEY = "opennest_favorite_properties"
export type FavoritePropertyId = string | number

function getStoredFavorites(): FavoritePropertyId[] {
  if (typeof window === "undefined") {
    return []
  }

  try {
    const raw = window.localStorage.getItem(FAVORITE_STORAGE_KEY)
    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      return parsed
    }
  } catch {
    return []
  }

  return []
}

export function useFavorite() {
  const [favorites, setFavorites] = useState<FavoritePropertyId[]>(() => {
    if (typeof window === "undefined") {
      return []
    }

    return getStoredFavorites()
  })

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    window.localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = useCallback((id: FavoritePropertyId) => {
    setFavorites((current) => {
      if (current.includes(id)) {
        return current
      }

      return [...current, id]
    })
  }, [])

  const removeFavorite = useCallback((id: FavoritePropertyId) => {
    setFavorites((current) => current.filter((favoriteId) => favoriteId !== id))
  }, [])

  const isFavorite = useCallback(
    (id: FavoritePropertyId) => favorites.includes(id),
    [favorites]
  )

  return { isFavorite, addFavorite, removeFavorite }
}
