"use client"

import { useEffect } from "react"

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  wide?: boolean
}

export function Modal({ open, onClose, title, children, wide }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[9000] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="modal-backdrop absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />
      <div
        className={`modal-card relative w-full ${
          wide ? "max-w-[920px]" : "max-w-[720px]"
        } max-h-[88vh] overflow-y-auto rounded-2xl border border-white/[0.12] bg-[rgba(10,10,14,0.9)] shadow-[0_30px_120px_rgba(0,0,0,0.7)] backdrop-blur-xl`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.08] bg-[rgba(10,10,14,0.95)] px-5 py-4 backdrop-blur-md">
          <div className="font-display text-[1.1rem] tracking-[0.4em] text-[#d4af37]">
            {title || ""}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-[rgba(212,175,55,0.45)] bg-[rgba(212,175,55,0.08)] px-3 py-1.5 font-display text-[0.75rem] tracking-[0.3em] text-[#d4af37] transition hover:bg-[rgba(212,175,55,0.18)]"
            aria-label="Tutup"
          >
            CLOSE
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 md:px-8 md:py-8">{children}</div>
      </div>
    </div>
  )
}
