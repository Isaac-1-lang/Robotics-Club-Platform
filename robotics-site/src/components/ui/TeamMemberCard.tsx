import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { Card } from './Card'
import { cn } from '../../lib/utils'

interface TeamMemberCardProps {
  name: string
  role: string
  bio: string
  image?: string
  socials?: {
    github?: string
    linkedin?: string
    twitter?: string
    email?: string
  }
  className?: string
}

export function TeamMemberCard({
  name,
  role,
  bio,
  image,
  socials,
  className,
}: TeamMemberCardProps) {
  const socialIcons = [
    { icon: Github, href: socials?.github, label: 'GitHub' },
    { icon: Linkedin, href: socials?.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: socials?.twitter, label: 'Twitter' },
    { icon: Mail, href: socials?.email ? `mailto:${socials.email}` : undefined, label: 'Email' },
  ].filter((item) => item.href)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
      className={cn('h-full', className)}
    >
      <Card className="group h-full overflow-hidden p-6 transition-all duration-300 hover:shadow-lg">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative mb-4">
            {image ? (
              <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-accent/20 transition-all duration-300 group-hover:ring-accent/40">
                <img
                  src={image}
                  alt={name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 via-accent/30 to-primary/10 text-2xl font-bold text-primary ring-4 ring-accent/20 transition-all duration-300 group-hover:ring-accent/40">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-accent ring-4 ring-white" />
          </div>

          {/* Name & Role */}
          <div className="mb-3">
            <h3 className="text-lg font-bold text-text-primary mb-1">{name}</h3>
            <p className="text-sm font-semibold text-accent">{role}</p>
          </div>

          {/* Bio */}
          <p className="mb-4 text-sm text-text-muted leading-relaxed line-clamp-3">
            {bio}
          </p>

          {/* Social Links */}
          {socialIcons.length > 0 && (
            <div className="flex items-center gap-2">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href?.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href?.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-text-muted transition-all duration-200 hover:border-accent hover:bg-accent/10 hover:text-accent hover:-translate-y-0.5"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
