"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RefreshCcw, AlertTriangle } from "lucide-react"
import { NeonBackground } from "@/components/viberise/components/visuals/neon-background"
import { FloatingCoins } from "@/components/viberise/components/visuals/floating-coins"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    console.error("App error:", error)
    const m = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(m.matches)
    const onChange = () => setReduced(m.matches)
    m.addEventListener("change", onChange)
    return () => m.removeEventListener("change", onChange)
  }, [error])

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-black text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <NeonBackground />
        {!reduced && <FloatingCoins reduced={reduced} />}
      </div>

      <div className="relative container mx-auto px-4 py-20 sm:py-28 md:py-36">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
            <AlertTriangle className="h-3.5 w-3.5 text-[var(--brand)]" />
            <span>{"Market glitch detected"}</span>
          </div>

          <h1 className="mt-6 text-[56px] leading-none font-extrabold tracking-tighter sm:text-[88px] md:text-[120px] text-[var(--brand)]">
            {"Error"}
          </h1>

          <p className="mt-4 max-w-xl text-lg text-white/70">
            {"Something broke while rendering this page. Try again, or head back to safety."}
          </p>

          {error?.digest && (
            <p className="mt-2 text-xs text-white/50">
              {"Error ID: "}
              <span className="font-mono text-white/70">{error.digest}</span>
            </p>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => reset()}
              className="bg-[var(--brand)] text-black hover:bg-[color:rgb(204,255,17,0.9)]"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              {"Try again"}
            </Button>
            <Link href="/" className="inline-flex">
              <Button variant="outline" className="border-white/15 bg-white/5 hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {"Back Home"}
              </Button>
            </Link>
            <Link href="/#waitlist" className="inline-flex">
              <Button variant="outline" className="border-white/15 bg-white/5 hover:bg-white/10">
                {"Join the Rise"}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent"
      />
    </main>
  )
}
