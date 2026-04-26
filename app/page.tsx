"use client"

import { useState } from "react"
import { Gate } from "@/components/xa/gate"
import { CustomCursor } from "@/components/xa/custom-cursor"
import { GlobalTexture } from "@/components/xa/global-texture"
import { SideNav } from "@/components/xa/side-nav"
import { HomeSection } from "@/components/xa/home-section"
import { JourneySection } from "@/components/xa/journey-section"
import { SoulsSection } from "@/components/xa/souls-section"
import { FragmentsSection } from "@/components/xa/fragments-section"
import { EchoSection } from "@/components/xa/echo-section"
import { ToastProvider } from "@/components/xa/toast"
import { ScrollRevealInit } from "@/components/xa/scroll-reveal-init"

export default function Page() {
  const [passed, setPassed] = useState(false)

  return (
    <ToastProvider>
      <GlobalTexture />
      <CustomCursor />
      {!passed && <Gate onPass={() => setPassed(true)} />}
      <SideNav ready={passed} />
      <ScrollRevealInit />

      <main>
        <HomeSection />
        <JourneySection />
        <SoulsSection />
        <FragmentsSection />
        <EchoSection />
      </main>

      <footer className="relative px-6 py-12 text-center border-t border-white/[0.06]">
        <div className="font-display text-[0.7rem] tracking-[0.5em] text-white/35">
          X-A · ETERNAL ARCHIVE · MMXXV
        </div>
        <p className="mt-3 font-typewriter text-[0.7rem] text-white/25">
          dibangun dari ingatan yang menolak hilang
        </p>
      </footer>
    </ToastProvider>
  )
}
