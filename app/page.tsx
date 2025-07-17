import { Navigation } from "@/components/Navigation"
import { Hero } from "@/components/Hero"
import { Features } from "@/components/Features"
import { InteractiveSection } from "@/components/InteractiveSection"
import { Timeline } from "@/components/Timeline"
import { Stats } from "@/components/Stats"
import { Gallery } from "@/components/Gallery"
import { Testimonials } from "@/components/Testimonials"
import { Footer } from "@/components/Footer"
import { Globe3D } from "@/components/Globe3D"

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <Hero />
        <Globe3D />
        <Features />
        <Stats />
        <Timeline />
        <Gallery />
        <InteractiveSection />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}