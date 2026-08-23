"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Search, Loader2, MapPin, DollarSign } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import {
  getAllProperties,
  updatePropertyStatus,
} from "@/services/admin.service"
import type { PropertyStatus } from "@/types"
import { formatCurrency } from "@/lib/utils"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive"> =
  {
    AVAILABLE: "default",
    RENTED: "secondary",
    UNAVAILABLE: "destructive",
  }

const STATUS_OPTIONS: { value: PropertyStatus; label: string }[] = [
  { value: "AVAILABLE", label: "Available" },
  { value: "RENTED", label: "Rented" },
  { value: "UNAVAILABLE", label: "Unavailable" },
]

export default function PropertyModeration() {
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
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["admin-properties", searchQuery, page, limit],
    queryFn: () =>
      getAllProperties({ search: searchQuery || undefined, page, limit }),
  })

  const statusMutation = useMutation({
    mutationFn: ({
      propertyId,
      status,
    }: {
      propertyId: string
      status: PropertyStatus
    }) => updatePropertyStatus(propertyId, status),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Property status updated successfully")
        queryClient.invalidateQueries({ queryKey: ["admin-properties"] })
      } else {
        toast.error(result.message || "Failed to update property status")
      }
    },
    onError: () => {
      toast.error("An error occurred while updating property status")
    },
  })

  const properties = data?.data ?? []
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
            Property Moderation
          </h1>
          <p className="mt-2 text-muted-foreground">
            Review and manage property listings across the platform.
          </p>
        </div>
      </motion.div>

      {/* Search */}
      <div className="flex max-w-sm items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search properties..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Change Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="ml-auto h-9 w-32" />
                  </TableCell>
                </TableRow>
              ))
            ) : properties.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-12 text-center text-muted-foreground"
                >
                  No properties found.
                </TableCell>
              </TableRow>
            ) : (
              properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    <div className="max-w-[280px] truncate font-medium">
                      {property.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="max-w-[200px] truncate">
                        {property.location}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 font-medium">
                      <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                      {formatCurrency(property.price).replace("$", "")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={STATUS_VARIANT[property.status] || "secondary"}
                    >
                      {property.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Select
                      value={property.status}
                      onValueChange={(value) => {
                        if (value && value !== property.status) {
                          statusMutation.mutate({
                            propertyId: property.id,
                            status: value as PropertyStatus,
                          })
                        }
                      }}
                      disabled={statusMutation.isPending}
                    >
                      <SelectTrigger className="ml-auto w-[140px]">
                        {statusMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <SelectValue />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

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
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className={
                  page === totalPages
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
