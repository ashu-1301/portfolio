'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { projects, skills } from '@/lib/portfolio-data'
import { useDeck } from './deck-context'
import { EASE, Meta } from './reveal'

export function ProjectCaseStudy() {
  const { openProject, setOpenProject } = useDeck()
  const project = projects.find((p) => p.id === openProject)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!openProject) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenProject(null)
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.setTimeout(() => closeRef.current?.focus(), 300)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [openProject, setOpenProject])

  const relatedSkills = project
    ? skills.filter((s) => s.projects.includes(project.id)).map((s) => s.name)
    : []

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="case-study"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-title"
          className="fixed inset-0 z-50 flex items-stretch justify-center bg-background/70 p-0 backdrop-blur-[2px] md:p-6 lg:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          transition={{ duration: 0.4 }}
          onClick={(e) => e.target === e.currentTarget && setOpenProject(null)}
        >
          <motion.article
            layoutId={`card-${project.id}`}
            transition={{ duration: 0.65, ease: EASE }}
            className="no-scrollbar relative flex w-full max-w-6xl flex-col overflow-y-auto border border-border bg-ink"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-ink/95 px-5 py-4 backdrop-blur md:px-10">
              <div className="flex items-baseline gap-4">
                <motion.span
                  layoutId={`num-${project.id}`}
                  className="font-display text-3xl leading-none text-foreground"
                >
                  {project.number}
                </motion.span>
                <Meta>Project details</Meta>
                <Meta className="hidden text-muted-foreground/60 md:inline">{project.kicker}</Meta>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpenProject(null)}
                aria-label="Close case study"
                className="flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            <div className="grain flex flex-col gap-12 px-5 py-10 md:px-10 md:py-14">
              {/* Title block */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <motion.h2
                    id="case-title"
                    layoutId={`title-${project.id}`}
                    className="font-display text-[14vw] leading-[0.85] text-foreground md:text-[8vw] lg:text-[6vw]"
                  >
                    {project.title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
                    className="mt-6 max-w-xl font-sans text-base leading-relaxed text-muted-foreground md:text-lg"
                  >
                    {project.tagline}
                  </motion.p>
                </div>
                <motion.dl
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
                  className="flex flex-col gap-4 border-t border-border pt-4 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
                >
                  <div>
                    <dt><Meta>Year</Meta></dt>
                    <dd className="font-display text-3xl text-foreground">{project.year}</dd>
                  </div>
                  <div>
                    <dt><Meta>Domain</Meta></dt>
                    <dd className="font-sans text-sm text-foreground">{project.kicker}</dd>
                  </div>
                  <div>
                    <dt><Meta>Technologies</Meta></dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="border border-border px-2 py-0.5 font-sans text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </dd>
                  </div>
                </motion.dl>
              </div>

              {/* Body sections */}
              <motion.div
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.55 } } }}
                className="grid grid-cols-1 gap-x-12 gap-y-10 border-t border-border pt-10 md:grid-cols-2"
              >
                <Block label="The problem" body={project.problem} />
                <Block label="What I built" body={project.built} />
                <Block label="How it works" list={project.how} ordered />
                <Block label="Key features" list={project.features} />
                <Block label="My contribution" body={project.contribution} />
                <Block label="Skills used" tags={relatedSkills} />
              </motion.div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Block({
  label,
  body,
  list,
  tags,
  ordered,
}: {
  label: string
  body?: string
  list?: string[]
  tags?: string[]
  ordered?: boolean
}) {
  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  }
  return (
    <motion.section variants={item} className="flex flex-col gap-3">
      <h3 className="flex items-center gap-3">
        <span className="h-px w-6 bg-sage" aria-hidden />
        <Meta className="text-foreground">{label}</Meta>
      </h3>
      {body && (
        <p className="font-sans text-sm leading-relaxed text-muted-foreground md:text-[15px]">{body}</p>
      )}
      {list && ordered && (
        <ol className="flex flex-col gap-2">
          {list.map((l, i) => (
            <li key={l} className="flex gap-3 font-sans text-sm leading-relaxed text-muted-foreground">
              <span className="font-display text-base text-foreground/70">{String(i + 1).padStart(2, '0')}</span>
              <span>{l}</span>
            </li>
          ))}
        </ol>
      )}
      {list && !ordered && (
        <ul className="flex flex-col gap-2">
          {list.map((l) => (
            <li key={l} className="flex gap-3 font-sans text-sm leading-relaxed text-muted-foreground">
              <span className="mt-2 h-px w-3 shrink-0 bg-border" aria-hidden />
              <span>{l}</span>
            </li>
          ))}
        </ul>
      )}
      {tags && (
        <ul className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <li
              key={t}
              className="flex items-center gap-1.5 border border-sage/40 px-2 py-0.5 font-sans text-[11px] uppercase tracking-[0.12em] text-foreground"
            >
              <span className="h-1 w-1 rounded-full bg-sage" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
      )}
    </motion.section>
  )
}
