"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ProgressBar } from "@/components/common/ProgressBar"
import { Toaster } from "@/components/ui/toast"
import { ThemeProvider } from "@/components/theme-provider"

const queryClient = new QueryClient()

export default function AppProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ProgressBar />
        <Toaster />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}

