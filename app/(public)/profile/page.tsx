import { getAuthUser } from "@/services/auth-service"
import { redirect } from "next/navigation"
import { ProfileClient } from "./_components/ProfileClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Profile - OpenNest",
  description: "View and update your OpenNest profile information.",
}

export default async function ProfilePage() {
  const { data: user } = await getAuthUser()

  if (!user) {
    redirect("/login")
  }

  return <ProfileClient user={user} />
}
