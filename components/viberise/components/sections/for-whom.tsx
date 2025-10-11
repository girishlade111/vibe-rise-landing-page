"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { sectionReveal, popIn, fadeUp, staggerRow } from "@/components/viberise/utils/motion-presets"

export function ForWhom() {
  const items = [
    { title: "For Talents", desc: "Access capital without loans or middlemen." },
    { title: "For Investors", desc: "A new asset class with high upside potential." },
    { title: "For Fans", desc: "Back people you believe in — and share the upside." },
  ] as const

  const quotes = [
    {
      name: "Alex P.",
      role: "Indie Game Dev",
      quote: "I turned community belief into runway without giving up control.",
      img: "/indie-dev-portrait.png",
      init: "AP",
    },
    {
      name: "Dias",
      role: "Angel Investor",
      quote: "Backed 5 people early. Seeing measurable upside as they hit milestones.",
      img: "/thoughtful-investor.png",
      init: "DI",
    },
  ] as const

  return (
    <motion.section
      id="for-whom"
      className="border-t border-black/10 dark:border-white/10 vh-section"
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-20% 0px" }}
    >
      <div className="container mx-auto min-h-full px-4 flex items-center">
        <div className="w-full">
          <motion.h2 className="text-3xl md:text-4xl font-bold" variants={fadeUp}>
            {"Designed for Talents. Built for Investors."}
          </motion.h2>

          <motion.div className="mt-8 grid gap-6 md:grid-cols-3" variants={staggerRow(0.1)}>
            {items.map((it) => (
              <motion.div
                key={it.title}
                variants={popIn}
                whileHover={{ y: -2 }}
                className="rounded-2xl border border-black/10 bg-white/60 p-6 shadow-sm transition dark:border-white/10 dark:bg-black/40"
              >
                <h3 className="text-xl font-semibold">{it.title}</h3>
                <p className="mt-2 text-black/70 dark:text-white/70">{it.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="mt-10 grid gap-6 md:grid-cols-2" variants={staggerRow(0.15)}>
            {quotes.map((q) => (
              <motion.div key={q.name} variants={popIn} whileHover={{ y: -2 }}>
                <Card className="border-black/10 bg-white/60 dark:border-white/10 dark:bg-black/40">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={q.img || "/placeholder.svg"} alt={`${q.name} avatar`} />
                        <AvatarFallback>{q.init}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{q.name}</div>
                        <div className="text-xs text-black/60 dark:text-white/60">{q.role}</div>
                      </div>
                    </div>
                    <p className="mt-4 text-black/80 dark:text-white/80">&ldquo;{q.quote}&rdquo;</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
