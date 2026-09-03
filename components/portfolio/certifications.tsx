'use client'

import { ArrowUpRight } from 'lucide-react'
import { certifications } from '@/lib/portfolio-data'
import { SlideFrame } from './slide-frame'
import { Reveal, RevealWords } from './reveal'

export function Certifications() {
  return (
    <SlideFrame number="05" label="Certifications">
      <div className="flex flex-1 flex-col justify-center gap-12 lg:gap-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-4xl font-display text-[14vw] leading-[0.88] text-foreground md:text-[9vw] lg:text-[6.5vw]">
            <RevealWords text="CERTIFICATIONS" delay={0.2} />
          </h2>
          <Reveal delay={0.6} className="lg:max-w-xs lg:pb-2">
            <p className="font-sans text-sm leading-relaxed text-muted-foreground">
              Courses and credentials supporting my work across cloud, software, data and AI.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.5}>
          <ul className="grid grid-cols-1 gap-5 border-t border-border pt-8 lg:grid-cols-2 lg:gap-x-16">
            {certifications.map((certificate, index) => {
              const content = (
                <>
                  <span className="font-display text-3xl leading-none text-foreground md:text-4xl">0{index + 1}</span>
                  <span className="flex-1 font-sans text-sm leading-relaxed text-foreground/85 md:text-base">
                    {certificate.title}
                  </span>
                  {certificate.href && <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />}
                </>
              )
              return (
                <li key={certificate.title}>
                  {certificate.href ? (
                    <a
                      href={certificate.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 border-b border-border pb-5 transition-colors hover:text-sage focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-start gap-4 border-b border-border pb-5">
                      {content}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </SlideFrame>
  )
}
