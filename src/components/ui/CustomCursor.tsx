import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Custom cursor — dot + lagging ring.
 * Disabled on touch devices via CSS and pointer check.
 */
export default function CustomCursor() {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const isTouch = useRef(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  // Dot follows exactly (high stiffness = instant)
  const dotX = useSpring(x, { stiffness: 2000, damping: 60 })
  const dotY = useSpring(y, { stiffness: 2000, damping: 60 })

  // Ring lags behind (lower stiffness = organic trailing)
  const ringX = useSpring(x, { stiffness: 180, damping: 22 })
  const ringY = useSpring(y, { stiffness: 180, damping: 22 })

  useEffect(() => {
    // Detect touch — disable cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      isTouch.current = true
      return
    }

    function onMove(e: MouseEvent) {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }

    function onOver(e: MouseEvent) {
      const target = e.target as HTMLElement
      setHovering(!!target.closest('a, button, [role="button"], [data-hover]'))
    }

    function onLeave() {
      setVisible(false)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseleave', onLeave, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [visible, x, y])

  if (reduced || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)) {
    return null
  }

  return (
    <>
      {/* Inner dot — precise position */}
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
        aria-hidden="true"
      />
      {/* Outer ring — trails with spring */}
      <motion.div
        className={`cursor-ring${hovering ? ' is-hovering' : ''}`}
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
        aria-hidden="true"
      />
    </>
  )
}
