'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface VoiceInputProps {
  lang: string
  onTranscript: (text: string) => void
}

export default function VoiceInput({ lang, onTranscript }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition()
        recognitionInstance.continuous = false
        recognitionInstance.interimResults = false
        recognitionInstance.lang = lang === 'ar' ? 'ar-SA' : 'en-US'

        recognitionInstance.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          onTranscript(transcript)
          setIsRecording(false)
        }

        recognitionInstance.onerror = () => {
          setIsRecording(false)
        }

        recognitionInstance.onend = () => {
          setIsRecording(false)
        }

        setRecognition(recognitionInstance)
      }
    }
  }, [lang, onTranscript])

  const toggleRecording = () => {
    if (!recognition) {
      alert(lang === 'ar'
        ? 'التسجيل الصوتي غير مدعوم في هذا المتصفح'
        : 'Voice recording is not supported in this browser'
      )
      return
    }

    if (isRecording) {
      recognition.stop()
      setIsRecording(false)
    } else {
      recognition.start()
      setIsRecording(true)
    }
  }

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleRecording}
      className={`p-3 rounded-xl transition ml-2 ${
        isRecording
          ? 'bg-accent-orange text-white animate-pulse'
          : 'bg-soft-white text-sage-green hover:bg-sage-green hover:text-white'
      }`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    </motion.button>
  )
}
