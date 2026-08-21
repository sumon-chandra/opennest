"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MoreHorizontal, Check, X, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { RequestActionsModal } from "./RequestActionsModal"
import { RentalRequest } from "@/types/requests"
import { updateRentalRequestStatus } from "@/app/dashboard/landlord/_actions/rental-requests"
import { toast } from "sonner"

interface LandlordRequestsClientProps {
  initialRequests: RentalRequest[]
}

export function LandlordRequestsClient({
  initialRequests,
}: LandlordRequestsClientProps) {
  const [requests, setRequests] = useState<RentalRequest[]>(initialRequests)
  const [searchTerm, setSearchTerm] = useState("")

  console.log({ requests })

  const filteredRequests = requests.filter(
    (r) =>
      r.property?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleUpdateStatus = async (
    id: string,
    status: "APPROVED" | "REJECTED"
  ) => {
    const res = await updateRentalRequestStatus(id, status)
    if (res.success) {
      toast.success(`Request ${status.toLowerCase()} successfully.`)
      // Optimistic update
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      )
    } else {
      toast.error(res.message || "Failed to update status")
      throw new Error(res.message || "Failed to update status")
    }
  }

  return (
    <div className="space-y-6 p-6">
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
            Manage incoming applications and bookings for your properties.
          </p>
        </div>
      </motion.div>

      <div className="flex max-w-sm items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search property or status..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tenant</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Move-in Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="font-medium">Tenant</div>
                  </TableCell>
                  <TableCell>{request.property.title}</TableCell>
                  <TableCell>
                    {new Date(request.moveInDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === "APPROVED"
                          ? "default"
                          : request.status === "REJECTED"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <RequestActionsModal
                      request={request}
                      onUpdateStatus={handleUpdateStatus}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-6 text-center text-muted-foreground"
                >
                  No requests found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
