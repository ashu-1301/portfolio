'use client'

import { skillGroups, skills } from '@/lib/portfolio-data'
import { SlideFrame } from './slide-frame'
import { Meta, Reveal } from './reveal'
import { SkillNetwork } from './skill-network'

export function Skills() {
  const connected = skills.filter((s) => s.projects.length > 0).length

  return (
    <SlideFrame
      number="06"
      label="Skills"
      aside={
        <span className="flex items-center gap-3">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-sage" aria-hidden />
          <Meta>{connected} connected to projects</Meta>
        </span>
      }
    >
      <SkillNetwork groups={skillGroups} skills={skills}>
        <Reveal delay={0.15} className="max-w-md">
          <p className="font-sans text-sm leading-relaxed text-muted-foreground">
            A working toolkit. Skills marked with a dot are wired to a project — hover them to see where they
            were used.
          </p>
        </Reveal>
      </SkillNetwork>
    </SlideFrame>
  )
}
