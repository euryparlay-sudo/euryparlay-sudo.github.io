"use client"

import { useEffect, useRef } from "react"

export function HomeSection() {
  const bgRef = useRef<HTMLDivElement>(null)
  const beamRef = useRef<HTMLDivElement>(null)

  // Parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${y * 0.3}px, 0)`
      }
      if (beamRef.current) {
        beamRef.current.style.transform = `translate3d(0, ${y * 0.15}px, 0)`
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-6 py-24"
    >
      {/* Background layers — parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(1200px 800px at 18% 25%, rgba(212,175,55,0.10), transparent 58%), radial-gradient(1000px 700px at 82% 35%, rgba(255,250,230,0.04), transparent 58%), linear-gradient(180deg, #050507, #07070b 40%, #050507)",
        }}
      />

      {/* Light beams from window */}
      <div
        ref={beamRef}
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute -top-[10%] left-[20%] w-[140px] h-[120%] gate-beam"
          style={{
            background:
              "linear-gradient(180deg, rgba(212,175,55,0.13), rgba(212,175,55,0.02) 60%, transparent)",
            transform: "rotate(-7deg)",
            filter: "blur(2px)",
          }}
        />
        <div
          className="absolute -top-[10%] left-[55%] w-[200px] h-[120%] gate-beam"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,250,230,0.08), transparent 65%)",
            transform: "rotate(-5deg)",
            filter: "blur(3px)",
            animationDelay: "1.8s",
          }}
        />
      </div>

      {/* Floating dust */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => {
          const size = 1 + Math.random() * 2
          return (
            <span
              key={i}
              className="dust-particle"
              style={
                {
                  left: `${Math.random() * 100}%`,
                  bottom: `${-Math.random() * 30}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  "--dx": `${(Math.random() - 0.5) * 80}px`,
                  "--dur": `${16 + Math.random() * 14}s`,
                  "--delay": `${-Math.random() * 18}s`,
                  "--peak": 0.4 + Math.random() * 0.4,
                } as React.CSSProperties
              }
            />
          )
        })}
      </div>

      {/* Content with extreme scale contrast */}
      <div className="relative z-10 text-center max-w-4xl">
        <div
          className="font-display text-[0.7rem] md:text-[0.8rem] tracking-[0.7em] text-[rgba(212,175,55,0.6)] mb-6 reveal active"
        >
          THE SANCTUARY · MMXXV
        </div>

        <h1
          className="font-display text-[#d4af37] leading-[0.78] tracking-[0.02em] reveal active"
          style={{
            fontSize: "clamp(6rem, 22vw, 18rem)",
            textShadow:
              "0 30px 80px rgba(212,175,55,0.18), 0 0 120px rgba(212,175,55,0.08)",
          }}
        >
          X-A
        </h1>

        <div
          className="mt-2 font-display text-[0.85rem] tracking-[0.45em] text-white/40 reveal active"
        >
          ETERNAL ARCHIVE
        </div>

        <p className="mt-12 font-typewriter text-white/65 leading-[2] text-[0.95rem] md:text-[1.05rem] max-w-[58ch] mx-auto reveal active">
          &ldquo;Ke mana pun kita pergi, rumah ini akan selalu punya cerita untukmu.&rdquo;
        </p>

        <div className="mt-16 flex flex-col items-center gap-3 reveal active">
          <div className="font-display text-[0.65rem] tracking-[0.5em] text-white/35">
            SCROLL UNTUK MENGINGAT
          </div>
          <div className="h-12 w-px bg-gradient-to-b from-[rgba(212,175,55,0.6)] to-transparent" />
        </div>
      </div>
    </section>
  )
}
