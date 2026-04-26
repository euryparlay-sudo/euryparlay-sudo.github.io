"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"

type ToastTone = "info" | "warn" | "ok"

interface ToastItem {
  id: number
  text: string
  tone: ToastTone
  closing?: boolean
}

interface ToastCtx {
  push: (text: string, tone?: ToastTone) => void
  confirm: (message: string) => Promise<boolean>
}

const Ctx = createContext<ToastCtx | null>(null)

export function useToast() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useToast must be inside ToastProvider")
  return ctx
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const [confirmState, setConfirmState] = useState<{
    message: string
    resolve: (v: boolean) => void
  } | null>(null)

  const push = useCallback((text: string, tone: ToastTone = "info") => {
    const id = Date.now() + Math.random()
    setItems((prev) => [...prev, { id, text, tone }])
    setTimeout(() => {
      setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, closing: true } : it))
      )
    }, 2600)
    setTimeout(() => {
      setItems((prev) => prev.filter((it) => it.id !== id))
    }, 2950)
  }, [])

  const confirm = useCallback(
    (message: string) =>
      new Promise<boolean>((resolve) => {
        setConfirmState({ message, resolve })
      }),
    []
  )

  return (
    <Ctx.Provider value={{ push, confirm }}>
      {children}

      {/* Toast stack */}
      <div className="fixed top-6 left-1/2 z-[9000] -translate-x-1/2 flex flex-col gap-2 items-center pointer-events-none">
        {items.map((it) => (
          <div
            key={it.id}
            className={`${it.closing ? "toast-out" : "toast-in"} pointer-events-auto px-5 py-3 rounded-xl border backdrop-blur-md font-typewriter text-sm tracking-wide ${
              it.tone === "warn"
                ? "border-[rgba(212,175,55,0.45)] bg-[rgba(20,15,5,0.85)] text-[#d4af37]"
                : it.tone === "ok"
                  ? "border-[rgba(120,200,140,0.35)] bg-[rgba(10,15,12,0.85)] text-[rgba(180,220,190,0.95)]"
                  : "border-[rgba(255,255,255,0.14)] bg-[rgba(10,10,14,0.85)] text-[rgba(255,255,255,0.85)]"
            }`}
          >
            {it.text}
          </div>
        ))}
      </div>

      {/* Confirm dialog */}
      {confirmState && (
        <ConfirmDialog
          message={confirmState.message}
          onResult={(v) => {
            confirmState.resolve(v)
            setConfirmState(null)
          }}
        />
      )}
    </Ctx.Provider>
  )
}

function ConfirmDialog({
  message,
  onResult,
}: {
  message: string
  onResult: (v: boolean) => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onResult(false)
      if (e.key === "Enter") onResult(true)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onResult])

  return (
    <div className="fixed inset-0 z-[9500] flex items-center justify-center p-6">
      <div
        className="modal-backdrop absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={() => onResult(false)}
      />
      <div className="modal-card relative w-[min(440px,95vw)] rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[rgba(10,10,14,0.92)] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.7)]">
        <p className="font-typewriter text-[rgba(255,255,255,0.85)] leading-relaxed text-center">
          {message}
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => onResult(false)}
            className="flex-1 rounded-xl border border-[rgba(255,255,255,0.14)] bg-black/40 px-4 py-2.5 font-display text-[0.95rem] tracking-[0.2em] text-[rgba(255,255,255,0.7)] hover:bg-black/60 transition"
          >
            BATAL
          </button>
          <button
            onClick={() => onResult(true)}
            className="flex-1 rounded-xl border border-[rgba(212,175,55,0.55)] bg-[rgba(212,175,55,0.12)] px-4 py-2.5 font-display text-[0.95rem] tracking-[0.2em] text-[#d4af37] hover:bg-[rgba(212,175,55,0.2)] transition"
          >
            HAPUS
          </button>
        </div>
      </div>
    </div>
  )
}
