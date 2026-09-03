'use client'

import { motion } from 'framer-motion'
import { about, profile } from '@/lib/portfolio-data'
import { SlideFrame } from './slide-frame'
import { EASE, Meta, Reveal, RevealWords } from './reveal'

/**
 * About slide: name set very large on the left with a short introduction beneath it.
 */
export function About() {
  return (
    <SlideFrame number="02" label="About me">
      <div className="grid flex-1 grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col gap-8 lg:col-span-7">
          <h2 className="whitespace-nowrap font-display text-[8vw] leading-[0.88] text-foreground md:text-[6vw] lg:text-[4.5vw]">
            <RevealWords text={profile.name} delay={0.2} />
          </h2>

          <Reveal delay={0.7}>
            <div className="max-w-md">
              <p className="mt-5 font-display text-2xl leading-none text-foreground md:text-3xl">
                Curiosity is my favorite debugging tool.
              </p>
              <p className="mt-5 font-sans text-sm leading-relaxed text-muted-foreground md:text-[15px]">{about.body}</p>
            </div>
          </Reveal>

          <Reveal delay={0.85}>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {about.meta.map((m) => (
                <li key={m} className="flex items-center gap-3">
                  <span className="block h-px w-4 bg-foreground/50" aria-hidden />
                  <Meta className="text-foreground/85">{m}</Meta>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.95} className="hidden lg:block">
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-border pt-4">
              <Meta>Interested in</Meta>
              {about.interests.map((it) => (
                <span key={it} className="font-sans text-xs text-foreground/80">
                  {it}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

      </div>
    </SlideFrame>
  )
}
