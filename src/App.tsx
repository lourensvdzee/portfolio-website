import Hero from './sections/Hero'
import Stats from './sections/Stats'
import FeaturedProjects from './sections/FeaturedProjects'
import Workflow from './sections/Workflow'
import Capabilities from './sections/Capabilities'
import Portfolio from './sections/Portfolio'
import Booking from './sections/Booking'
import Footer from './sections/Footer'

export default function App() {
  return (
    <>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
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
