import { motion } from 'framer-motion'
import { PhoneCall, Code2, Rocket } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { fadeInUp, staggerContainer } from '../utils/animations'

const steps = [
  {
    icon: PhoneCall,
    step: '01',
    label: 'Idea',
    title: 'Free MVP Feasibility Call',
    description:
      'We start by pressure-testing your idea together. In one focused session we cut through the noise — define the real problem, challenge scope assumptions, and decide whether to build, and if so, what the smallest valuable version looks like. No commitment, no wasted months.',
  },
  {
    icon: Code2,
    step: '02',
    label: 'Prototype',
    title: 'Build It — or Learn to Build It',
    description:
      'Within 1–3 days, a working prototype is in your hands. I can build it for you, or guide you or a member of your team through the process — acting as technical product lead throughout. I build in public: decisions stay reversible, progress stays visible, and you stay in control.',
  },
  {
    icon: Rocket,
    step: '03',
    label: 'Launch',
    title: 'Ship, Validate, and Decide',
    description:
      'We define success criteria before we ship — then put the product in front of real users. Based on the signal, we decide together: iterate, pivot, or hand off to a dev team. Every next step is driven by data, not assumptions or sunk-cost thinking.',
  },
]

export default function Workflow() {
  const reduced = useReducedMotion()

  return (
    <section
      id="workflow"
      className="sticky-section z-30 bg-bg"
      aria-label="How I work"
    >
      <div className="section-inner">
        <motion.h2
          variants={reduced ? undefined : fadeInUp}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true }}
          className="mb-4 text-center text-3xl font-bold md:text-4xl"
        >
          How I Work
        </motion.h2>
        <motion.p
          variants={reduced ? undefined : fadeInUp}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true }}
          className="mb-16 text-center text-muted max-w-xl mx-auto"
        >
          A lean three-step process from raw idea to shipped product.
          No fluff, no six-month roadmaps.
        </motion.p>

        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {steps.map((step) => (
            <motion.div
              key={step.label}
              variants={reduced ? undefined : fadeInUp}
              className="relative rounded-2xl border border-card-border bg-card p-7 transition-shadow hover:shadow-[0_0_28px_rgba(37,99,235,0.12)]"
            >
              {/* Step number — large subtle bg */}
              <span
                className="absolute top-5 right-6 text-6xl font-black leading-none text-white/[0.04] select-none"
                aria-hidden="true"
              >
                {step.step}
              </span>

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-card-border bg-primary/10">
                <step.icon className="h-5 w-5 text-primary" />
              </div>

              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">
                {step.label}
              </p>
              <h3 className="mb-3 text-lg font-bold leading-snug">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted" style={{ hyphens: 'none' }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
