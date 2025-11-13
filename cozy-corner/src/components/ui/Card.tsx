import { forwardRef } from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={`bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

export default Card
