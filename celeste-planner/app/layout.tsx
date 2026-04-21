import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Celesté - Bespoke Event Curation",
  description: "Plan your perfect event with Celesté - a stylish, modern event planning platform powered by Firebase.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 antialiased`}
      >
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
