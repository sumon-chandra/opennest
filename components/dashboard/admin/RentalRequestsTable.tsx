import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { RentalRequest } from "@/types/requests"
import { formatCurrency } from "@/lib/utils"

const STATUS_VARIANT: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  PENDING: "outline",
  APPROVED: "default",
  REJECTED: "destructive",
  CANCELLED: "destructive",
  COMPLETED: "secondary",
}

const PAYMENT_VARIANT: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  PENDING: "outline",
  COMPLETED: "default",
  FAILED: "destructive",
  REFUNDED: "secondary",
}

type RentalRequestsTableProps = {
  requests: RentalRequest[]
  isLoading: boolean
}

const RentalRequestsTable = ({
  requests,
  isLoading,
}: RentalRequestsTableProps) => {
  console.log({ requests })
  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property</TableHead>
            <TableHead>Tenant</TableHead>
            <TableHead>Move-in Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-20 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-20 rounded-full" />
                </TableCell>
              </TableRow>
            ))
          ) : requests.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="py-12 text-center text-muted-foreground"
              >
                No rental requests found.
              </TableCell>
            </TableRow>
          ) : (
            requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  <div className="max-w-[250px] truncate font-medium">
                    {request.property?.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatCurrency(request.property?.price || 0)}/month
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{request.tenant?.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {request.tenant?.email}
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  {request.moveInDate
                    ? format(new Date(request.moveInDate), "PP")
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <Badge variant={STATUS_VARIANT[request.status] || "outline"}>
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      PAYMENT_VARIANT[request.paymentStatus] || "outline"
                    }
                  >
                    {request.payment.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default RentalRequestsTable
