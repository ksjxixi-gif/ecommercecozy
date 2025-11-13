'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage({ params: { lang } }: { params: { lang: string } }) {
  return (
    <div>
      {/* Hero Section with Luxury Background */}
      <div className="relative h-screen">
        <Image
          src="/images/hero-background.jpg"
          alt="Cozy Corner Living Room"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/90 text-sm md:text-base font-medium tracking-widest uppercase mb-4"
          >
            {lang === 'ar' ? 'اكتشف الراحة' : 'Discover Comfort'}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {lang === 'ar' ? (
              <>
                ركن مريح
                <br />
                لمنزل أحلامك
              </>
            ) : (
              <>
                Cozy Corner
                <br />
                For Your Dream Home
              </>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-lg"
          >
            {lang === 'ar'
              ? 'اجعل منزلك دافئًا ومريحًا مع أثاثنا المصمم بعناية'
              : 'Make your home feel warm and inviting with our thoughtfully designed furniture'}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href={`/${lang}/products`}
              className="group relative px-8 py-4 bg-white text-charcoal font-semibold rounded-full overflow-hidden transition-all hover:scale-105 shadow-lg"
            >
              <span className="relative z-10">{lang === 'ar' ? 'تسوق الآن' : 'Shop Now'}</span>
            </Link>
            <Link
              href={`/${lang}/auth/register`}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-charcoal transition-all shadow-lg"
            >
              {lang === 'ar' ? 'ابدأ رحلتك' : 'Start Your Journey'}
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 flex gap-8"
          >
            {[
              { value: '500+', label: lang === 'ar' ? 'منتج' : 'Products' },
              { value: '50K+', label: lang === 'ar' ? 'عميل سعيد' : 'Happy Customers' },
              { value: '4.9★', label: lang === 'ar' ? 'تقييم' : 'Rating' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-2 text-white"
          >
            {lang === 'ar' ? 'اسحب للأسفل' : 'Scroll'}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Featured Collections */}
      <section className="py-24 bg-soft-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-charcoal mb-4">
              {lang === 'ar' ? 'مجموعاتنا المميزة' : 'Featured Collections'}
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              {lang === 'ar'
                ? 'اكتشف أثاثًا مصممًا بعناية ليناسب كل غرفة في منزلك'
                : 'Discover thoughtfully designed furniture for every room in your home'}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                nameEn: 'Living Room',
                nameAr: 'غرفة المعيشة',
                image: '/images/collections/living.jpg',
                count: '150+ items'
              },
              {
                nameEn: 'Bedroom',
                nameAr: 'غرفة النوم',
                image: '/images/collections/bedroom.jpg',
                count: '120+ items'
              },
              {
                nameEn: 'Dining Room',
                nameAr: 'غرفة الطعام',
                image: '/images/collections/dining.jpg',
                count: '80+ items'
              }
            ].map((collection, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ y: -10 }}
                className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-lg"
              >
                <Image
                  src={collection.image}
                  alt={`${collection.nameEn} Image`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <p className="text-sm font-medium uppercase tracking-widest">{collection.count}</p>
                  <h3 className="text-3xl font-bold">{lang === 'ar' ? collection.nameAr : collection.nameEn}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
