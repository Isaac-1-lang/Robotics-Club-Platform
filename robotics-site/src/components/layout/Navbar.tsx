import { Menu, X} from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navLinks } from '../../data/content'
import { buttonClasses } from '../ui/buttonStyles'

function NavLinkItem({
  path,
  label,
  onClick,
}: {
  path: string
  label: string
  onClick?: () => void
}) {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) =>
        `px-3 py-2 text-sm font-semibold transition-colors ${
          isActive ? 'text-accent' : 'text-text-muted hover:text-primary'
        }`
      }
    >
      {label}
    </NavLink>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
            <img
              src="/image.png"
              alt="Robotics Club Logo"
              className="h-11 w-11 rounded-full"
            />
          
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-text-muted">
              RCA
            </p>
            <p className="text-lg font-bold text-text-primary">
              Robotics Club
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <NavLinkItem key={link.path} path={link.path} label={link.label} />
          ))}
          <Link
            to="/register"
            className={buttonClasses({
              variant: 'primary',
              className: 'ml-2',
            })}
          >
            Request Access
          </Link>
        </nav>

        <button
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-text-primary shadow-soft md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden">
          <div className="mx-4 mb-4 space-y-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
            {navLinks.map((link) => (
              <NavLinkItem
                key={link.path}
                path={link.path}
                label={link.label}
                onClick={() => setOpen(false)}
              />
            ))}
            <Link
              to="/register"
              className={buttonClasses({
                variant: 'primary',
                className: 'block w-full text-center',
              })}
            >
              Request Access
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

