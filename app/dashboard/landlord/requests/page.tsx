import { getLandlordRentalRequests } from "../_actions/rental-requests"
import { LandlordRequestsClient } from "./_components/LandlordRequestsClient"
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

export default async function LandlordRequestsPage({ searchParams }: Props) {
  const resolvedParams = await searchParams
  const page = parseInt(resolvedParams.page || "1", 10)
  const limit = parseInt(resolvedParams.limit || "10", 10)
  const search = resolvedParams.search || ""

  const { data: requests, meta } = await getLandlordRentalRequests({ page, limit, search })

  return (
    <div className="space-y-6">
      <LandlordRequestsClient initialRequests={requests || []} />
      
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
