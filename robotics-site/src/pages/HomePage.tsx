import { ArrowRight, Sparkles, Cpu, Shield, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { whyRobotics, events } from '../data/content'
import { getProjects, type ProjectData } from '../apis/projectApis'
import { getPosts, type PostData } from '../apis/postsApi'
import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'
import { buttonClasses } from '../components/ui/buttonStyles'

export default function HomePage() {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [posts, setPosts] = useState<PostData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, postsData] = await Promise.all([
          getProjects(),
          getPosts()
        ])
        setProjects(projectsData.projects)
        setPosts(postsData.posts)
      } catch (err: any) {
        console.error('Failed to fetch data:', err)
        let errorMessage = 'Failed to load content.'

        if (err.message && err.message.includes('Network Error')) {
          errorMessage = 'Network Error: Check Sanity CORS settings.'
        } else if (err.statusCode === 401 || err.statusCode === 403) {
          errorMessage = 'Access Denied: Check API Token.'
        }

        // Don't block UI entirely, just log error for now or show toaster in real app
        // We'll set a state to optionally show a banner
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const featuredProjects = projects.slice(0, 3)
  const featuredPosts = posts.slice(0, 3)
  const upcomingEvents = events.filter((event) => event.status === 'upcoming')

  return (
    <>
      <Section className="pt-10">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/90 via-primary to-slate-900 px-6 py-12 sm:px-10 sm:py-16 shadow-soft">
          <div className="absolute inset-0 bg-[size:40px_40px] bg-grid-glow opacity-30" />
          <div className="relative grid gap-10 lg:grid-cols-2">
            <div className="space-y-6 text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                Rwanda Coding Academy Robotics Club
              </div>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                Build, test, and launch robotics and AI that shape Rwanda&apos;s future.
              </h1>
              <p className="max-w-2xl text-base text-slate-200 leading-relaxed">
                We are a student-led club crafting autonomous systems, IoT networks,
                and AI-driven robotics. Join a community that prototypes boldly and
                competes globally.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className={buttonClasses({
                    variant: 'secondary',
                    className: 'shadow-lg shadow-accent/40',
                  })}
                >
                  Request Membership
                </Link>
                <Link
                  to="/login"
                  className={buttonClasses({
                    variant: 'ghost',
                    className: 'border-white/40 text-white hover:text-white',
                  })}
                >
                  Login
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { label: 'Active Projects', value: '15+' },
                  { label: 'Members', value: '30+' },
                  // { label: 'Competitions', value: '15+' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm"
                  >
                    <p className="text-lg font-bold">{item.value}</p>
                    <p className="text-slate-200">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-10 rounded-full bg-accent/20 blur-3xl" />
              <div className="relative flex h-full items-center justify-center">
                <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <img src="/image.png" className="h-11 w-11 rounded-full" />
                    <div>
                      <p className="text-sm text-slate-200">Project Spotlight</p>
                      <p className="text-lg font-semibold">AI Vision Rover</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3 text-sm text-slate-100">
                    <p>
                      Our autonomous rover blends computer vision, sensor fusion, and
                      precise motor control to adapt to dynamic courses.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['OpenCV', 'Edge AI', 'ROS2'].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/10 px-3 py-1 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {error && (
        <Section className="py-2">
          <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-600">
            {error}
          </div>
        </Section>
      )}

      <Section
        title="Featured Robotics Projects"
        eyebrow="What we're building"
        description="From AI vision to IoT sensor networks, explore the engineering work powering our competitions and demos."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <div className="col-span-full py-12 text-center text-text-muted">
              Loading projects...
            </div>
          ) : featuredProjects.length > 0 ? (
            featuredProjects.map((project) => (
              <motion.div
                key={project._id}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Card className="h-full overflow-hidden border-slate-200/80">
                  <div
                    className="h-36 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: project.imageUrl ? `url(${project.imageUrl})` : undefined,
                      backgroundColor: !project.imageUrl ? '#f1f5f9' : undefined
                    }}
                  >
                    {!project.imageUrl && (
                      <div className="h-full w-full bg-gradient-to-br from-primary/10 via-accent/20 to-white" />
                    )}
                  </div>
                  <div className="space-y-3 p-6">
                    <div className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-primary">
                      {project.mainTag.name}
                    </div>
                    <h3 className="text-xl font-bold text-text-primary">
                      {project.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
                      {project.content}
                    </p>
                    {/*  <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag._id}
                          className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-text-muted"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div> */}
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-text-muted">
              No projects found.
            </div>
          )}
        </div>
      </Section>

      <Section
        title="Why Robotics at RCA?"
        eyebrow="Learn by building"
        description="We connect engineering, design, and research so members can ship prototypes that matter."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {whyRobotics.map((item, idx) => (
            <Card
              key={item.title}
              className="p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-primary">
                {idx === 0 && <Cpu className="h-6 w-6" />}
                {idx === 1 && <Shield className="h-6 w-6" />}
                {idx === 2 && <Sparkles className="h-6 w-6" />}
              </div>
              <h3 className="mt-4 text-lg font-bold text-text-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="Upcoming Events"
        eyebrow="Compete & showcase"
        description="Join our next competitions, demo days, and workshops to sharpen your robotics skills."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {upcomingEvents.map((event) => (
            <Card
              key={event.id}
              className="flex h-full flex-col justify-between p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <Calendar className="h-4 w-4" />
                  {event.date}
                </div>
                <h3 className="text-xl font-bold text-text-primary">
                  {event.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {event.description}
                </p>
                <p className="text-sm font-semibold text-text-primary">
                  {event.location}
                </p>
              </div>
              <Link
                to="/events"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent"
              >
                View details
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>
      </Section>
      <Section
        title="Popular Blogs"
        eyebrow="What we're building"
        description="From AI vision to IoT sensor networks, explore the engineering work powering our competitions and demos."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <div className="col-span-full py-12 text-center text-text-muted">
              Loading blogs...
            </div>
          ) : featuredPosts.length > 0 ? (
            featuredPosts.map((post) => (
              <motion.div
                key={post._id}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Card className="h-full overflow-hidden border-slate-200/80">
                  <div
                    className="h-36 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: post.imageUrl ? `url(${post.imageUrl})` : undefined,
                      backgroundColor: !post.imageUrl ? '#f1f5f9' : undefined
                    }}
                  >
                    {!post.imageUrl && (
                      <div className="h-full w-full bg-gradient-to-br from-primary/10 via-accent/20 to-white" />
                    )}
                  </div>
                  <div className="space-y-3 p-6">
                    <div className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-primary">
                      {post.mainTag.name}
                    </div>
                    <h3 className="text-xl font-bold text-text-primary">
                      {post.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
                      {post.content}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag._id}
                          className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-text-muted"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
                      <span>By {post.author.username}</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-text-muted">
              No blogs found.
            </div>
          )}
        </div>
      </Section>
    </>
  )
}

