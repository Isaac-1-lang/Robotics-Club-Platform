import { Menu, Moon, Sun, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navLinks } from '../../data/content'

function NavLinkItem({ path, label, onClick }: { path: string; label: string; onClick?: () => void }) {
  return (
    <NavLink to={path} onClick={onClick} className={({ isActive }) => `robot-nav-link relative rounded-sm px-3 py-2 text-sm font-medium ${isActive ? 'is-active' : ''}`}>
      {label}
    </NavLink>
  )
}

interface NavbarProps {
  lightMode: boolean
  onToggleTheme: () => void
}

export default function Navbar({ lightMode, onToggleTheme }: NavbarProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="robot-navbar sticky top-0 z-50 flex justify-center border-b px-4 backdrop-blur-xl sm:px-6">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-1 py-3 sm:px-2">
        <Link to="/" className="flex items-center gap-3 hover:scale-105" onClick={() => setOpen(false)}>
          <img src="/logoBlack.png" alt="Robotics Club Logo" className="h-10 w-10 rounded-full ring-2 ring-white/30 sm:h-11 sm:w-11" />
          <div><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#ffffff] sm:text-xs">RCA</p><p className="robot-brand text-base font-bold sm:text-lg">Robotics Club</p></div>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {navLinks.map(link => <NavLinkItem key={link.path} path={link.path} label={link.label} />)}
          <button type="button" onClick={onToggleTheme} className="theme-toggle ml-2 flex h-10 w-10 items-center justify-center rounded-full border" aria-label={lightMode ? 'Switch to dark mode' : 'Switch to light mode'} title={lightMode ? 'Dark mode' : 'Light mode'}>
            {lightMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <Link to="/register" className="ml-2 bg-[#ffffff] px-4 py-2.5 text-sm font-bold text-[#06100b] hover:bg-white">Request Access</Link>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <button type="button" onClick={onToggleTheme} className="theme-toggle flex h-10 w-10 items-center justify-center rounded-full border" aria-label={lightMode ? 'Switch to dark mode' : 'Switch to light mode'}>{lightMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}</button>
          <button className="theme-toggle inline-flex h-10 w-10 items-center justify-center border" aria-label="Toggle menu" onClick={() => setOpen(prev => !prev)}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </nav>

      {open && <div className="absolute left-0 right-0 top-full z-40 px-3 pt-2 xl:hidden"><div className="robot-mobile-menu mx-auto max-w-7xl space-y-2 border p-4 shadow-xl backdrop-blur-xl">{navLinks.map(link => <NavLinkItem key={link.path} path={link.path} label={link.label} onClick={() => setOpen(false)} />)}<Link to="/register" className="block w-full bg-[#ffffff] px-4 py-3 text-center text-sm font-bold text-[#06100b]" onClick={() => setOpen(false)}>Request Access</Link></div></div>}
    </header>
  )
}