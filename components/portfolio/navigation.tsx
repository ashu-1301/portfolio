'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { profile, sections } from '@/lib/portfolio-data'
import { useDeck } from './deck-context'
import { SlideIndicator } from './slide-indicator'

/**
 * Minimal fixed chrome: name mark top-left, numbered slide indicator on the right,
 * prev/next arrows bottom-right, thin progress rule along the bottom edge.
 */
export function Navigation() {
  const { index, isDeck, next, prev, goTo } = useDeck()
  const [scrollIndex, setScrollIndex] = useState(0)
  const [hasLeftCover, setHasLeftCover] = useState(false)

  // In stacked mode, track which section is in view to drive the indicator
  useEffect(() => {
    if (isDeck) return
    const onScroll = () => setHasLeftCover(window.scrollY > window.innerHeight * 0.35)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setScrollIndex(els.indexOf(visible.target as HTMLElement))
      },
      { threshold: [0.3, 0.6] },
    )
    els.forEach((el) => io.observe(el))
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [isDeck])

  const active = isDeck ? index : scrollIndex
  const progress = (active + 1) / sections.length
  const showMark = isDeck ? index === 0 : !hasLeftCover

  return (
    <>
      <header className={`pointer-events-none fixed inset-x-0 top-0 z-40 flex items-start justify-between px-5 pt-5 md:px-10 md:pt-8 ${active % 2 === 1 ? 'light-chrome' : ''}`}>
        <motion.button
          type="button"
          onClick={() => goTo(0)}
          className="pointer-events-auto font-display text-lg leading-none tracking-wide text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
          aria-label="Back to cover"
          animate={{ opacity: showMark ? 1 : 0, y: showMark ? 0 : -8 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          tabIndex={showMark ? 0 : -1}
          style={{ pointerEvents: showMark ? 'auto' : 'none' }}
        >
          A.S.M
        </motion.button>
        <div className="pointer-events-auto hidden items-center gap-6 md:flex">
          <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {profile.role}
          </span>
          <span className="h-3 w-px bg-border" aria-hidden />
          <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {sections[active].label}
          </span>
        </div>
      </header>

      <SlideIndicator active={active} onSelect={goTo} isLight={active % 2 === 1} />

      {isDeck && (
        <nav
          aria-label="Slide controls"
          className="fixed bottom-8 right-10 z-40 flex items-center gap-2"
        >
          <button
            type="button"
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous slide"
            className="flex h-11 w-11 items-center justify-center border border-border text-foreground transition-colors hover:border-foreground disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={index === sections.length - 1}
            aria-label="Next slide"
            className="flex h-11 w-11 items-center justify-center border border-border text-foreground transition-colors hover:border-foreground disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </nav>
      )}

      {/* Progress rule */}
      <div className="fixed inset-x-0 bottom-0 z-40 h-px bg-border" aria-hidden>
        <motion.div
          className="h-full origin-left bg-foreground"
          animate={{ scaleX: progress }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%' }}
        />
      </div>
    </>
  )
}
