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
      'VMDb is a full-stack product discovery platform for plant-based foods that combines live barcode scanning, automated producer website scraping, and community reviews into a unified catalog. Built with Next.js (public app) and a separate React admin panel, it features intelligent batch rating calculations for sub-second lookups across thousands of products, multi-layer Open Food Facts API caching, and Google Genai-powered image candidate ranking.',
    extendedDescription:
      'The platform runs multiple data pipelines simultaneously: a ZXing-powered barcode scanner (EAN-13/UPC), a producer sitemap scraper covering 50+ brands, an AI enrichment layer for missing product images and data, and a full review + moderation system. Multi-country support (Germany, Netherlands) is built-in with locale-aware sitemaps and region-filtered product queries. Built solo in a fraction of the time a traditional team would need — a direct proof of concept for AI-accelerated product building.',
    tags: ['Next.js', 'React', 'Supabase', 'Google Genai', 'Open Food Facts', 'Barcode', 'TypeScript'],
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
    tagline: 'Real-time B2B lead discovery engine for local businesses',
    description:
      'OutreachScraper automatically finds local businesses on Google Maps, visits their websites, extracts verified contact emails (including from German Impressum pages), and ranks prospects by conversion likelihood — streaming results live as they are discovered. It filters out 200+ known retail chains and scores each lead on a 0–100 opportunity scale based on website maturity, email availability, and contact completeness.',
    extendedDescription:
      'The system uses a two-stage Google Places API strategy to minimize cost (~€0.30/lead), four parallel email extraction strategies (including obfuscated text detection), layered website age analysis (copyright headers → Last-Modified → Wayback Machine), and a chain-detection filter covering 200+ known businesses. Results stream in real-time via Server-Sent Events — no waiting for all results before you can act. Supabase persistence is optional; the tool gracefully continues offline.',
    tags: ['Next.js', 'Google Places API', 'TypeScript', 'Supabase', 'SSE', 'Web Scraping'],
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
    tagline: 'Campaign tool with deliverability safeguards and live tracking',
    description:
      'ClickLocal Mailer is a lightweight outbound campaign system that imports prospect lists, generates HTML email campaigns, and sends in controlled batches — with quiet-hours enforcement, click/open tracking via pixel injection, and real-time Google Sheets integration for live campaign monitoring. Campaigns are persisted to disk so they survive server restarts and can be paused and resumed at any point.',
    extendedDescription:
      'Built on Express.js with Nodemailer and the Google Sheets API, it includes: automatic campaign resumption from exact send index, bilingual GDPR/CAN-SPAM opt-out footers, SMTP pre-flight verification, and link wrapping for per-contact click attribution. The Google Sheets integration gives non-technical stakeholders a live dashboard of sent/opened/clicked status per recipient. Connects directly to OutreachScraper output for an end-to-end prospecting workflow.',
    tags: ['Node.js', 'Express', 'Nodemailer', 'Google Sheets API', 'SMTP', 'TypeScript'],
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
