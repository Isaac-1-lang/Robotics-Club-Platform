import { useMemo, useState } from 'react'
import { Github, Instagram, Linkedin, Search, ShieldCheck, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { Section } from '../components/ui/Section'
import { teamGroupOrder, teamRoster, type RosterMember, type TeamGroup } from '../data/teamRoster'

const groupDescriptions: Record<TeamGroup, string> = {
  'Executive Committee': 'Club governance, strategy, accountability, and member representation.',
  'Technical Leadership': 'Engineering direction across hardware, software, AI, embedded systems, research, design, and communication.',
  Coordination: 'Project delivery, workshops, competitions, and event operations.',
  'Specialist Teams': 'Cross-functional builders contributing within dedicated engineering and outreach squads.',
  'Robotics Members': 'Active club members learning, prototyping, testing, and supporting team builds.',
}

function MemberCard({ member, index }: { member: RosterMember; index: number }) {
  const initials = member.name.split(/[ /]+/).filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase()
  const profiles = [
    { label: 'GitHub', icon: Github, href: member.socials?.github },
    { label: 'LinkedIn', icon: Linkedin, href: member.socials?.linkedin },
    { label: 'Instagram', icon: Instagram, href: member.socials?.instagram },
  ]

  return (
    <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: .4, delay: Math.min(index * .035, .25) }} className="team-roster-card group">
      <div className="member-avatar"><span>{initials}</span><i /></div>
      <div className="min-w-0 flex-1"><h3>{member.name}</h3><p>{member.role}</p></div>
      <div className="member-socials">
        {profiles.map(({ label, icon: Icon, href }) => href ? (
          <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`${member.name} on ${label}`}><Icon /></a>
        ) : (
          <span key={label} title={`${label} profile not yet provided`} aria-label={`${label} profile pending`}><Icon /></span>
        ))}
      </div>
    </motion.article>
  )
}

export default function TeamPage() {
  const [query, setQuery] = useState('')
  const [activeGroup, setActiveGroup] = useState<TeamGroup | 'All'>('All')

  const filtered = useMemo(() => teamRoster.filter(member => {
    const matchesGroup = activeGroup === 'All' || member.group === activeGroup
    const search = query.trim().toLowerCase()
    return matchesGroup && (!search || `${member.name} ${member.role}`.toLowerCase().includes(search))
  }), [activeGroup, query])

  return (
    <div className="team-roster-page">
      <Section className="pb-8" eyebrow="RCA Robotics roster" title="The people behind the machines." description="A multidisciplinary student team designing, programming, testing, documenting, and presenting robotics systems at Rwanda Coding Academy.">
        <div className="roster-stats">
          <div><strong>{teamRoster.length}</strong><span>Club members</span></div>
          <div><strong>{teamRoster.filter(member => member.group === 'Technical Leadership').length}</strong><span>Technical leads</span></div>
          <div><strong>{new Set(teamRoster.map(member => member.role)).size}</strong><span>Active roles</span></div>
        </div>
        <div className="roster-toolbar">
          <label><Search /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search by name or role" /></label>
          <div className="roster-filters"><button className={activeGroup === 'All' ? 'active' : ''} onClick={() => setActiveGroup('All')}>All</button>{teamGroupOrder.map(group => <button key={group} className={activeGroup === group ? 'active' : ''} onClick={() => setActiveGroup(group)}>{group}</button>)}</div>
        </div>
      </Section>

      {teamGroupOrder.map(group => {
        const members = filtered.filter(member => member.group === group)
        if (!members.length) return null
        return <Section key={group} className="roster-group-section py-10"><div className="roster-group-heading"><div><p><ShieldCheck /> Division / {String(teamGroupOrder.indexOf(group) + 1).padStart(2, '0')}</p><h2>{group}</h2><span>{groupDescriptions[group]}</span></div><b>{members.length.toString().padStart(2, '0')}</b></div><div className="roster-grid">{members.map((member, index) => <MemberCard key={member.id} member={member} index={index} />)}</div></Section>
      })}

      {!filtered.length && <Section><div className="roster-empty"><Users /><h2>No matching members</h2><p>Try another name, role, or team filter.</p></div></Section>}
    </div>
  )
}