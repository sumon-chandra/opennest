"use client"

interface PropertiesInfoBarProps {
  startIndex: number
  itemsPerPage: number
  totalItems: number
  isLoading: boolean
  label?: string
}

export function PropertiesInfoBar({
  startIndex,
  itemsPerPage,
  totalItems,
  isLoading,
  label = "Showing",
}: PropertiesInfoBarProps) {
  if (isLoading) {
    return (
      <div className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-4">
        <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
      </div>
    )
  }

  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const displayStart = totalItems > 0 ? startIndex + 1 : 0

  return (
    <div className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-4">
      <p className="text-sm text-muted-foreground">
        {label} {displayStart}-{endIndex} of {totalItems}
      </p>
    </div>
  )
}
