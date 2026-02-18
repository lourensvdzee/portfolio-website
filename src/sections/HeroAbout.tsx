import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useControls, folder } from 'leva'
import { fadeInUp } from '../utils/animations'
import { useReducedMotion } from '../hooks/useReducedMotion'

// Photo receives pre-computed spring values from the parent (full-page tracking)
function ProfilePhoto({
  rotateX,
  rotateY,
}: {
  rotateX: ReturnType<typeof useSpring>
  rotateY: ReturnType<typeof useSpring>
}) {
  // Correct Leva folder API: folder() wraps the schema, not a computed key
  const { posX, posY, circleSize, perspective } = useControls('Photo', {
    'Position': folder(
      {
        posX: { value: 52, min: 0, max: 100, step: 1, label: 'X %' },
        posY: { value: 15, min: 0, max: 100, step: 1, label: 'Y %' },
      },
      { collapsed: false }
    ),
    'Size & 3D': folder(
      {
        circleSize: { value: 320, min: 200, max: 480, step: 8, label: 'Size px' },
        perspective: { value: 550, min: 300, max: 1200, step: 50, label: 'Perspective' },
      },
      { collapsed: true }
    ),
  })

  const sz = `${circleSize}px`

  return (
    <div
      className="relative"
      style={{ width: sz, height: sz, perspective: `${perspective}px` }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          inset: '-24px',
          background: 'radial-gradient(circle, rgba(37,99,235,0.4) 0%, transparent 70%)',
          filter: 'blur(30px)',
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
          className="absolute rounded-full"
          style={{
            inset: '-2px',
            opacity: 0.78,
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
            style={{ objectPosition: `${posX}% ${posY}%` }}
            width={320}
            height={400}
            loading="eager"
          />
        </div>
      </motion.div>
    </div>
  )
}

export default function HeroAbout() {
  const reduced = useReducedMotion()

  // Leva tilt controls — panel visibility controlled by <Leva hidden /> in App.tsx
  const { tiltRange, tiltStiffness } = useControls('Tilt', {
    tiltRange: { value: 20, min: 5, max: 35, step: 1, label: 'Range (deg)' },
    tiltStiffness: { value: 80, min: 30, max: 200, step: 10, label: 'Stiffness' },
  })

  // Full-page mouse tracking for tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-tiltRange, tiltRange]), {
    stiffness: tiltStiffness,
    damping: 14,
  })
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [tiltRange * 0.7, -tiltRange * 0.7]), {
    stiffness: tiltStiffness,
    damping: 14,
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
      id="hero-about"
      className="hero-about relative bg-bg"
      aria-label="About Lourens"
    >
      <div className="section-inner">
        {/*
          Desktop: flex row, justify-end → bio (text-right) + photo, both right-aligned
          Mobile:  flex col, centered → photo on top, bio below
        */}
        <motion.div
          variants={reduced ? undefined : { hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center lg:flex-row lg:justify-end lg:items-center lg:gap-10"
        >
          {/* Photo — top on mobile, right on desktop */}
          <div className="order-1 lg:order-2 shrink-0">
            <ProfilePhoto rotateX={rotateX} rotateY={rotateY} />
          </div>

          {/* Bio — below on mobile, left-of-photo (text-right) on desktop */}
          <motion.div
            variants={reduced ? undefined : fadeInUp}
            className="order-2 lg:order-1 max-w-sm text-center lg:text-right mt-6 lg:mt-0"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
              Product Builder &amp; AI Prototyper
            </p>
            <p className="text-sm leading-relaxed text-muted/90">
              I'm <span className="text-text font-medium">Lourens van der Zee</span>. I help
              founders and teams turn ideas into working products, fast.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted/90">
              After 10+ years across e-commerce, SaaS and marketing, I now combine product
              thinking and AI tooling to build MVPs, automations and internal tools — testable
              in days, not months.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted/80 italic">
              I don't replace your dev team. I accelerate everything before you need them.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
