"use client"

import { motion } from "framer-motion"
import { Download, Search, CheckCircle2, XCircle, Clock } from "lucide-react"
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

// Mock Data
const payments = [
  {
    id: "PAY-1001",
    tenant: "John Doe",
    property: "Luxury Penthouse Manhattan",
    amount: 4500,
    date: "2026-08-01",
    status: "Completed",
  },
  {
    id: "PAY-1002",
    tenant: "Jane Smith",
    property: "Beachfront Villa",
    amount: 3200,
    date: "2026-08-02",
    status: "Completed",
  },
  {
    id: "PAY-1003",
    tenant: "Mike Johnson",
    property: "Mountain Cabin",
    amount: 1800,
    date: "2026-08-05",
    status: "Pending",
  },
  {
    id: "PAY-1004",
    tenant: "Emily Chen",
    property: "City Loft Downtown",
    amount: 2100,
    date: "2026-07-28",
    status: "Failed",
  },
  {
    id: "PAY-1005",
    tenant: "Sarah Connor",
    property: "Luxury Penthouse Manhattan",
    amount: 4500,
    date: "2026-07-01",
    status: "Completed",
  },
]

export default function LandlordPayments() {
  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Payment History
          </h1>
          <p className="text-muted-foreground mt-2">
            Track rent payments and generate invoices.
          </p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </motion.div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-6 shadow-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <h3 className="text-sm font-medium">Collected This Month</h3>
          </div>
          <div className="mt-4 text-3xl font-bold">$7,700</div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-amber-500" />
            <h3 className="text-sm font-medium">Pending Payments</h3>
          </div>
          <div className="mt-4 text-3xl font-bold">$1,800</div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <XCircle className="h-4 w-4 text-destructive" />
            <h3 className="text-sm font-medium">Failed / Overdue</h3>
          </div>
          <div className="mt-4 text-3xl font-bold">$2,100</div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search payments by tenant or property..."
            className="pl-8"
          />
        </div>
      </div>

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
                <TableCell>{payment.date}</TableCell>
                <TableCell>
                  <div className="font-medium">{payment.tenant}</div>
                  <div className="text-xs text-muted-foreground">
                    {payment.property}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  ${payment.amount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      payment.status === "Completed"
                        ? "default"
                        : payment.status === "Failed"
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
    </div>
  )
}
