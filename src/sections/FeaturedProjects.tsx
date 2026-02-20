import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ExternalLink, ZoomIn } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { staggerContainer } from '../utils/animations'

interface Project {
  id: string
  title: string
  tagline: string
  description: string
  tags: string[]
  images: string[]
  link?: string
}

// VMDb is LAST — strongest closer
const projects: Project[] = [
  {
    id: 'prospectengine',
    title: 'Prospect Engine',
    tagline: 'Custom lead discovery system for niche outreach',
    description:
      'Built for agencies that need highly specific prospect lists that standard tools cannot generate. Finds local businesses, analyzes their websites, extracts verified emails including from legal pages, and scores leads based on real opportunity signals like site maturity and contact completeness. Created to give small teams affordable, tailored prospecting power.',
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
    id: 'campaignsender',
    title: 'Campaign Sender',
    tagline: 'Controlled email delivery system for outbound campaigns',
    description:
      'Built as a lightweight alternative to bulky outreach platforms. Includes real deliverability infrastructure (DNS/DKIM/SPF/DMARC), timing controls, and click/open tracking without branding or feature restrictions. Designed for teams that want full control over how their outreach behaves instead of adapting to someone else\'s software.',
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
    tagline: 'Structured product discovery platform for plant-based goods',
    description:
      'Started as a validation prototype and evolved into a live platform that aggregates product data, images, reviews, and producer information into one system. Includes barcode lookup, automated data enrichment, AI-assisted image selection, filtering, accounts, and multi-country support. Demonstrates how complex real-world platforms can be built quickly from concept to working product.',
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

/* ── Full-screen image lightbox ─────────────────── */
function ImageLightbox({
  images,
  startIndex,
  onClose,
}: {
  images: string[]
  startIndex: number
  onClose: () => void
}) {
  const [idx, setIdx] = useState(startIndex)
  const [dir, setDir] = useState(0)

  const prev = () => { setDir(-1); setIdx((i) => (i - 1 + images.length) % images.length) }
  const next = () => { setDir(1); setIdx((i) => (i + 1) % images.length) }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [idx])

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -50 : 50, opacity: 0 }),
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <AnimatePresence custom={dir} mode="wait">
        <motion.img
          key={idx}
          custom={dir}
          variants={variants}
          initial="enter" animate="center" exit="exit"
          transition={{ duration: 0.18 }}
          src={images[idx]}
          alt={`Screenshot ${idx + 1}`}
          className="h-full w-full object-contain select-none sm:h-auto sm:max-h-[90vh] sm:w-auto sm:max-w-[90vw]"
          onClick={(e) => e.stopPropagation()}
          draggable={false}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black/90 border border-white/20 backdrop-blur-sm"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black/90 border border-white/20 backdrop-blur-sm"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-white/50 select-none">
            {idx + 1} / {images.length}
          </p>
        </>
      )}

      <button
        onClick={onClose}
        className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black/90 border border-white/20 backdrop-blur-sm shadow-lg"
        aria-label="Close fullscreen"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  )
}

