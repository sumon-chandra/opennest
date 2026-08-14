import type { Metadata, Viewport } from "next"
import { ProgressBar } from "@/components/common/ProgressBar"
import { Toaster } from "@/components/ui/toast"
import AppProviders from "@/components/AppProviders"
import "./globals.css"
import { Outfit } from "next/font/google"

const fontSans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
})

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
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className={`${fontSans.variable} antialiased`}>
        <ProgressBar />
        <Toaster />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
