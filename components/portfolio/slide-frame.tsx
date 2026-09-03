'use client'

import type { ReactNode } from 'react'
import { SlideChrome } from './slide-chrome'

/**
 * Editorial frame for every inner slide, matching the reference deck:
 * quiet corner chrome (label / rule + number / name / site) and a
 * scrollable content well so short viewports never clip.
 */
export function SlideFrame({
  number,
  label,
  aside,
  children,
}: {
  number: string
  label: string
  aside?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="relative flex h-full min-h-[100svh] flex-col px-5 pb-16 pt-20 md:px-10 md:pb-24 md:pt-24 lg:pr-28">
      <SlideChrome number={number} label={label} />
      <div data-slide-scroll className="no-scrollbar flex flex-1 flex-col overflow-y-auto">
        {aside && <div className="mb-6 flex justify-end">{aside}</div>}
        {children}
      </div>
    </div>
  )
}
