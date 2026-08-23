import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { myRentalRequests } from "@/app/dashboard/tenant/_actions/rental-requests"
import MotionDiv from "@/components/common/MotionDiv"
import RentalRequestsTable from "@/components/dashboard/tenant/RentalRequestsTable"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type Props = {
  searchParams: Promise<{ page?: string; limit?: string; search?: string }>
}

export default async function TenantRequests({ searchParams }: Props) {
  const resolvedParams = await searchParams
  const page = parseInt(resolvedParams.page || "1", 10)
  const limit = parseInt(resolvedParams.limit || "10", 10)
  const search = resolvedParams.search || ""

  const { data: requests, meta } = await myRentalRequests({ page, limit, search })

  return (
    <div className="space-y-6 p-6">
      <MotionDiv className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            My Rental Applications
          </h1>
          <p className="mt-2 text-muted-foreground">
            Track the status of your property rental applications.
          </p>
        </div>
        <Button>
          <Link href="/properties">Find More Properties</Link>
        </Button>
      </MotionDiv>

      <div className="flex max-w-sm items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search applications..."
            className="pl-8"
          />
        </div>
      </div>

      <RentalRequestsTable requests={requests || []} />

      {/* Pagination */}
      {meta && meta.totalPages && meta.totalPages > 1 && (
        <Pagination className="pb-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`?page=${Math.max(1, page - 1)}&limit=${limit}${search ? `&search=${search}` : ""}`}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {Array.from({ length: meta.totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href={`?page=${i + 1}&limit=${limit}${search ? `&search=${search}` : ""}`}
                  isActive={page === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href={`?page=${Math.min(meta.totalPages, page + 1)}&limit=${limit}${search ? `&search=${search}` : ""}`}
                className={page === meta.totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
