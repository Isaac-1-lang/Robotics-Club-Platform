import { useMemo, useState } from 'react'
import { Filter } from 'lucide-react'
import { projects } from '../data/content'
import type { ProjectCategory } from '../data/content'
import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'
import { buttonClasses } from '../components/ui/buttonStyles'

const categories: Array<ProjectCategory | 'All'> = [
  'All',
  'AI',
  'Hardware',
  'IoT',
  'Software',
]

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState<
    ProjectCategory | 'All'
  >('All')

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects
    return projects.filter((project) => project.mainTag === activeCategory)
  }, [activeCategory])

  return (
    <>
      <Section
        title="Robotics Monthly Blogs"
        eyebrow="Builds & research"
        description="Explore our ongoing builds across AI, hardware, IoT, and software. Each project is student-led with mentorship from alumni and faculty."
      >
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary">
            <Filter className="h-4 w-4" />
            Filter by category
          </span>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = activeCategory === category
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={buttonClasses({
                    variant: isActive ? 'primary' : 'ghost',
                  })}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-36 bg-gradient-to-br from-primary/10 via-accent/15 to-white" />
              <div className="flex flex-1 flex-col space-y-3 p-6">
                <div className="inline-flex w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-primary">
                  {project.mainTag}
                </div>
                <h3 className="text-xl font-bold text-text-primary">
                  {project.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {project.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  )
}

