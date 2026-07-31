import MotionDiv from "@/components/common/MotionDiv"
import { Navbar } from "@/components/shared/Navbar"
import { getAuthUser, logout } from "@/services/auth-service"
import type { ReactNode } from "react"

export default async function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  const { data: user } = await getAuthUser()

  return (
    <>
      <Navbar user={user!} logout={logout} />
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-linear-to-b from-background to-secondary/10 px-4 py-12 sm:px-6 lg:px-8">
        <MotionDiv>{children}</MotionDiv>
      </div>
    </>
  )
}
