'use client'

import { awards } from '@/lib/portfolio-data'
import { SlideFrame } from './slide-frame'
import { Meta, Reveal, RevealWords } from './reveal'

export function Awards() {
  return (
    <SlideFrame number="04" label="Awards">
      <div className="flex flex-1 flex-col justify-center gap-12 lg:gap-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-4xl font-display text-[14vw] leading-[0.88] text-foreground md:text-[9vw] lg:text-[6.5vw]">
            <RevealWords text="AWARDS" delay={0.2} />
          </h2>
          <Reveal delay={0.6} className="lg:max-w-xs lg:pb-2">
            <p className="font-sans text-sm leading-relaxed text-muted-foreground">
              Recognition for academic excellence and project work.
            </p>
          </Reveal>
        </div>

        <div className="border-t border-border pt-8">
          <Reveal delay={0.5}>
            <ul className="grid grid-cols-1 gap-8">
              {awards.map((award) => (
                <li key={award.title} className="flex flex-col gap-5">
                  <div className="flex max-w-5xl gap-4 whitespace-nowrap font-display text-[11px] italic leading-[0.95] text-foreground md:text-[16px] lg:text-[20px]">
                    <span className="mt-[0.6em] block h-1.5 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden />
                    {award.title}
                  </div>
                  {award.images && (
                    <div className="grid max-w-5xl grid-cols-2 gap-4 md:gap-6">
                      {award.images.map((image, imageIndex) => (
                        <img
                          key={image}
                          src={image}
                          alt={`${award.title} photo ${imageIndex + 1}`}
                          className="aspect-[4/3] w-full border border-border object-cover"
                        />
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </SlideFrame>
  )
}
