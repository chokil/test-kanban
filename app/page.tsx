import { Navigation } from "@/components/Navigation"
import { Hero } from "@/components/Hero"
import { Features } from "@/components/Features"
import { InteractiveSection } from "@/components/InteractiveSection"
import { Timeline } from "@/components/Timeline"
import { Stats } from "@/components/Stats"
import { Gallery } from "@/components/Gallery"
import { Testimonials } from "@/components/Testimonials"
import { Footer } from "@/components/Footer"
import dynamic from 'next/dynamic'

const ExperienceSection = dynamic(() => import('@/components/ExperienceSection'), {
  ssr: false,
})

const ParallaxSection = dynamic(() => import('@/components/ParallaxSection'), {
  ssr: false,
})

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <Hero />
        <Features />
        <ExperienceSection />
        <ParallaxSection />
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