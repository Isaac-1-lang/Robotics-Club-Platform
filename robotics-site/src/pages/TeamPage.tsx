import { useEffect, useState } from 'react'
import { Users } from 'lucide-react'
import { sanityClient, urlFor } from '../lib/sanity'
import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'

interface SanityTeamMember {
  _id: string
  name: string
  role: string
  bio: string
  image: any
}

export default function TeamPage() {
  const [team, setTeam] = useState<SanityTeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const query = `*[_type == "team"] | order(order asc) {
          _id,
          name,
          role,
          bio,
          image
        }`
        const result = await sanityClient.fetch(query)
        setTeam(result)
      } catch (error) {
        console.error('Error fetching team:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTeam()
  }, [])

  if (loading) {
    return (
      <Section title="Meet the Team" eyebrow="Loading...">
        <p className="text-text-muted">Loading team members...</p>
      </Section>
    )
  }

  return (
    <>
      <Section
        title="Meet the Team"
        eyebrow="Leadership & mentors"
        description="A multidisciplinary team mentoring members across hardware, software, AI, and operations."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <Card
              key={member._id}
              className="p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                {member.image ? (
                  <div className="h-12 w-12 overflow-hidden rounded-full">
                    <img
                      src={urlFor(member.image).width(100).height(100).url()}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-lg font-bold text-primary">
                    {member.name.charAt(0)}
                  </div>
                )}

                <div>
                  <p className="text-sm font-semibold text-primary">
                    {member.role}
                  </p>
                  <p className="text-lg font-bold text-text-primary">
                    {member.name}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-text-muted leading-relaxed">
                {member.bio}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        title="Join a Squad"
        eyebrow="How to start"
        description="We onboard new members through build squads focused on AI, hardware, and field testing."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Hardware & Mechatronics',
              details: 'PCB design, motor control, mechanical design, testing.',
            },
            {
              title: 'AI & Software',
              details: 'Computer vision, path planning, control software, dashboards.',
            },
            {
              title: 'Operations & Research',
              details: 'Safety, documentation, outreach, and event coordination.',
            },
          ].map((item) => (
            <Card
              key={item.title}
              className="p-6 text-sm text-text-muted leading-relaxed"
            >
              <div className="flex items-center gap-2 text-primary">
                <Users className="h-4 w-4" />
                <p className="text-sm font-semibold">Squad</p>
              </div>
              <h3 className="mt-2 text-lg font-bold text-text-primary">
                {item.title}
              </h3>
              <p className="mt-1">{item.details}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  )
}

