"use client"

import { useMemo, useState } from "react"
import { Property } from "@/types/property"

interface UsePaginationOptions {
  itemsPerPage?: number
}

export function usePropertiesPagination(
  items: Property[],
  options: UsePaginationOptions = {}
) {
  const { itemsPerPage = 8 } = options
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = useMemo(
    () => Math.ceil(items.length / itemsPerPage),
    [items.length, itemsPerPage]
  )

  const startIndex = useMemo(
    () => (currentPage - 1) * itemsPerPage,
    [currentPage, itemsPerPage]
  )

  const paginatedItems = useMemo(
    () => items.slice(startIndex, startIndex + itemsPerPage),
    [items, startIndex, itemsPerPage]
  )

  const resetPage = () => setCurrentPage(1)

  return {
    currentPage,
    totalPages,
    startIndex,
    paginatedItems,
    setCurrentPage,
    resetPage,
  }
}
