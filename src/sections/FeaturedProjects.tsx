import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { fadeInUp, staggerContainer } from '../utils/animations'

interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  fullDescription: string
  problem: string
  tools: string[]
  result: string
}

const projects: Project[] = [
  {
    id: 'project-1',
    title: 'AI Dashboard Builder',
    description: 'Drag-and-drop dashboard creation powered by AI.',
    tags: ['React', 'OpenAI', 'TypeScript'],
    fullDescription:
      'A full-stack dashboard builder that lets non-technical users create data dashboards using natural language prompts.',
    problem: 'Teams spent weeks building internal dashboards manually.',
    tools: ['React', 'Node.js', 'OpenAI API', 'PostgreSQL'],
    result: 'Reduced dashboard creation time from weeks to minutes.',
  },
  {
    id: 'project-2',
    title: 'Automation Engine',
    description: 'No-code workflow automation for small businesses.',
    tags: ['Python', 'FastAPI', 'React'],
    fullDescription:
      'A visual workflow builder connecting 50+ integrations for automated business processes.',
    problem: 'Small businesses needed Zapier-level automation without the cost.',
    tools: ['Python', 'FastAPI', 'React', 'Redis'],
    result: '30+ automations deployed, saving 200+ hours per month.',
  },
  {
    id: 'project-3',
    title: 'MVP Launchpad',
    description: 'Rapid prototyping toolkit for startup founders.',
    tags: ['Next.js', 'Supabase', 'Stripe'],
    fullDescription:
      'A boilerplate and component library that accelerates MVP development from idea to launch.',
    problem: 'Founders spent months on boilerplate before validating ideas.',
    tools: ['Next.js', 'Supabase', 'Stripe', 'Vercel'],
    result: '8 MVPs launched in under 2 weeks each.',
  },
]

export default function FeaturedProjects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const reduced = useReducedMotion()

  return (
    <section
      id="projects"
      className="sticky-section z-30 bg-bg"
      aria-label="Featured projects"
    >
      <div className="section-inner">
        <motion.h2
          variants={reduced ? undefined : fadeInUp}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true }}
          className="mb-12 text-center text-3xl font-bold md:text-4xl"
        >
          Featured Projects
        </motion.h2>

        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.button
              key={project.id}
              variants={reduced ? undefined : fadeInUp}
              layoutId={reduced ? undefined : project.id}
              onClick={() => setSelected(project)}
              className="cursor-pointer rounded-2xl border border-card-border bg-card p-6 text-left transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-haspopup="dialog"
            >
              <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
              <p className="mb-4 text-sm text-muted">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelected(null)}
              aria-hidden="true"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                layoutId={reduced ? undefined : selected.id}
                initial={reduced ? { opacity: 0 } : undefined}
                animate={reduced ? { opacity: 1 } : undefined}
                exit={reduced ? { opacity: 0 } : undefined}
                className="relative w-full max-w-lg rounded-2xl border border-card-border bg-bg p-8"
                role="dialog"
                aria-label={selected.title}
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 rounded-lg p-1 text-muted transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-primary"
                  aria-label="Close dialog"
                >
                  <X className="h-5 w-5" />
                </button>
                <h3 className="mb-4 text-2xl font-bold">{selected.title}</h3>
                <p className="mb-4 text-muted">{selected.fullDescription}</p>
                <div className="mb-4">
                  <h4 className="mb-1 text-sm font-semibold uppercase tracking-wider text-accent">
                    Problem
                  </h4>
                  <p className="text-sm text-muted">{selected.problem}</p>
                </div>
                <div className="mb-4">
                  <h4 className="mb-1 text-sm font-semibold uppercase tracking-wider text-accent">
                    Tools Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold uppercase tracking-wider text-accent">
                    Result
                  </h4>
                  <p className="text-sm text-muted">{selected.result}</p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
