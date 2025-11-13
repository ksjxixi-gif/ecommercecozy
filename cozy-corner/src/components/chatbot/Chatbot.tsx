'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import VoiceInput from './VoiceInput'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function Chatbot({ lang }: { lang: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language: lang,
          context: messages.slice(-3).map(m => `${m.role}: ${m.content}`).join('\n')
        })
      })

      const data = await res.json()

      if (data.reply) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.reply,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, assistantMessage])
      }
    } catch (error) {
      console.error('Chat error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVoiceInput = (transcript: string) => {
    sendMessage(transcript)
  }

  if (!isOpen) {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-sage-green text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:bg-light-sage transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </motion.button>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-soft-beige rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 bg-white flex justify-between items-center border-b border-warm-gray">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-sage-green rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">CC</div>
            <div>
              <p className="font-semibold text-charcoal">{lang === 'ar' ? 'مساعد Cozy Corner' : 'Cozy Corner Assistant'}</p>
              <p className="text-sm text-sage-green">{lang === 'ar' ? 'متاح الآن' : 'Online now'}</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-text-light hover:text-charcoal">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.length === 0 && (
            <div className="text-center text-text-secondary mt-16">
              <p className="text-5xl mb-4">👋</p>
              <p className="font-semibold">{lang === 'ar' ? 'مرحباً! كيف يمكنني مساعدتك اليوم؟' : 'Hello! How can I help you today?'}</p>
              <div className="mt-4 space-y-2">
                {[
                  lang === 'ar' ? 'أرني أثاث عصري' : 'Show me modern furniture',
                  lang === 'ar' ? 'ما هي الأسعار؟' : 'What are the prices?',
                  lang === 'ar' ? 'أحتاج مساعدة في الاختيار' : 'I need help choosing'
                ].map((suggestion, i) => (
                  <button key={i} onClick={() => sendMessage(suggestion)} className="px-4 py-2 bg-white rounded-full text-sm shadow-sm hover:bg-soft-white">{suggestion}</button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`px-4 py-3 rounded-2xl max-w-xs ${
                msg.role === 'user'
                  ? 'bg-sage-green text-white'
                  : 'bg-white text-text-primary shadow-sm'
              }`}>
                <p>{msg.content}</p>
                <p className={`text-xs mt-1 text-right ${
                  msg.role === 'user' ? 'text-white/70' : 'text-text-light'
                }`}>
                  {msg.timestamp.toLocaleTimeString(lang === 'ar' ? 'ar-JO' : 'en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div className="flex justify-start mb-4">
              <div className="px-4 py-3 rounded-2xl bg-white text-text-primary shadow-sm flex items-center">
                <div className="flex space-x-1">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                      className="w-2 h-2 bg-sage-green rounded-full"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-warm-gray flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
            placeholder={lang === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'}
            className="flex-1 px-4 py-3 border border-warm-gray rounded-xl focus:outline-none focus:border-sage-green transition"
            disabled={isLoading}
          />
          <VoiceInput lang={lang} onTranscript={handleVoiceInput} />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
