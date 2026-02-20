import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { fadeInUp, staggerContainer } from '../utils/animations'

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

// VMDb is LAST — strongest closer
const projects: Project[] = [
  {
    id: 'outreachscraper',
    title: 'OutreachScraper',
    tagline: 'Real-time B2B lead discovery engine for local businesses',
    description:
      'OutreachScraper automatically finds local businesses on Google Maps, visits their websites, extracts verified contact emails (including from German Impressum pages), and ranks prospects by conversion likelihood. It filters out 200+ known retail chains and scores each lead on a 0 to 100 opportunity scale based on website maturity, email availability, and contact completeness.',
    extendedDescription:
      'The system uses a two-stage Google Places API strategy to minimize cost (~€0.30/lead), four parallel email extraction strategies (including obfuscated text detection), layered website age analysis (copyright headers, Last-Modified, Wayback Machine), and a chain-detection filter covering 200+ known businesses. Results stream in real-time via Server-Sent Events. Supabase persistence is optional; the tool gracefully continues offline.',
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
      'ClickLocal Mailer imports prospect lists, generates HTML email campaigns, and sends in controlled batches with quiet-hours enforcement, click/open tracking via pixel injection, and real-time Google Sheets integration for live campaign monitoring. Campaigns are persisted to disk and can be paused and resumed at any point.',
    extendedDescription:
      'Built on Express.js with Nodemailer and the Google Sheets API, it includes: automatic campaign resumption from exact send index, bilingual GDPR/CAN-SPAM opt-out footers, SMTP pre-flight verification, and link wrapping for per-contact click attribution. The Google Sheets integration gives non-technical stakeholders a live dashboard of sent/opened/clicked status per recipient. Connects directly to OutreachScraper output for an end-to-end prospecting workflow.',
    tags: ['Node.js', 'Express', 'Nodemailer', 'Google Sheets API', 'SMTP', 'TypeScript'],
    images: [
      '/bulkmailer_1.png',
      '/bulkmailer_2.png',
      '/bulkmailer_3.png',
    ],
  },
  {
    id: 'vmdb',
    title: 'VMDb',
    tagline: 'An IMDb-style discovery platform for plant-based products',
    description:
      'VMDb is a full-stack product discovery platform for plant-based foods that combines live barcode scanning, automated producer website scraping, and community reviews into a unified catalog. It features batch rating calculations for sub-second lookups, multi-layer Open Food Facts API caching, and Google Genai-powered image candidate ranking.',
    extendedDescription:
      'The platform runs multiple data pipelines simultaneously: a ZXing-powered barcode scanner (EAN-13/UPC), a producer sitemap scraper covering 50+ brands, an AI enrichment layer for missing product images and data, and a full review and moderation system. Multi-country support (Germany, Netherlands) is built-in with locale-aware sitemaps and region-filtered product queries. Built solo in a fraction of the time a traditional team would need.',
    tags: ['Next.js', 'React', 'Supabase', 'Google Genai', 'Open Food Facts', 'TypeScript'],
    images: [
      '/vmdb_header.png',
      '/vmdb_product.png',
      '/vmdb_search.png',
      '/vmdb_admin.png',
    ],
    link: 'https://vmdb.me',
  },
]

