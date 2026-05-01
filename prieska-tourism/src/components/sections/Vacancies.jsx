// src/components/sections/Vacancies.jsx
import { useState } from 'react'
import { vacancies, getRelativeTime } from '../../data/vacancies'
import { MapPin, Clock, Phone, Mail, Image, Smile } from 'lucide-react'
import PostVacancyModal from '../ui/PostVacancyModal'

const Vacancies = () => {
  const [showPostModal, setShowPostModal] = useState(false)
  const [selectedType, setSelectedType] = useState('all')
  const [postText, setPostText] = useState('')

  const types = ['all', ...new Set(vacancies.map(v => v.type.toLowerCase()))]

  const filteredVacancies = selectedType === 'all' 
    ? vacancies 
    : vacancies.filter(v => v.type.toLowerCase() === selectedType)

  return (
    <div className="space-y-4">
      {/* Post Composer */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold text-sm">
            J
          </div>
          <input
            type="text"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Post a job vacancy or share an opportunity..."
            className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-prieska-terracotta"
          />
        </div>
        <div className="flex items-center gap-2 border-t border-gray-100 dark:border-gray-700 pt-3">
          <button className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-prieska-terracotta transition px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Image className="w-4 h-4" />
            Photo
          </button>
          <button className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-prieska-terracotta transition px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Smile className="w-4 h-4" />
            Feeling
          </button>
          <button 
            onClick={() => setShowPostModal(true)}
            className="ml-auto bg-prieska-terracotta text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-opacity-90 transition"
          >
            Post Vacancy
          </button>
        </div>
      </div>

      {/* Type Filter */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {types.map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize whitespace-nowrap transition ${
              selectedType === type
                ? 'bg-prieska-terracotta text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-prieska-terracotta'
            }`}
          >
            {type === 'all' ? 'All Types' : type}
          </button>
        ))}
      </div>

      {/* Vacancies Feed */}
      <div className="grid grid-cols-1 gap-3">
        {filteredVacancies.map(vacancy => {
          const IconComponent = vacancy.icon
          const postedTime = getRelativeTime(vacancy.postedDate)

          return (
            <div 
              key={vacancy.id} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 pb-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <IconComponent className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-800 dark:text-white text-sm">
                        {vacancy.title}
                      </h3>
                      <span className="text-[10px] font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">
                        {vacancy.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{vacancy.company}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-4 pb-3">
                <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                  {vacancy.description}
                </p>
              </div>

              {/* Details */}
              <div className="px-4 pb-3 space-y-1 text-[10px] text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  <span>{vacancy.location}</span>
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <Clock className="w-3 h-3" />
                  <span>{postedTime}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center border-t border-gray-100 dark:border-gray-700">
                <a 
                  href={`tel:${vacancy.contactPhone.replace(/\s/g, '')}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call
                </a>
                <a 
                  href={`mailto:${vacancy.contactEmail}?subject=Application for ${vacancy.title}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition border-x border-gray-100 dark:border-gray-700"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email
                </a>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  ↗️ Share
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {filteredVacancies.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-sm">
          No vacancies in this category yet.
        </p>
      )}

      {/* Post Vacancy Modal */}
      <PostVacancyModal 
        isOpen={showPostModal}
        onClose={() => setShowPostModal(false)}
      />
    </div>
  )
}

export default Vacancies