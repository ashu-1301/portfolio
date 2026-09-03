'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { useDeck } from './deck-context'

export const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Slide-aware reveal. In deck mode slides mount fresh so we animate on mount;
 * in stacked (mobile) mode we animate when scrolled into view.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'p' | 'span' | 'li' | 'h2' | 'h3'
}) {
  const { isDeck } = useDeck()
  const Comp = motion[as]
  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay } },
  }
  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      {...(isDeck
        ? { animate: 'show' }
        : { whileInView: 'show', viewport: { once: true, margin: '-10% 0px' } })}
    >
      {children}
    </Comp>
  )
}

/** Word-by-word masked reveal for large display type. */
export function RevealWords({
  text,
  className,
  delay = 0,
  stagger = 0.07,
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
}) {
  const { isDeck } = useDeck()
  const words = text.split(' ')
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            {...(isDeck
              ? { animate: { y: 0 } }
              : { whileInView: { y: 0 }, viewport: { once: true, margin: '-10% 0px' } })}
            transition={{ duration: 0.95, ease: EASE, delay: delay + i * stagger }}
            aria-hidden
          >
            {w}
          </motion.span>
          {i < words.length - 1 && <span aria-hidden>&nbsp;</span>}
        </span>
      ))}
    </span>
  )
}

/** Thin editorial divider that draws in from the left. */
export function Rule({ delay = 0, className = '' }: { delay?: number; className?: string }) {
  const { isDeck } = useDeck()
  return (
    <motion.div
      className={`h-px w-full origin-left bg-border ${className}`}
      initial={{ scaleX: 0 }}
      {...(isDeck
        ? { animate: { scaleX: 1 } }
        : { whileInView: { scaleX: 1 }, viewport: { once: true } })}
      transition={{ duration: 1.1, ease: EASE, delay }}
    />
  )
}

/** Small uppercase tracking label used for metadata everywhere. */
export function Meta({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-sans text-[11px] uppercase tracking-[0.22em] text-muted-foreground ${className}`}>
      {children}
    </span>
  )
}
