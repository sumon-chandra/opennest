import { getLandlordRentalRequests } from "../_actions/rental-requests"
import { LandlordRequestsClient } from "./_components/LandlordRequestsClient"

export default async function LandlordRequestsPage() {
  const { data: requests } = await getLandlordRentalRequests()

  return <LandlordRequestsClient initialRequests={requests || []} />
}
