"use client"

import { useMemo, useState } from "react"
import { souls, type Soul } from "@/lib/xa-data"
import { Modal } from "./modal"

export function SoulsSection() {
  const [opened, setOpened] = useState<Soul | null>(null)
  const [revealed, setRevealed] = useState<Set<number>>(new Set())
  const [glitching, setGlitching] = useState<Set<number>>(new Set())
  const [scanning, setScanning] = useState<Set<number>>(new Set())

  // Random but stable shuffle per session
  const list = useMemo(() => {
    const arr = [...souls]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [])

  function reveal(s: Soul) {
    if (revealed.has(s.id)) return

    if (s.type === "hidden") {
      // Glitch + scanline reveal
      setGlitching((prev) => new Set(prev).add(s.id))
      setScanning((prev) => new Set(prev).add(s.id))
      setTimeout(() => {
        setGlitching((prev) => {
          const next = new Set(prev)
          next.delete(s.id)
          return next
        })
      }, 400)
      setTimeout(() => {
        setScanning((prev) => {
          const next = new Set(prev)
          next.delete(s.id)
          return next
        })
      }, 1100)
    } else if (s.type === "lost") {
      // Scanline reveal only
      setScanning((prev) => new Set(prev).add(s.id))
      setTimeout(() => {
        setScanning((prev) => {
          const next = new Set(prev)
          next.delete(s.id)
          return next
        })
      }, 1100)
    }

    setRevealed((prev) => new Set(prev).add(s.id))
  }

  function handleClick(s: Soul) {
    if (revealed.has(s.id)) {
      setOpened(s)
    } else {
      reveal(s)
    }
  }

  return (
    <section
      id="souls"
      className="relative min-h-screen px-6 py-24 flex flex-col items-center"
      style={{
        background:
          "radial-gradient(1100px 700px at 22% 25%, rgba(160,90,40,0.08), transparent 60%), radial-gradient(1100px 700px at 78% 75%, rgba(212,175,55,0.06), transparent 60%), linear-gradient(180deg, #0a0807, #0d0a08 55%, #0a0807)",
      }}
    >
      {/* Header */}
      <div className="text-center max-w-3xl mb-16">
        <div className="font-display text-[0.7rem] tracking-[0.6em] text-[rgba(212,175,55,0.55)] mb-4">
          03 — THE TIME CAPSULE
        </div>
        <h2
          className="font-display text-white tracking-[0.04em] leading-[0.9]"
          style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
        >
          43
          <br />
          <span className="text-[#d4af37]">SOULS</span>
        </h2>
        <p className="mt-8 font-typewriter text-white/65 leading-[2] text-[0.92rem] max-w-[58ch] mx-auto">
          Beberapa wajah jelas. Beberapa disembunyikan. Beberapa nyaris hilang.
          Karena mengingat, kadang, memang harus dicari.
        </p>
        <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/[0.12] bg-black/40 px-5 py-2 backdrop-blur-sm">
          <span className="font-typewriter text-[0.78rem] text-white/55">
            <span className="text-[#d4af37]">tap</span> untuk reveal ·{" "}
            <span className="text-[#d4af37]">tap lagi</span> untuk surat
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="w-[min(1100px,96vw)] grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => {
          const isRevealed = revealed.has(s.id)
          const isGlitching = glitching.has(s.id)
          const isScanning = scanning.has(s.id)

          return (
            <button
              key={s.id}
              onClick={() => handleClick(s)}
              className={`soul-card group relative flex items-center gap-4 overflow-hidden rounded-2xl border p-3 text-left transition-all duration-300 ${
                isRevealed
                  ? "border-[rgba(212,175,55,0.35)] bg-[rgba(212,175,55,0.04)]"
                  : "border-white/[0.08] bg-black/30 hover:border-[rgba(212,175,55,0.25)] hover:bg-black/45"
              } ${isGlitching ? "glitching" : ""}`}
              aria-label={
                isRevealed ? `Buka surat untuk ${s.fullName}` : `Reveal ${s.fullName}`
              }
            >
              {isScanning && <span className="scan-line" />}

              {/* Avatar */}
              <div className="relative flex-shrink-0 h-20 w-20 overflow-hidden rounded-xl border border-white/[0.1] bg-white/[0.03]">
                <div
                  className={`absolute inset-0 flex items-center justify-center font-display text-[1.6rem] tracking-[0.1em] text-[rgba(212,175,55,0.55)] transition-all duration-700 ${
                    isRevealed ? "opacity-0" : "opacity-100"
                  }`}
                  style={{
                    background:
                      s.type === "lost"
                        ? "rgba(0,0,0,0.6)"
                        : s.type === "hidden"
                          ? "rgba(20,15,8,0.4)"
                          : "rgba(20,15,8,0.2)",
                    backdropFilter:
                      s.type === "hidden" && !isRevealed ? "blur(14px)" : "none",
                  }}
                >
                  {s.type === "lost" && !isRevealed ? "LOST" : ""}
                  {s.type === "hidden" && !isRevealed ? "?" : ""}
                  {s.type === "basic" && !isRevealed ? "X-A" : ""}
                </div>

                {/* Revealed initial */}
                <div
                  className={`absolute inset-0 flex items-center justify-center font-display text-[2rem] tracking-[0.05em] text-[#d4af37] transition-opacity duration-700 ${
                    isRevealed ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(212,175,55,0.15), rgba(20,15,8,0.6))",
                  }}
                >
                  {s.fullName.charAt(0)}
                </div>

                {/* Soul type indicator */}
                {!isRevealed && (
                  <div className="absolute bottom-1 right-1 flex h-2 w-2 items-center justify-center">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        s.type === "lost"
                          ? "bg-red-500/60"
                          : s.type === "hidden"
                            ? "bg-[#d4af37]/60"
                            : "bg-white/40"
                      } animate-pulse`}
                    />
                  </div>
                )}
              </div>

              {/* Meta */}
              <div className="flex-1 min-w-0">
                {/* ID badge */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-display text-[0.65rem] tracking-[0.3em] text-white/30">
                    №{String(s.id).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-display text-[0.6rem] tracking-[0.25em] ${
                      s.type === "lost"
                        ? "text-red-400/60"
                        : s.type === "hidden"
                          ? "text-[#d4af37]/60"
                          : "text-white/30"
                    }`}
                  >
                    {s.type === "lost"
                      ? "LOST"
                      : s.type === "hidden"
                        ? "HIDDEN"
                        : "VISIBLE"}
                  </span>
                </div>

                {/* Name */}
                <div
                  className={`font-display text-[1.4rem] tracking-[0.15em] leading-tight transition-all duration-500 ${
                    isRevealed ? "text-white opacity-100" : "text-white/0 opacity-0"
                  }`}
                >
                  {s.fullName.toUpperCase()}
                </div>

                {/* Hidden state placeholder name */}
                {!isRevealed && (
                  <div className="font-display text-[1.4rem] tracking-[0.4em] leading-tight text-white/15">
                    {"·".repeat(Math.min(8, s.fullName.length))}
                  </div>
                )}

                {/* Role */}
                <div
                  className={`mt-1.5 font-typewriter text-[0.72rem] tracking-wider transition-all duration-500 ${
                    isRevealed ? "text-[#d4af37]/85 opacity-100" : "opacity-0"
                  }`}
                >
                  {s.role.toUpperCase()} · {s.ig}
                </div>

                {/* Hint */}
                <div className="mt-2 font-typewriter text-[0.7rem] text-white/40">
                  {isRevealed ? "tap untuk surat" : "tap untuk reveal"}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Profile Modal */}
      <Modal
        open={!!opened}
        onClose={() => setOpened(null)}
        title="A SOUL"
        wide
      >
        {opened && (
          <div className="grid gap-8 md:grid-cols-[200px_1fr]">
            {/* Visual */}
            <div className="space-y-3">
              <div
                className="aspect-square rounded-2xl border border-white/[0.12] flex items-center justify-center"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(212,175,55,0.18), rgba(20,15,8,0.7))",
                }}
              >
                <span
                  className="font-display text-[#d4af37]"
                  style={{ fontSize: "clamp(4rem, 10vw, 7rem)" }}
                >
                  {opened.fullName.charAt(0)}
                </span>
              </div>
              <div className="font-display text-[0.65rem] tracking-[0.3em] text-white/35 text-center">
                №{String(opened.id).padStart(2, "0")} / 43
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="font-display text-[0.7rem] tracking-[0.4em] text-[rgba(212,175,55,0.65)] mb-2">
                {opened.role.toUpperCase()}
              </div>
              <h3
                className="font-display text-white leading-[0.9] tracking-[0.04em]"
                style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)" }}
              >
                {opened.fullName.toUpperCase()}
              </h3>
              <div className="mt-3 font-typewriter text-white/55 text-[0.85rem]">
                <span className="text-white/85">@</span>
                {opened.ig.replace("@", "")}
              </div>

              <p className="mt-6 font-typewriter italic text-white/70 leading-[2] text-[0.95rem]">
                &ldquo;{opened.line}&rdquo;
              </p>

              <div className="mt-8 rounded-xl border border-dashed border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.04)] p-5">
                <div className="font-display text-[0.7rem] tracking-[0.4em] text-[#d4af37] mb-3">
                  SURAT UNTUK MASA DEPANMU
                </div>
                <p className="font-typewriter text-white/85 leading-[2] text-[0.95rem] whitespace-pre-line">
                  {opened.letter}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
