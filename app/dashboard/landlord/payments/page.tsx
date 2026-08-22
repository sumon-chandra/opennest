import { Download, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PaymentStats from "@/components/dashboard/landlord/PaymentStats"
import MotionDiv from "@/components/common/MotionDiv"
import PaymentHistoryTable from "@/components/dashboard/landlord/PaymentHistoryTable"
import { getPaymentList } from "../_actions/get-payment-list"

// Mock Data
// const payments = [
//   {
//     id: "PAY-1001",
//     tenant: "John Doe",
//     property: "Luxury Penthouse Manhattan",
//     amount: 4500,
//     date: "2026-08-01",
//     status: "Completed",
//   },
//   {
//     id: "PAY-1002",
//     tenant: "Jane Smith",
//     property: "Beachfront Villa",
//     amount: 3200,
//     date: "2026-08-02",
//     status: "Completed",
//   },
//   {
//     id: "PAY-1003",
//     tenant: "Mike Johnson",
//     property: "Mountain Cabin",
//     amount: 1800,
//     date: "2026-08-05",
//     status: "Pending",
//   },
//   {
//     id: "PAY-1004",
//     tenant: "Emily Chen",
//     property: "City Loft Downtown",
//     amount: 2100,
//     date: "2026-07-28",
//     status: "Failed",
//   },
//   {
//     id: "PAY-1005",
//     tenant: "Sarah Connor",
//     property: "Luxury Penthouse Manhattan",
//     amount: 4500,
//     date: "2026-07-01",
//     status: "Completed",
//   },
// ]

export default async function LandlordPayments() {
  const { data: payments } = await getPaymentList()

  return (
    <div className="space-y-6 p-6">
      <MotionDiv className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Payment History
          </h1>
          <p className="mt-2 text-muted-foreground">
            Track rent payments and generate invoices.
          </p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </MotionDiv>

      {/* Summary Stats */}
      <PaymentStats payments={payments!} />

      {/* Table Section */}
      <div className="flex max-w-sm items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search payments by tenant or property..."
            className="pl-8"
          />
        </div>
      </div>

      <PaymentHistoryTable payments={payments!} />
    </div>
  )
}
