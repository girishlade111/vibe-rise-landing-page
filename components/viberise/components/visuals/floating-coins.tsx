"use client"

import * as React from "react"

export interface FloatingCoinsProps {
  reduced: boolean
}

/**
 * People “bubbles”:
 * - Diverse people-with-profession emojis
 * - No rotation (as requested)
 * - Bubble-style motion: slow upward rise + gentle horizontal sway + soft pulse
 * - Glass bubble with neon #CCFF11 ring
 * - Motion-safety with prefers-reduced-motion
 */
export function FloatingCoins({ reduced }: FloatingCoinsProps) {
  // Curated people-with-profession emoji set
  const PEOPLE = React.useMemo(
    () => [
      "🧑‍💻",
      "👩‍🎨",
      "👨‍🔬",
      "👩‍⚕️",
      "👨‍🍳",
      "👩‍🏫",
      "👨‍✈️",
      "👩‍🚀",
      "👷",
      "👮",
      "🧑‍🌾",
      "🧑‍🔧",
      "🧑‍🎤",
      "🧑‍⚖️",
      "🧑‍💼",
      "🧑‍🚒",
      "🧑‍✈️",
      "🧑‍🚀",
    ],
    [],
  )

  type Bubble = {
    id: number
    emoji: string
    size: number // in px
    left: number // 0..100 %
    delay: number // seconds
    riseDur: number // seconds
    swayDur: number // seconds
    pulseDur: number // seconds
    amp: number // sway amplitude in px
    depth: number // 0.35..1.0 opacity and subtle z-index
  }

  const bubbles: Bubble[] = React.useMemo(() => {
    const count = reduced ? 12 : 26
    const arr: Bubble[] = []
    for (let i = 0; i < count; i++) {
      const emoji = PEOPLE[i % PEOPLE.length]
      const size = 22 + Math.round(Math.random() * 28) // 22-50
      const left = Math.round(Math.random() * 100) // %
      const delay = Math.random() * 8 // 0-8s
      const riseDur = 18 + Math.random() * 24 // 18-42s slow float up
      const swayDur = 3 + Math.random() * 4 // 3-7s gentle sway
      const pulseDur = 2.2 + Math.random() * 1.6 // 2.2-3.8s soft pulse
      const amp = 6 + Math.random() * 18 // 6-24px sway amplitude
      const depth = 0.35 + Math.random() * 0.65 // 0.35-1.0
      arr.push({ id: i, emoji, size, left, delay, riseDur, swayDur, pulseDur, amp, depth })
    }
    return arr
  }, [PEOPLE, reduced])

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="bubble"
          style={
            {
              left: `${b.left}%`,
              bottom: "-12vh",
              fontSize: `${b.size}px`,
              opacity: Math.min(1, b.depth * 0.95),
              zIndex: Math.round(b.depth * 100),
              animationDelay: `${b.delay}s`,
              // custom CSS vars per bubble
              "--rise-dur": `${b.riseDur}s`,
            } as React.CSSProperties
          }
        >
          <span
            className="bubble-sway"
            style={
              {
                "--amp": `${b.amp}px`,
                "--sway-dur": `${b.swayDur}s`,
              } as React.CSSProperties
            }
          >
            <span
              className="bubble-face"
              style={
                {
                  "--pulse-dur": `${b.pulseDur}s`,
                } as React.CSSProperties
              }
            >
              <span className="bubble-emoji">{b.emoji}</span>
            </span>
          </span>
        </span>
      ))}

      <style jsx>{`
        :root {
          --brand: #CCFF11;
        }

        /* Container bubble rises up the viewport and loops */
        .bubble {
          position: absolute;
          transform: translate(-50%, 0);
          will-change: transform, opacity, filter;
          animation: rise var(--rise-dur) linear infinite;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }

        /* Sway horizontally back and forth */
        .bubble-sway {
          display: inline-block;
          will-change: transform;
          animation: sway var(--sway-dur) ease-in-out infinite alternate;
        }

        /* Glassy bubble face with neon ring and subtle shine */
        .bubble-face {
          position: relative;
          display: inline-block;
          width: 1em;
          height: 1em;
          padding: 0.35em;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.72);
          color: #000;
          border: 2px solid rgba(204, 255, 17, 0.55);
          box-shadow:
            0 10px 30px rgba(204, 255, 17, 0.2),
            0 0 14px rgba(204, 255, 17, 0.25);
          backdrop-filter: blur(8px) saturate(120%);
          will-change: transform, box-shadow;
          animation: pulse var(--pulse-dur) ease-in-out infinite;
        }
        :global(html.dark) .bubble-face {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border-color: rgba(204, 255, 17, 0.5);
          box-shadow:
            0 10px 28px rgba(204, 255, 17, 0.15),
            0 0 12px rgba(204, 255, 17, 0.22);
        }

        /* Gloss highlight */
        .bubble-face::before {
          content: "";
          position: absolute;
          top: 6%;
          left: 12%;
          width: 58%;
          height: 26%;
          border-radius: 50%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0));
          filter: blur(1.8px);
          pointer-events: none;
        }

        /* Inner glow pulse */
        .bubble-face::after {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          box-shadow:
            inset 0 0 16px rgba(204, 255, 17, 0.22),
            0 0 18px rgba(204, 255, 17, 0.18);
          pointer-events: none;
        }

        .bubble-emoji {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) translateZ(0);
          display: block;
          line-height: 1;
          font-size: 0.72em; /* scale emoji relative to the bubble face */
          text-align: center;
          -webkit-font-smoothing: antialiased;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.12));
          pointer-events: none;
        }

        /* Keyframes */
        @keyframes rise {
          0% {
            transform: translate(-50%, 0);
          }
          100% {
            transform: translate(-50%, -120vh);
          }
        }

        @keyframes sway {
          0% {
            transform: translateX(calc(-1 * var(--amp, 12px)));
          }
          100% {
            transform: translateX(var(--amp, 12px));
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.06);
          }
        }

        /* Motion-safety */
        @media (prefers-reduced-motion: reduce) {
          .bubble,
          .bubble-sway,
          .bubble-face {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
