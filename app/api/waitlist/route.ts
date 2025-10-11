import "server-only"
import { NextResponse } from "next/server"
import { createWaitlistStore, isValidEmail, normalizeEmail, type WaitlistRole } from "@/lib/waitlist-store"
import { isKVConfigured } from "@/lib/upstash"

export async function GET() {
  try {
    const store = createWaitlistStore()
    const count = await store.getCount()
    const backend = isKVConfigured() ? "kv" : "memory"
    return NextResponse.json({ ok: true, count, backend })
  } catch (err) {
    console.error("GET /api/waitlist error:", err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const email: unknown = data?.email
    const role: unknown = data?.role

    if (typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "invalid-email" }, { status: 400 })
    }
    if (role !== "investor" && role !== "talent" && role !== "supporter") {
      return NextResponse.json({ ok: false, error: "invalid-role" }, { status: 400 })
    }

    const store = createWaitlistStore()
    const normalized = normalizeEmail(email)
    const ts = Date.now()

    const { created, count } = await store.addIfNotExists({
      email: normalized,
      role: role as WaitlistRole,
      ts,
    })

    if (!created) {
      return NextResponse.json({ ok: true, duplicate: true, count }, { status: 409 })
    }
    return NextResponse.json({ ok: true, count }, { status: 201 })
  } catch (err) {
    console.error("POST /api/waitlist error:", err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
