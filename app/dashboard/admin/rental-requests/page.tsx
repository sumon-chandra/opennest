"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { getAllRentalRequestsAdmin } from "@/services/admin.service"
import RentalRequestsTable from "@/components/dashboard/admin/RentalRequestsTable"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function AdminRentalRequests() {
  const [searchQuery, setSearchQuery] = useState("")

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get("page") || "1", 10)

  const setPage = (updater: number | ((p: number) => number)) => {
    const newPage = typeof updater === "function" ? updater(page) : updater
    const params = new URLSearchParams(searchParams.toString())
    if (newPage > 1) {
      params.set("page", String(newPage))
    } else {
      params.delete("page")
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const limit = 15

  const { data, isLoading } = useQuery({
    queryKey: ["admin-rental-requests", searchQuery, page, limit],
    queryFn: () =>
      getAllRentalRequestsAdmin({
        search: searchQuery || undefined,
        page,
        limit,
      }),
  })

  const requests = data?.data ?? []
  const totalPages =
    data?.meta?.totalPages ||
    Math.ceil((data?.meta?.total || 0) / (data?.meta?.limit || 10))

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Rental Requests
          </h1>
          <p className="mt-2 text-muted-foreground">
            View all platform-wide rental requests and their status.
          </p>
        </div>
      </motion.div>

      {/* Search */}
      <div className="flex max-w-sm items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by tenant or property..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <RentalRequestsTable requests={requests} isLoading={isLoading} />

      {/* Pagination */}
      {data?.meta && totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={
                  page === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i + 1}
                  onClick={() => setPage(i + 1)}
                  className="cursor-pointer"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setPage((p) => Math.min(data.meta!.totalPages, p + 1))
                }
                className={
                  page === data.meta.totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
