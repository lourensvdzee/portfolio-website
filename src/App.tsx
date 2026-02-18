import { useEffect } from 'react'
import Hero from './sections/Hero'
import Stats from './sections/Stats'
import FeaturedProjects from './sections/FeaturedProjects'
import Workflow from './sections/Workflow'
import Capabilities from './sections/Capabilities'
import Portfolio from './sections/Portfolio'
import Booking from './sections/Booking'
import Footer from './sections/Footer'
import CustomCursor from './components/ui/CustomCursor'

export default function App() {
  // Aurora effect: update CSS variables on mousemove — zero React renders
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    function onMove(e: MouseEvent) {
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`)
      document.documentElement.style.setProperty('--my', `${e.clientY}px`)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <CustomCursor />
      <main>
        <Hero />
        <Stats />
        <FeaturedProjects />
        <Workflow />
        <Capabilities />
        <Portfolio />
        <Booking />
      </main>
      <Footer />
    </>
  )
}
