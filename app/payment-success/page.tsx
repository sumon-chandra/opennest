import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ paymentId?: string }>
}) {
  const { paymentId } = await searchParams

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border bg-card p-8 text-center shadow-sm">
        <div className="flex justify-center">
          <CheckCircle className="h-20 w-20 text-green-500" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Payment Successful!</h1>
          <p className="text-muted-foreground">
            Your rental request payment has been processed successfully.
          </p>
          {paymentId && (
            <p className="mt-4 rounded bg-secondary/50 p-2 font-mono text-sm text-muted-foreground">
              Payment ID: {paymentId}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3 pt-4">
          <Button className="w-full">
            <Link href="/dashboard/tenant/requests">View Rental Requests</Link>
          </Button>
          <Button variant="outline" className="w-full">
            <Link href="/dashboard/tenant">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
