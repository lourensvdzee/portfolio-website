import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useControls, folder } from 'leva'
import { fadeInUp } from '../utils/animations'
import { useReducedMotion } from '../hooks/useReducedMotion'

function ProfilePhoto({
  rotateX,
  rotateY,
}: {
  rotateX: ReturnType<typeof useSpring>
  rotateY: ReturnType<typeof useSpring>
}) {
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
      className="relative profile-photo-wrapper"
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

  const { tiltRange, tiltStiffness } = useControls('Tilt', {
    tiltRange: { value: 28, min: 5, max: 45, step: 1, label: 'Range (deg)' },
    tiltStiffness: { value: 80, min: 30, max: 200, step: 10, label: 'Stiffness' },
  })

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
    function onTouch(e: TouchEvent) {
      const t = e.touches[0]
      if (!t) return
      mouseX.set((t.clientX / window.innerWidth - 0.5) * 2)
      mouseY.set((t.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [reduced, mouseX, mouseY])

  return (
    <section
      id="hero-about"
      className="hero-about"
      aria-label="About Lourens"
    >
      {/*
        Background is handled by the .hero-about CSS gradient (transparent → solid).
        No JS overlay needed.
      */}
      <div className="section-inner">
        <div className="flex flex-col items-center pb-16 lg:pb-0 lg:flex-row lg:justify-end lg:items-center lg:gap-12">

          {/* Photo — top on mobile, right on desktop */}
          <motion.div
            initial={reduced ? undefined : { y: 55, opacity: 0, scale: 0.93 }}
            whileInView={reduced ? undefined : { y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={
              reduced
                ? undefined
                : { type: 'spring', stiffness: 90, damping: 7, mass: 1.6 }
            }
            className="order-1 lg:order-2 shrink-0"
          >
            <ProfilePhoto rotateX={rotateX} rotateY={rotateY} />
          </motion.div>

          {/* Bio text — below on mobile, left-of-photo (text-right) on desktop */}
          <motion.div
            variants={reduced ? undefined : fadeInUp}
            initial={reduced ? undefined : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.3 }}
            className="order-2 lg:order-1 max-w-md text-center lg:text-right mt-6 lg:mt-0"
          >
            {/* Role badge — electric lightning glitch */}
            <p
              className={`mb-5 text-base sm:text-lg md:text-xl font-bold uppercase tracking-widest text-accent${reduced ? '' : ' badge-glitch'}`}
            >
              Product Builder &amp; AI Prototyper
            </p>

            <p
              className="text-base sm:text-lg leading-relaxed text-muted/90"
              style={{ hyphens: 'none' }}
            >
              I'm <span className="text-text font-semibold">Lourens van der Zee</span>. I help
              founders and teams turn ideas into working products, fast.
            </p>
            <p
              className="mt-4 text-base sm:text-lg leading-relaxed text-muted/90"
              style={{ hyphens: 'none' }}
            >
              After 15+ years across SaaS, e-commerce and marketing, I combine product
              thinking with AI tooling to build MVPs, automations and internal tools.
              All testable in days, not months.
            </p>
            <p
              className="mt-4 text-sm sm:text-base leading-relaxed text-muted/70 italic"
              style={{ hyphens: 'none' }}
            >
              I don't replace your dev team. I accelerate everything before you need them.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
