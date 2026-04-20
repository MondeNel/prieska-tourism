// src/components/sections/Testimonials.jsx
import SectionTitle from '../ui/SectionTitle'
import { testimonials } from '../../data/testimonials'
import { Star } from 'lucide-react'

const Testimonials = () => {
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-3.5 h-3.5 md:w-4 md:h-4 ${
          i < rating 
            ? 'text-yellow-400 fill-yellow-400 dark:text-yellow-400 dark:fill-yellow-400' 
            : 'text-gray-300 dark:text-gray-600'
        }`} 
      />
    ))
  }

  return (
    <section className="py-12 md:py-16 px-4 max-w-7xl mx-auto bg-prieska-sand/20 dark:bg-gray-900/50">
      <SectionTitle subtitle="WHAT OUR GUESTS SAY" title="Testimonials" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <img 
                src={t.avatar} 
                alt={t.name} 
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover" 
              />
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white text-sm md:text-base">
                  {t.name}
                </h4>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  {t.location}
                </p>
              </div>
            </div>
            <div className="flex mb-2">{renderStars(t.rating)}</div>
            <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm italic">
              "{t.text}"
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials