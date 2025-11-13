'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function RegisterPage({ params: { lang } }: { params: { lang: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, language: lang })
    })

    const data = await res.json()

    if (data.success) {
      router.push(`/${lang}/auth/onboarding?userId=${data.user.id}`)
    } else {
      setError(data.error)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-bg p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
      >
        <h2 className="text-3xl font-bold text-charcoal text-center mb-2">
          {lang === 'ar' ? 'إنشاء حساب' : 'Create Account'}
        </h2>
        <p className="text-text-secondary text-center mb-8">
          {lang === 'ar' ? 'ابدأ رحلتك معنا' : 'Start your journey with us'}
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6" role="alert">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder={lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
            className="w-full px-4 py-3 border border-warm-gray rounded-lg focus:outline-none focus:border-sage-green"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder={lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
            className="w-full px-4 py-3 border border-warm-gray rounded-lg focus:outline-none focus:border-sage-green"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder={lang === 'ar' ? 'كلمة المرور' : 'Password'}
            className="w-full px-4 py-3 border border-warm-gray rounded-lg focus:outline-none focus:border-sage-green"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <input
            type="tel"
            placeholder={lang === 'ar' ? 'رقم الهاتف (اختياري)' : 'Phone Number (Optional)'}
            className="w-full px-4 py-3 border border-warm-gray rounded-lg focus:outline-none focus:border-sage-green"
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <button
            type="submit"
            className="w-full bg-sage-green text-white py-3 rounded-lg font-semibold hover:bg-light-sage transition-colors disabled:bg-warm-gray"
            disabled={loading}
          >
            {loading ? (lang === 'ar' ? 'جار التحميل...' : 'Loading...') : (lang === 'ar' ? 'إنشاء حساب' : 'Create Account')}
          </button>
        </form>

        <p className="text-center text-text-secondary mt-6">
          {lang === 'ar' ? 'لديك حساب؟' : 'Already have an account?'}{' '}
          <Link href={`/${lang}/auth/login`} className="text-sage-green hover:underline">
            {lang === 'ar' ? 'تسجيل الدخول' : 'Login'}
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
