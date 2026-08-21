"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createRentalRequest } from "@/app/(public)/properties/_actions/create-rental-request"
import { toast } from "sonner"
import { DatePicker } from "./date-picker"

interface RequestRentalModalProps {
  propertyId: string
}

export function RequestRentalModal({ propertyId }: RequestRentalModalProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [date, setDate] = useState<Date>()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const moveInDate = date?.toISOString() as string
    const message = formData.get("message") as string

    if (!moveInDate || !message) {
      toast.error("Please fill in all required fields.")
      setIsLoading(false)
      return
    }
    setError(false)
    const payload = {
      propertyId,
      message,
      moveInDate,
    }
    try {
      const res = await createRentalRequest(payload)

      if (res.success) {
        toast.success("Rental request submitted successfully!")
        setOpen(false)
        router.push("/dashboard/tenant/requests")
      } else {
        setError(true)
        toast.error(res.message || "Failed to submit request.")
      }
    } catch (error) {
      setError(true)
      toast.error("Failed to submit request.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full cursor-pointer">
        <Button className="h-12 w-full text-lg">Request to Rent</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Request to Rent</DialogTitle>
          <DialogDescription>
            Fill out this form to send a rental request to the landlord.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            {/* <label htmlFor="moveInDate" className="text-sm font-medium">
              Move-in Date
            </label>
            <Input
              id="moveInDate"
              name="moveInDate"
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
            /> */}
            <DatePicker date={date} setDate={setDate} />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message to Landlord
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Hi, I am interested in this property..."
              required
              rows={4}
            />
            {error && (
              <p className="text-sm text-destructive">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Request"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
