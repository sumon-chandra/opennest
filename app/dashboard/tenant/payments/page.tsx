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
import PaymentHeader from "@/components/dashboard/tenant/PaymentHeader"
import PaymentHistoryTable from "@/components/dashboard/tenant/PaymentHistoryTable"
import { getTenantPaymentHistory } from "../_actions/paymnet-histories"

export default async function TenantPayments() {
  const { data: payments } = await getTenantPaymentHistory()

  return (
    <div className="space-y-6 p-6">
      <PaymentHeader />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1 flex flex-col justify-center rounded-xl border bg-card p-6 shadow-xs md:col-span-2 lg:col-span-2">
          <div className="mb-2 flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="font-medium">Next Payment Due</span>
          </div>
          <div className="text-3xl font-bold">September 1, 2026</div>
          <div className="mt-1 text-xl">$4,500.00</div>
          <p className="mt-4 text-sm text-muted-foreground">
            Autopay is enabled for your Visa ending in 4242.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center rounded-xl border border-primary/20 bg-card bg-primary/5 p-6 text-center shadow-xs">
          <CheckCircle2 className="mb-2 h-10 w-10 text-green-500" />
          <h3 className="text-lg font-semibold">All Caught Up!</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            You have no outstanding balances.
          </p>
        </div>
      </div>

      <div className="rounded-md border bg-card p-4">
        <h3 className="mb-4 text-lg font-semibold">Payment History</h3>
        <PaymentHistoryTable payments={payments || []} />
      </div>
    </div>
  )
}
