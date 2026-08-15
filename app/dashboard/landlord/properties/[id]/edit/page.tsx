import { apiFetch } from "../../../../../../utils/apiFetch";
import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import { ApiResponse } from "@/types"
import { Property } from "@/types/property"
import { EditPropertyForm } from "./_components/EditPropertyForm"

export const metadata = {
  title: "Edit Property | OpenNest Landlord",
  description: "Edit your property listing on OpenNest.",
}

interface EditPropertyPageProps {
  params: Promise<{ id: string }>
}

async function getProperty(id: string): Promise<Property | null> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value || null

  const res = await apiFetch(
    `properties/${id}`,
    {
      headers: accessToken
        ? { Cookie: `accessToken=${accessToken}` }
        : {},
      cache: "no-store",
    },
  )

  if (!res.ok) return null

  const result = (await res.json()) as ApiResponse<Property>
  return result.data
}

export default async function EditPropertyPage({
  params,
}: EditPropertyPageProps) {
  const { id } = await params
  const property = await getProperty(id)

  if (!property) {
    notFound()
  }

  return <EditPropertyForm property={property} />
}
