import { ArrowRight, Sparkles, Cpu, Shield, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects, whyRobotics, events } from '../data/content'
import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'
import { buttonClasses } from '../components/ui/buttonStyles'

export default function HomePage() {
  const featuredProjects = projects.slice(0, 3)
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
                  Admin / Member Login
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
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-white">
                      <img src="/logoWhite.png" className="h-10 w-10" />
                    </div>
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

      <Section
        title="Featured Robotics Projects"
        eyebrow="What we're building"
        description="From AI vision to IoT sensor networks, explore the engineering work powering our competitions and demos."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Card className="h-full overflow-hidden border-slate-200/80">
                <div className="h-36 bg-gradient-to-br from-primary/10 via-accent/20 to-white" />
                <div className="space-y-3 p-6">
                  <div className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-primary">
                    {project.mainTag}
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">
                    {project.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tech) => (
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
            </motion.div>
          ))}
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
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Card className="h-full overflow-hidden border-slate-200/80">
                <div className="h-36 bg-gradient-to-br from-primary/10 via-accent/20 to-white" />
                <div className="space-y-3 p-6">
                  <div className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-primary">
                    {project.mainTag}
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">
                    {project.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tech) => (
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
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  )
}

