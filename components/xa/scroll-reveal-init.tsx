"use client"

import { useEffect } from "react"

export function ScrollRevealInit() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal")
    if (!els.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("active")
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return null
}
