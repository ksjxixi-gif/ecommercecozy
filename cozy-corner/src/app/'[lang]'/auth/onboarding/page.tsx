'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

export default function OnboardingPage({ params: { lang } }: { params: { lang: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')

  const [step, setStep] = useState(1)
  const [preferences, setPreferences] = useState({
    style: '',
    colors: [] as string[],
    rooms: [] as string[],
    budget: ''
  })

  const styles = [
    { id: 'modern', nameEn: 'Modern', nameAr: 'عصري', emoji: '🏢' },
    { id: 'classic', nameEn: 'Classic', nameAr: 'كلاسيكي', emoji: '🏛️' },
    { id: 'minimalist', nameEn: 'Minimalist', nameAr: 'بسيط', emoji: '⬜' },
    { id: 'rustic', nameEn: 'Rustic', nameAr: 'ريفي', emoji: '🌲' }
  ]

  const colors = [
    { id: 'neutral', nameEn: 'Neutral Tones', nameAr: 'ألوان محايدة', color: '#f5f3ed' },
    { id: 'bold', nameEn: 'Bold Colors', nameAr: 'ألوان جريئة', color: '#c87855' },
    { id: 'earthy', nameEn: 'Earthy Green', nameAr: 'أخضر طبيعي', color: '#4a6b5c' },
    { id: 'dark', nameEn: 'Dark Tones', nameAr: 'ألوان داكنة', color: '#2c2520' }
  ]

  const rooms = [
    { id: 'living', nameEn: 'Living Room', nameAr: 'غرفة المعيشة', icon: '🛋️' },
    { id: 'bedroom', nameEn: 'Bedroom', nameAr: 'غرفة النوم', icon: '🛏️' },
    { id: 'dining', nameEn: 'Dining Room', nameAr: 'غرفة الطعام', icon: '🍽️' },
    { id: 'office', nameEn: 'Home Office', nameAr: 'المكتب', icon: '💼' }
  ]

  const budgets = [
    { id: 'budget', nameEn: 'Budget Friendly', nameAr: 'اقتصادي', range: '< 500 JOD', icon: '💰' },
    { id: 'mid', nameEn: 'Mid Range', nameAr: 'متوسط', range: '500 - 1500 JOD', icon: '💎' },
    { id: 'luxury', nameEn: 'Luxury', nameAr: 'فاخر', range: '> 1500 JOD', icon: '👑' }
  ]

  const handleComplete = async () => {
    await fetch('/api/auth/preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, ...preferences })
    })

    router.push(`/${lang}`)
  }

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item]
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream-bg p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="flex items-center mb-4">
          <div className="flex-1 h-2 bg-warm-gray rounded-full">
            <motion.div
              className="h-2 bg-sage-green rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${(step - 1) * 33.33}%` }}
            />
          </div>
          <p className="ml-4 text-sm font-semibold text-text-secondary">
            {lang === 'ar' ? `الخطوة ${step} من 4` : `Step ${step} of 4`}
          </p>
        </div>

        {/* Step 1: Style */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-bold text-charcoal text-center mb-2">{lang === 'ar' ? 'ما هو أسلوبك المفضل؟' : 'What\'s your style?'}</h2>
            <p className="text-text-secondary text-center mb-8">{lang === 'ar' ? 'اختر الأسلوب الذي يعكس شخصيتك' : 'Choose the style that reflects your personality'}</p>
            <div className="grid grid-cols-2 gap-4">
              {styles.map(style => (
                <button
                  key={style.id}
                  onClick={() => {
                    setPreferences({ ...preferences, style: style.id })
                    setStep(2)
                  }}
                  className={`p-6 rounded-2xl text-center transition-all ${
                    preferences.style === style.id
                      ? 'bg-sage-green text-white shadow-lg'
                      : 'bg-white hover:bg-soft-beige'
                  }`}
                >
                  <span className="text-4xl">{style.emoji}</span>
                  <p className="font-semibold mt-2">{lang === 'ar' ? style.nameAr : style.nameEn}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Colors */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-bold text-charcoal text-center mb-2">{lang === 'ar' ? 'اختر ألوانك المفضلة' : 'Choose your colors'}</h2>
            <p className="text-text-secondary text-center mb-8">{lang === 'ar' ? 'يمكنك اختيار أكثر من لون' : 'You can select multiple colors'}</p>
            <div className="grid grid-cols-2 gap-4">
              {colors.map(color => (
                <button
                  key={color.id}
                  onClick={() => setPreferences({ ...preferences, colors: toggleArrayItem(preferences.colors, color.id) })}
                  className={`p-6 rounded-2xl text-center transition-all border-4 ${
                    preferences.colors.includes(color.id)
                      ? 'border-sage-green shadow-lg'
                      : 'border-transparent bg-white hover:bg-soft-beige'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full mx-auto mb-2" style={{ backgroundColor: color.color }} />
                  <p className="font-semibold">{lang === 'ar' ? color.nameAr : color.nameEn}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Rooms */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-bold text-charcoal text-center mb-2">{lang === 'ar' ? 'أي غرف تريد تأثيثها؟' : 'Which rooms to furnish?'}</h2>
            <p className="text-text-secondary text-center mb-8">{lang === 'ar' ? 'اختر الغرف التي تحتاج أثاثًا' : 'Select the rooms that need furniture'}</p>
            <div className="grid grid-cols-2 gap-4">
              {rooms.map(room => (
                <button
                  key={room.id}
                  onClick={() => setPreferences({ ...preferences, rooms: toggleArrayItem(preferences.rooms, room.id) })}
                  className={`p-6 rounded-2xl text-center transition-all ${
                    preferences.rooms.includes(room.id)
                      ? 'bg-sage-green text-white shadow-lg'
                      : 'bg-white hover:bg-soft-beige'
                  }`}
                >
                  <span className="text-4xl">{room.icon}</span>
                  <p className="font-semibold mt-2">{lang === 'ar' ? room.nameAr : room.nameEn}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 4: Budget */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-bold text-charcoal text-center mb-2">{lang === 'ar' ? 'ما هي ميزانيتك؟' : 'What\'s your budget?'}</h2>
            <p className="text-text-secondary text-center mb-8">{lang === 'ar' ? 'سنعرض لك منتجات تناسب ميزانيتك' : 'We\'ll show you products that fit your budget'}</p>
            <div className="grid grid-cols-1 gap-4">
              {budgets.map(budget => (
                <button
                  key={budget.id}
                  onClick={() => {
                    setPreferences({ ...preferences, budget: budget.id })
                    handleComplete()
                  }}
                  className={`p-6 rounded-2xl text-left flex items-center transition-all ${
                    preferences.budget === budget.id
                      ? 'bg-sage-green text-white shadow-lg'
                      : 'bg-white hover:bg-soft-beige'
                  }`}
                >
                  <span className="text-4xl mr-4">{budget.icon}</span>
                  <div>
                    <p className="font-semibold text-lg">{lang === 'ar' ? budget.nameAr : budget.nameEn}</p>
                    <p className="text-sm">{budget.range}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 bg-warm-gray text-text-secondary rounded-full"
            >
              {lang === 'ar' ? 'السابق' : 'Back'}
            </button>
          )}
          {step < 4 && (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2 bg-sage-green text-white rounded-full ml-auto"
            >
              {lang === 'ar' ? 'التالي' : 'Next'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
