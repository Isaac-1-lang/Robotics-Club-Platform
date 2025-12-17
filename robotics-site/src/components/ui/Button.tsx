import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { buttonClasses, type ButtonVariant } from './buttonStyles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  icon?: ReactNode
}

export function Button({
  children,
  className,
  variant = 'primary',
  icon,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClasses({ variant, className })}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}