/* ── Organic electric top edge ─────────────────── */
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
      style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100px', overflow: 'visible', pointerEvents: 'none', zIndex: 20 }}
    >
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100px', overflow: 'visible' }}>
        <defs>
          <filter id="glow-wide" x="-20%" y="-200%" width="140%" height="500%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-tight" x="-10%" y="-100%" width="120%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path d={path} fill="none" stroke="rgba(37,99,235,0.55)" strokeWidth="10" filter="url(#glow-wide)" />
        <path d={path} fill="none" stroke="rgba(59,130,246,0.75)" strokeWidth="4" filter="url(#glow-tight)" />
        <path d={path} fill="none" stroke="rgba(191,219,254,0.95)" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

/* ── Project modal — image gallery + full content ── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [imgIndex, setImgIndex] = useState(0)
  const [dir, setDir] = useState(0)

  const prev = () => { setDir(-1); setImgIndex((i) => (i - 1 + project.images.length) % project.images.length) }
  const next = () => { setDir(1); setImgIndex((i) => (i + 1) % project.images.length) }

  const imgVariants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />
      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="fixed inset-x-3 top-[3%] bottom-[3%] sm:inset-x-8 sm:top-[5%] sm:bottom-[5%] z-[201] max-w-4xl mx-auto flex flex-col lg:flex-row rounded-2xl overflow-hidden border border-white/10"
        style={{ background: '#040d1e' }}
        role="dialog"
        aria-label={project.title}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image area */}
        <div className="relative lg:w-[55%] shrink-0 bg-black overflow-hidden min-h-[180px] sm:min-h-[240px]">
          <AnimatePresence custom={dir} mode="wait">
            <motion.img
              key={imgIndex}
              custom={dir}
              variants={imgVariants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.2, ease: 'easeOut' }}
              src={project.images[imgIndex]}
              alt={`${project.title} screenshot ${imgIndex + 1}`}
              className="w-full h-full object-cover object-top absolute inset-0"
              draggable={false}
            />
          </AnimatePresence>

          {project.images.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/75 z-10" aria-label="Previous">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/75 z-10" aria-label="Next">
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {project.images.map((_, i) => (
                  <button key={i} onClick={() => { setDir(i > imgIndex ? 1 : -1); setImgIndex(i) }}
                    className={`h-1.5 rounded-full transition-all ${i === imgIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/40'}`}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          <h3 className="text-xl sm:text-2xl font-bold mb-1">{project.title}</h3>
          <p className="text-xs sm:text-sm font-semibold text-accent mb-4">{project.tagline}</p>
          <p className="text-sm leading-relaxed text-muted/90 mb-3" style={{ hyphens: 'none' }}>{project.description}</p>
          <p className="text-sm leading-relaxed text-muted/70" style={{ hyphens: 'none' }}>{project.extendedDescription}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">{tag}</span>
            ))}
          </div>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors">
              Visit {project.title} <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        {/* Close */}
        <button onClick={onClose} className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 z-10" aria-label="Close">
          <X className="h-4 w-4" />
        </button>
      </motion.div>
    </>
  )
}

/* ── Compact tile ─────────────────────────────── */
function ProjectTile({ project, reduced, onClick }: { project: Project; reduced: boolean; onClick: () => void }) {
  return (
    <motion.button
      variants={reduced ? undefined : fadeInUp}
      onClick={onClick}
      className="w-full text-left rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden cursor-pointer transition-all hover:border-primary/40 hover:shadow-[0_0_28px_rgba(37,99,235,0.15)] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      aria-haspopup="dialog"
    >
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img src={project.images[0]} alt={`${project.title} preview`}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-base font-bold leading-tight">{project.title}</h3>
        <p className="mt-0.5 text-xs font-medium text-accent">{project.tagline}</p>
        <p className="mt-2 text-xs leading-relaxed text-muted/80 line-clamp-3" style={{ hyphens: 'none' }}>{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">{tag}</span>
          ))}
          {project.tags.length > 3 && (
            <span className="rounded-md bg-white/[0.05] px-2 py-0.5 text-[10px] text-muted">+{project.tags.length - 3}</span>
          )}
        </div>
        <p className="mt-3 text-xs font-semibold text-primary">Explore →</p>
      </div>
    </motion.button>
  )
}

export default function FeaturedProjects() {
  const reduced = useReducedMotion()
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section
      id="projects"
      className="sticky-section z-20 overflow-visible"
      style={{
        background: 'linear-gradient(180deg, transparent 0%, transparent 50px, rgba(4,13,30,0.95) 110px, #040d1e 150px)',
      }}
      aria-label="Featured projects"
    >
      {!reduced && <OrganicEdge />}

      {/* Extra top padding clears the organic line (100px) */}
      <div className="section-inner" style={{ paddingTop: '7rem' }}>
        <motion.div initial={reduced ? undefined : 'hidden'} whileInView={reduced ? undefined : 'visible'} viewport={{ once: true }}>
          <motion.h2 variants={reduced ? undefined : fadeInUp} className="mb-2 text-center text-3xl font-bold md:text-4xl">
            Featured Project Examples
          </motion.h2>
          <motion.p variants={reduced ? undefined : fadeInUp} className="mb-8 text-center text-sm text-muted">
            Real tools. Built solo. Shipped fast.
          </motion.p>
        </motion.div>

        {/*
          Desktop (lg+): 3-column grid — all tiles visible in viewport
          Mobile: horizontal scroll carousel, snap, one tile per view
        */}
        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.1 }}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible lg:mx-0 lg:px-0 lg:pb-0"
        >
          {projects.map((project) => (
            <div key={project.id} className="snap-start shrink-0 w-[82vw] sm:w-[60vw] md:w-[46vw] lg:w-auto">
              <ProjectTile project={project} reduced={reduced} onClick={() => setSelected(project)} />
            </div>
          ))}
        </motion.div>

        <motion.p
          variants={reduced ? undefined : fadeInUp}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true }}
          className="mt-6 text-center text-xs text-muted/50"
        >
          For more projects and case studies,{' '}
          <a href="#contact" className="text-primary hover:text-accent transition-colors font-medium">get in touch</a>.
        </motion.p>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
