"use client"

import { Role } from "@/types"
import React, { createContext, useContext, useState, useEffect } from "react"

export interface User {
  id: string
  email: string
  name: string
  role: Role
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, role: Role) => Promise<void>
  signup: (
    email: string,
    password: string,
    name: string,
    role: Role
  ) => Promise<void>
  logout: () => void
  addFavorite: (propertyId: string) => void
  removeFavorite: (propertyId: string) => void
  isFavorite: (propertyId: string) => boolean
  favorites: string[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem("opennest_user")
      return storedUser ? (JSON.parse(storedUser) as User) : null
    } catch {
      localStorage.removeItem("opennest_user")
      return null
    }
  })
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const storedFavorites = localStorage.getItem("opennest_favorites")
      return storedFavorites ? JSON.parse(storedFavorites) : []
    } catch {
      localStorage.removeItem("opennest_favorites")
      return []
    }
  })
  const [isLoading, setIsLoading] = useState(false)

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("opennest_favorites", JSON.stringify(favorites))
  }, [favorites])

  const login = async (email: string, password: string, role: Role) => {
    setIsLoading(true)
    try {
      // Simulate API call - in production, this would validate against a backend
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split("@")[0],
        role,
        avatar: `/avatars/${Math.ceil(Math.random() * 8)}.png`,
      }

      setUser(newUser)
      localStorage.setItem("opennest_user", JSON.stringify(newUser))
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (
    email: string,
    password: string,
    name: string,
    role: Role
  ) => {
    setIsLoading(true)
    try {
      // Simulate API call - in production, this would create a new user
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role,
        avatar: `/avatars/${Math.ceil(Math.random() * 8)}.png`,
      }

      setUser(newUser)
      localStorage.setItem("opennest_user", JSON.stringify(newUser))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("opennest_user")
  }

  const addFavorite = (propertyId: string) => {
    setFavorites((prev) => {
      if (!prev.includes(propertyId)) {
        return [...prev, propertyId]
      }
      return prev
    })
  }

  const removeFavorite = (propertyId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== propertyId))
  }

  const isFavorite = (propertyId: string) => {
    return favorites.includes(propertyId)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        addFavorite,
        removeFavorite,
        isFavorite,
        favorites,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
