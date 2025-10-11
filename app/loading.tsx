"use client"

import { BrandMark } from "@/components/viberise/components/brand/brand-mark"

export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-live="polite"
      className="relative grid min-h-[100dvh] place-items-center overflow-hidden bg-white text-black dark:bg-black dark:text-white"
    >
      {/* Background brand glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute -inset-40 opacity-80 blur-3xl"
          style={{
            background:
              "radial-gradient(40% 30% at 20% 20%, rgba(204,255,17,0.20), transparent 60%), radial-gradient(40% 30% at 80% 30%, rgba(204,255,17,0.16), transparent 60%), radial-gradient(40% 30% at 50% 80%, rgba(204,255,17,0.12), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(0,0,0,0.04),transparent_60%)] dark:bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.04),transparent_60%)]" />
      </div>

      {/* Creative Spinner */}
      <div className="relative h-64 w-64">
        {/* Soft scan beam */}
        <div aria-hidden className="absolute inset-0">
          <div className="scanner pointer-events-none absolute left-0 right-0 top-6 h-16" />
        </div>

        {/* Core badge with brand mark */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/80 text-black shadow-xl ring-2 ring-[rgba(204,255,17,0.55)] backdrop-blur dark:bg-white/10 dark:text-white">
            <BrandMark size={24} className="text-[var(--brand)]" decorative />
          </div>
        </div>

        {/* Rotating neon rings */}
        <div className="absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2">
          <div className="ring ring-1" />
        </div>
        <div className="absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2">
          <div className="ring ring-2" />
        </div>

        {/* Orbiting “profession coins” */}
        <div className="orbit orbit-1" aria-hidden>
          <span className="token">🧑‍💻</span>
        </div>
        <div className="orbit orbit-2" aria-hidden>
          <span className="token">🎤</span>
        </div>
        <div className="orbit orbit-3" aria-hidden>
          <span className="token">🎨</span>
        </div>
        <div className="orbit orbit-4" aria-hidden>
          <span className="token">📈</span>
        </div>
        <div className="orbit orbit-5" aria-hidden>
          <span className="token">🎧</span>
        </div>
      </div>

      {/* Loading copy */}
      <p className="mt-8 text-center text-sm text-black/70 dark:text-white/70">
        <span className="inline-flex items-center gap-2">
          <span className="pulse-dot" />
          {"Tuning the vibe..."}
        </span>
      </p>

      {/* Accessibility helper */}
      <span className="sr-only">Loading content...</span>

      <style jsx>{`
        :root {
          --brand: #CCFF11;
        }

        /* Rings */
        .ring {
          width: 220px;
          height: 220px;
          border-radius: 9999px;
          border: 2px solid rgba(204, 255, 17, 0.35);
          box-shadow: 0 0 28px rgba(204, 255, 17, 0.25), inset 0 0 20px rgba(204, 255, 17, 0.15);
          position: relative;
          mask-image: radial-gradient(circle, transparent 42%, black 43%); /* donut */
        }
        .ring-1 {
          animation: spin 6s linear infinite;
          border-left-color: transparent;
        }
        .ring-2 {
          width: 260px;
          height: 260px;
          border-color: rgba(204, 255, 17, 0.25);
          border-right-color: transparent;
          animation: spinReverse 10s linear infinite;
          box-shadow: 0 0 36px rgba(204, 255, 17, 0.22), inset 0 0 28px rgba(204, 255, 17, 0.12);
        }

        /* Orbits */
        .orbit {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 9999px;
          pointer-events: none;
        }
        .orbit .token {
          display: inline-grid;
          place-items: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.7);
          color: #000;
          border-radius: 9999px;
          box-shadow: 0 0 14px rgba(204, 255, 17, 0.35);
          border: 2px solid rgba(204, 255, 17, 0.45);
          transform: translateX(var(--r));
          backdrop-filter: blur(6px);
        }
        :global(html.dark) .orbit .token {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
        }

        .orbit-1 {
          width: 200px;
          height: 200px;
          animation: spin 7s linear infinite;
        }
        .orbit-1 .token {
          --r: 100px;
          animation: bob 2.2s ease-in-out infinite;
        }

        .orbit-2 {
          width: 260px;
          height: 120px;
          animation: spinReverse 9s linear infinite;
        }
        .orbit-2 .token {
          --r: 130px;
          animation: bob 2.8s ease-in-out infinite 0.2s;
        }

        .orbit-3 {
          width: 150px;
          height: 260px;
          animation: spin 11s linear infinite;
        }
        .orbit-3 .token {
          --r: 75px;
          animation: bob 2.6s ease-in-out infinite 0.4s;
        }

        .orbit-4 {
          width: 300px;
          height: 180px;
          animation: spinReverse 13s linear infinite;
        }
        .orbit-4 .token {
          --r: 150px;
          animation: bob 3.2s ease-in-out infinite 0.1s;
        }

        .orbit-5 {
          width: 220px;
          height: 220px;
          animation: spin 8.5s linear infinite;
        }
        .orbit-5 .token {
          --r: 110px;
          animation: bob 2.4s ease-in-out infinite 0.3s;
        }

        /* Scanline */
        .scanner {
          background: radial-gradient(60% 100% at 50% 0%, rgba(204, 255, 17, 0.25), rgba(204, 255, 17, 0) 70%);
          filter: blur(8px);
          animation: sweep 5.6s ease-in-out infinite;
        }

        /* Micro interactions */
        .pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: var(--brand);
          box-shadow: 0 0 10px rgba(204, 255, 17, 0.8);
          display: inline-block;
          animation: pulse 1.4s ease-in-out infinite;
        }

        /* Keyframes */
        @keyframes spin {
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        @keyframes spinReverse {
          to {
            transform: translate(-50%, -50%) rotate(-360deg);
          }
        }
        @keyframes bob {
          0%,
          100% {
            transform: translateX(var(--r)) translateY(0);
          }
          50% {
            transform: translateX(calc(var(--r) + 4px)) translateY(-6px);
          }
        }
        @keyframes sweep {
          0% {
            transform: translateY(0);
            opacity: 0.6;
          }
          50% {
            transform: translateY(40vh);
            opacity: 0.9;
          }
          100% {
            transform: translateY(0);
            opacity: 0.6;
          }
        }
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 10px rgba(204, 255, 17, 0.8);
          }
          50% {
            transform: scale(1.25);
            box-shadow: 0 0 20px rgba(204, 255, 17, 0.9);
          }
        }

        /* Motion-safety */
        @media (prefers-reduced-motion: reduce) {
          .ring-1,
          .ring-2,
          .orbit-1,
          .orbit-2,
          .orbit-3,
          .orbit-4,
          .orbit-5,
          .scanner,
          .pulse-dot {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  )
}
