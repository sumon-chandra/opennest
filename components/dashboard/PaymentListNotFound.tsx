import { CreditCard } from "lucide-react"
import MotionDiv from "../common/MotionDiv"

export const PaymentListNotFound = ({
  title,
  description,
}: {
  title: string
  description?: string
}) => {
  return (
    <MotionDiv className="flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card py-12 text-center">
      <CreditCard className="mb-2 h-8 w-8 text-muted-foreground" />
      <p className="text-base text-foreground">{title}</p>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      )}
    </MotionDiv>
  )
}
