import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Custom cursor — dot (direct DOM, zero lag) + spring-lagged ring.
 * Disabled on touch devices.
 */
export default function CustomCursor() {
  const reduced = useReducedMotion()
  const dotRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  // Ring only uses spring (intentional lag for trailing effect)
  const rx = useMotionValue(-100)
  const ry = useMotionValue(-100)
  const ringX = useSpring(rx, { stiffness: 160, damping: 20 })
  const ringY = useSpring(ry, { stiffness: 160, damping: 20 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    function onMove(e: MouseEvent) {
      // Dot: bypass React + Framer entirely — direct DOM, truly instant
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`
        if (!visible) dotRef.current.style.opacity = '1'
      }
      // Ring: via motion value → spring
      rx.set(e.clientX)
      ry.set(e.clientY)
      if (!visible) setVisible(true)
    }

    function onOver(e: MouseEvent) {
      const t = e.target as HTMLElement
      setHovering(!!t.closest('a, button, [role="button"], [data-hover]'))
    }

    function onLeave() {
      if (dotRef.current) dotRef.current.style.opacity = '0'
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
  }, [visible, rx, ry])

  if (reduced) return null

  return (
    <>
      {/* Dot — zero lag, direct DOM manipulation */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.92)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          transform: 'translate(-100px, -100px)',
        }}
      />
      {/* Ring — spring lag for organic trailing */}
      <motion.div
        aria-hidden="true"
        className={`cursor-ring${hovering ? ' is-hovering' : ''}`}
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
      />
    </>
  )
}
