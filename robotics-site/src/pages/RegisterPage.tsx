import { useState } from 'react'
import type { FormEvent } from 'react'
import { UserPlus, Shield } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'
import { buttonClasses } from '../components/ui/buttonStyles'

export default function RegisterPage() {
  const [status, setStatus] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus(
      'Request submitted. An admin will review and approve your membership. (Demo only, no backend yet.)',
    )
  }

  return (
    <Section
      title="Register as Member"
      eyebrow="Join the club"
      description="Submit your details to request membership. Admins review and approve applications before granting access."
    >
      <div className="mx-auto max-w-3xl">
        <Card className="p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <UserPlus className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">Membership</p>
              <p className="text-text-muted text-sm">
                Your request will be reviewed by an admin
              </p>
            </div>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="fullName"
                  className="text-sm font-semibold text-text-primary"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  required
                  className="w-full rounded-xl border border-slate-200/80 bg-background px-4 py-3 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
                  placeholder="Your name"
                />
              </div>
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
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
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
                <label
                  htmlFor="confirm"
                  className="text-sm font-semibold text-text-primary"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm"
                  name="confirm"
                  type="password"
                  required
                  className="w-full rounded-xl border border-slate-200/80 bg-background px-4 py-3 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-text-primary">
                Requested role
              </p>
              <label className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-4">
                <input
                  type="radio"
                  name="role"
                  value="member"
                  defaultChecked
                  className="mt-1 accent-primary"
                />
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    Member
                  </p>
                  <p className="text-xs text-text-muted">
                    Access projects, join squads, submit updates. Requires admin approval.
                  </p>
                </div>
              </label>
              <div className="flex items-center gap-2 rounded-xl bg-primary/5 px-3 py-2 text-xs text-text-muted">
                <Shield className="h-4 w-4 text-primary" />
                Admin accounts are created separately. Please contact an existing admin for access.
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="notes"
                className="text-sm font-semibold text-text-primary"
              >
                Why do you want to join?
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                className="w-full rounded-xl border border-slate-200/80 bg-background px-4 py-3 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
                placeholder="Share your interests, experience, or how you want to contribute."
              />
            </div>

            <button
              type="submit"
              className={buttonClasses({
                variant: 'secondary',
                className: 'inline-flex items-center gap-2',
              })}
            >
              Submit request
            </button>
            {status && (
              <p className="rounded-xl bg-accent/10 px-4 py-3 text-sm text-primary">
                {status}
              </p>
            )}
          </form>
        </Card>
      </div>
    </Section>
  )
}

