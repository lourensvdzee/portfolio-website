import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { fadeInUp, staggerContainer } from '../utils/animations'
import ImageLightbox from '../components/ui/ImageLightbox'

interface Project {
  id: string
  title: string
  tagline: string
  description: string
  extendedDescription: string
  tags: string[]
  images: string[]
  link?: string
}

const projects: Project[] = [
  {
    id: 'vmdb',
    title: 'VMDb',
    tagline: 'An IMDb-style discovery platform for plant-based products',
    description:
      'VMDb is a product discovery and data platform for plant-based foods — built to prove how fast complex consumer platforms can be prototyped with AI-assisted development. It includes barcode scanning for instant product lookup, image-to-text extraction for ingredient lists, automated producer scraping, Open Food Facts API integration, and AI-assisted systems that locate missing product images and fill structured data gaps.',
    extendedDescription:
      'The platform handles multiple data pipelines simultaneously: a live barcode scanner, an OCR pipeline for label photos, a producer scraper, and an AI enrichment layer that fills in missing fields. Admin tooling allows manual review of AI suggestions before they go live. Built solo in a fraction of the time a traditional team would need — as a direct proof of concept for AI-accelerated product building.',
    tags: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'OpenAI', 'OCR', 'Scraping'],
    images: [
      '/vmdb_header.png',
      '/vmdb_product.png',
      '/vmdb_search.png',
      '/vmdb_admin.png',
    ],
  },
  {
    id: 'outreachscraper',
    title: 'OutreachScraper',
    tagline: 'Automated lead discovery engine for local businesses',
    description:
      'OutreachScraper is a lead discovery engine that automatically finds local businesses via Google Maps, visits their websites, extracts contact emails from legal and contact pages, evaluates website freshness, and streams results live as they are discovered. It replaces hours of manual prospecting with a single structured workflow.',
    extendedDescription:
      'The system combines location-based search, multi-page website traversal, heuristic contact extraction, and a live-streaming results feed — all from a clean UI. Designed to be fast and scrappy: built for real outreach campaigns, not as a demo. Demonstrates how automation can turn a tedious daily process into a scalable, repeatable system in days.',
    tags: ['Python', 'Playwright', 'FastAPI', 'React', 'TypeScript', 'SQLite'],
    images: [
      '/outreachscraper_1.png',
      '/outreachscraper_2.png',
      '/outreachscraper_3.png',
      '/outreachscraper_4.png',
      '/outreachscraper_5.png',
    ],
  },
  {
    id: 'bulkmailer',
    title: 'ClickLocal Mailer',
    tagline: 'Lightweight bulk outreach system for targeted campaigns',
    description:
      'ClickLocal Mailer is a lightweight outbound campaign system built for fast, targeted outreach. It allows users to import prospect data, generate structured email campaigns, and send in batches — with deliverability safeguards and clean formatting built in. Built to replace heavy off-the-shelf marketing platforms for a specific, practical workflow.',
    extendedDescription:
      'The tool connects directly to a prospect list (e.g. output from OutreachScraper), lets you compose templates, preview per-contact, and send in controlled batches. Throttling and sender rotation prevent deliverability issues. A lightweight alternative to platforms like Mailchimp when you need to move fast and control every step of the process yourself.',
    tags: ['Python', 'React', 'FastAPI', 'TypeScript', 'SMTP', 'CSV import'],
    images: [
      '/bulkmailer_1.png',
      '/bulkmailer_2.png',
      '/bulkmailer_3.png',
    ],
  },
]

