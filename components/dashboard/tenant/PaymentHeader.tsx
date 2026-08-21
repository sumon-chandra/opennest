import MotionDiv from "@/components/common/MotionDiv"
import { Button } from "@/components/ui/button"
import { CreditCard } from "lucide-react"

const PaymentHeader = () => {
  return (
    <MotionDiv className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Payments
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your rent payments and view payment history.
        </p>
      </div>
      <Button className="gap-2">
        <CreditCard className="h-4 w-4" /> Make a Payment
      </Button>
    </MotionDiv>
  )
}

export default PaymentHeader
