import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

// Font configuration
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-helvetica',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "CHUNG Workspace | A Fun Workspace with Vietnamese Soul",
  description: "CHUNG is a vibrant, culturally connected, and community-driven coworking space in Vietnam. Join us for a workspace filled with sunlights, arts, and Vietnamese soul.",
  generator: 'Next.js',
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'