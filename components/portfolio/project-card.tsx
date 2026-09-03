'use client'

import { motion } from 'framer-motion'
import type { Project } from '@/lib/portfolio-data'
import { Meta } from './reveal'

export function ProjectCard({
  project,
  highlighted,
  dimmed,
  onOpen,
}: {
  project: Project
  highlighted: boolean
  dimmed: boolean
  onOpen: () => void
}) {
  return (
    <motion.article
      layoutId={`card-${project.id}`}
      className={`group relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden border bg-ink p-6 transition-[border-color,opacity] duration-500 md:min-h-[360px] md:p-8 ${
        highlighted ? 'border-sage' : 'border-border hover:border-foreground/40'
      } ${dimmed ? 'opacity-40' : 'opacity-100'}`}
    >
      {/* Oversized number as background element */}
      <span
        className="pointer-events-none absolute -bottom-[0.18em] -right-[0.04em] select-none font-display text-[42vw] leading-none text-foreground/[0.04] transition-colors duration-500 group-hover:text-foreground/[0.07] md:text-[18vw] lg:text-[14vw]"
        aria-hidden
      >
        {project.number}
      </span>

      <div className="relative flex items-start justify-between">
        <motion.span
          layoutId={`num-${project.id}`}
          className="font-display text-3xl leading-none text-foreground md:text-4xl"
        >
          {project.number}
        </motion.span>
        <div className="text-right">
          <Meta>{project.kicker}</Meta>
          <br />
          <Meta className="text-muted-foreground/60">{project.year}</Meta>
        </div>
      </div>

      <div className="relative flex flex-col gap-5">
        <div>
          <motion.h3
            layoutId={`title-${project.id}`}
            className={`break-words font-display leading-[0.9] text-foreground ${
              project.title.length > 15 ? 'text-5xl md:text-6xl lg:text-[4.3vw]' : 'text-6xl md:text-7xl lg:text-[5.5vw]'
            }`}
          >
            {project.title}
          </motion.h3>
          <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-muted-foreground">
            {project.tagline}
          </p>
        </div>

        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tags.slice(0, 5).map((t) => (
            <li
              key={t}
              className="border border-border px-2 py-0.5 font-sans text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
            >
              {t}
            </li>
          ))}
          {project.tags.length > 5 && (
            <li className="px-2 py-0.5 font-sans text-[11px] uppercase tracking-[0.12em] text-muted-foreground/60">
              +{project.tags.length - 5}
            </li>
          )}
        </ul>

        <button
          type="button"
          onClick={onOpen}
          className="inline-flex w-fit items-center gap-2 border-b border-foreground/40 pb-1 font-sans text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-sage hover:text-sage focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
          aria-label={`View ${project.title} project`}
        >
          View project
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </button>
      </div>
    </motion.article>
  )
}
