'use client'

import { About } from './about'
import { Awards } from './awards'
import { Certifications } from './certifications'
import { Contact } from './contact'
import { DeckProvider } from './deck-context'
import { Education } from './education'
import { Experience } from './experience'
import { Hero } from './hero'
import { Navigation } from './navigation'
import { ProjectCaseStudy } from './project-case-study'
import { Projects } from './projects'
import { Skills } from './skills'
import { SlideDeck } from './slide-deck'

export function Portfolio() {
  return (
    <DeckProvider>
      <main className="grain relative min-h-[100svh] bg-background text-foreground">
        <Navigation />
        <SlideDeck
          slides={[
            <Hero key="hero" />,
            <About key="about" />,
            <Education key="education" />,
            <Awards key="awards" />,
            <Certifications key="certifications" />,
            <Skills key="skills" />,
            <Projects key="projects" />,
            <Experience key="experience" />,
            <Contact key="contact" />,
          ]}
        />
        <ProjectCaseStudy />
      </main>
    </DeckProvider>
  )
}
