"use client"

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

// Mock Data
const paymentHistory = [
  {
    id: "PAY-1001",
    amount: 4500,
    date: "2026-08-01",
    status: "Completed",
    method: "Visa ending in 4242",
    description: "August 2026 Rent",
  },
  {
    id: "PAY-1002",
    amount: 4500,
    date: "2026-07-01",
    status: "Completed",
    method: "Visa ending in 4242",
    description: "July 2026 Rent",
  },
  {
    id: "PAY-1003",
    amount: 4500,
    date: "2026-06-01",
    status: "Completed",
    method: "Visa ending in 4242",
    description: "June 2026 Rent",
  },
  {
    id: "PAY-1004",
    amount: 4500,
    date: "2026-05-01",
    status: "Completed",
    method: "Bank Transfer",
    description: "May 2026 Rent",
  },
]

export default function TenantPayments() {
  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Payments
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your rent payments and view payment history.
          </p>
        </div>
        <Button className="gap-2">
          <CreditCard className="h-4 w-4" /> Make a Payment
        </Button>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1 md:col-span-2 lg:col-span-2 rounded-xl border bg-card p-6 shadow-xs flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="font-medium">Next Payment Due</span>
          </div>
          <div className="text-3xl font-bold">September 1, 2026</div>
          <div className="text-xl mt-1">$4,500.00</div>
          <p className="text-sm text-muted-foreground mt-4">
            Autopay is enabled for your Visa ending in 4242.
          </p>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-xs bg-primary/5 border-primary/20 flex flex-col items-center justify-center text-center">
          <CheckCircle2 className="h-10 w-10 text-green-500 mb-2" />
          <h3 className="font-semibold text-lg">All Caught Up!</h3>
          <p className="text-sm text-muted-foreground mt-1">
            You have no outstanding balances.
          </p>
        </div>
      </div>

      <div className="rounded-md border bg-card mt-8">
        <div className="p-4 border-b bg-muted/50">
          <h2 className="font-semibold">Payment History</h2>
        </div>
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
            {paymentHistory.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.date}</TableCell>
                <TableCell className="font-medium">{payment.description}</TableCell>
                <TableCell>${payment.amount.toLocaleString()}</TableCell>
                <TableCell className="text-muted-foreground">{payment.method}</TableCell>
                <TableCell>
                  <Badge variant="default" className="bg-green-500/15 text-green-700 hover:bg-green-500/25 border-green-500/20">
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="h-8 gap-2 text-muted-foreground hover:text-foreground">
                    <Download className="h-4 w-4" /> PDF
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
