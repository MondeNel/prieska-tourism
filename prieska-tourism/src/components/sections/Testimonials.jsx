import SectionTitle from '../ui/SectionTitle'
import { testimonials } from '../../data/testimonials'
import { Star, StarHalf } from 'lucide-react'

const Testimonials = () => {
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} size={16} className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
    ))
  }

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto bg-prieska-sand bg-opacity-20">
      <SectionTitle subtitle="WHAT OUR GUESTS SAY" title="Testimonials" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-4">
              <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h4 className="font-semibold">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.location}</p>
              </div>
            </div>
            <div className="flex mb-2">{renderStars(t.rating)}</div>
            <p className="text-gray-600 italic">"{t.text}"</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials