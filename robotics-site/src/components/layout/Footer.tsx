import { Github, Instagram, Linkedin, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { navLinks } from '../../data/content'

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/ROBOTICS-CLUB1' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/isaacniyo78' },
  { icon: Mail, label: 'Email', href: 'mailto:isaprecieux112@gmail.com' },
]

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200/50 bg-gradient-to-b from-white to-slate-50/50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/image.png"
                alt="Robotics Club Logo"
                className="h-12 w-12 rounded-full ring-2 ring-primary/10"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Rwanda Coding Academy
                </p>
                <p className="text-xl font-bold text-primary">Robotics Club</p>
              </div>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Building the next generation of robotics innovators through
              hands-on projects, mentorship, and competitions.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-primary mb-4">Explore</h4>
            <div className="space-y-2">
              {navLinks.filter(link => !['Login', 'Register'].includes(link.label)).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-sm text-text-muted transition-colors hover:text-primary hover:translate-x-1 duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-primary mb-4">Contact</h4>
            <p className="text-sm text-text-muted leading-relaxed">
              Rwanda Coding Academy
              <br />
              Nyabihu District, Rwanda
            </p>
            <a
              href="mailto:isaprecieux112@gmail.com"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
            >
              <Mail className="h-4 w-4" />
              isaprecieux112@gmail.com
            </a>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text-primary mb-4">Social</h4>
            <div className="flex flex-wrap gap-3">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-primary shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:text-accent hover:shadow-md"
                  aria-label={item.label}
                >
                  <item.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200/50 pt-8 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium">© {new Date().getFullYear()} RCA Robotics Club. All rights reserved.</p>
          <p className="text-xs text-text-muted/80">
            Built for students who learn by building and sharing knowledge.
          </p>
        </div>
      </div>
    </footer>
  )
}

