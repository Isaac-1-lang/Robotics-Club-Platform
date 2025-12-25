import { useEffect, useState } from 'react'
import { Calendar, MapPin, Trophy } from 'lucide-react'
import { sanityClient } from '../lib/sanity'
import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'

interface SanityEvent {
  _id: string
  title: string
  slug: { current: string }
  description: string
  date: string
  location: string
  status: 'upcoming' | 'past'
}

export default function EventsPage() {
  const [events, setEvents] = useState<SanityEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const query = `*[_type == "event"] | order(date desc) {
                _id,
                title,
                slug,
                description,
                date,
                location,
                status
            }`
        const result = await sanityClient.fetch(query)
        setEvents(result)
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const upcoming = events.filter((event) => event.status === 'upcoming')
  const past = events.filter((event) => event.status === 'past')

  if (loading) {
    return (
      <Section title="Events & Competitions" eyebrow="Loading...">
        <p className="text-text-muted">Loading events...</p>
      </Section>
    )
  }

  return (
    <>
      <Section
        title="Events & Competitions"
        eyebrow="Compete, demo, learn"
        description="From national expos to hackathons, we showcase robotics that solve real problems."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {upcoming.map((event) => (
            <Card
              key={event._id}
              className="p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-primary">
                  <Calendar className="h-4 w-4" />
                  Upcoming
                </div>
                <p className="text-sm font-semibold text-text-primary">
                  {event.date}
                </p>
              </div>
              <h3 className="mt-3 text-xl font-bold text-text-primary">
                {event.title}
              </h3>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">
                {event.description}
              </p>
              <div className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-text-primary">
                <MapPin className="h-4 w-4" />
                {event.location}
              </div>
            </Card>
          ))}
          {upcoming.length === 0 && (
            <div className="col-span-full py-8 text-center text-text-muted">
              No upcoming events at the moment.
            </div>
          )}
        </div>
      </Section>

      <Section
        title="Past Highlights"
        eyebrow="What we've done"
        description="We document what worked, what failed, and how to improve for the next competition."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {past.map((event) => (
            <Card key={event._id} className="p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-text-muted">
                <Trophy className="h-4 w-4 text-primary" />
                {event.date}
              </div>
              <h3 className="mt-2 text-lg font-bold text-text-primary">
                {event.title}
              </h3>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">
                {event.description}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-primary">
                {event.location}
              </p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  )
}

