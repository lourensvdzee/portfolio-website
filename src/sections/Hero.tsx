import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ArrowDown, Calendar } from 'lucide-react'
import { fadeInUp, staggerContainer } from '../utils/animations'
import { useReducedMotion } from '../hooks/useReducedMotion'

// Photo receives pre-computed spring values from the parent (full-page tracking)
function ProfilePhoto({
  rotateX,
  rotateY,
}: {
  rotateX: ReturnType<typeof useSpring>
  rotateY: ReturnType<typeof useSpring>
}) {
  return (
    <div className="relative h-80 w-80 md:h-88 md:w-88" style={{ perspective: '800px' }}>
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-[-24px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.38) 0%, transparent 70%)',
          filter: 'blur(28px)',
        }}
        aria-hidden="true"
      />
      {/* Tilt wrapper */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-full w-full"
      >
        {/* Conic glow ring */}
        <div
          className="absolute inset-[-2px] rounded-full opacity-75"
          style={{
            background:
              'conic-gradient(from 180deg, #1d4ed8 0%, #3b82f6 35%, #93c5fd 55%, #3b82f6 75%, #1d4ed8 100%)',
            filter: 'blur(1px)',
          }}
          aria-hidden="true"
        />
        <div className="relative h-full w-full overflow-hidden rounded-full border border-primary/20">
          <img
            src="/profile.webp"
            alt="Lourens van der Zee — Portrait"
            className="h-full w-full object-cover"
            style={{ objectPosition: '52% 15%' }}
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

  // Full-page mouse tracking for the tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-10, 10]), {
    stiffness: 120,
    damping: 18,
  })
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [8, -8]), {
    stiffness: 120,
    damping: 18,
  })

  useEffect(() => {
    if (reduced) return

    function onMove(e: MouseEvent) {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduced, mouseX, mouseY])

  return (
    <section
      id="hero"
      className="hero-section relative bg-bg"
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

      <div className="section-inner">
        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : 'hidden'}
          animate={reduced ? undefined : 'visible'}
          className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left lg:gap-16 xl:gap-24"
        >
          {/* ── LEFT COLUMN: Headline + description + CTAs ── */}
          <div className="flex-1 w-full max-w-xl lg:pt-6">
            {/* Headline */}
            <motion.h1
              variants={reduced ? undefined : fadeInUp}
              className="mb-5 font-bold leading-[1.08] tracking-tight"
            >
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-text/70 font-semibold">
                From idea to
              </span>
              <span
                className={`block text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl text-primary whitespace-nowrap${reduced ? '' : ' glitch-text'}`}
              >
                working product fast
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={reduced ? undefined : fadeInUp}
              className="mb-8 text-base sm:text-lg leading-relaxed text-muted max-w-md mx-auto lg:mx-0"
            >
              MVPs, automations and AI-powered tools. Built fast, shipped right.
            </motion.p>

            {/* CTAs — always side by side */}
            <motion.div
              variants={reduced ? undefined : fadeInUp}
              className="flex items-center justify-center gap-3 lg:justify-start"
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
          </div>

          {/* ── RIGHT COLUMN: Photo + role badge + bio ── */}
          <motion.div
            variants={reduced ? undefined : fadeInUp}
            className="mt-12 lg:mt-0 shrink-0 flex flex-col items-center lg:items-start"
          >
            {/* rotateX/Y are 0 when reduced (useEffect skips the listener) */}
            <ProfilePhoto rotateX={rotateX} rotateY={rotateY} />

            {/* Role badge + bio — below image */}
            <div className="mt-6 max-w-sm text-center lg:text-left">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
                Product Builder &amp; AI Prototyper
              </p>
              <p className="text-sm leading-relaxed text-muted/90">
                I'm <span className="text-text font-medium">Lourens van der Zee</span>. I help founders and teams turn
                ideas into working products, fast.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted/90">
                After 10+ years across e-commerce, SaaS and marketing, I now combine
                product thinking and AI tooling to build MVPs, automations and
                internal tools — testable in days, not months.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted/80 italic">
                I don't replace your dev team. I accelerate everything before you need them.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
