// src/components/sections/Schools.jsx
import SectionTitle from '../ui/SectionTitle'
import { primarySchools, highSchools } from '../../data/schools'
import { MapPin, Phone, School, GraduationCap, ChevronDown, ChevronUp, CreditCard } from 'lucide-react'
import { useState } from 'react'
import SchoolModal from '../ui/SchoolModal'

const Schools = () => {
  const [expandedPrimary, setExpandedPrimary] = useState(true)
  const [expandedHigh, setExpandedHigh] = useState(true)
  const [selectedSchool, setSelectedSchool] = useState(null)
  const [showSchoolModal, setShowSchoolModal] = useState(false)

  const handlePayFees = (school) => {
    setSelectedSchool(school)
    setShowSchoolModal(true)
  }

  return (
    <div className="space-y-4">
      <SectionTitle subtitle="EDUCATION IN PRIESKA" title="Schools & Learning" />
      
      <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
        Quality education through primary and high schools serving the community
      </p>

      {/* Payment Info Banner */}
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-green-600 dark:text-green-400" />
          <span className="text-sm font-medium text-green-700 dark:text-green-400">
            School fees payments can be made online
          </span>
        </div>
        <p className="text-xs text-green-600 dark:text-green-500 mt-1 ml-6">
          Click the "Pay Fees" button on any school below
        </p>
      </div>

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
                <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span>{school.location}</span>
                  </div>
                  {school.phone && (
                    <div className="flex items-center gap-1 mt-1">
                      <Phone className="w-3 h-3 flex-shrink-0" />
                      <span>{school.phone}</span>
                    </div>
                  )}
                </div>
                {/* BUTTONS */}
                <div className="flex gap-2">
                  <a
                    href={`tel:${school.phone?.replace(/\s/g, '')}`}
                    className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-xs font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call
                  </a>
                  <button
                    onClick={() => handlePayFees(school)}
                    className="flex-1 bg-prieska-terracotta text-white py-2 rounded-lg text-xs font-medium hover:bg-opacity-90 transition flex items-center justify-center gap-1.5"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    Pay Fees
                  </button>
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
                <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span>{school.location}</span>
                  </div>
                  {school.phone && (
                    <div className="flex items-center gap-1 mt-1">
                      <Phone className="w-3 h-3 flex-shrink-0" />
                      <span>{school.phone}</span>
                      {school.whatsapp && (
                        <span className="text-green-600">• WhatsApp: {school.whatsapp}</span>
                      )}
                    </div>
                  )}
                </div>
                {/* BUTTONS */}
                <div className="flex gap-2">
                  <a
                    href={`tel:${school.phone?.replace(/\s/g, '')}`}
                    className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-xs font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call
                  </a>
                  <button
                    onClick={() => handlePayFees(school)}
                    className="flex-1 bg-prieska-terracotta text-white py-2 rounded-lg text-xs font-medium hover:bg-opacity-90 transition flex items-center justify-center gap-1.5"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    Pay Fees
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* School Modal */}
      <SchoolModal 
        isOpen={showSchoolModal}
        onClose={() => setShowSchoolModal(false)}
        school={selectedSchool}
      />
    </div>
  )
}

export default Schools