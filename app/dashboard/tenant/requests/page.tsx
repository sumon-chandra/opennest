import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { myRentalRequests } from "@/app/dashboard/tenant/_actions/rental-requests"
import MotionDiv from "@/components/common/MotionDiv"
import RentalRequestsTable from "@/components/dashboard/tenant/RentalRequestsTable"

export default async function TenantRequests() {
  const { data: requests } = await myRentalRequests()

  return (
    <div className="space-y-6 p-6">
      <MotionDiv className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            My Rental Applications
          </h1>
          <p className="mt-2 text-muted-foreground">
            Track the status of your property rental applications.
          </p>
        </div>
        <Button>
          <Link href="/properties">Find More Properties</Link>
        </Button>
      </MotionDiv>

      <div className="flex max-w-sm items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search applications..."
            className="pl-8"
          />
        </div>
      </div>

      <RentalRequestsTable requests={requests || []} />
    </div>
  )
}
