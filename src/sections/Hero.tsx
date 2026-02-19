import { motion } from 'framer-motion'
import { ArrowDown, Calendar, CheckCircle2 } from 'lucide-react'
import { fadeInUp, staggerContainer } from '../utils/animations'
import { useReducedMotion } from '../hooks/useReducedMotion'

const usps = [
  'Free MVP feasibility call',
  'Working prototype in 1–3 days',
  'No dev team required',
]

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section
      id="hero"
      className="hero-intro relative bg-bg"
      aria-label="Hero introduction"
    >
      {/* Background blobs */}
      {!reduced && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute top-1/3 left-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/12 blur-[160px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-accent/[0.07] blur-[120px] animate-pulse [animation-delay:2s]" />
        </div>
      )}

      {/* USP strip — bottom of hero, right-aligned, hidden on xs */}
      <div
        className="hidden sm:block absolute bottom-0 inset-x-0 px-6 sm:px-8 pb-7 sm:pb-9 pointer-events-none"
        aria-hidden="true"
      >
        <div className="mx-auto max-w-[1200px] flex justify-end gap-5 sm:gap-8">
          {usps.map((usp) => (
            <div key={usp} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-400" />
              <span className="text-xs sm:text-sm font-medium text-text/70 whitespace-nowrap">
                {usp}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="section-inner">
        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : 'hidden'}
          animate={reduced ? undefined : 'visible'}
        >
          <motion.h1
            variants={reduced ? undefined : fadeInUp}
            className="mb-6 font-bold leading-[1.05] tracking-tight"
          >
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-text/70 font-semibold mb-2">
              From idea to
            </span>
            <span
              className={`block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-primary${reduced ? '' : ' glitch-text'}`}
            >
              working product fast
            </span>
          </motion.h1>

          <motion.p
            variants={reduced ? undefined : fadeInUp}
            className="mb-10 text-lg sm:text-xl md:text-2xl leading-relaxed text-muted max-w-2xl"
          >
            MVPs, automations and AI-powered tools. Built fast, shipped right.
          </motion.p>

          <motion.div
            variants={reduced ? undefined : fadeInUp}
            className="flex items-center gap-3"
          >
            <a
              href="#projects"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold text-white transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              View Projects <ArrowDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-card-border bg-card px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold text-text transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Book a Call <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
