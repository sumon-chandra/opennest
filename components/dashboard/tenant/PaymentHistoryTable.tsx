import { motion } from "framer-motion"
import { Download, CreditCard, Calendar, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TenantPaymentHistory } from "@/types/payment"
import { PaymentListNotFound } from "../PaymentListNotFound"

const PaymentHistoryTable = ({
  payments,
}: {
  payments: TenantPaymentHistory[]
}) => {
  if (payments.length === 0) {
    return (
      <PaymentListNotFound
        title="No payments found"
        description="You have not made any payments yet."
      />
    )
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Receipt</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell>{payment.createdAt}</TableCell>
            <TableCell className="font-medium">
              {payment.rentalRequest.property.title}
            </TableCell>
            <TableCell>${payment.amount}</TableCell>
            <TableCell className="text-muted-foreground">
              {payment.provider}
            </TableCell>
            <TableCell>
              <Badge
                variant="default"
                className="border-green-500/20 bg-green-500/15 text-green-700 hover:bg-green-500/25"
              >
                {payment.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-2 text-muted-foreground hover:text-foreground"
              >
                <Download className="h-4 w-4" /> PDF
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default PaymentHistoryTable
