'use client'

import { profile } from '@/lib/portfolio-data'
import { Meta, Reveal } from './reveal'

/**
 * The frame every slide shares: label top-left and name bottom-left.
 */
export function SlideChrome({ number, label = 'Portfolio — 2026' }: { number: string; label?: string }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-5 top-6 z-30 flex items-start justify-between md:inset-x-10 md:top-8">
        <Reveal delay={0.35} y={8}>
          <Meta className="text-foreground/80">{label}</Meta>
        </Reveal>
      </div>
      <div className="pointer-events-none absolute inset-x-5 bottom-6 z-30 hidden items-end md:inset-x-10 md:bottom-8 md:flex lg:pr-16">
        <Reveal delay={0.5} y={8}>
          <div className="flex flex-col gap-1">
            <span className="font-sans text-[11px] font-medium tracking-[0.02em] text-foreground/85">{profile.name}</span>
            <span className="font-sans text-[11px] text-muted-foreground">{profile.role}</span>
          </div>
        </Reveal>
      </div>
    </>
  )
}
