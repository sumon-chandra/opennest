"use client"

import { useEffect } from "react"
import { AlertCircle, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="h-10 w-10 text-destructive" />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Something went wrong!
        </h2>
        <p className="mx-auto max-w-[500px] text-muted-foreground">
          An unexpected error occurred while loading this page. Our team has
          been notified. Please try again or return to your dashboard.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={() => reset()} size="lg" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
        <Button
          variant="outline"
          size="lg"
          render={<Link href="/dashboard" />}
          className="gap-2"
        >
          <Home className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      {/* Optional: Show digest in development/staging for easier debugging */}
      {error.digest && (
        <p className="mt-8 text-xs text-muted-foreground">
          Error ID: <span className="font-mono">{error.digest}</span>
        </p>
      )}
    </div>
  )
}
