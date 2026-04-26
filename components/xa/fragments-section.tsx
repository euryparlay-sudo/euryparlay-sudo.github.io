"use client"

import { useMemo } from "react"

interface Fragment {
  caption: string
  era: string
  height: number
  shape: "portrait" | "wide" | "square" | "tall"
}

const fragments: Fragment[] = [
  { caption: "tawa di lorong itu", era: "MUSIM 1", height: 380, shape: "portrait" },
  { caption: "kelas yang sengaja kosong", era: "AWAL", height: 240, shape: "wide" },
  { caption: "matahari di jendela utara", era: "TENGAH", height: 320, shape: "square" },
  { caption: "buku catatan yang tertinggal", era: "AKHIR", height: 420, shape: "tall" },
  { caption: "tangga itu, sore itu", era: "MUSIM 2", height: 280, shape: "wide" },
  { caption: "papan tulis yang penuh", era: "MUSIM 1", height: 360, shape: "portrait" },
  { caption: "bayangan di lapangan", era: "TENGAH", height: 240, shape: "square" },
  { caption: "tas yang setia menemani", era: "AKHIR", height: 320, shape: "portrait" },
  { caption: "sepatu yang sudah lelah", era: "MUSIM 2", height: 280, shape: "wide" },
  { caption: "pintu yang tidak pernah ditutup rapat", era: "AWAL", height: 400, shape: "tall" },
  { caption: "langit yang sama, hari yang berbeda", era: "TENGAH", height: 260, shape: "wide" },
  { caption: "kursi paling pojok", era: "AKHIR", height: 340, shape: "portrait" },
]

export function FragmentsSection() {
  const items = useMemo(() => fragments, [])

  return (
    <section
      id="fragments"
      className="relative min-h-screen px-6 py-24 flex flex-col items-center"
      style={{
        background:
          "radial-gradient(1200px 800px at 30% 30%, rgba(40,30,30,0.4), transparent 60%), radial-gradient(1200px 800px at 70% 70%, rgba(20,15,30,0.5), transparent 60%), linear-gradient(180deg, #020203, #050407 60%, #020203)",
      }}
    >
      {/* Header */}
      <div className="text-center max-w-3xl mb-16">
        <div className="font-display text-[0.7rem] tracking-[0.6em] text-[rgba(212,175,55,0.55)] mb-4">
          04 — THE FRAGMENTS
        </div>
        <h2
          className="font-display tracking-[0.04em] leading-[0.9]"
          style={{
            fontSize: "clamp(3rem, 9vw, 7rem)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.4))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          KEPINGAN
          <br />
          <span className="text-[#d4af37] not-italic">YANG TERSISA</span>
        </h2>
        <p className="mt-8 font-typewriter text-white/55 leading-[2] text-[0.92rem] max-w-[58ch] mx-auto">
          Tidak semua memori bisa dijelaskan. Beberapa hanya bisa diraba dari
          jauh, seperti kabut yang lewat.
        </p>
      </div>

      {/* Masonry grid of fragment "memory boxes" */}
      <div className="w-[min(1100px,96vw)] columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {items.map((f, i) => (
          <FragmentCard key={i} fragment={f} index={i} />
        ))}
      </div>

      {/* Closing line */}
      <div className="mt-20 max-w-2xl text-center">
        <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.5)] to-transparent" />
        <p className="mt-8 font-typewriter italic text-white/45 leading-[2] text-[0.95rem]">
          &ldquo;Kepingan tidak harus utuh.
          <br />
          Yang penting, masih ada.&rdquo;
        </p>
      </div>
    </section>
  )
}

function FragmentCard({ fragment, index }: { fragment: Fragment; index: number }) {
  // Procedural "memory texture" - layered gradients to simulate aged photographs
  const tones = [
    "linear-gradient(135deg, rgba(140,110,80,0.4), rgba(40,30,25,0.6))",
    "linear-gradient(160deg, rgba(180,150,100,0.35), rgba(30,25,20,0.7))",
    "linear-gradient(120deg, rgba(100,120,150,0.3), rgba(20,25,35,0.7))",
    "linear-gradient(140deg, rgba(160,130,90,0.4), rgba(35,25,15,0.65))",
    "linear-gradient(170deg, rgba(120,140,160,0.3), rgba(25,30,40,0.65))",
    "linear-gradient(150deg, rgba(170,140,100,0.38), rgba(40,30,20,0.6))",
  ]
  const tone = tones[index % tones.length]

  return (
    <div
      className="frag-card group relative break-inside-avoid overflow-hidden rounded-2xl border border-white/[0.06] bg-black/30 p-1.5 cursor-pointer transition-all duration-700 hover:border-[rgba(212,175,55,0.3)]"
    >
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{ height: `${fragment.height}px` }}
      >
        {/* "Photo" — procedural aged tone */}
        <div
          className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105"
          style={{
            background: tone,
            filter: "grayscale(0.7) contrast(1.05) sepia(0.15)",
          }}
        />

        {/* Vertical light streak */}
        <div
          className="absolute inset-y-0 left-[20%] w-[2px]"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(255,250,230,0.18), transparent)",
            filter: "blur(8px)",
          }}
        />

        {/* Fog overlay */}
        <div
          className="fog-overlay absolute -inset-12 pointer-events-none mix-blend-screen"
          style={{
            background:
              "radial-gradient(280px 180px at 30% 35%, rgba(255,250,230,0.08), transparent 60%), radial-gradient(220px 150px at 70% 60%, rgba(212,175,55,0.06), transparent 65%)",
            filter: "blur(18px)",
            opacity: 0.7,
          }}
        />

        {/* Caption — appears on hover */}
        <div className="absolute inset-x-0 bottom-0 p-5 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="font-display text-[0.6rem] tracking-[0.4em] text-[rgba(212,175,55,0.85)] mb-1">
            {fragment.era}
          </div>
          <p className="font-typewriter italic text-white/85 text-[0.9rem] leading-snug">
            &ldquo;{fragment.caption}&rdquo;
          </p>
        </div>

        {/* Persistent corner mark */}
        <div className="absolute top-3 right-3 font-display text-[0.6rem] tracking-[0.3em] text-white/30">
          № {String(index + 1).padStart(2, "0")}
        </div>

        {/* Vignette inside frame */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      </div>
    </div>
  )
}
