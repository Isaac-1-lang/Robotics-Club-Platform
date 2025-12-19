import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { buttonClasses } from '../components/ui/buttonStyles'
import { register, type RegisterData } from '../apis/authApis'



export default function RegisterPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<RegisterData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    try {
      setIsLoading(true)
      await register(formData)
      navigate('/login', { 
        state: { message: 'Registration successful! Please log in.' } 
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
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

          {error && (
            <div className="mb-4 rounded-xl bg-red-100 p-4 text-sm text-red-700">
              {error}
            </div>
          )}
          
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="fullName"
                  className="text-sm font-semibold text-text-primary"
                >
                  Full Name *
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200/80 bg-background px-4 py-3 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-text-primary"
                >
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
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
                  Password *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200/80 bg-background px-4 py-3 text-sm text-text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-semibold text-text-primary"
                >
                  Confirm Password *
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  minLength={6}
                  value={formData.confirmPassword}
                  onChange={handleChange}
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
              disabled={isLoading}
              className={`${buttonClasses({ variant: 'secondary', className: 'inline-flex items-center gap-2' })} ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Create Account'
              )}
            </button>
            
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <a
                href="/login"
                className="font-medium text-primary hover:underline"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/login')
                }}
              >
                Log in
              </a>
            </div>
          </form>
        </Card>
      </div>
  )
}

