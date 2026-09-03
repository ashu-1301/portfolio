'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { sections, type ProjectId } from '@/lib/portfolio-data'

interface DeckState {
  /** Active slide index (desktop deck mode). */
  index: number
  /** True when rendering as a fixed slide deck (>= lg). False = stacked scroll. */
  isDeck: boolean
  goTo: (i: number) => void
  next: () => void
  prev: () => void
  hoveredSkill: string | null
  setHoveredSkill: (s: string | null) => void
  openProject: ProjectId | null
  setOpenProject: (p: ProjectId | null) => void
  isTransitioning: boolean
}

const DeckContext = createContext<DeckState | null>(null)

export const TRANSITION_MS = 850

export function DeckProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0)
  const [isDeck, setIsDeck] = useState(true)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [openProject, setOpenProject] = useState<ProjectId | null>(null)
  const [isTransitioning, setTransitioning] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (min-height: 600px)')
    const update = () => setIsDeck(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const goTo = useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(sections.length - 1, i))
      if (!isDeck) {
        document
          .getElementById(sections[clamped].id)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      setIndex((cur) => {
        if (cur === clamped) return cur
        setTransitioning(true)
        window.setTimeout(() => setTransitioning(false), TRANSITION_MS)
        return clamped
      })
    },
    [isDeck],
  )

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  const value = useMemo<DeckState>(
    () => ({
      index,
      isDeck,
      goTo,
      next,
      prev,
      hoveredSkill,
      setHoveredSkill,
      openProject,
      setOpenProject,
      isTransitioning,
    }),
    [index, isDeck, goTo, next, prev, hoveredSkill, openProject, isTransitioning],
  )

  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>
}

export function useDeck() {
  const ctx = useContext(DeckContext)
  if (!ctx) throw new Error('useDeck must be used inside DeckProvider')
  return ctx
}
