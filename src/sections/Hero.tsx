import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ArrowDown, Calendar } from 'lucide-react'
import { fadeInUp, staggerContainer } from '../utils/animations'
import { useReducedMotion } from '../hooks/useReducedMotion'

function ProfilePhoto({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [8, -8]), {
    stiffness: 200,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    mouseX.set((e.clientX - cx) / (rect.width / 2))
    mouseY.set((e.clientY - cy) / (rect.height / 2))
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      ref={ref}
      className="relative h-72 w-72 md:h-80 md:w-80"
      style={{ perspective: '800px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-[-20px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.35) 0%, transparent 70%)',
          filter: 'blur(24px)',
          animation: reduced ? 'none' : 'pulse 3s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      {/* Tilt container */}
      <motion.div
        style={reduced ? {} : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-full w-full"
      >
        {/* Conic glow ring */}
        <div
          className="absolute inset-[-2px] rounded-full opacity-70"
          style={{
            background: 'conic-gradient(from 180deg, #2563eb 0%, #3b82f6 40%, #93c5fd 60%, #2563eb 100%)',
            filter: 'blur(1px)',
          }}
          aria-hidden="true"
        />
        {/* Photo */}
        <div className="relative h-full w-full overflow-hidden rounded-full border border-primary/20">
          <img
            src="/profile.webp"
            alt="Portrait"
            className="h-full w-full object-cover object-top"
            width={320}
            height={400}
            loading="eager"
          />
        </div>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section
      id="hero"
      className="sticky-section z-10 bg-bg"
      aria-label="Hero introduction"
    >
      {/* Background blobs */}
      {!reduced && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute top-1/3 left-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[140px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 h-[350px] w-[350px] rounded-full bg-accent/[0.08] blur-[100px] animate-pulse [animation-delay:2s]" />
        </div>
      )}

      <div className="section-inner">
        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : 'hidden'}
          animate={reduced ? undefined : 'visible'}
          className="flex flex-col items-center text-center lg:flex-row lg:items-center lg:justify-between lg:text-left lg:gap-16"
        >
          {/* Left column */}
          <div className="flex-1 max-w-xl">
            {/* Role badge */}
            <motion.div variants={reduced ? undefined : fadeInUp} className="mb-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.08] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Product Builder &amp; AI Prototyper
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={reduced ? undefined : fadeInUp}
              className="mb-5 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
            >
              <span className="text-text/75 font-semibold">From idea to</span>
              <br />
              <span className={`text-primary${reduced ? '' : ' glitch-text'}`}>
                working product fast
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={reduced ? undefined : fadeInUp}
              className="mb-8 max-w-md text-lg leading-relaxed text-muted"
            >
              MVPs, automations and AI-powered tools. Built fast, shipped right.
            </motion.p>

            {/* CTAs */}
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

          {/* Right column — profile photo */}
          <motion.div
            variants={reduced ? undefined : fadeInUp}
            className="mt-14 shrink-0 lg:mt-0"
          >
            <ProfilePhoto reduced={reduced} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
