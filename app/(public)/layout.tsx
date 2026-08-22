import MotionDiv from "@/components/common/MotionDiv"
import { Footer } from "@/components/shared/Footer"
import { Navbar } from "@/components/shared/Navbar"
import { getAuthUser, logout } from "@/services/auth-service"
import type { ReactNode } from "react"

export default async function PublicLayout({
  children,
}: {
  children: ReactNode
}) {
  const { data } = await getAuthUser()

  return (
    <>
      <Navbar user={data} logout={logout} />
      <MotionDiv className="flex min-h-svh flex-col">{children}</MotionDiv>
      <Footer />
    </>
  )
}
