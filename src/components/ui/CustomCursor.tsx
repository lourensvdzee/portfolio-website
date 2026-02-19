import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Velocity-based cursor:
 * - 1 dot at rest (main, white, 6px)
 * - 2 dots at medium speed (+ 4px trail dot)
 * - 3 dots at high speed  (+ 3px second trail)
 * All DOM manipulation is direct — zero React renders, zero lag.
 * Disabled on touch devices.
 */
export default function CustomCursor() {
  const reduced = useReducedMotion()
  const dot1 = useRef<HTMLDivElement>(null) // main dot — always visible
  const dot2 = useRef<HTMLDivElement>(null) // first trail
  const dot3 = useRef<HTMLDivElement>(null) // second trail

  useEffect(() => {
    if (reduced) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    // Ring buffer: store last 20 positions with timestamps
    const history: Array<{ x: number; y: number; t: number }> = []
    let prevX = -100
    let prevY = -100
    let prevT = 0
    let animFrame = 0

    function onMove(e: MouseEvent) {
      const x = e.clientX
      const y = e.clientY
      const t = performance.now()

      // ── Main dot: instant DOM update ──────────────────────
      if (dot1.current) {
        dot1.current.style.transform = `translate(${x - 3}px, ${y - 3}px)`
        dot1.current.style.opacity = '1'
      }

      // Push to history ring buffer (max 20 entries)
      history.push({ x, y, t })
      if (history.length > 20) history.shift()

      // ── Velocity calculation ──────────────────────────────
      const dt = t - prevT
      const velocity = dt > 0
        ? Math.sqrt((x - prevX) ** 2 + (y - prevY) ** 2) / dt
        : 0

      prevX = x; prevY = y; prevT = t

      // ── Trail dots: appear & fade based on velocity ───────
      // Thresholds (pixels/ms): medium=0.4, fast=1.2
      const showDot2 = velocity > 0.4
      const showDot3 = velocity > 1.2

      if (dot2.current) {
        if (showDot2 && history.length >= 6) {
          const p = history[history.length - 6]
          const opacity = Math.min((velocity - 0.4) * 1.5, 0.65)
          dot2.current.style.transform = `translate(${p.x - 2}px, ${p.y - 2}px)`
          dot2.current.style.opacity = String(opacity)
        } else {
          dot2.current.style.opacity = '0'
        }
      }

      if (dot3.current) {
        if (showDot3 && history.length >= 12) {
          const p = history[history.length - 12]
          const opacity = Math.min((velocity - 1.2) * 0.8, 0.4)
          dot3.current.style.transform = `translate(${p.x - 1.5}px, ${p.y - 1.5}px)`
          dot3.current.style.opacity = String(opacity)
        } else {
          dot3.current.style.opacity = '0'
        }
      }

      cancelAnimationFrame(animFrame)
    }

    // When cursor leaves window: fade all dots
    function onLeave() {
      if (dot1.current) dot1.current.style.opacity = '0'
      if (dot2.current) dot2.current.style.opacity = '0'
      if (dot3.current) dot3.current.style.opacity = '0'
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(animFrame)
    }
  }, [reduced])

  if (reduced) return null

  const dotBase: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9999,
    opacity: 0,
    willChange: 'transform, opacity',
    transition: 'opacity 0.1s ease',
  }

  return (
    <>
      {/* Dot 1 — main, white, 6px */}
      <div
        ref={dot1}
        aria-hidden="true"
        style={{ ...dotBase, width: 6, height: 6, background: 'rgba(255,255,255,0.92)' }}
      />
      {/* Dot 2 — first trail, blue-white, 4px */}
      <div
        ref={dot2}
        aria-hidden="true"
        style={{
          ...dotBase,
          width: 4,
          height: 4,
          background: 'rgba(147, 197, 253, 0.85)',
          transform: 'translate(-100px, -100px)',
        }}
      />
      {/* Dot 3 — second trail, blue, 3px */}
      <div
        ref={dot3}
        aria-hidden="true"
        style={{
          ...dotBase,
          width: 3,
          height: 3,
          background: 'rgba(59, 130, 246, 0.7)',
          transform: 'translate(-100px, -100px)',
        }}
      />
    </>
  )
}
