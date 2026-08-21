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
import { RentalRequest } from "@/types/requests"

interface RentalRequestsTableProps {
  requests: RentalRequest[]
}

const RentalRequestsTable = ({ requests }: RentalRequestsTableProps) => {
  return (
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
              <TableCell className="font-medium">{request.property}</TableCell>
              <TableCell>{request.landlord}</TableCell>
              <TableCell>{request.dateApplied}</TableCell>
              <TableCell>{request.moveInDate}</TableCell>
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
                  {request.paymentStatus === "PENDING" && (
                    <Button variant="default" size="sm">
                      Pay Now
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
  )
}

export default RentalRequestsTable
