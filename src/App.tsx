import { useEffect } from 'react'
import { Leva } from 'leva'
import Hero from './sections/Hero'
import HeroAbout from './sections/HeroAbout'
import FeaturedProjects from './sections/FeaturedProjects'
import Workflow from './sections/Workflow'
import Capabilities from './sections/Capabilities'
import Booking from './sections/Booking'
import Footer from './sections/Footer'
import CustomCursor from './components/ui/CustomCursor'

const IS_DEV = import.meta.env.DEV

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
      {/* Leva dev panel — hidden in production */}
      <Leva hidden={!IS_DEV} />
      <CustomCursor />
      <main>
        <Hero />          {/* z-10 */}
        <HeroAbout />     {/* z-15 */}
        <FeaturedProjects /> {/* z-20 — has organic edge + blue bg */}
        <Workflow />      {/* z-30 */}
        <Capabilities />  {/* z-40 */}
        <Booking />       {/* z-50 */}
      </main>
      <Footer />
    </>
  )
}
