import { useState } from 'react'
import type { FormEvent } from 'react'
import { ShieldCheck, LogIn } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'
import { buttonClasses } from '../components/ui/buttonStyles'

export default function LoginPage() {
  const [message, setMessage] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage(
      'Demo only: authenticate against your admin or member account. No backend is connected yet.',
    )
  }

  return (
    <Section
      title="Login"
      eyebrow="Admin & members"
      description="Admins can approve new member requests. Members can view projects, submit reports, and manage events."
    >
      <div className="mx-auto max-w-3xl">
        <Card className="p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">Secure Access</p>
              <p className="text-text-muted text-sm">
                Choose your role to continue
              </p>
            </div>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-text-primary"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-slate-200/80 bg-background px-4 py-3 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
                placeholder="you@rca.rw"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-text-primary"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full rounded-xl border border-slate-200/80 bg-background px-4 py-3 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-text-primary">
                Login as
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    value: 'admin',
                    title: 'Admin',
                    detail: 'Approve members, manage events, edit projects.',
                  },
                  {
                    value: 'member',
                    title: 'Member',
                    detail: 'View builds, submit updates, join squads.',
                  },
                ].map((role) => (
                  <label
                    key={role.value}
                    className="flex cursor-pointer gap-3 rounded-xl border border-slate-200/80 bg-white p-4 transition hover:border-accent hover:shadow-soft"
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      defaultChecked={role.value === 'member'}
                      className="mt-1 accent-primary"
                    />
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        {role.title}
                      </p>
                      <p className="text-xs text-text-muted">{role.detail}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className={buttonClasses({
                variant: 'primary',
                className: 'inline-flex items-center gap-2',
              })}
            >
              <LogIn className="h-4 w-4" />
              Login
            </button>
            <p className="text-xs text-text-muted">
              Need an account? Ask an admin or submit a request on the register page.
            </p>
            {message && (
              <p className="rounded-xl bg-accent/10 px-4 py-3 text-sm text-primary">
                {message}
              </p>
            )}
          </form>
        </Card>
      </div>
    </Section>
  )
}

