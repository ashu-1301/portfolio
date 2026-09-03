'use client'

import { projects, skills } from '@/lib/portfolio-data'
import { useDeck } from './deck-context'
import { ProjectCard } from './project-card'
import { SlideFrame } from './slide-frame'
import { Meta, Reveal, RevealWords } from './reveal'

export function Projects() {
  const { hoveredSkill, setOpenProject } = useDeck()
  const active = skills.find((s) => s.name === hoveredSkill)?.projects ?? []

  return (
    <SlideFrame number="07" label="Projects" aside={<Meta>Selected work</Meta>}>
      <div className="flex flex-1 flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-[14vw] leading-[0.88] text-foreground md:text-[7vw] lg:text-[5vw]">
            <RevealWords text="SELECTED PROJECTS." delay={0.15} />
          </h2>
          <Reveal delay={0.5} className="max-w-xs">
            <p className="font-sans text-sm leading-relaxed text-muted-foreground">
              One in hardware, one in software. Both about making systems observable and trustworthy.
            </p>
          </Reveal>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={0.35 + i * 0.15} className="h-full">
              <ProjectCard
                project={p}
                highlighted={active.includes(p.id)}
                dimmed={active.length > 0 && !active.includes(p.id)}
                onOpen={() => setOpenProject(p.id)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </SlideFrame>
  )
}
