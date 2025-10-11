"use client"

import * as React from "react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Star } from "lucide-react"

type Point = { t: string; price: number }

export interface MarketChartProps {
  data?: Point[]
  title?: string
  description?: string
}

/**
 * Robinhood-inspired market chart:
 * - Clean, minimal axes
 * - Dynamic green/red based on performance
 * - Hover updates the header price/changes
 * - Time range tabs (1D, 1W, 1M, 3M, 1Y, ALL)
 * - Crosshair-like tooltip and subtle grid
 */
export function MarketChart({
  data: externalData,
  title = "Vibe Token · VIBE",
  description = "Live price, performance, and intraday movement",
}: MarketChartProps) {
  // Time ranges
  type Range = "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL"

  // Seed datasets (illustrative)
  const dataSets = React.useMemo(() => {
    const d1: Point[] = [
      { t: "09:30", price: 1.74 },
      { t: "10:00", price: 1.79 },
      { t: "10:30", price: 1.71 },
      { t: "11:00", price: 1.84 },
      { t: "11:30", price: 1.88 },
      { t: "12:00", price: 1.86 },
      { t: "12:30", price: 1.92 },
      { t: "13:00", price: 1.96 },
      { t: "13:30", price: 1.93 },
      { t: "14:00", price: 2.02 },
      { t: "14:30", price: 2.08 },
      { t: "15:00", price: 2.04 },
      { t: "15:30", price: 2.11 },
      { t: "16:00", price: 2.09 },
    ]
    const d1w: Point[] = [
      { t: "Mon", price: 1.52 },
      { t: "Tue", price: 1.58 },
      { t: "Wed", price: 1.66 },
      { t: "Thu", price: 1.63 },
      { t: "Fri", price: 1.71 },
    ]
    const d1m: Point[] = [
      { t: "W1", price: 1.2 },
      { t: "W2", price: 1.34 },
      { t: "W3", price: 1.28 },
      { t: "W4", price: 1.56 },
    ]
    const d3m: Point[] = [
      { t: "May", price: 1.08 },
      { t: "Jun", price: 1.14 },
      { t: "Jul", price: 1.42 },
    ]
    const d1y: Point[] = [
      { t: "Aug", price: 0.62 },
      { t: "Oct", price: 0.84 },
      { t: "Dec", price: 0.9 },
      { t: "Feb", price: 1.14 },
      { t: "Apr", price: 1.26 },
      { t: "Jun", price: 1.36 },
      { t: "Aug", price: 1.7 },
    ]
    const dall: Point[] = [
      { t: "’21", price: 0.25 },
      { t: "’22", price: 0.38 },
      { t: "’23", price: 0.52 },
      { t: "’24", price: 0.86 },
      { t: "’25", price: 1.7 },
    ]
    return {
      "1D": d1,
      "1W": d1w,
      "1M": d1m,
      "3M": d3m,
      "1Y": d1y,
      ALL: dall,
    } as Record<Range, Point[]>
  }, [])

  const [range, setRange] = React.useState<Range>("1M")
  const baseData = externalData ?? dataSets[range]
  const [activeData, setActiveData] = React.useState<Point[]>(baseData)
  React.useEffect(() => {
    setActiveData(externalData ?? dataSets[range])
  }, [range, dataSets, externalData])

  // Header price and delta (updates on hover)
  const first = activeData[0]?.price ?? 0
  const last = activeData[activeData.length - 1]?.price ?? 0
  const [hoverPrice, setHoverPrice] = React.useState<number | null>(null)
  const [hoverLabel, setHoverLabel] = React.useState<string | null>(null)

  const current = hoverPrice ?? last
  const base = first || current
  const delta = current - base
  const pct = base ? (delta / base) * 100 : 0
  const isUp = delta >= 0

  const lineColor = isUp ? "#22c55e" : "#ef4444" // green/red
  const fillFrom = isUp ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)"
  const fillTo = isUp ? "rgba(34,197,94,0.06)" : "rgba(239,68,68,0.06)"

  const onMove = (e: any) => {
    const p = e?.activePayload?.[0]?.payload
    if (p) {
      setHoverPrice(p.price)
      setHoverLabel(p.t)
    }
  }
  const onLeave = () => {
    setHoverPrice(null)
    setHoverLabel(null)
  }

  return (
    <Card className="overflow-hidden border-black/10 bg-white/70 dark:border-white/10 dark:bg-black/40">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/70 ring-1 ring-black/10 dark:bg-white/10 dark:ring-white/10">
                <span className="text-base" aria-hidden>
                  {"📈"}
                </span>
              </span>
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2 text-black/60 hover:text-black hover:bg-black/5 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10"
            aria-label="Add to watchlist"
            title="Add to watchlist"
          >
            <Star className="h-4 w-4" />
          </button>
        </div>

        {/* Price header (updates on hover) */}
        <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <div className="text-3xl font-bold tabular-nums">
            {"$"}
            {current.toFixed(2)}
          </div>
          <div
            className={[
              "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
              isUp
                ? "bg-[rgba(34,197,94,0.12)] text-[color:rgb(22,163,74)] ring-1 ring-[rgba(34,197,94,0.25)]"
                : "bg-[rgba(239,68,68,0.12)] text-[color:rgb(220,38,38)] ring-1 ring-[rgba(239,68,68,0.25)]",
            ].join(" ")}
            aria-live="polite"
          >
            {isUp ? <TrendingUp className="mr-1 h-3.5 w-3.5" /> : <TrendingDown className="mr-1 h-3.5 w-3.5" />}
            {delta >= 0 ? "+" : "-"}
            {Math.abs(delta).toFixed(2)} {" ("}
            {delta >= 0 ? "+" : "-"}
            {Math.abs(pct).toFixed(2)}
            {"%)"}
            {hoverLabel ? ` · ${hoverLabel}` : null}
          </div>
        </div>

        {/* Time range tabs */}
        <div className="mt-3">
          <Tabs value={range} onValueChange={(v) => setRange(v as Range)}>
            <TabsList className="grid w-full grid-cols-6 bg-white/60 dark:bg-white/10">
              {(["1D", "1W", "1M", "3M", "1Y", "ALL"] as Range[]).map((r) => (
                <TabsTrigger
                  key={r}
                  value={r}
                  className="data-[state=active]:bg-[var(--brand)] data-[state=active]:text-black"
                >
                  {r}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <ChartContainer
          config={{
            price: {
              label: "Price",
              color: lineColor,
            },
          }}
          className="h-[280px] w-full sm:h-[300px] md:h-[320px]"
          // Inline style to inject dynamic CSS var for line color
          style={
            {
              "--color-price": lineColor,
            } as React.CSSProperties
          }
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={activeData}
              margin={{ top: 10, right: 12, left: 12, bottom: 0 }}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
            >
              <defs>
                <linearGradient id="priceFillDynamic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={fillFrom} />
                  <stop offset="100%" stopColor={fillTo} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="currentColor"
                className="text-black/5 dark:text-white/10"
                vertical={false}
              />
              <XAxis
                dataKey="t"
                tickMargin={8}
                tick={{ fill: "currentColor", opacity: 0.55, fontSize: 12 }}
                axisLine={{ stroke: "currentColor", opacity: 0.1 }}
                tickLine={{ stroke: "currentColor", opacity: 0.1 }}
                minTickGap={24}
              />
              <YAxis
                width={36}
                tickMargin={6}
                tickFormatter={(v) => "$" + Number(v).toFixed(2)}
                tick={{ fill: "currentColor", opacity: 0.55, fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                domain={["dataMin - 0.05", "dataMax + 0.05"]}
              />

              {/* Tooltip styled via shadcn wrapper; we still update header via onMouseMove */}
              <ChartTooltip
                cursor={{ stroke: "currentColor", strokeOpacity: 0.25 }}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    className="rounded-md bg-white/90 p-2 text-xs shadow-md ring-1 ring-black/10 backdrop-blur dark:bg-black/70 dark:ring-white/10"
                  />
                }
              />

              {/* Primary line with soft fill for area-like vibe */}
              <Line
                type="monotone"
                dataKey="price"
                stroke="var(--color-price)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
                fill="url(#priceFillDynamic)"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Context row */}
        <div className="mt-3 grid gap-2 text-xs text-black/70 dark:text-white/70 sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: lineColor, boxShadow: `0 0 8px ${lineColor}88` }}
            />
            <span>{range === "1D" ? "Today" : "Period"} performance</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-black/15 dark:bg-white/15" />
            <span>Market sentiment: illustrative</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-black/15 dark:bg-white/15" />
            <span>Data simulated for demo</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
