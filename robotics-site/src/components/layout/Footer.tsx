import { Github, Instagram, Linkedin, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { navLinks } from '../../data/content'

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/ROBOTICS-CLUB1' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/isaacniyo78' },
  { icon: Mail, label: 'Email', href: 'mailto:club@rca.rw' },
]

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200/70 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-text-muted">
              Rwanda Coding Academy
            </p>
            <p className="text-2xl font-bold text-primary">Robotics Club</p>
            <p className="text-sm text-text-muted leading-relaxed">
              Building the next generation of robotics innovators through
              hands-on projects, mentorship, and competitions.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-primary">Explore</h4>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-text-muted hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-primary">Contact</h4>
            <p className="mt-3 text-sm text-text-muted">
              Rwanda Coding Academy
              <br />
              Nyabihu District, Rwanda
            </p>
            <a
              href="mailto:club@rca.rw"
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              <Mail className="h-4 w-4" />
              club@rca.rw
            </a>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-primary">Social</h4>
            <div className="mt-3 flex flex-wrap gap-3">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-primary shadow-soft transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                  aria-label={item.label}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200/70 pt-6 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} RCA Robotics Club. All rights reserved.</p>
          <p className="text-xs">
            Built for students who learn by building and sharing knowledge.
          </p>
        </div>
      </div>
    </footer>
  )
}

