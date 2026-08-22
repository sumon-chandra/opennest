"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background px-4">
      {/* Decorative floating shapes */}
      <motion.div
        className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-primary/10 blur-[100px]"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-chart-2/10 blur-[120px]"
        animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/3 top-1/3 h-40 w-40 rounded-full bg-chart-4/10 blur-[80px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Small floating geometric shapes */}
      <motion.div
        className="absolute left-[15%] top-[20%] h-4 w-4 rotate-45 rounded-sm border-2 border-primary/20"
        animate={{ rotate: [45, 225, 45], y: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[20%] top-[30%] h-3 w-3 rounded-full bg-chart-2/30"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[25%] left-[25%] h-5 w-5 rotate-12 rounded border-2 border-chart-4/20"
        animate={{ rotate: [12, 192, 12] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[35%] right-[15%] h-3 w-3 rotate-45 bg-primary/20"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mb-2"
        >
          <span className="bg-gradient-to-br from-primary via-chart-2 to-chart-3 bg-clip-text text-[10rem] font-black leading-none tracking-tighter text-transparent sm:text-[14rem]">
            404
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary via-chart-2 to-chart-3 bg-clip-text text-[10rem] font-black leading-none tracking-tighter text-transparent opacity-30 blur-2xl sm:text-[14rem]"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            404
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-3 text-2xl font-bold text-foreground sm:text-3xl"
        >
          Page Not Found
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 max-w-md text-base text-muted-foreground"
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <Link href="/">
            <Button className="gap-2 rounded-xl px-6 py-5 text-base">
              <Home size={18} />
              Back to Home
            </Button>
          </Link>
          <Link href="/properties">
            <Button
              variant="outline"
              className="gap-2 rounded-xl px-6 py-5 text-base"
            >
              <Search size={18} />
              Browse Properties
            </Button>
          </Link>
        </motion.div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8"
        >
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Go back to previous page
          </button>
        </motion.div>
      </div>
    </div>
  )
}
