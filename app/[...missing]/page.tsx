import { notFound } from "next/navigation"

export default function MissingCatchAll() {
  // Force Next.js to show app/not-found.tsx for any unmatched route
  notFound()
}
