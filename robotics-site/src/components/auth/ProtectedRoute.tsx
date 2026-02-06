import { Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'admin' | 'member'
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const location = useLocation()
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token')
      const role = localStorage.getItem('role')

      if (!token) {
        setIsAuthorized(false)
        setIsChecking(false)
        return
      }

      if (requiredRole) {
        if (role === requiredRole) {
          setIsAuthorized(true)
        } else {
          setIsAuthorized(false)
        }
      } else {
        setIsAuthorized(true)
      }

      setIsChecking(false)
    }

    checkAuth()
  }, [requiredRole])

  if (isChecking) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-sm text-text-muted">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
