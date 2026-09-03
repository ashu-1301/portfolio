'use client'

import { experience } from '@/lib/portfolio-data'
import { SlideFrame } from './slide-frame'
import { Meta, Reveal, RevealWords } from './reveal'

/**
 * Reference slide 07: two-line heading, then three columns each headed by a
 * year with a thin vertical rule and a small dot marker.
 */
export function Experience() {
  return (
    <SlideFrame number="08" label="Experience">
      <div className="flex flex-1 flex-col justify-center gap-12 lg:gap-16">
        <h2 className="font-display text-[15vw] leading-[0.88] text-foreground md:text-[9vw] lg:text-[7vw]">
          <span className="block">
            <RevealWords text="WORK" delay={0.2} />
          </span>
          <span className="block">
            <RevealWords text="EXPERIENCE" delay={0.3} />
          </span>
        </h2>

        <ol className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
          {experience.map((e, i) => (
            <Reveal key={`${e.year}-${e.role}`} delay={0.5 + i * 0.14} as="li">
              <div className="flex gap-5">
                {/* Vertical rule with dot */}
                <div className="relative mt-1 flex w-2 shrink-0 flex-col items-center" aria-hidden>
                  <span className="block h-2 w-2 rounded-full bg-foreground" />
                  <span className="mt-2 block w-px flex-1 bg-border" />
                </div>
                <div className="flex flex-col gap-3">
                  <span className="font-sans text-xs tracking-[0.1em] text-muted-foreground">{e.year}</span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-sans text-base font-semibold leading-snug text-foreground md:text-lg">
                      {e.role}
                    </h3>
                    <Meta className="text-foreground/70">{e.org}</Meta>
                  </div>
                  <p className="max-w-xs font-sans text-sm leading-relaxed text-muted-foreground">{e.summary}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </SlideFrame>
  )
}
