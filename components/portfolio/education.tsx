'use client'

import { education } from '@/lib/portfolio-data'
import { SlideFrame } from './slide-frame'
import { Meta, Reveal, RevealWords, Rule } from './reveal'

/**
 * Reference slide 05: single heavy heading, then three structured columns
 * (year / degree / institution / note) separated by thin vertical rules.
 */
export function Education() {
  return (
    <SlideFrame number="03" label="Education">
      <div className="flex flex-1 flex-col justify-center gap-12 lg:gap-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display text-[16vw] leading-[0.88] text-foreground md:text-[10vw] lg:text-[7.5vw]">
            <RevealWords text="EDUCATION" delay={0.2} />
          </h2>
          <Reveal delay={0.6} className="lg:max-w-xs lg:pb-3">
            <p className="font-sans text-sm leading-relaxed text-muted-foreground">
              A straightforward path through science and engineering, with a steady pull towards
              software, systems and testing.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-0">
          <Rule delay={0.5} />
          <ol className="grid grid-cols-1 lg:grid-cols-3">
            {education.map((e, i) => (
              <Reveal key={e.period} delay={0.55 + i * 0.13} as="li">
                <div className="flex flex-col gap-4 border-b border-border py-6 lg:border-b-0 lg:border-l lg:px-8 lg:py-8 lg:first:border-l-0 lg:first:pl-0">
                  <span className="font-sans text-xs tracking-[0.1em] text-muted-foreground">{e.period}</span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-sans text-base font-semibold leading-snug text-foreground md:text-lg">
                      {e.degree}
                    </h3>
                    <Meta className="text-foreground/70">{e.institution}</Meta>
                  </div>
                  <p className="max-w-xs font-sans text-sm leading-relaxed text-muted-foreground">{e.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

      </div>
    </SlideFrame>
  )
}
