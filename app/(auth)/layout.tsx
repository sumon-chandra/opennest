import MotionDiv from "@/components/common/MotionDiv"
import { Navbar } from "@/components/shared/Navbar"
import type { ReactNode } from "react"

export default async function AuthLayout({
  children,
}: {
  children: ReactNode
}) {

  return (
    <>
      <Navbar />
      <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-background to-secondary/20" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="absolute -left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-secondary/30 blur-[120px]" />
        
        <MotionDiv className="relative z-10 w-full max-w-md">{children}</MotionDiv>
      </div>
    </>
  )
}
