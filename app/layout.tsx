import type { Metadata, Viewport } from "next"
import "./globals.css"
import { ProgressBar } from "@/components/common/ProgressBar"
import { Toaster } from "@/components/ui/toast"
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query"
import AppProviders from "@/components/AppProviders"

const queryClient = new QueryClient()

export const metadata: Metadata = {
  title: "OpenNest - Premium Property Rentals",
  description:
    "Discover and rent premium properties worldwide. Find your perfect rental home on OpenNest.",
  generator: "v0.app",
  openGraph: {
    title: "OpenNest - Premium Property Rentals",
    description: "Discover and rent premium properties worldwide",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased">
        <ProgressBar />
        <Toaster />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
