'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 800)
          return 100
        }
        return prev + 5
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-cream-bg to-soft-beige"
      >
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.3, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.34, 1.56, 0.64, 1],
            delay: 0.2
          }}
          className="mb-8 relative"
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            fill="none"
            className="text-sage-green"
          >
            <path
              d="M50 10L10 40V90H40V60H60V90H90V40L50 10Z"
              fill="currentColor"
              opacity="0.2"
            />
            <path
              d="M50 10L10 40H20L50 20L80 40H90L50 10Z"
              fill="currentColor"
            />
          </svg>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 border-4 border-sage-green rounded-3xl -z-10"
          />
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mb-3"
        >
          <h1 className="text-5xl font-bold text-charcoal">
            Cozy
            <span className="text-sage-green">Corner</span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-sage-green text-lg font-medium mb-16"
        >
          Make your home feel warm and inviting
        </motion.p>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-warm-gray rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-sage-green to-light-sage rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-4 text-center text-text-secondary text-sm font-medium"
        >
          {progress < 30 && "Loading your cozy experience..."}
          {progress >= 30 && progress < 60 && "Preparing furniture collections..."}
          {progress >= 60 && progress < 90 && "Setting up personalization..."}
          {progress >= 90 && "Almost ready!"}
        </motion.p>

        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-sage-green rounded-full opacity-20"
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
              y: typeof window !== 'undefined' ? window.innerHeight + 20 : 0
            }}
            animate={{
              y: -20,
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
