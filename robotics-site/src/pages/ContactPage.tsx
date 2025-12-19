import type { FormEvent } from 'react'
import { Mail, MapPin, Phone, Send,GitBranchIcon } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'
import { buttonClasses } from '../components/ui/buttonStyles'

export default function ContactPage() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <Section
      title="Contact"
      eyebrow="Get in touch"
      description="Reach out for collaborations, mentorship, or to join an upcoming build sprint."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-text-primary"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-xl border border-slate-200/80 bg-background px-4 py-3 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/50"
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
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-xl border border-slate-200/80 bg-background px-4 py-3 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/50"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-semibold text-text-primary"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full rounded-xl border border-slate-200/80 bg-background px-4 py-3 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/50"
                placeholder="Tell us about your idea or question..."
              />
            </div>
            <button
              type="submit"
              className={buttonClasses({
                variant: 'primary',
                className: 'inline-flex items-center gap-2',
              })}
            >
              Send Message
              <Send className="h-4 w-4" />
            </button>
            <p className="text-xs text-text-muted">
              We respond within 2-3 business days. No backend is connected—this
              form is for demo purposes.
            </p>
          </form>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-text-primary">Location</h3>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              Rwanda Coding Academy
              <br />
              Nyabihu District, Rwanda
            </p>
            <div className="mt-4 space-y-3 text-sm text-text-primary">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                isaprecieux112@gmail.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                +250 788 598 775
              </div>
              <div className="flex items-center gap-2">
                <GitBranchIcon className="h-4 w-4 text-primary" />
                GitHub: ROBOTICS-CLUB1
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Nyabihu, Western Province
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-text-primary">Office Hours</h3>
            <p className="mt-2 text-sm text-text-muted">
              Weekdays: 4:00 PM — 8:00 PM
              <br />
              Saturdays: 10:00 AM — 2:00 PM
            </p>
            <p className="mt-4 text-sm font-semibold text-text-primary">
              Drop by during build sessions to see live prototypes.
            </p>
          </Card>
        </div>
      </div>
    </Section>
  )
}

