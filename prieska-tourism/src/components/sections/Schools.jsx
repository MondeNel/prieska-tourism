// src/components/sections/Schools.jsx
import SectionTitle from '../ui/SectionTitle'
import { primarySchools, highSchools } from '../../data/schools'
import { MapPin, Phone, School, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

const Schools = () => {
  const [expandedPrimary, setExpandedPrimary] = useState(true)
  const [expandedHigh, setExpandedHigh] = useState(true)

  return (
    <div className="space-y-4">
      <SectionTitle subtitle="EDUCATION IN PRIESKA" title="Schools & Learning" />
      
      <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
        Quality education through primary and high schools serving the community
      </p>

      {/* Primary Schools */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <button
          onClick={() => setExpandedPrimary(!expandedPrimary)}
          className="w-full flex items-center justify-between p-4 bg-blue-500 hover:bg-blue-600 transition text-white"
        >
          <div className="flex items-center gap-3">
            <School className="w-5 h-5" />
            <div className="text-left">
              <h3 className="font-serif font-bold text-sm">Primary Schools</h3>
              <p className="text-xs text-white/80">{primarySchools.length} schools</p>
            </div>
          </div>
          {expandedPrimary ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        
        {expandedPrimary && (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {primarySchools.map(school => (
              <div key={school.id} className="p-4">
                <h4 className="font-semibold text-gray-800 dark:text-white text-sm mb-1">
                  {school.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-xs mb-2">
                  {school.description}
                </p>
                <div className="space-y-1 text-[10px] text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span>{school.location}</span>
                  </div>
                  {school.phone && (
                    <a 
                      href={`tel:${school.phone.replace(/\s/g, '')}`} 
                      className="flex items-center gap-1 text-prieska-terracotta hover:underline"
                    >
                      <Phone className="w-3 h-3 flex-shrink-0" />
                      <span>{school.phone}</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* High Schools */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <button
          onClick={() => setExpandedHigh(!expandedHigh)}
          className="w-full flex items-center justify-between p-4 bg-green-500 hover:bg-green-600 transition text-white"
        >
          <div className="flex items-center gap-3">
            <GraduationCap className="w-5 h-5" />
            <div className="text-left">
              <h3 className="font-serif font-bold text-sm">High Schools</h3>
              <p className="text-xs text-white/80">{highSchools.length} schools</p>
            </div>
          </div>
          {expandedHigh ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        
        {expandedHigh && (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {highSchools.map(school => (
              <div key={school.id} className="p-4">
                <h4 className="font-semibold text-gray-800 dark:text-white text-sm mb-1">
                  {school.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-xs mb-2">
                  {school.description}
                </p>
                <div className="space-y-1 text-[10px] text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span>{school.location}</span>
                  </div>
                  {school.phone && (
                    <a 
                      href={`tel:${school.phone.replace(/\s/g, '')}`} 
                      className="flex items-center gap-1 text-prieska-terracotta hover:underline"
                    >
                      <Phone className="w-3 h-3 flex-shrink-0" />
                      <span>{school.phone}</span>
                      {school.whatsapp && (
                        <span className="ml-1 text-green-600">• WhatsApp: {school.whatsapp}</span>
                      )}
                    </a>
                  )}
                  {school.phoneAlt && (
                    <a 
                      href={`tel:${school.phoneAlt.replace(/\s/g, '')}`} 
                      className="flex items-center gap-1 text-prieska-terracotta hover:underline ml-4"
                    >
                      <Phone className="w-3 h-3 flex-shrink-0" />
                      <span>{school.phoneAlt}</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Schools