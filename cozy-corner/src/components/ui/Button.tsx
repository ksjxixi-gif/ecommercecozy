import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const baseClasses = 'px-6 py-3 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2'

    const variants = {
      primary: 'bg-sage-green text-white hover:bg-light-sage focus:ring-sage-green',
      secondary: 'bg-charcoal text-white hover:bg-gray-800 focus:ring-charcoal',
      outline: 'bg-transparent border-2 border-sage-green text-sage-green hover:bg-sage-green hover:text-white focus:ring-sage-green',
    }

    return (
      <button
        className={`${baseClasses} ${variants[variant]} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export default Button
