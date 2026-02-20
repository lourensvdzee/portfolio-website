import { motion } from 'framer-motion'
import { Zap, Brain, BarChart3, Settings, Wrench, FlaskConical } from 'lucide-react'
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

/**
 * A different organic edge variant — softer, rhythmic sine-wave pattern
 * vs. the dramatic peaks/valleys of FeaturedProjects.
 * Colors: lighter cyan/teal dominant, less neon.
 */
function WaveEdge() {
  // Smooth sine-wave path: rises and falls gently across the full width
  const path = `
    M -10,48
    C 60,48 100,22 200,28
    C 300,34 380,68 500,62
    C 620,56 700,24 840,30
    C 980,36 1060,66 1200,58
    C 1300,52 1390,42 1450,45
  `

  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100px', overflow: 'visible', pointerEvents: 'none', zIndex: 20 }}
    >
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100px', overflow: 'visible' }}>
        <defs>
          {/* Softer, wider halo */}
          <filter id="wave-halo" x="-20%" y="-200%" width="140%" height="500%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {/* Mid glow */}
          <filter id="wave-glow" x="-10%" y="-100%" width="120%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Wide halo — more spread, lighter opacity */}
        <path d={path} fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="14" filter="url(#wave-halo)" />
        {/* Mid glow — cyan-ish */}
        <path d={path} fill="none" stroke="rgba(99,179,255,0.55)" strokeWidth="5" filter="url(#wave-glow)" />
        {/* Crisp line — lighter, not harsh white */}
        <path d={path} fill="none" stroke="rgba(186,230,253,0.80)" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

export default function Capabilities() {
  const reduced = useReducedMotion()

  return (
    <section
      id="capabilities"
      className="sticky-section z-40 overflow-visible"
      style={{ background: 'linear-gradient(180deg, transparent 0%, transparent 30px, rgba(2,6,23,0.95) 80px, #020617 120px)' }}
      aria-label="What I Build"
    >
      {!reduced && <WaveEdge />}

      <div className="section-inner" style={{ paddingTop: '6.5rem' }}>
        <motion.h2
          variants={reduced ? undefined : fadeInUp}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true }}
          className="mb-8 text-center text-3xl font-bold md:text-4xl"
        >
          What I Build
        </motion.h2>

        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3"
        >
          {capabilities.map((cap) => (
            <motion.div
              key={cap.title}
              variants={reduced ? undefined : fadeInUp}
              className="rounded-2xl border border-card-border bg-card p-4 sm:p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(37,99,235,0.1)]"
            >
              <cap.icon className="mb-3 h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <h3 className="mb-1 text-sm sm:text-lg font-semibold leading-snug">{cap.title}</h3>
              <p className="text-xs sm:text-sm text-muted">{cap.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
