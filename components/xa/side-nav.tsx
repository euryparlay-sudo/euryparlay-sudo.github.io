"use client"

import { useEffect, useState } from "react"

const items = [
  { id: "home", short: "H", label: "Sanctuary" },
  { id: "journey", short: "J", label: "Journey" },
  { id: "souls", short: "S", label: "Souls" },
  { id: "fragments", short: "F", label: "Fragments" },
  { id: "echo", short: "E", label: "Echo" },
]

interface SideNavProps {
  ready: boolean
}

export function SideNav({ ready }: SideNavProps) {
  const [active, setActive] = useState("home")

  useEffect(() => {
    if (!ready) return
    const sections = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => !!el)

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.4) {
            setActive(e.target.id)
          }
        })
      },
      { threshold: [0.4, 0.6] }
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [ready])

  return (
    <nav
      aria-label="Navigation"
      className={`fixed right-3 md:right-5 top-1/2 z-[2000] flex -translate-y-1/2 flex-col gap-3 transition-opacity duration-1000 ${
        ready ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {items.map((it) => {
        const isActive = active === it.id
        return (
          <a
            key={it.id}
            href={`#${it.id}`}
            className="group relative flex items-center justify-end"
            aria-label={it.label}
          >
            {/* Tooltip */}
            <span
              className={`absolute right-[54px] whitespace-nowrap rounded-md border border-[rgba(212,175,55,0.3)] bg-black/80 px-3 py-1.5 font-display text-[0.7rem] tracking-[0.3em] text-[#d4af37] backdrop-blur-md transition-all duration-300 ${
                isActive
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              }`}
            >
              {it.label.toUpperCase()}
            </span>

            {/* Dot */}
            <span
              className={`relative flex h-11 w-11 items-center justify-center rounded-full border bg-black/65 backdrop-blur-md transition-all duration-300 ${
                isActive
                  ? "border-[#d4af37] bg-[rgba(212,175,55,0.15)] shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                  : "border-[rgba(212,175,55,0.4)] hover:border-[rgba(212,175,55,0.85)]"
              }`}
            >
              <span
                className={`font-display text-[0.75rem] tracking-[0.15em] transition-colors ${
                  isActive ? "text-[#d4af37]" : "text-[rgba(212,175,55,0.7)]"
                }`}
              >
                {it.short}
              </span>
              {isActive && (
                <span className="absolute -inset-1 rounded-full border border-[rgba(212,175,55,0.3)] animate-ping" />
              )}
            </span>
          </a>
        )
      })}
    </nav>
  )
}
