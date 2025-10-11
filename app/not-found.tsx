"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Sparkles } from "lucide-react"
import { NeonBackground } from "@/components/viberise/components/visuals/neon-background"
import { FloatingCoins } from "@/components/viberise/components/visuals/floating-coins"
import * as React from "react"

export default function NotFound() {
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(m.matches)
    const onChange = () => setReduced(m.matches)
    m.addEventListener("change", onChange)
    return () => m.removeEventListener("change", onChange)
  }, [])

  return (
    <main className="relative grid min-h-[100dvh] place-items-center overflow-hidden bg-black text-white">
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <NeonBackground />
        {!reduced && <FloatingCoins reduced={reduced} />}
      </div>

      {/* Centered content */}
      <div className="relative z-10 w-full px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-[var(--brand)]" />
            <span>{"The vibe slipped through a crack in the market"}</span>
          </div>

          <h1 className="mt-6 text-[64px] leading-none font-extrabold tracking-tighter sm:text-[96px] md:text-[140px] text-[var(--brand)]">
            {"404"}
          </h1>

          <p className="mt-4 text-lg text-white/70">{"We couldn’t find that page. Let’s get you back to the rise."}</p>

          {/* CTA row */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {/* Primary: Back Home */}
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto min-w-[160px] h-11 rounded-full px-5 
                         bg-[var(--brand)] text-black 
                         shadow-md shadow-[rgba(204,255,17,0.35)] 
                         ring-1 ring-[rgba(204,255,17,0.55)]
                         hover:bg-[color:rgba(204,255,17,0.9)] 
                         transition-all"
            >
              <Link href="/" aria-label="Go back to homepage" className="inline-flex items-center justify-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {"Back Home"}
              </Link>
            </Button>

            {/* Secondary: Join the Rise */}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-w-[160px] h-11 rounded-full px-5 
                         border-white/30 text-white 
                         bg-white/10 hover:bg-white/15 
                         backdrop-blur-md
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-black
                         transition-all"
            >
              <Link
                href="/#waitlist"
                aria-label="Jump to waitlist section"
                className="inline-flex items-center justify-center"
              >
                {"Join the Rise"}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent"
      />
    </main>
  )
}
