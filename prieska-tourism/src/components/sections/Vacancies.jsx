// src/components/sections/Vacancies.jsx
import { useState } from 'react'
import SectionTitle from '../ui/SectionTitle'
import { vacancies, getRelativeTime } from '../../data/vacancies'
import { MapPin, Clock, Phone, Mail, ChevronDown, ChevronUp } from 'lucide-react'

const Vacancies = () => {
  const [expandedId, setExpandedId] = useState(null)

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="vacancies" className="py-16 px-4 max-w-7xl mx-auto bg-gradient-to-b from-white to-prieska-sand/10">
      <SectionTitle subtitle="WORK IN PRIESKA" title="Job Vacancies" />
      
      <p className="text-center text-gray-600 max-w-3xl mx-auto -mt-6 mb-10">
        Discover employment opportunities in and around Prieska. Connect directly with local businesses looking for talent.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vacancies.map((vacancy) => {
          const IconComponent = vacancy.icon
          const isExpanded = expandedId === vacancy.id
          const postedTime = getRelativeTime(vacancy.postedDate)

          return (
            <div 
              key={vacancy.id} 
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              {/* Card Header - Always visible */}
              <div 
                className="p-5 cursor-pointer"
                onClick={() => toggleExpand(vacancy.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-prieska-terracotta/10 rounded-xl">
                    <IconComponent size={24} className="text-prieska-terracotta" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-serif font-bold text-gray-800">
                          {vacancy.title}
                        </h3>
                        <p className="text-prieska-terracotta font-medium text-sm">
                          {vacancy.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                          {vacancy.type}
                        </span>
                        {isExpanded ? 
                          <ChevronUp size={18} className="text-gray-400" /> : 
                          <ChevronDown size={18} className="text-gray-400" />
                        }
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {vacancy.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {postedTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expandable Details */}
              {isExpanded && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4 bg-gray-50/50">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {vacancy.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a 
                      href={`tel:${vacancy.contactPhone.replace(/\s/g, '')}`}
                      className="flex-1 bg-prieska-terracotta text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition flex items-center justify-center gap-2"
                    >
                      <Phone size={14} />
                      Call to Apply
                    </a>
                    <a 
                      href={`mailto:${vacancy.contactEmail}?subject=Application for ${vacancy.title}`}
                      className="flex-1 border border-prieska-terracotta text-prieska-terracotta px-4 py-2 rounded-lg text-sm font-medium hover:bg-prieska-terracotta hover:text-white transition flex items-center justify-center gap-2"
                    >
                      <Mail size={14} />
                      Email Application
                    </a>
                  </div>
                  
                  <p className="text-xs text-gray-400 text-center mt-3">
                    Contact: {vacancy.contactPhone} • {vacancy.contactEmail}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Post a Job CTA */}
      <div className="text-center mt-12">
        <p className="text-gray-500 mb-4">Are you an employer looking to hire in Prieska?</p>
        <button className="bg-white border-2 border-prieska-terracotta text-prieska-terracotta px-6 py-3 rounded-full font-semibold hover:bg-prieska-terracotta hover:text-white transition-all">
          Post a Vacancy
        </button>
      </div>
    </section>
  )
}

export default Vacancies