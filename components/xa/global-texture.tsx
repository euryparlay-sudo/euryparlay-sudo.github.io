"use client"

import { useEffect, useState } from "react"

export function GlobalTexture() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    if (typeof window === "undefined") return
    const m = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(m.matches)
  }, [])

  return (
    <>
      <div className="film-grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      {!reduced && (
        <div className="fixed inset-0 pointer-events-none z-[9996]" aria-hidden="true">
          {/* Subtle scanline texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 1px, transparent 1px, transparent 3px)",
              mixBlendMode: "overlay",
            }}
          />
        </div>
      )}
    </>
  )
}
