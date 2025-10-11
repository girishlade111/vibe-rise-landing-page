import type * as React from "react"
import { cn } from "@/lib/utils"

export interface BrandMarkProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  decorative?: boolean
  title?: string
}

/**
 * VibeRise Neon Monogram (VR)
 * - Vector, retina-crisp at any size
 * - Uses currentColor for strokes so it follows text color (we color it with --brand)
 * - Layered neon ring + soft glass highlight + elegant "V→R" fusion path
 * - No JS, minimal SVG filters for glow, great in dark and light themes
 */
export function BrandMark({
  size = 28,
  decorative = false,
  title = "VibeRise logo",
  className,
  ...props
}: BrandMarkProps) {
  const ariaProps = decorative ? { "aria-hidden": true } : { role: "img", "aria-label": title, focusable: false }

  // viewBox designed at 128x128 for detail; scaled via width/height
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" className={cn("block", className)} {...ariaProps} {...props}>
      <defs>
        {/* Neon stroke gradient */}
        <linearGradient id="vr-neon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.65" />
        </linearGradient>

        {/* Inner subtle glass shine */}
        <radialGradient id="vr-shine" cx="35%" cy="22%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        {/* Outer soft glow */}
        <filter id="vr-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="g1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="4.6" result="g2" />
          <feMerge>
            <feMergeNode in="g2" />
            <feMergeNode in="g1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Bevel-ish inner light ring */}
        <linearGradient id="vr-ring-lite" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Background plate: subtle glassy inset so mark feels premium but adapts to theme */}
      <g>
        <rect x="10" y="10" width="108" height="108" rx="28" fill="url(#vr-shine)" />
      </g>

      {/* Outer neon ring */}
      <g filter="url(#vr-glow)" opacity="0.98">
        <rect x="14" y="14" width="100" height="100" rx="26" fill="none" stroke="url(#vr-neon)" strokeWidth="3.5" />
      </g>

      {/* Inner fine ring for depth */}
      <rect
        x="18"
        y="18"
        width="92"
        height="92"
        rx="24"
        fill="none"
        stroke="url(#vr-ring-lite)"
        strokeWidth="1.5"
        opacity="0.7"
      />

      {/* Monogram: V → R fusion */}
      <g filter="url(#vr-glow)">
        {/* V: from left shoulder to base to right shoulder */}
        <path
          d="M34 42 L64 92 L94 42"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* R-curve: arc sweeping from center up-right, then a short leg to hint the R */}
        <path
          d="M64 56
             A 20 20 0 0 1 92 56
             M92 56
             L92 86"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.95"
        />
      </g>

      {/* Soft highlight streaks on strokes for a premium finish */}
      <g opacity="0.55">
        <path
          d="M36 44 L64 88 L92 44"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.5"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M66 56
             A 18 18 0 0 1 90 56"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.45"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
