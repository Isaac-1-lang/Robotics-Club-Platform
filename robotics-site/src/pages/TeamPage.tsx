import { useEffect, useState } from 'react'
import { Users, Cpu, Shield, Sparkles } from 'lucide-react'
import { getTeam, type TeamMember } from '../apis/teamApi'
import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'
import { TeamMemberCard } from '../components/ui/TeamMemberCard'

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const result = await getTeam()
        setTeam(result)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }

    fetchTeam()
  }, [])

  if (loading) {
    return (
      <Section title="Meet the Team" eyebrow="Loading...">
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </Section>
    )
  }

  const squadIcons = [Cpu, Shield, Sparkles]

  return (
    <>
      <Section
        title="Meet the Team"
        eyebrow="Leadership & mentors"
        description="A multidisciplinary team mentoring members across hardware, software, AI, and operations."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {team.length > 0 ? (
            team.map((member) => (
              <TeamMemberCard
                key={member._id}
                name={member.name}
                role={member.role}
                bio={member.bio}
                image={member.image}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-text-muted">No team members found.</p>
            </div>
          )}
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
          ].map((item, idx) => {
            const Icon = squadIcons[idx] || Users
            return (
              <Card
                key={item.title}
                className="group p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-primary transition-all duration-300 group-hover:bg-accent/25 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4 text-accent" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Squad
                  </p>
                </div>
                <h3 className="mb-2 text-lg font-bold text-text-primary">
                  {item.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {item.details}
                </p>
              </Card>
            )
          })}
        </div>
      </Section>
    </>
  )
}

