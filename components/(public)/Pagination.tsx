"use client"

import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showPageNumbers?: boolean
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const maxPageButtons = 5 // Show max 5 page buttons
  const pages: (number | string)[] = []

  if (totalPages <= maxPageButtons) {
    // Show all pages
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Show first page, ellipsis, around current, ellipsis, last page
    if (currentPage <= 3) {
      for (let i = 1; i <= 3; i++) pages.push(i)
      pages.push("...")
      pages.push(totalPages)
    } else if (currentPage >= totalPages - 2) {
      pages.push(1)
      pages.push("...")
      for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push("...")
      pages.push(currentPage - 1)
      pages.push(currentPage)
      pages.push(currentPage + 1)
      pages.push("...")
      pages.push(totalPages)
    }
  }

  return (
    <ShadcnPagination className="mt-8">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          {currentPage === 1 ? (
            <PaginationPrevious className="pointer-events-none opacity-50" />
          ) : (
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              className="cursor-pointer"
            />
          )}
        </PaginationItem>

        {/* Page Numbers */}
        {showPageNumbers &&
          pages.map((page, idx) => (
            <PaginationItem key={`${page}-${idx}`}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => onPageChange(page as number)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

        {/* Next Button */}
        <PaginationItem>
          {currentPage === totalPages ? (
            <PaginationNext className="pointer-events-none opacity-50" />
          ) : (
            <PaginationNext
              onClick={() =>
                onPageChange(Math.min(totalPages, currentPage + 1))
              }
              className="cursor-pointer"
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  )
}
