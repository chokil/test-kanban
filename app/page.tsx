import { Navigation } from "@/components/Navigation"
import { Hero } from "@/components/Hero"
import { Features } from "@/components/Features"
import { InteractiveSection } from "@/components/InteractiveSection"

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Features />
        <InteractiveSection />
      </main>
    </>
  )
}