'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import { profile } from '@/lib/portfolio-data'
import { EASE, Meta, Reveal } from './reveal'

/**
 * Cover slide built around a bold typographic wordmark and a responsive
 * geometric system that gives the opening frame depth.
 */
export function Hero() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 20 })
  const sy = useSpring(my, { stiffness: 40, damping: 20 })
  const typeX = useTransform(sx, [-1, 1], [6, -6])
  const frameX = useTransform(sx, [-1, 1], [-8, 8])
  const frameY = useTransform(sy, [-1, 1], [-6, 6])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1)
      my.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  const letters = (word: string, offset: number) =>
    word.split('').map((ch, i) => (
      <span key={i} className="inline-block overflow-hidden">
        <motion.span
          className="inline-block text-foreground"
          initial={{ y: '112%' }}
          animate={{ y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.2 + (offset + i) * 0.05 }}
          aria-hidden
        >
          {ch}
        </motion.span>
      </span>
    ))

  return (
    <div className="relative h-full min-h-[100svh] overflow-hidden">
      {/* Typographic composition */}
      <motion.h1
        style={{ x: typeX }}
        className="pointer-events-none absolute inset-x-0 top-[46%] z-10 flex -translate-y-1/2 select-none items-center justify-center gap-0 whitespace-nowrap px-5 font-display text-[15vw] leading-[0.82] md:px-10 md:text-[12vw] lg:px-12 lg:text-[10.5vw]"
        aria-label="Portfolio"
      >
        <span className="flex">{letters('PORT', 0)}</span>
        <span className="flex">{letters('FOLIO', 4)}</span>
      </motion.h1>

      <motion.div
        className="pointer-events-none absolute inset-x-5 top-[35%] z-0 h-[23vw] max-h-[260px] border border-foreground/10 md:inset-x-10"
        style={{ x: frameX, y: frameY }}
        animate={{ opacity: [0.35, 0.75, 0.35], scale: [0.985, 1, 0.985] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute left-1/2 top-[52%] z-0 h-[58vw] w-[58vw] max-h-[620px] max-w-[620px] -translate-x-1/2 -translate-y-1/2 border border-sage/35"
        style={{ x: frameX, y: frameY }}
        animate={{ rotate: [0, 8, 0], scale: [0.96, 1, 0.96], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[52%] z-0 h-px w-[72vw] max-w-[760px] origin-center -translate-x-1/2 bg-sage/40"
        style={{ x: sx }}
        animate={{ rotate: [-10, 10, -10], scaleX: [0.8, 1, 0.8] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />

      {/* Bottom-left: name + role */}
      <div className="absolute bottom-6 left-5 z-40 md:bottom-8 md:left-10">
        <Reveal delay={1.2} y={10}>
          <div className="flex flex-col gap-1">
            <span className="font-sans text-xs font-semibold tracking-[0.02em] text-foreground">{profile.name}</span>
            <span className="font-sans text-xs text-muted-foreground">{profile.role}</span>
          </div>
        </Reveal>
      </div>

      {/* Bottom-right: site + scroll cue */}
      <div className="absolute bottom-6 right-5 z-40 flex flex-col items-end gap-5 md:bottom-8 md:right-10 lg:right-28">
        <Reveal delay={1.45} y={10}>
          <div className="flex items-center gap-3">
            <Meta className="text-foreground/70">Scroll to explore</Meta>
            <motion.span
              className="block h-7 w-px origin-top bg-foreground/60"
              animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', times: [0, 0.4, 0.7, 1] }}
              aria-hidden
            />
          </div>
        </Reveal>
      </div>
    </div>
  )
}