/* ── Organic electric top edge (moved from Stats) ──────── */
function OrganicEdge() {
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
          <filter id="glow-wide" x="-20%" y="-200%" width="140%" height="500%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-tight" x="-10%" y="-100%" width="120%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d={path}
          fill="none"
          stroke="rgba(37, 99, 235, 0.55)"
          strokeWidth="10"
          filter="url(#glow-wide)"
        />
        <path
          d={path}
          fill="none"
          stroke="rgba(59, 130, 246, 0.75)"
          strokeWidth="4"
          filter="url(#glow-tight)"
        />
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

/* ── Single project card ─────────────────────────── */
function ProjectCard({ project, reduced }: { project: Project; reduced: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({
    open: false,
    index: 0,
  })

  return (
    <motion.div
      variants={reduced ? undefined : fadeInUp}
      className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden"
    >
      {/* Image row */}
      <div className="flex gap-2 p-4 pb-0">
        {project.images.slice(0, 4).map((img, i) => (
          <button
            key={img}
            onClick={() => setLightbox({ open: true, index: i })}
            className={`relative overflow-hidden rounded-xl transition-all hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(37,99,235,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer ${
              i === 0
                ? 'flex-[2] aspect-[16/9]'
                : 'flex-1 aspect-[4/3]'
            }`}
            aria-label={`View ${project.title} screenshot ${i + 1}`}
          >
            <img
              src={img}
              alt={`${project.title} screenshot ${i + 1}`}
              className="h-full w-full object-cover object-top"
              loading="lazy"
            />
            {/* Image count badge on last visible */}
            {i === 3 && project.images.length > 4 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-semibold text-white">
                +{project.images.length - 4}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="mb-1 text-2xl font-bold">{project.title}</h3>
        <p className="mb-3 text-sm font-medium text-accent">{project.tagline}</p>
        <p className="mb-4 text-sm leading-relaxed text-muted/90 sm:text-base" style={{ hyphens: 'none' }}>
          {project.description}
        </p>

        {/* Expandable section */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <p
                className="mb-4 text-sm leading-relaxed text-muted/80 sm:text-base"
                style={{ hyphens: 'none' }}
              >
                {project.extendedDescription}
              </p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors mb-4"
                >
                  Visit project <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tags + show more row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-2">
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
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-card-border bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:text-text hover:border-primary/40"
          >
            {expanded ? (
              <>Show less <ChevronUp className="h-3.5 w-3.5" /></>
            ) : (
              <>Show more <ChevronDown className="h-3.5 w-3.5" /></>
            )}
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <ImageLightbox
          images={project.images}
          startIndex={lightbox.index}
          alt={project.title}
          onClose={() => setLightbox({ open: false, index: 0 })}
        />
      )}
    </motion.div>
  )
}

export default function FeaturedProjects() {
  const reduced = useReducedMotion()

  return (
    <section
      id="projects"
      className="sticky-section z-20 overflow-visible"
      style={{
        /* Transparent at top (see-through to HeroAbout behind), solid from 100px down */
        background: 'linear-gradient(180deg, transparent 0%, transparent 50px, rgba(4,13,30,0.92) 110px, #040d1e 150px)',
      }}
      aria-label="Featured projects"
    >
      {/* Organic edge — visually IS the top of this section */}
      {!reduced && <OrganicEdge />}

      <div className="section-inner">
        <motion.div
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true }}
        >
          <motion.h2
            variants={reduced ? undefined : fadeInUp}
            className="mb-3 text-center text-3xl font-bold md:text-4xl"
          >
            Featured Project Examples
          </motion.h2>
          <motion.p
            variants={reduced ? undefined : fadeInUp}
            className="mb-12 text-center text-muted"
          >
            Real tools, built fast — each a proof of what AI-assisted product building can do.
          </motion.p>
        </motion.div>

        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col gap-8"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} reduced={reduced} />
          ))}
        </motion.div>

        {/* Footer nudge */}
        <motion.p
          variants={reduced ? undefined : fadeInUp}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true }}
          className="mt-10 text-center text-sm text-muted/60"
        >
          For more projects and case studies,{' '}
          <a href="#contact" className="text-primary hover:text-accent transition-colors font-medium">
            get in touch
          </a>
          .
        </motion.p>
      </div>
    </section>
  )
}
