"use client"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { LandlordPaymentHistory as PaymentHistory } from "@/types/payment"

export default function PaymentHistoryTable({
  payments,
}: {
  payments: PaymentHistory[]
}) {
  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Tenant & Property</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Receipt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-mono text-xs">{payment.id}</TableCell>
              <TableCell>
                {new Date(payment.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell>
                <div className="font-medium">
                  {payment.rentalRequest.tenant.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {payment.rentalRequest.property.title}
                </div>
              </TableCell>
              <TableCell className="font-medium">
                ${payment.amount.toLocaleString()}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    payment.status === "COMPLETED"
                      ? "default"
                      : payment.status === "FAILED"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {payment.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="h-8">
                  Download
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
