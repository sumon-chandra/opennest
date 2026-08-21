"use client"

import { useState } from "react"
import {
  Check,
  Mail,
  MoreHorizontal,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RentalRequest } from "@/types/requests"

interface RequestActionsModalProps {
  request: RentalRequest
  onUpdateStatus: (id: string, status: "APPROVED" | "REJECTED") => Promise<void>
}

export function RequestActionsModal({
  request,
  onUpdateStatus,
}: RequestActionsModalProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [actionType, setActionType] = useState<"APPROVED" | "REJECTED" | null>(
    null
  )

  const handleAction = async (status: "APPROVED" | "REJECTED") => {
    setIsLoading(true)
    setError(null)
    setActionType(status)
    try {
      await onUpdateStatus(request.id, status)
      setOpen(false)
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
      setActionType(null)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      // Clear errors when modal closes
      setError(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={<Button variant="ghost" className="h-8 w-8 p-0" />}
      >
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Request Actions</DialogTitle>
          <DialogDescription>
            Manage the rental request for{" "}
            <span className="font-semibold text-foreground">
              {request.property?.title}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          {request.message && (
            <div className="space-y-2 rounded-lg border border-border/50 bg-muted/40 p-4 text-sm">
              <span className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Message from Tenant
              </span>
              <p className="text-foreground/90 italic">"{request.message}"</p>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="mt-2 flex flex-col gap-3">
            <h2 className="text-sm text-muted-foreground">Update status</h2>

            {request.status === "PENDING" && (
              <div className="grid grid-cols-2 gap-3">
                <Button
                  className="h-11 gap-2 bg-emerald-600 text-white shadow-sm hover:bg-emerald-700"
                  onClick={() => handleAction("APPROVED")}
                  disabled={isLoading}
                >
                  {isLoading && actionType === "APPROVED" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  className="h-11 gap-2 shadow-sm"
                  onClick={() => handleAction("REJECTED")}
                  disabled={isLoading}
                >
                  {isLoading && actionType === "REJECTED" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
                  Reject
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
