import { LandlordPaymentHistory } from "@/types/payment"
import { CheckCircle2, Clock, CalendarDays } from "lucide-react"

export default function PaymentStats({
  payments,
}: {
  payments: LandlordPaymentHistory[]
}) {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  const totalCollected = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((acc, p) => acc + Number(p.amount), 0)

  const pendingPayments = payments
    .filter((p) => p.status === "PENDING")
    .reduce((acc, p) => acc + Number(p.amount), 0)

  const last30DaysCollection = payments
    .filter(
      (p) =>
        p.status === "COMPLETED" &&
        new Date(p.paidAt || p.createdAt) >= thirtyDaysAgo
    )
    .reduce((acc, p) => acc + Number(p.amount), 0)

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border bg-card p-6 shadow-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <h3 className="text-sm font-medium">Total Collected</h3>
        </div>
        <div className="mt-4 text-3xl font-bold">
          ৳{totalCollected.toLocaleString()}
        </div>
      </div>
      <div className="rounded-xl border bg-card p-6 shadow-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4 text-amber-500" />
          <h3 className="text-sm font-medium">Pending Payments</h3>
        </div>
        <div className="mt-4 text-3xl font-bold">
          ৳{pendingPayments.toLocaleString()}
        </div>
      </div>
      <div className="rounded-xl border bg-card p-6 shadow-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarDays className="h-4 w-4 text-blue-500" />
          <h3 className="text-sm font-medium">Last 30 Days</h3>
        </div>
        <div className="mt-4 text-3xl font-bold">
          ৳{last30DaysCollection.toLocaleString()}
        </div>
      </div>
    </div>
  )
}
