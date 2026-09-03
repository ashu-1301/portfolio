'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'
import { sections } from '@/lib/portfolio-data'
import { useDeck } from './deck-context'
import { EASE } from './reveal'

interface SlideDeckProps {
  slides: ReactNode[]
}

/**
 * Desktop: fixed viewport, one slide at a time, wheel / keys / swipe to move.
 * Mobile / short viewports: stacked editorial sections.
 */
export function SlideDeck({ slides }: SlideDeckProps) {
  const { index, isDeck, next, prev, openProject, isTransitioning } = useDeck()
  const dirRef = useRef(1)
  const lastIndex = useRef(index)
  const wheelAccum = useRef(0)
  const wheelLock = useRef(false)
  const touchStart = useRef<number | null>(null)
  const slideRef = useRef<HTMLDivElement>(null)

  dirRef.current = index >= lastIndex.current ? 1 : -1
  lastIndex.current = index

  // Keyboard
  useEffect(() => {
    if (!isDeck) return
    const onKey = (e: KeyboardEvent) => {
      if (openProject) return
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault()
        next()
      } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        prev()
      } else if (e.key === 'Home') {
        e.preventDefault()
        window.dispatchEvent(new CustomEvent('deck:home'))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isDeck, next, prev, openProject])

  // Wheel — respects inner scrollable content before changing slides
  useEffect(() => {
    if (!isDeck) return
    const canScrollInner = (deltaY: number) => {
      const el = slideRef.current?.querySelector<HTMLElement>('[data-slide-scroll]')
      if (!el) return false
      const atTop = el.scrollTop <= 0
      const atBottom = Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight - 1
      return deltaY > 0 ? !atBottom : !atTop
    }
    const onWheel = (e: WheelEvent) => {
      if (openProject) return
      if (canScrollInner(e.deltaY)) return
      e.preventDefault()
      if (wheelLock.current || isTransitioning) return
      wheelAccum.current += e.deltaY
      if (Math.abs(wheelAccum.current) > 60) {
        wheelAccum.current > 0 ? next() : prev()
        wheelAccum.current = 0
        wheelLock.current = true
        window.setTimeout(() => (wheelLock.current = false), 1000)
      }
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [isDeck, next, prev, openProject, isTransitioning])

  // Touch swipe (tablet landscape in deck mode)
  useEffect(() => {
    if (!isDeck) return
    const start = (e: TouchEvent) => (touchStart.current = e.touches[0].clientY)
    const end = (e: TouchEvent) => {
      if (touchStart.current === null || openProject) return
      const dy = touchStart.current - e.changedTouches[0].clientY
      if (Math.abs(dy) > 60) (dy > 0 ? next : prev)()
      touchStart.current = null
    }
    window.addEventListener('touchstart', start, { passive: true })
    window.addEventListener('touchend', end)
    return () => {
      window.removeEventListener('touchstart', start)
      window.removeEventListener('touchend', end)
    }
  }, [isDeck, next, prev, openProject])

  if (!isDeck) {
    return (
      <div className="flex flex-col">
        {slides.map((slide, i) => (
          <section
            key={sections[i].id}
            id={sections[i].id}
            aria-label={sections[i].label}
            className={`relative min-h-[100svh] border-b border-border last:border-b-0 ${i % 2 === 1 ? 'alternate-page' : ''}`}
          >
            {slide}
          </section>
        ))}
      </div>
    )
  }

  const dir = dirRef.current

  return (
    <div className="fixed inset-0 overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false} custom={dir}>
        <motion.section
          key={sections[index].id}
          id={sections[index].id}
          ref={slideRef}
          aria-label={sections[index].label}
          aria-roledescription="slide"
          className="absolute inset-0"
          custom={dir}
          variants={{
            enter: (d: number) => ({ opacity: 0, y: d * 48, scale: 0.985 }),
            center: { opacity: 1, y: 0, scale: 1 },
            exit: (d: number) => ({ opacity: 0, y: d * -32, scale: 0.99 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: EASE }}
        >
          {slides[index]}
        </motion.section>
      </AnimatePresence>
    </div>
  )
}
