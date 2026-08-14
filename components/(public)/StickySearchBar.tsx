"use client"

import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StickySearchBarProps {
  search: string
  onSearchChange: (value: string) => void
  sidebarOpen: boolean
  onToggleSidebar: (open: boolean) => void
  placeholder?: string
}

export function StickySearchBar({
  search,
  onSearchChange,
  sidebarOpen,
  onToggleSidebar,
  placeholder = "Search properties by title, location...",
}: StickySearchBarProps) {
  return (
    <div className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleSidebar(!sidebarOpen)}
            className="lg:hidden"
          >
            {sidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
          <input
            type="text"
            placeholder={placeholder}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground transition focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}
