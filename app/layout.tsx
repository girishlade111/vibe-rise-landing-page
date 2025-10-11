import type { ReactNode } from "react"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GlobalStyles } from "@/components/viberise/components/styles/global-styles"
import "@/styles/globals.css"
import { Suspense } from "react"

export const metadata = {
  title: "VibeRise",
  description: "Find your rise. Built with Next.js, Tailwind, and shadcn/ui.",
    generator: 'v0.app'
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-[100dvh] bg-black text-white antialiased">
        {/* Global CSS variables, tokens, and site-wide tweaks (e.g., cursor rules) */}
        <GlobalStyles />

        <Suspense fallback={null}>{children}</Suspense>

        {/* Observability */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
