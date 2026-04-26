"use client"

import { useEffect, useRef, useState } from "react"
import { useToast } from "./toast"

interface EchoMessage {
  id: number
  to: string
  text: string
  at: string
  x: number
  y: number
  rot: number
}

const STORAGE_KEY = "xa_eternal_echo_v2"

const seedMessages: Omit<EchoMessage, "id" | "x" | "y" | "rot">[] = [
  {
    to: "X-A",
    text: "Kalau kamu baca ini, semoga hidupmu baik-baik saja.",
    at: new Date().toISOString(),
  },
  {
    to: "Si paling rame",
    text: "Terima kasih sudah bikin hari-hari terasa lebih ringan.",
    at: new Date().toISOString(),
  },
  {
    to: "Si paling diam",
    text: "Aku lihat kamu. Terima kasih sudah bertahan.",
    at: new Date().toISOString(),
  },
]

function loadEcho(): EchoMessage[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) || []
  } catch {
    return []
  }
}

function saveEcho(list: EchoMessage[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

function placeMessage(): { x: number; y: number; rot: number } {
  return {
    x: 6 + Math.random() * 60,
    y: 6 + Math.random() * 65,
    rot: -7 + Math.random() * 14,
  }
}

export function EchoSection() {
  const { push, confirm } = useToast()
  const [messages, setMessages] = useState<EchoMessage[]>([])
  const [to, setTo] = useState("")
  const [text, setText] = useState("")
  const [credits, setCredits] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let list = loadEcho()
    if (list.length === 0) {
      list = seedMessages.map((m, i) => ({
        ...m,
        id: Date.now() + i,
        ...placeMessage(),
      }))
      saveEcho(list)
    }
    setMessages(list)
  }, [])

  function handleSend() {
    const t = text.trim()
    if (!t) {
      push("Tulis pesannya dulu.", "warn")
      return
    }
    const newMsg: EchoMessage = {
      id: Date.now(),
      to: to.trim() || "someone",
      text: t,
      at: new Date().toISOString(),
      ...placeMessage(),
    }
    const next = [newMsg, ...messages].slice(0, 20)
    setMessages(next)
    saveEcho(next)
    setTo("")
    setText("")
    push("Pesanmu telah jadi gema.", "ok")
  }

  async function handleClear() {
    const ok = await confirm(
      "Hapus semua pesan lokal di browser ini? Tindakan ini tidak bisa dibatalkan."
    )
    if (!ok) return
    const seeded = seedMessages.map((m, i) => ({
      ...m,
      id: Date.now() + i,
      ...placeMessage(),
    }))
    setMessages(seeded)
    saveEcho(seeded)
    push("Pesan dibersihkan. Hanya menyisakan gema-gema awal.", "info")
  }

  return (
    <section
      id="echo"
      className="relative min-h-screen px-6 py-24 flex flex-col items-center"
      style={{
        background:
          "radial-gradient(1100px 700px at 30% 30%, rgba(212,175,55,0.06), transparent 60%), radial-gradient(1100px 700px at 70% 70%, rgba(255,250,230,0.03), transparent 60%), linear-gradient(180deg, #050507, #000 80%)",
      }}
    >
      {/* Header */}
      <div className="text-center max-w-3xl mb-16">
        <div className="font-display text-[0.7rem] tracking-[0.6em] text-[rgba(212,175,55,0.55)] mb-4">
          05 — THE FINAL ECHO
        </div>
        <h2
          className="font-display text-white tracking-[0.04em] leading-[0.9]"
          style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
        >
          TINGGALKAN
          <br />
          <span className="text-[#d4af37]">GEMAMU</span>
        </h2>
        <p className="mt-8 font-typewriter text-white/65 leading-[2] text-[0.92rem] max-w-[58ch] mx-auto">
          Untuk siapa pun. Untuk semua orang. Biar penutupnya bukan
          &ldquo;selesai&rdquo;, tapi &ldquo;tetap hidup&rdquo;.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="w-[min(1100px,96vw)] grid gap-5 md:grid-cols-2">
        {/* Compose card */}
        <div className="rounded-2xl border border-white/[0.1] bg-black/30 p-6 md:p-7 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-[1.4rem] tracking-[0.4em] text-[#d4af37]">
              PESAN
            </h3>
            <span className="font-display text-[0.6rem] tracking-[0.3em] text-white/30">
              ANONYMOUS
            </span>
          </div>

          <label className="block">
            <span className="block font-typewriter text-[0.72rem] tracking-wider text-white/55 mb-2">
              UNTUK (opsional)
            </span>
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              maxLength={40}
              placeholder="mis: untuk kamu yang sering diam…"
              className="w-full rounded-xl border border-white/[0.12] bg-black/40 px-4 py-3 font-mono text-[0.92rem] text-white/85 placeholder:text-white/30 outline-none transition focus:border-[rgba(212,175,55,0.5)] focus:bg-black/60"
            />
          </label>

          <label className="block mt-4">
            <span className="block font-typewriter text-[0.72rem] tracking-wider text-white/55 mb-2">
              PESAN ({240 - text.length} karakter tersisa)
            </span>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              maxLength={240}
              placeholder="tulis yang singkat, tapi jujur…"
              className="w-full rounded-xl border border-white/[0.12] bg-black/40 px-4 py-3 font-mono text-[0.92rem] text-white/85 placeholder:text-white/30 outline-none transition focus:border-[rgba(212,175,55,0.5)] focus:bg-black/60 resize-none"
            />
          </label>

          <button
            onClick={handleSend}
            className="mt-4 w-full rounded-xl border border-[rgba(212,175,55,0.6)] bg-[rgba(212,175,55,0.1)] py-3 font-display text-[1rem] tracking-[0.5em] text-[#d4af37] transition hover:bg-[rgba(212,175,55,0.2)] hover:tracking-[0.55em]"
          >
            KIRIM
          </button>

          <p className="mt-4 font-typewriter text-[0.7rem] text-white/40 leading-relaxed">
            Maks 20 kartu tampil. Disimpan lokal di browser ini.
          </p>

          <button
            onClick={handleClear}
            className="mt-3 w-full rounded-xl border border-white/[0.12] bg-black/30 py-2.5 font-display text-[0.78rem] tracking-[0.35em] text-white/55 transition hover:border-[rgba(212,175,55,0.25)] hover:text-white/75"
          >
            HAPUS PESAN LOKAL
          </button>
        </div>

        {/* Floating cards stage */}
        <div
          ref={stageRef}
          className="relative rounded-2xl border border-dashed border-white/[0.1] bg-white/[0.015] overflow-hidden"
          style={{ minHeight: 480 }}
        >
          <div className="absolute inset-x-0 top-3 text-center font-display text-[0.6rem] tracking-[0.4em] text-white/25 z-10">
            ECHO STAGE · {messages.length} MESSAGES
          </div>
          {messages.map((m) => (
            <FloatingMessage key={m.id} msg={m} />
          ))}
          {messages.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-typewriter text-white/40 text-[0.85rem]">
                belum ada gema…
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Credits roll */}
      <div className="w-[min(700px,96vw)] mt-16 rounded-2xl border border-white/[0.1] bg-black/30 p-6 md:p-7 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-[1.4rem] tracking-[0.4em] text-[#d4af37]">
            CREDITS
          </h3>
          <button
            onClick={() => setCredits((c) => !c)}
            className="rounded-lg border border-[rgba(212,175,55,0.45)] bg-[rgba(212,175,55,0.08)] px-4 py-2 font-display text-[0.75rem] tracking-[0.3em] text-[#d4af37] transition hover:bg-[rgba(212,175,55,0.18)]"
          >
            {credits ? "STOP" : "PLAY"}
          </button>
        </div>
        <div className="relative h-[300px] overflow-hidden rounded-xl border border-dashed border-white/[0.1] bg-black/40">
          {credits ? (
            <div
              className="absolute inset-x-0 px-6 text-center font-typewriter text-white/70 leading-[2.4]"
              style={{
                animation: "creditsRoll 28s linear forwards",
                top: "100%",
              }}
            >
              <div className="font-display text-[1.4rem] tracking-[0.5em] text-[#d4af37] mb-6">
                X-A · ETERNAL ARCHIVE
              </div>
              <p>directed & remembered by</p>
              <p className="text-white/90 font-display tracking-[0.3em] mt-2">
                US, ALL OF US
              </p>
              <div className="my-8 h-px w-32 mx-auto bg-[rgba(212,175,55,0.3)]" />
              <p>terima kasih untuk:</p>
              <p>tawa-tawa kecil</p>
              <p>diam yang berbicara</p>
              <p>sore yang sama, hari yang berbeda</p>
              <p>tangan yang pernah saling pegang</p>
              <p>nama yang masih kami sebut</p>
              <div className="my-8 h-px w-32 mx-auto bg-[rgba(212,175,55,0.3)]" />
              <p className="text-[#d4af37]/85 italic">
                &ldquo;akhir cuma mengubah bentuk rindu.&rdquo;
              </p>
              <div className="my-12">
                <p className="font-display text-[0.7rem] tracking-[0.4em] text-white/40">
                  THE END
                </p>
                <p className="font-display text-[0.6rem] tracking-[0.3em] text-white/25 mt-2">
                  (yang sebenarnya tidak pernah benar-benar berakhir)
                </p>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-typewriter text-white/35 text-[0.85rem]">
                tekan PLAY untuk memulai credits roll
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Final heartbeat */}
      <div className="mt-20 flex flex-col items-center gap-4">
        <div className="heartbeat h-3 w-3 rounded-full bg-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.85)]" />
        <p className="font-typewriter text-white/40 text-[0.78rem] tracking-wide">
          arsip ini akan terus hidup, selama kamu mengingatnya.
        </p>
      </div>

      <style jsx>{`
        @keyframes creditsRoll {
          from {
            top: 100%;
          }
          to {
            top: -180%;
          }
        }
      `}</style>
    </section>
  )
}

function FloatingMessage({ msg }: { msg: EchoMessage }) {
  const [pos, setPos] = useState({ x: msg.x, y: msg.y })
  const [dragging, setDragging] = useState(false)
  const offsetRef = useRef({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  function onPointerDown(e: React.PointerEvent) {
    if (!cardRef.current) return
    cardRef.current.setPointerCapture(e.pointerId)
    setDragging(true)
    const stage = cardRef.current.parentElement?.getBoundingClientRect()
    if (!stage) return
    const cardRect = cardRef.current.getBoundingClientRect()
    offsetRef.current = {
      x: e.clientX - cardRect.left,
      y: e.clientY - cardRect.top,
    }
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging || !cardRef.current) return
    const stage = cardRef.current.parentElement?.getBoundingClientRect()
    if (!stage) return
    const x = ((e.clientX - stage.left - offsetRef.current.x) / stage.width) * 100
    const y = ((e.clientY - stage.top - offsetRef.current.y) / stage.height) * 100
    setPos({
      x: Math.max(0, Math.min(85, x)),
      y: Math.max(0, Math.min(85, y)),
    })
  }

  function onPointerUp(e: React.PointerEvent) {
    setDragging(false)
    if (cardRef.current) cardRef.current.releasePointerCapture(e.pointerId)
  }

  return (
    <div
      ref={cardRef}
      className="absolute select-none rounded-xl border border-[rgba(212,175,55,0.22)] bg-black/70 px-3 py-2.5 font-typewriter text-white/85 text-[0.85rem] leading-snug shadow-[0_22px_60px_rgba(0,0,0,0.55)] backdrop-blur-sm transition-shadow hover:shadow-[0_28px_80px_rgba(0,0,0,0.7)] hover:border-[rgba(212,175,55,0.45)]"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: `rotate(${msg.rot}deg)`,
        width: "min(220px, 70%)",
        cursor: dragging ? "grabbing" : "grab",
        zIndex: dragging ? 50 : 1,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div className="text-white/90">{msg.text}</div>
      <div className="mt-2 text-[0.65rem] tracking-wider text-[rgba(212,175,55,0.7)]">
        → {msg.to}
      </div>
    </div>
  )
}
