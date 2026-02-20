import { motion } from 'framer-motion'

/**
 * Electric "snake" border that animates around a card:
 * line appears → travels ~45% around the perimeter → disappears from where it started.
 * Uses Framer Motion pathLength + pathOffset for the snake effect.
 * viewBox="0 0 100 100" with preserveAspectRatio="none" scales to any card.
 * vectorEffect="non-scaling-stroke" keeps stroke width in screen pixels.
 */
export default function ElectricBorderSVG() {
  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'visible',
        filter:
          'drop-shadow(0 0 7px rgba(59,130,246,0.95)) drop-shadow(0 0 2px rgba(147,197,253,0.6))',
      }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.rect
        x={1}
        y={1}
        width={98}
        height={98}
        rx={10}
        fill="none"
        stroke="rgba(186,230,253,1)"
        strokeWidth={2}
        style={{ vectorEffect: 'non-scaling-stroke' } as React.CSSProperties}
        initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
        animate={{
          pathLength: [0, 0.45, 0],
          pathOffset: [0, 0, 0.45],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          pathLength: { duration: 1.8, times: [0, 0.5, 1], ease: 'easeInOut' },
          pathOffset: { duration: 1.8, times: [0, 0.5, 1], ease: 'easeInOut' },
          opacity: { duration: 1.8, times: [0, 0.06, 0.85, 1] },
        }}
      />
    </svg>
  )
}
