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
    if (reduced) {
      setCount(target)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const duration = 1500
          const start = performance.now()

          function animate(now: number) {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
          }

          requestAnimationFrame(animate)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, reduced])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function Stats() {
  const reduced = useReducedMotion()

  return (
    <section
      id="stats"
      className="sticky-section z-20 stats-reveal"
      aria-label="Key statistics"
    >
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
