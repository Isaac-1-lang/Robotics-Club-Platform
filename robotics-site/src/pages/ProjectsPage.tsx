import { useEffect, useMemo, useState } from 'react'
import { Filter } from 'lucide-react'
import { sanityClient, urlFor } from '../lib/sanity'
import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'
import { buttonClasses } from '../components/ui/buttonStyles'

// Define the shape of a Project from Sanity
interface SanityProject {
  _id: string
  title: string
  slug: { current: string }
  description: string
  category: string
  stack: string[]
  mainImage: any
}

const categories = [
  'All',
  'AI',
  'Hardware',
  'IoT',
  'Software',
]

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [projects, setProjects] = useState<SanityProject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project"]{
          _id,
          title,
          slug,
          description,
          category,
          stack,
          mainImage
        }`
        const result = await sanityClient.fetch(query)
        setProjects(result)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects
    return projects.filter((project) => project.category === activeCategory)
  }, [activeCategory, projects])

  if (loading) {
    return (
      <Section title="Robotics Projects" eyebrow="Loading...">
        <div className="flex h-40 items-center justify-center">
          <p className="text-text-muted">Loading projects...</p>
        </div>
      </Section>
    )
  }

  return (
    <>
      <Section
        title="Robotics Projects"
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
              key={project._id}
              className="flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lg"
            >
              {project.mainImage ? (
                <div className="h-36 overflow-hidden">
                  <img
                    src={urlFor(project.mainImage).width(400).height(300).url()}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-36 bg-gradient-to-br from-primary/10 via-accent/15 to-white" />
              )}

              <div className="flex flex-1 flex-col space-y-3 p-6">
                <div className="inline-flex w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-primary">
                  {project.category}
                </div>
                <h3 className="text-xl font-bold text-text-primary">
                  {project.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {project.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.stack && project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-text-muted"
                    >
                      {tech}
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

