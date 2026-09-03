'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { projects, sections, type ProjectId, type Skill } from '@/lib/portfolio-data'
import { useDeck } from './deck-context'
import { EASE, Meta, Reveal } from './reveal'

interface Line {
  x1: number
  y1: number
  x2: number
  y2: number
  project: ProjectId
}

export function SkillNetwork({
  groups,
  skills,
  children,
}: {
  groups: { id: Skill['group']; label: string }[]
  skills: Skill[]
  children?: ReactNode
}) {
  const { hoveredSkill, setHoveredSkill, setOpenProject, goTo, isDeck } = useDeck()
  const containerRef = useRef<HTMLDivElement>(null)
  const tagRefs = useRef<Map<string, HTMLElement>>(new Map())
  const plateRefs = useRef<Map<ProjectId, HTMLElement>>(new Map())
  const [lines, setLines] = useState<Line[]>([])

  const activeSkill = skills.find((s) => s.name === hoveredSkill)
  const activeProjects = activeSkill?.projects ?? []

  const measure = useCallback(() => {
    const c = containerRef.current
    if (!c || !activeSkill || activeSkill.projects.length === 0) {
      setLines([])
      return
    }
    const cRect = c.getBoundingClientRect()
    const tag = tagRefs.current.get(activeSkill.name)
    if (!tag) return
    const t = tag.getBoundingClientRect()
    const next: Line[] = []
    for (const pid of activeSkill.projects) {
      const plate = plateRefs.current.get(pid)
      if (!plate) continue
      const p = plate.getBoundingClientRect()
      next.push({
        x1: t.right - cRect.left,
        y1: t.top + t.height / 2 - cRect.top,
        x2: p.left - cRect.left,
        y2: p.top + p.height / 2 - cRect.top,
        project: pid,
      })
    }
    setLines(next)
  }, [activeSkill])

  useLayoutEffect(() => {
    measure()
  }, [measure])

  const openCaseStudy = (id: ProjectId) => {
    const projIdx = sections.findIndex((s) => s.id === 'projects')
    goTo(projIdx)
    window.setTimeout(() => setOpenProject(id), isDeck ? 700 : 400)
  }

  return (
    <div ref={containerRef} className="relative grid flex-1 grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
      {/* Connection lines (desktop only — plates are beside the list) */}
      <svg
        className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full overflow-visible lg:block"
        aria-hidden
      >
        <AnimatePresence>
          {lines.map((l) => {
            const mx = (l.x1 + l.x2) / 2
            const d = `M ${l.x1 + 8} ${l.y1} C ${mx} ${l.y1}, ${mx} ${l.y2}, ${l.x2 - 8} ${l.y2}`
            return (
              <motion.g key={`${l.project}-${l.x1}-${l.y1}`}>
                <motion.path
                  d={d}
                  fill="none"
                  stroke="var(--sage)"
                  strokeWidth={1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.55, ease: EASE }}
                />
                <motion.circle
                  cx={l.x1 + 8}
                  cy={l.y1}
                  r={2.5}
                  fill="var(--sage)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.circle
                  cx={l.x2 - 8}
                  cy={l.y2}
                  r={2.5}
                  fill="var(--sage)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                />
              </motion.g>
            )
          })}
        </AnimatePresence>
      </svg>

      {/* Skill columns */}
      <div className="flex flex-col gap-8 lg:col-span-8">
        {children}
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, gi) => {
            const items = skills.filter((s) => s.group === g.id)
            return (
              <Reveal key={g.id} delay={0.25 + gi * 0.08} className="flex flex-col gap-3">
                <div className="flex items-center gap-3 border-t border-border pt-3">
                  <Meta>{g.label}</Meta>
                </div>
                <ul className="flex flex-wrap gap-x-1 gap-y-1">
                  {items.map((s) => {
                    const isConnected = s.projects.length > 0
                    const isActive = hoveredSkill === s.name
                    const isDimmed = hoveredSkill !== null && !isActive
                    return (
                      <li key={s.name}>
                        <SkillTag
                          skill={s}
                          isConnected={isConnected}
                          isActive={isActive}
                          isDimmed={isDimmed}
                          refFn={(el) => {
                            if (el) tagRefs.current.set(s.name, el)
                            else tagRefs.current.delete(s.name)
                          }}
                          onHover={(v) => setHoveredSkill(v ? s.name : null)}
                          onActivate={() => isConnected && openCaseStudy(s.projects[0])}
                        />
                      </li>
                    )
                  })}
                </ul>
              </Reveal>
            )
          })}
        </div>
      </div>

      {/* Project plates */}
      <div className="flex flex-col justify-center gap-4 lg:col-span-4 lg:pl-8">
        <Reveal delay={0.5}>
          <Meta>Connected work</Meta>
        </Reveal>
        {projects.map((p, i) => {
          const isHit = activeProjects.includes(p.id)
          const isDimmed = hoveredSkill !== null && activeProjects.length > 0 && !isHit
          return (
            <Reveal key={p.id} delay={0.6 + i * 0.1}>
              <button
                type="button"
                ref={(el) => {
                  if (el) plateRefs.current.set(p.id, el)
                  else plateRefs.current.delete(p.id)
                }}
                onClick={() => openCaseStudy(p.id)}
                aria-label={`Open ${p.title} case study`}
                className={`group relative flex w-full items-center justify-between gap-4 border px-5 py-5 text-left transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage ${
                  isHit
                    ? 'border-sage bg-ink shadow-[0_0_0_1px_var(--sage)]'
                    : 'border-border hover:border-foreground/40'
                } ${isDimmed ? 'opacity-40' : 'opacity-100'}`}
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className={`font-display text-3xl leading-none transition-colors ${
                      isHit ? 'text-sage' : 'text-muted-foreground/60'
                    }`}
                  >
                    {p.number}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-display text-2xl leading-none text-foreground">
                      {p.title}
                    </span>
                    <Meta className="mt-1">{p.kicker}</Meta>
                  </div>
                </div>
                <span
                  className={`font-sans text-xs transition-all ${
                    isHit ? 'translate-x-0 text-sage' : 'translate-x-1 text-muted-foreground group-hover:translate-x-0'
                  }`}
                  aria-hidden
                >
                  →
                </span>

                {/* Floating label naming the hovered skill */}
                <AnimatePresence>
                  {isHit && activeSkill && (
                    <motion.span
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.25 }}
                      className="absolute -top-3 left-5 bg-background px-2 font-sans text-[10px] uppercase tracking-[0.2em] text-sage"
                    >
                      via {activeSkill.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}

function SkillTag({
  skill,
  isConnected,
  isActive,
  isDimmed,
  refFn,
  onHover,
  onActivate,
}: {
  skill: Skill
  isConnected: boolean
  isActive: boolean
  isDimmed: boolean
  refFn: (el: HTMLElement | null) => void
  onHover: (v: boolean) => void
  onActivate: () => void
}) {
  const connectedProjects = skill.projects
    .map((id) => projects.find((p) => p.id === id)?.title)
    .filter(Boolean)
    .join(' · ')

  const base =
    'relative inline-flex items-center gap-1.5 px-2 py-1 font-sans text-[13px] transition-all duration-300 md:text-sm'

  if (!isConnected) {
    return (
      <span
        ref={refFn}
        className={`${base} text-muted-foreground hover:text-foreground ${isDimmed ? 'opacity-40' : ''}`}
      >
        {skill.name}
      </span>
    )
  }

  return (
    <button
      type="button"
      ref={refFn}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      onClick={onActivate}
      aria-describedby={isActive ? `tip-${skill.name}` : undefined}
      className={`${base} cursor-pointer text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage ${
        isActive ? 'bg-ink text-sage' : ''
      } ${isDimmed ? 'opacity-40' : ''}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full transition-colors ${isActive ? 'bg-sage' : 'bg-sage/60'}`}
        aria-hidden
      />
      {skill.name}
      <AnimatePresence>
        {isActive && (
          <motion.span
            id={`tip-${skill.name}`}
            role="tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 2 }}
            transition={{ duration: 0.2 }}
            className="absolute left-2 top-full z-20 mt-1 whitespace-nowrap border border-border bg-background px-2 py-1 font-sans text-[10px] uppercase tracking-[0.18em] text-sage lg:hidden"
          >
            {connectedProjects}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
