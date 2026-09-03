'use client'

import { motion } from 'framer-motion'
import { sections } from '@/lib/portfolio-data'

export function SlideIndicator({
  active,
  onSelect,
  isLight,
}: {
  active: number
  onSelect: (i: number) => void
  isLight?: boolean
}) {
  return (
    <nav
      aria-label="Sections"
      className={`fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 md:flex md:right-10 ${isLight ? 'light-chrome' : ''}`}
    >
      {sections.map((s, i) => {
        const isActive = i === active
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Go to ${s.label}`}
            aria-current={isActive ? 'step' : undefined}
            className="group flex items-center gap-3 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
          >
            <span
              className={`font-sans text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                isActive
                  ? 'translate-x-0 text-foreground opacity-100'
                  : 'translate-x-2 text-muted-foreground opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
              }`}
            >
              {s.label}
            </span>
            <span
              className={`font-display text-sm tabular-nums transition-colors ${
                isActive ? 'text-foreground' : 'text-muted-foreground/60 group-hover:text-foreground'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="relative h-px w-6 bg-border">
              {isActive && (
                <motion.span
                  layoutId="indicator-rule"
                  className="absolute inset-0 bg-foreground"
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