/* ── Project modal — vertical layout: image on top, content below ── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [imgIndex, setImgIndex] = useState(0)
  const [dir, setDir] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

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

      {/* Panel — always vertical, wider on desktop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="fixed inset-x-3 top-[3%] bottom-[3%] sm:inset-x-6 md:inset-x-[8%] lg:inset-x-[10%] xl:inset-x-[14%] z-[201] flex flex-col sm:flex-row rounded-2xl overflow-hidden border border-white/10"
        style={{ background: '#040d1e' }}
        role="dialog"
        aria-label={project.title}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image area — top, full width, clickable to enlarge */}
        <div className="relative h-52 sm:h-full sm:w-5/6 shrink-0 bg-black overflow-hidden">
          <AnimatePresence custom={dir} mode="wait">
            <motion.img
              key={imgIndex}
              custom={dir}
              variants={imgVariants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.2, ease: 'easeOut' }}
              src={project.images[imgIndex]}
              alt={`${project.title} screenshot ${imgIndex + 1}`}
              className="w-full h-full object-cover object-top absolute inset-0 cursor-zoom-in"
              draggable={false}
              onClick={() => setLightboxOpen(true)}
            />
          </AnimatePresence>

          {/* Zoom hint */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[10px] text-white/70 pointer-events-none backdrop-blur-sm">
            <ZoomIn className="h-3 w-3" />
            Click to enlarge
          </div>

          {project.images.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 z-10 backdrop-blur-sm" aria-label="Previous">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 z-10 backdrop-blur-sm" aria-label="Next">
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="absolute bottom-2 right-2 flex gap-1.5 z-10">
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

        {/* Content — scrollable, narrow on desktop (1/6 of modal) */}
        <div className="flex-1 sm:flex-none sm:w-1/6 sm:min-w-0 overflow-y-auto p-4 sm:p-5 flex flex-col">
          {/* Title row: title left, tags right-aligned */}
          <div className="flex items-start gap-2 mb-1">
            <h3 className="text-xl sm:text-sm font-bold leading-tight flex-1 min-w-0">{project.title}</h3>
            <div className="flex flex-wrap gap-0.5 justify-end shrink-0">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[9px] font-medium text-primary whitespace-nowrap">{tag}</span>
              ))}
            </div>
          </div>
          <p className="text-xs font-semibold text-accent mb-3">{project.tagline}</p>
          <p className="flex-1 text-sm sm:text-xs leading-relaxed text-muted/90" style={{ hyphens: 'none' }}>{project.description}</p>
          {project.link && (
            <p className="mt-3 text-xs sm:text-[11px]">
              <span className="text-muted/80">Live at vmdb.me. </span>
              <a href={project.link} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-primary hover:text-accent transition-colors">
                Visit VMDb <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          )}
        </div>

        {/* Close — always visible with dark background */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 border border-white/15 text-white hover:bg-black/90 shadow-md z-10 backdrop-blur-sm"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </motion.div>

      {/* Full-screen lightbox (z-300, above modal) */}
      <AnimatePresence>
        {lightboxOpen && (
          <ImageLightbox
            images={project.images}
            startIndex={imgIndex}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

/* ── Tile entrance variant ─────────────────────── */
const tileVariant = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring' as const, stiffness: 100, damping: 14 },
  },
}

/* ── Compact tile ─────────────────────────────── */
function ProjectTile({ project, reduced, onClick }: { project: Project; reduced: boolean; onClick: () => void }) {
  return (
    <motion.button
      variants={reduced ? undefined : tileVariant}
      whileHover={reduced ? undefined : { y: -8, scale: 1.02 }}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      onClick={onClick}
      className="group w-full h-full flex flex-col text-left rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden cursor-pointer hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      aria-haspopup="dialog"
    >
      <div className="aspect-[16/9] w-full overflow-hidden shrink-0">
        <img src={project.images[0]} alt={`${project.title} preview`}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-base font-bold leading-tight">{project.title}</h3>
        <p className="mt-0.5 text-xs font-medium text-accent">{project.tagline}</p>
        <p className="mt-2 flex-1 text-xs leading-relaxed text-muted/80 line-clamp-3" style={{ hyphens: 'none' }}>{project.description}</p>
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
        // Slightly transparent at top to show HeroAbout behind the organic line
        // More opaque than before to reduce face bleed-through on mobile
        background: 'linear-gradient(180deg, transparent 0%, rgba(4,13,30,0.6) 35px, rgba(4,13,30,0.95) 70px, #040d1e 100px)',
      }}
      aria-label="Featured projects"
    >
      {!reduced && <OrganicEdge />}

      <div className="section-inner" style={{ paddingTop: '7rem' }}>
        <motion.div initial={reduced ? undefined : 'hidden'} whileInView={reduced ? undefined : 'visible'} viewport={{ once: true }}>
          <motion.h2
            variants={reduced ? undefined : tileVariant}
            className="mb-2 text-center text-3xl font-bold md:text-4xl"
          >
            Featured Project Examples
          </motion.h2>
          <motion.p variants={reduced ? undefined : tileVariant} className="mb-8 text-center text-sm text-muted">
            Real tools. Built solo. Shipped fast.
          </motion.p>
        </motion.div>

        <motion.div
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.1 }}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible lg:mx-0 lg:px-0 lg:pb-0"
        >
          {projects.map((project) => (
            <div key={project.id} className="snap-start shrink-0 w-[82vw] sm:w-[60vw] md:w-[46vw] lg:w-auto min-h-[340px] lg:min-h-0">
              <ProjectTile project={project} reduced={reduced} onClick={() => setSelected(project)} />
            </div>
          ))}
        </motion.div>

        <motion.p
          variants={reduced ? undefined : tileVariant}
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
