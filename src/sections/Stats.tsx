import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { fadeInUp, staggerContainer } from '../utils/animations'

const stats = [
  { label: 'Products Built', value: 12 },
  { label: 'Automations Created', value: 30 },
  { label: 'MVPs Shipped', value: 8 },
  { label: 'Hours Saved', value: 5000, suffix: '+' },
]

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) { setCount(target); return }
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const duration = 1500
        const start = performance.now()
        function animate(now: number) {
          const eased = 1 - Math.pow(1 - Math.min((now - start) / duration, 1), 3)
          setCount(Math.round(eased * target))
          if (eased < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
        observer.disconnect()
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, reduced])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

/**
 * Organic SVG top edge — echoes the LinkedIn banner's curved blue shape.
 * Left corner: dips DOWN then rises UP sharply.
 * Right corner: rises UP dramatically then comes back DOWN.
 * Both corners glow with electric blue, matching the brand.
 */
function OrganicEdge() {
  // viewBox 0 0 1440 100, y=0 is TOP, y=100 is BOTTOM (inside the Stats section)
  // The path line itself ranges from y=5 (very high) to y=88 (deep dip)
  const path = `
    M -10,55
    C 20,55 45,88 100,82
    C 145,77 175,18 240,12
    C 300,7 370,52 530,60
    C 690,67 820,44 980,56
    C 1120,66 1210,12 1330,5
    C 1390,2 1420,35 1450,58
  `

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100px',
        overflow: 'visible',
        pointerEvents: 'none',
        zIndex: 20,
      }}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100px', overflow: 'visible' }}
      >
        <defs>
          {/* Wide soft glow */}
          <filter id="glow-wide" x="-20%" y="-200%" width="140%" height="500%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Tight crisp glow */}
          <filter id="glow-tight" x="-10%" y="-100%" width="120%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Layer 1: wide diffuse glow — gives the halo */}
        <path
          d={path}
          fill="none"
          stroke="rgba(37, 99, 235, 0.55)"
          strokeWidth="10"
          filter="url(#glow-wide)"
        />
        {/* Layer 2: medium glow */}
        <path
          d={path}
          fill="none"
          stroke="rgba(59, 130, 246, 0.75)"
          strokeWidth="4"
          filter="url(#glow-tight)"
        />
        {/* Layer 3: bright sharp line */}
        <path
          d={path}
          fill="none"
          stroke="rgba(191, 219, 254, 0.95)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  )
}

export default function Stats() {
  const reduced = useReducedMotion()

  return (
    <section
      id="stats"
      className="sticky-section z-20 overflow-visible"
      style={{ background: '#040d1e' }}
      aria-label="Key statistics"
    >
      {/* Organic electric-blue top edge */}
      {!reduced && <OrganicEdge />}

      <div className="section-inner">
        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={reduced ? undefined : fadeInUp}
              className="rounded-2xl border border-card-border bg-card p-6 text-center"
            >
              <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
