"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { journeyEdges, journeyMoments, type JourneyMoment } from "@/lib/xa-data"
import { Modal } from "./modal"

interface Star {
  cx: number
  cy: number
  r: number
  delay: number
  dur: number
  layer: "far" | "mid" | "near"
}

export function JourneySection() {
  const [open, setOpen] = useState<JourneyMoment | null>(null)
  const skyRef = useRef<HTMLDivElement>(null)
  const [shootingKey, setShootingKey] = useState(0)
  const [shootingProps, setShootingProps] = useState({
    top: 20,
    left: 10,
    dx: 700,
    dy: 250,
    angle: -22,
  })

  // Generate static star field (deterministic per mount)
  const stars = useMemo<Star[]>(() => {
    const list: Star[] = []
    // Far layer (smallest, dimmest)
    for (let i = 0; i < 80; i++) {
      list.push({
        cx: Math.random() * 100,
        cy: Math.random() * 100,
        r: 0.4 + Math.random() * 0.5,
        delay: Math.random() * 4,
        dur: 3 + Math.random() * 4,
        layer: "far",
      })
    }
    for (let i = 0; i < 45; i++) {
      list.push({
        cx: Math.random() * 100,
        cy: Math.random() * 100,
        r: 0.7 + Math.random() * 0.7,
        delay: Math.random() * 4,
        dur: 2.5 + Math.random() * 3,
        layer: "mid",
      })
    }
    for (let i = 0; i < 18; i++) {
      list.push({
        cx: Math.random() * 100,
        cy: Math.random() * 100,
        r: 1 + Math.random() * 1.2,
        delay: Math.random() * 3,
        dur: 2 + Math.random() * 2.5,
        layer: "near",
      })
    }
    return list
  }, [])

  // Trigger shooting stars at random intervals
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const fire = () => {
      const fromTop = Math.random() < 0.5
      setShootingProps({
        top: fromTop ? Math.random() * 30 : Math.random() * 60 + 10,
        left: Math.random() * 60,
        dx: 600 + Math.random() * 300,
        dy: 200 + Math.random() * 200,
        angle: -15 - Math.random() * 20,
      })
      setShootingKey((k) => k + 1)
      timer = setTimeout(fire, 5000 + Math.random() * 7000)
    }
    timer = setTimeout(fire, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="journey"
      className="relative min-h-screen px-6 py-24 flex flex-col items-center justify-start"
      style={{
        background:
          "radial-gradient(1100px 700px at 25% 25%, rgba(60,80,140,0.08), transparent 60%), radial-gradient(1100px 700px at 75% 70%, rgba(212,175,55,0.05), transparent 60%), linear-gradient(180deg, #03050b, #050810 60%, #03050b)",
      }}
    >
      {/* Section header — large dramatic scale */}
      <div className="text-center max-w-3xl mb-3">
        <div className="font-display text-[0.7rem] tracking-[0.6em] text-[rgba(212,175,55,0.55)] mb-4">
          02 — THE JOURNEY
        </div>
        <h2
          className="font-display text-white tracking-[0.05em] leading-[0.9]"
          style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
        >
          A MAP OF
          <br />
          <span className="text-[#d4af37]">OUR ORBIT</span>
        </h2>
        <p className="mt-8 font-typewriter text-white/65 leading-[2] text-[0.92rem] max-w-[60ch] mx-auto">
          Ini peta kecil tentang bagaimana kita pernah bergerak bersama. Momen
          penting ditandai seperti rasi bintang—dari masa orientasi sampai hari
          terakhir.
        </p>
      </div>

      {/* Sky canvas */}
      <div
        ref={skyRef}
        className="relative mt-10 w-[min(1100px,96vw)] h-[min(620px,72vh)] rounded-[28px] overflow-hidden border border-white/[0.08] shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
        style={{
          background:
            "radial-gradient(1500px 800px at 50% 45%, rgba(8,12,32,0.85), rgba(0,0,2,0.98))",
        }}
      >
        {/* SVG layered stars for depth */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          {stars.map((s, i) => {
            const opacity =
              s.layer === "far" ? 0.4 : s.layer === "mid" ? 0.7 : 0.95
            return (
              <circle
                key={i}
                cx={`${s.cx}%`}
                cy={`${s.cy}%`}
                r={s.r}
                fill="white"
                opacity={opacity}
                className="twinkle"
                style={
                  {
                    "--dur": `${s.dur}s`,
                    "--delay": `${s.delay}s`,
                    transformOrigin: `${s.cx}% ${s.cy}%`,
                  } as React.CSSProperties
                }
              />
            )
          })}

          {/* Constellation lines */}
          {journeyEdges.map(([a, b], i) => {
            const A = journeyMoments.find((m) => m.id === a)
            const B = journeyMoments.find((m) => m.id === b)
            if (!A || !B) return null
            return (
              <line
                key={i}
                x1={`${A.x}%`}
                y1={`${A.y}%`}
                x2={`${B.x}%`}
                y2={`${B.y}%`}
                stroke="rgba(212,175,55,0.28)"
                strokeWidth={1}
                strokeDasharray="3 4"
              />
            )
          })}
        </svg>

        {/* Shooting star */}
        <div
          key={shootingKey}
          className="shooting-star"
          style={
            {
              top: `${shootingProps.top}%`,
              left: `${shootingProps.left}%`,
              "--dx": `${shootingProps.dx}px`,
              "--dy": `${shootingProps.dy}px`,
              "--angle": `${shootingProps.angle}deg`,
            } as React.CSSProperties
          }
        />

        {/* Star nodes */}
        {journeyMoments.map((m, idx) => (
          <button
            key={m.id}
            onClick={() => setOpen(m)}
            className="star-node group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
            aria-label={`Buka momen ${m.title}`}
          >
            {/* Outer pulse */}
            <span className="absolute inset-0 -m-3 rounded-full border border-[rgba(212,175,55,0.4)] animate-ping" style={{ animationDelay: `${idx * 0.3}s`, animationDuration: "3s" }} />
            <span className="absolute inset-0 -m-6 rounded-full border border-[rgba(212,175,55,0.15)]" />

            {/* Star core */}
            <span className="relative block h-4 w-4 rounded-full bg-[#d4af37] shadow-[0_0_24px_rgba(212,175,55,0.85)] transition-all group-hover:scale-150 group-hover:shadow-[0_0_40px_rgba(212,175,55,1)]" />

            {/* Label */}
            <span className="absolute left-1/2 top-[26px] -translate-x-1/2 whitespace-nowrap font-typewriter text-[0.7rem] text-white/55 transition-all group-hover:text-[#d4af37] group-hover:top-[30px]">
              {m.label}
            </span>
            <span className="absolute left-1/2 -top-6 -translate-x-1/2 whitespace-nowrap font-display text-[0.6rem] tracking-[0.3em] text-[rgba(212,175,55,0.45)]">
              {m.era}
            </span>
          </button>
        ))}
      </div>

      <p className="mt-6 font-typewriter text-white/45 text-[0.78rem] tracking-wide">
        klik bintang untuk membuka narasinya
      </p>

      {/* Modal */}
      <Modal open={!!open} onClose={() => setOpen(null)} title={open?.label || ""}>
        {open && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="font-display text-[0.7rem] tracking-[0.4em] text-[rgba(212,175,55,0.7)]">
                {open.era}
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-[rgba(212,175,55,0.5)] to-transparent" />
            </div>
            <h3
              className="font-display text-white leading-[0.95]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {open.title.toUpperCase()}
            </h3>
            <p className="whitespace-pre-line font-typewriter text-white/75 leading-[2] text-[0.98rem]">
              {open.text}
            </p>
          </div>
        )}
      </Modal>
    </section>
  )
}
