import { motion } from 'framer-motion'
import { Lightbulb, Code, Package, Rocket } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { fadeInUp, staggerContainer } from '../utils/animations'

const steps = [
  { icon: Lightbulb, label: 'Idea', description: 'Validate the concept' },
  { icon: Code, label: 'Prototype', description: 'Build fast, iterate faster' },
  { icon: Package, label: 'Product', description: 'Polish & harden' },
  { icon: Rocket, label: 'Launch', description: 'Ship to real users' },
]

export default function Workflow() {
  const reduced = useReducedMotion()

  return (
    <section
      id="workflow"
      className="sticky-section z-40 bg-bg"
      aria-label="Workflow process"
    >
      <div className="section-inner">
        <motion.h2
          variants={reduced ? undefined : fadeInUp}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true }}
          className="mb-16 text-center text-3xl font-bold md:text-4xl"
        >
          How I Work
        </motion.h2>

        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.3 }}
          className="relative flex flex-col items-center gap-8 md:flex-row md:justify-between"
        >
          {/* Connecting line */}
          <div
            className="absolute top-1/2 right-0 left-0 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent md:block"
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              variants={reduced ? undefined : fadeInUp}
              className="relative z-10 flex flex-col items-center gap-3"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-card-border bg-card transition-shadow hover:shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                <step.icon className="h-7 w-7 text-primary" />
              </div>
              <span className="text-sm font-semibold">{step.label}</span>
              <span className="text-xs text-muted">{step.description}</span>
              {i < steps.length - 1 && (
                <div className="h-8 w-px bg-primary/20 md:hidden" aria-hidden="true" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
