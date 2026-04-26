"use client"

import { useEffect, useRef, useState } from "react"

const POEM = `Selamat datang kembali di satu-satunya tempat
di mana waktu berhenti sejenak untukmu…

Tarik napas.
Kalau kamu mendengar gema ini,
berarti kamu pernah ada di sini.`

interface GateProps {
  onPass: () => void
}

export function Gate({ onPass }: GateProps) {
  const [phase, setPhase] = useState<"asking" | "typing" | "dissolving" | "gone">(
    "asking"
  )
  const [typed, setTyped] = useState("")
  const beamsRef = useRef<HTMLDivElement>(null)

  // typewriter
  useEffect(() => {
    if (phase !== "typing") return
    let i = 0
    const speed = 32
    const interval = setInterval(() => {
      i += 1
      setTyped(POEM.slice(0, i))
      if (i >= POEM.length) {
        clearInterval(interval)
        setTimeout(() => setPhase("dissolving"), 1400)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [phase])

  // dissolve transition
  useEffect(() => {
    if (phase !== "dissolving") return
    const t = setTimeout(() => {
      setPhase("gone")
      onPass()
    }, 1300)
    return () => clearTimeout(t)
  }, [phase, onPass])

  if (phase === "gone") return null

  const dust = Array.from({ length: 28 }, (_, i) => ({
    left: Math.random() * 100,
    bottom: -10 - Math.random() * 20,
    size: 1 + Math.random() * 2.5,
    dx: (Math.random() - 0.5) * 60,
    dur: 14 + Math.random() * 12,
    delay: -Math.random() * 18,
    peak: 0.3 + Math.random() * 0.5,
    key: i,
  }))

  return (
    <div
      className={`fixed inset-0 z-[10000] overflow-hidden bg-[#040406] transition-transform duration-[1200ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${
        phase === "dissolving" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Window beams of light */}
      <div
        ref={beamsRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="gate-beam absolute -top-[20%] left-[15%] w-[120px] h-[140%] origin-top"
          style={{
            background:
              "linear-gradient(180deg, rgba(212,175,55,0.18), rgba(212,175,55,0.04) 60%, transparent)",
            transform: "rotate(-8deg)",
            filter: "blur(2px)",
          }}
        />
        <div
          className="gate-beam absolute -top-[20%] left-[42%] w-[180px] h-[140%]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,250,230,0.12), rgba(255,250,230,0.02) 60%, transparent)",
            transform: "rotate(-6deg)",
            filter: "blur(3px)",
            animationDelay: "1.2s",
          }}
        />
        <div
          className="gate-beam absolute -top-[20%] right-[12%] w-[100px] h-[140%]"
          style={{
            background:
              "linear-gradient(180deg, rgba(212,175,55,0.14), transparent 70%)",
            transform: "rotate(8deg)",
            filter: "blur(2px)",
            animationDelay: "2.4s",
          }}
        />
      </div>

      {/* Dust */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {dust.map((d) => (
          <span
            key={d.key}
            className="dust-particle"
            style={
              {
                left: `${d.left}%`,
                bottom: `${d.bottom}%`,
                width: `${d.size}px`,
                height: `${d.size}px`,
                "--dx": `${d.dx}px`,
                "--dur": `${d.dur}s`,
                "--delay": `${d.delay}s`,
                "--peak": d.peak,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Vignette overlay specific to gate */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, transparent 0%, transparent 30%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Center content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="w-[min(820px,96vw)] text-center">
          <div className="mb-6 font-display text-[0.7rem] tracking-[0.6em] text-[rgba(212,175,55,0.55)]">
            X-A · ETERNAL ARCHIVE
          </div>

          <h1
            className="font-typewriter text-white/85 leading-tight"
            style={{ fontSize: "clamp(1.5rem, 4.6vw, 2.6rem)", letterSpacing: "0.02em" }}
          >
            Are you X-A?
          </h1>

          {phase === "asking" && (
            <button
              onClick={() => setPhase("typing")}
              className="group mt-10 inline-flex items-center gap-4 rounded-full border border-[rgba(212,175,55,0.6)] bg-[rgba(212,175,55,0.08)] px-10 py-4 font-display text-[1.05rem] tracking-[0.5em] text-[#d4af37] transition-all hover:bg-[rgba(212,175,55,0.18)] hover:border-[rgba(212,175,55,0.9)] hover:tracking-[0.6em] hover:shadow-[0_0_50px_rgba(212,175,55,0.3)]"
            >
              <span className="block h-1.5 w-1.5 rounded-full bg-[#d4af37] transition-all group-hover:scale-150 group-hover:shadow-[0_0_12px_#d4af37]" />
              YES, I AM
              <span className="block h-1.5 w-1.5 rounded-full bg-[#d4af37] transition-all group-hover:scale-150 group-hover:shadow-[0_0_12px_#d4af37]" />
            </button>
          )}

          {(phase === "typing" || phase === "dissolving") && (
            <div className="mt-10 min-h-[10em] whitespace-pre-wrap font-typewriter text-[rgba(255,250,230,0.78)] leading-[2] text-[0.98rem] md:text-[1.05rem]">
              {typed}
              <span className="inline-block w-[0.5ch] animate-pulse text-[#d4af37]">
                _
              </span>
            </div>
          )}

          <div className="mt-8 font-display text-[0.65rem] tracking-[0.4em] text-white/30">
            {phase === "asking" ? "TEKAN UNTUK MASUK" : "DENGARKAN PELAN-PELAN"}
          </div>
        </div>
      </div>

      {/* Final fade-to-black layer when dissolving */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-[1300ms] ${
          phase === "dissolving" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "radial-gradient(circle at center, transparent 0%, #000 80%)",
          backdropFilter: phase === "dissolving" ? "blur(8px)" : "blur(0px)",
        }}
      />
    </div>
  )
}
