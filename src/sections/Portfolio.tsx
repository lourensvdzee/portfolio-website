import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { fadeInUp, staggerContainer } from '../utils/animations'

const items = [
  {
    title: 'E-commerce Analytics Tool',
    summary: 'Real-time sales tracking and AI-powered insights.',
    details: 'Built for a DTC brand to consolidate Shopify, Meta Ads, and Google Analytics into one view. Reduced reporting time by 80%.',
  },
  {
    title: 'AI Content Generator',
    summary: 'Multi-format content creation with brand voice control.',
    details: 'Fine-tuned LLM pipeline producing blog posts, social captions, and email sequences. Integrated with CMS for one-click publishing.',
  },
  {
    title: 'Client Portal System',
    summary: 'White-label portal for agency client management.',
    details: 'Fullstack app with role-based access, project timelines, file sharing, and automated status updates via Slack webhooks.',
  },
  {
    title: 'Lead Scoring Engine',
    summary: 'ML-powered lead qualification for sales teams.',
    details: 'Ingests CRM data, website behavior, and email engagement to score leads. Deployed as API consumed by the existing sales stack.',
  },
]

export default function Portfolio() {
  const [expanded, setExpanded] = useState<number | null>(null)
  const reduced = useReducedMotion()

  return (
    <section
      id="portfolio"
      className="sticky-section z-[60] bg-bg"
      aria-label="Portfolio"
    >
      <div className="section-inner">
        <motion.h2
          variants={reduced ? undefined : fadeInUp}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true }}
          className="mb-12 text-center text-3xl font-bold md:text-4xl"
        >
          More Work
        </motion.h2>

        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-2xl space-y-4"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              variants={reduced ? undefined : fadeInUp}
              className="rounded-2xl border border-card-border bg-card overflow-hidden"
            >
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="flex w-full items-center justify-between p-6 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
                aria-expanded={expanded === i}
              >
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted">{item.summary}</p>
                </div>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted transition-transform ${
                    expanded === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {expanded === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: reduced ? 0 : 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-card-border px-6 pb-6 pt-4">
                      <p className="text-sm text-muted">{item.details}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
