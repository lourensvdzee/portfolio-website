import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageLightboxProps {
  images: string[]
  startIndex: number
  alt: string
  onClose: () => void
}

export default function ImageLightbox({ images, startIndex, alt, onClose }: ImageLightboxProps) {
  const [current, setCurrent] = useState(startIndex)
  const [direction, setDirection] = useState(0)

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((i) => (i + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, prev, next])

  // Lock scroll
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({
      x: d > 0 ? -80 : 80,
      opacity: 0,
    }),
  }

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-label={`Image viewer: ${alt}`}
      >
        {/* Main image — stop propagation so clicking image doesn't close */}
        <div
          className="relative flex items-center justify-center w-full max-w-5xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Previous */}
          {images.length > 1 && (
            <button
              onClick={prev}
              className="absolute left-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 -translate-x-12 sm:-translate-x-14"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Image */}
          <AnimatePresence custom={direction} mode="wait">
            <motion.img
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: 'easeOut' }}
              src={images[current]}
              alt={`${alt} — ${current + 1} of ${images.length}`}
              className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              draggable={false}
            />
          </AnimatePresence>

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={next}
              className="absolute right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 translate-x-12 sm:translate-x-14"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Close + counter */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Close image viewer"
        >
          <X className="h-4 w-4" />
        </button>

        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setDirection(i > current ? 1 : -1); setCurrent(i) }}
                className={`h-1.5 rounded-full transition-all ${i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/35'}`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
