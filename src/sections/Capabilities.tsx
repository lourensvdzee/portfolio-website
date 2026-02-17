import { motion } from 'framer-motion'
import {
  Zap,
  Brain,
  BarChart3,
  Settings,
  Wrench,
  FlaskConical,
} from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { fadeInUp, staggerContainer } from '../utils/animations'

const capabilities = [
  { icon: Zap, title: 'MVP Development', description: 'Idea to live product at startup speed.' },
  { icon: Brain, title: 'AI Integrations', description: 'LLMs, embeddings, agents — production-ready.' },
  { icon: BarChart3, title: 'Dashboards', description: 'Data-rich interfaces that make sense.' },
  { icon: Settings, title: 'Automation Systems', description: 'Workflows that run while you sleep.' },
  { icon: Wrench, title: 'Internal Tools', description: 'Custom tools your team actually uses.' },
  { icon: FlaskConical, title: 'Validation Products', description: 'Test ideas before you invest.' },
]

export default function Capabilities() {
  const reduced = useReducedMotion()

  return (
    <section
      id="capabilities"
      className="sticky-section z-50 bg-bg"
      aria-label="Capabilities"
    >
      <div className="section-inner">
        <motion.h2
          variants={reduced ? undefined : fadeInUp}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true }}
          className="mb-12 text-center text-3xl font-bold md:text-4xl"
        >
          What I Build
        </motion.h2>

        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {capabilities.map((cap) => (
            <motion.div
              key={cap.title}
              variants={reduced ? undefined : fadeInUp}
              className="rounded-2xl border border-card-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(37,99,235,0.1)]"
            >
              <cap.icon className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-lg font-semibold">{cap.title}</h3>
              <p className="text-sm text-muted">{cap.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
