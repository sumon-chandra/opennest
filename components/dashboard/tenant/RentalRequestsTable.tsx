"use client"

import { motion } from "framer-motion"
import { Search, Eye, XCircle } from "lucide-react"
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
import { TenantRentalRequest } from "@/types/requests"
import { createPaymentSession } from "@/app/dashboard/tenant/_actions/payments"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"
import AddReviewModal from "./AddReviewModal"

interface RentalRequestsTableProps {
  requests: TenantRentalRequest[]
}

const RentalRequestsTable = ({ requests }: RentalRequestsTableProps) => {
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [selectedPropertyId, setSelectedPropertyId] = useState("")
  const [selectedPropertyName, setSelectedPropertyName] = useState("")
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const router = useRouter()

  const handlePayNow = async (id: string) => {
    setLoadingId(id)
    const res = await createPaymentSession(id)

    if (res.success && res.data) {
      // res.data is the stripe checkout URL
      window.location.href = res.data
    } else {
      toast.error(res.message || "Failed to initiate payment")
      setLoadingId(null)
    }
  }

  const openReviewModal = (propertyId: string, propertyName: string) => {
    setSelectedPropertyId(propertyId)
    setSelectedPropertyName(propertyName)
    setReviewModalOpen(true)
  }

  return (
    <>
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Landlord</TableHead>
              <TableHead>Date Applied</TableHead>
              <TableHead>Move-in Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests?.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">
                  {request.property}
                </TableCell>
                <TableCell>{request.landlord}</TableCell>
                <TableCell>
                  {new Date(request.dateApplied).toLocaleDateString()}
                </TableCell>
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
                <TableCell>
                  <Badge
                    variant={
                      request.paymentStatus === "COMPLETED"
                        ? "default"
                        : "outline"
                    }
                    className={
                      request.paymentStatus === "COMPLETED"
                        ? "bg-green-500 hover:bg-green-600"
                        : "border-yellow-600 text-yellow-600"
                    }
                  >
                    {request.paymentStatus}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {request.status === "APPROVED" &&
                      request.paymentStatus === "PENDING" && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handlePayNow(request.id)}
                          disabled={loadingId === request.id}
                        >
                          {loadingId === request.id
                            ? "Processing..."
                            : "Pay Now"}
                        </Button>
                      )}
                    {request.paymentStatus === "COMPLETED" &&
                      !request.hasReviewed && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-primary/20 text-primary hover:bg-primary/10 hover:text-primary"
                          onClick={() =>
                            openReviewModal(
                              request.propertyId,
                              request.property
                            )
                          }
                        >
                          Add Review
                        </Button>
                      )}
                    <Button variant="ghost" size="icon" title="View Details">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {request.status === "PENDING" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        title="Withdraw Application"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AddReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        propertyId={selectedPropertyId}
        propertyName={selectedPropertyName}
        onReviewAdded={() => {
          // If you wanted to refresh locally you could, but we revalidate in the action
          router.refresh()
        }}
      />
    </>
  )
}

export default RentalRequestsTable
