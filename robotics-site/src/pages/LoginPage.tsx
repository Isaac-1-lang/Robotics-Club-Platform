import { useState } from 'react'
import type { FormEvent } from 'react'
import { ShieldCheck, LogIn } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { buttonClasses } from '../components/ui/buttonStyles'
import { Link } from 'react-router-dom'
import type { LoginData } from '../apis/authApis'
import { login } from '../apis/authApis'
import { useNavigate } from 'react-router-dom'
export default function LoginPage() {
  const [message, setMessage] = useState('')
  const navigate = useNavigate()  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const loginData: LoginData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    try {
      const response = await login(loginData)
      if(response.user.membershipStatus=="approved") {
        setMessage('Login successful!');
        localStorage.setItem('token', response.token)
      localStorage.setItem('role', response.user.role)
      localStorage.setItem('username', response.user.username)
      localStorage.setItem('email', response.user.email)
      if(response.user.role=="admin"){
        // Navigate to the /admin portal
        navigate('/admin')
      } else if(response.user.role=="member" ){
        // Navigate to the /user portal
        navigate('/member')
      }
      } else if(response.user.membershipStatus=="pending") {
        setMessage('You are not yet approved!');
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Login failed. Please try again.');
    } 
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 md:py-16">
      <Card className="p-6 shadow-lg sm:p-8 lg:p-10">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary sm:text-2xl">Secure Access</h1>
            <p className="text-text-muted text-sm">
              Sign in to your account
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
             Haven't account? <Link
              to="/register" className="font-semibold text-primary hover:underline"
            >
              Request Access
            </Link>
            </p>
            {message && (
              <div className={`rounded-xl px-4 py-3 text-sm ${
                message.includes('successful') 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-accent/10 text-primary border border-accent/20'
              }`}>
                {message}
              </div>
            )}
          </form>
        </Card>
      </div>
  )
}

