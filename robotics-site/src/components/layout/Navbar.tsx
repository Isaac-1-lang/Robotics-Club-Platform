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
        `relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
          isActive
            ? 'text-accent bg-accent/10'
            : 'text-text-muted hover:text-primary hover:bg-slate-100/50'
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
    <header className="sticky top-0 z-50 flex justify-center px-4 pt-4 sm:px-6">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-2xl border border-white/20 bg-white/70 backdrop-blur-xl px-4 py-3 shadow-soft transition-all duration-300 hover:bg-white/80 hover:shadow-lg sm:px-6 sm:py-3.5">
        <Link
          to="/"
          className="flex items-center gap-3 transition-transform duration-200 hover:scale-105"
          onClick={() => setOpen(false)}
        >
          <img
            src="/image.png"
            alt="Robotics Club Logo"
            className="h-10 w-10 rounded-full ring-2 ring-white/50 sm:h-11 sm:w-11"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted sm:text-sm">
              RCA
            </p>
            <p className="text-base font-bold text-text-primary sm:text-lg">
              Robotics Club
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
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
        </div>

        <button
          className="inline-flex items-center justify-center rounded-xl border border-slate-200/50 bg-white/80 p-2 text-text-primary shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="absolute left-0 right-0 top-full z-40 px-4 pt-2 md:hidden">
          <div className="mx-auto max-w-5xl space-y-2 rounded-2xl border border-white/20 bg-white/90 p-4 shadow-xl backdrop-blur-xl">
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
              onClick={() => setOpen(false)}
            >
              Request Access
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

