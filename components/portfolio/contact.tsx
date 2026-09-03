'use client'

import { ArrowUpRight } from 'lucide-react'
import { profile } from '@/lib/portfolio-data'
import { useDeck } from './deck-context'
import { Meta, Reveal, RevealWords, Rule } from './reveal'

const links = [
  { label: 'Email', href: `mailto:${profile.email}` },
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'GitHub', href: profile.github },
  { label: 'Resume', href: profile.resume },
]

export function Contact() {
  const { goTo } = useDeck()
  return (
    <div className="flex min-h-[100svh] flex-col gap-10 px-5 pb-24 pt-20 md:gap-14 md:px-10 md:pb-28 md:pt-28 lg:pr-28">
      <div className="flex items-end justify-between pb-4">
        <Reveal delay={0.1} y={12}>
          <div className="flex items-baseline gap-4">
            <span className="font-display text-4xl leading-none text-foreground md:text-5xl">09</span>
            <Meta>Contact</Meta>
          </div>
        </Reveal>
      </div>
      <Rule />

      <div className="py-4 md:py-8">
        <h2 className="font-display text-[19vw] leading-[0.85] text-foreground md:text-[13vw] lg:text-[11vw]">
          <span className="block">
            <RevealWords text="GET IN" delay={0.2} />
          </span>
          <span className="block text-muted-foreground/70">
            <RevealWords text="TOUCH." delay={0.4} />
          </span>
        </h2>
      </div>

      <div className="flex flex-col gap-6">
          <ul className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-5">
          {links.map((l, i) => (
            <Reveal key={l.label} delay={0.7 + i * 0.1} as="li">
              <a
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center justify-between gap-4 border-t border-border py-5 transition-colors hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage sm:flex-col sm:items-start sm:justify-start sm:gap-3 sm:border-l sm:border-t-0 sm:py-2 sm:pl-5 sm:first:border-l-0 sm:first:pl-0"
              >
                <span className="flex items-center gap-2 font-display text-4xl leading-none text-foreground transition-colors group-hover:text-sage md:text-5xl">
                  {l.label}
                  <ArrowUpRight
                    className="h-5 w-5 -translate-y-0.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        <Rule delay={1.1} />
        <Reveal delay={1.2}>
          <div className="flex items-center justify-between">
            <Meta>© 2026 {profile.name}</Meta>
            <button
              type="button"
              onClick={() => goTo(0)}
              className="font-sans text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
            >
              Back to cover ↑
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
