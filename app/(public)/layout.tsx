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
  const { data: user } = await getAuthUser()

  return (
    <>
      <Navbar user={user!} logout={logout} />
      <div className="container mx-auto flex min-h-svh flex-col gap-6 px-4 py-6">
        <MotionDiv>{children}</MotionDiv>
      </div>
      <Footer />
    </>
  )
}
