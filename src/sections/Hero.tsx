import { motion } from 'framer-motion'
import { ArrowDown, Calendar } from 'lucide-react'
import { fadeInUp, staggerContainer } from '../utils/animations'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section
      id="hero"
      className="sticky-section z-10 bg-bg"
      aria-label="Hero introduction"
    >
      {/* Gradient blob background */}
      {!reduced && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[100px] animate-pulse [animation-delay:1s]" />
        </div>
      )}

      <div className="section-inner relative z-10">
        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : 'hidden'}
          animate={reduced ? undefined : 'visible'}
          className="flex flex-col items-center text-center lg:flex-row lg:items-center lg:text-left lg:gap-16"
        >
          {/* Left column */}
          <div className="flex-1">
            <motion.p
              variants={reduced ? undefined : fadeInUp}
              className="mb-2 text-sm font-medium uppercase tracking-widest text-accent"
            >
              Product Builder & AI Prototyper
            </motion.p>
            <motion.h1
              variants={reduced ? undefined : fadeInUp}
              className="mb-4 text-4xl font-bold leading-tight md:text-6xl"
            >
              I build products
              <br />
              <span className="text-primary">that ship fast.</span>
            </motion.h1>
            <motion.p
              variants={reduced ? undefined : fadeInUp}
              className="mb-8 max-w-lg text-lg text-muted"
            >
              From idea to live product in days, not months. MVPs, automations,
              AI-powered tools — built with speed and precision.
            </motion.p>
            <motion.div
              variants={reduced ? undefined : fadeInUp}
              className="flex flex-wrap justify-center gap-4 lg:justify-start"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                View Projects <ArrowDown className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-card-border bg-card px-6 py-3 font-semibold text-text transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Book a Call <Calendar className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          {/* Right column — portrait placeholder */}
          <motion.div
            variants={reduced ? undefined : fadeInUp}
            className="mt-12 lg:mt-0"
          >
            <div className="relative h-64 w-64 md:h-80 md:w-80">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-40 blur-xl" />
              {/* Photo placeholder */}
              <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-primary/30 bg-card">
                <div className="flex h-full items-center justify-center text-muted text-sm">
                  Your Photo
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
