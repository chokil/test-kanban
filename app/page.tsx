import { Navigation } from "@/components/Navigation"
import { Hero } from "@/components/Hero"
import { Features } from "@/components/Features"
import { InteractiveSection } from "@/components/InteractiveSection"
import { ImmersiveExperience } from "@/components/ImmersiveExperience"
import { CursorEffect } from "@/components/CursorEffect"

export default function Home() {
  return (
    <>
      <CursorEffect />
      <Navigation />
      <main>
        <Hero />
        <Features />
        <ImmersiveExperience />
        <InteractiveSection />
      </main>
    </>
  )
}