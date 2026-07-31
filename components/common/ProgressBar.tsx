"use client"

import { Suspense, useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"

function ProgressBarContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    const timeout = setTimeout(() => {
      setProgress(10)
      setIsVisible(true)

      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) return prev + Math.random() * 30
          return prev
        })
      }, 200)
    }, 0)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [pathname, searchParams])

  useEffect(() => {
    // Complete progress when page loads
    const completeTimer = setTimeout(() => {
      setProgress(100)
    }, 0)

    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 500)

    return () => {
      clearTimeout(completeTimer)
      clearTimeout(hideTimer)
    }
  }, [pathname])

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: Math.min(progress / 100, 1) }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`fixed top-0 left-0 z-50 h-1 origin-left bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 ${
        !isVisible && progress === 100 ? "opacity-0" : "opacity-100"
      }`}
      style={{
        width: "100%",
        boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
      }}
    />
  )
}

export function ProgressBar() {
  return (
    <Suspense fallback={null}>
      <ProgressBarContent />
    </Suspense>
  )
}
