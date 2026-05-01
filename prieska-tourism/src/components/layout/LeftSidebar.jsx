// src/components/layout/LeftSidebar.jsx
import { Link, useLocation } from 'react-router-dom'
import { 
  Newspaper, Landmark, Store, Fuel, Bed, Briefcase, Map as MapIcon,
  Shield, Phone, GraduationCap, Users
} from 'lucide-react'

const LeftSidebar = ({ openModal, className = '' }) => {
  const location = useLocation()

  const navItems = [
    { id: 'news', label: 'News', icon: Newspaper, action: () => openModal?.('news') },
    { id: 'history', label: 'History', icon: Landmark, action: () => openModal?.('history') },
    { id: 'businesses', label: 'Businesses', icon: Store, action: () => openModal?.('businesses') },
    { id: 'fuel', label: 'Fuel Prices', icon: Fuel, action: () => document.getElementById('fuel')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'guesthouses', label: 'Guesthouses', icon: Bed, action: () => document.getElementById('accommodation')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'vacancies', label: 'Vacancies', icon: Briefcase, action: () => openModal?.('vacancies') },
    { id: 'map', label: 'Map', icon: MapIcon, action: () => document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'emergency', label: 'Emergency', icon: Shield, action: () => document.getElementById('emergency')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'schools', label: 'Schools', icon: GraduationCap, action: () => document.getElementById('schools')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'community', label: 'Community', icon: Users, action: () => openModal?.('community') },
  ]

  return (
    <aside className={`hidden lg:block ${className}`}>
      <div className="sticky top-24">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-3">
          Quick Links
        </h3>
        <nav className="space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={item.action}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-prieska-terracotta dark:hover:text-prieska-terracotta transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Quick Contact */}
        <div className="mt-6 mx-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
            <Phone className="w-3 h-3" />
            <span>Emergency</span>
          </div>
          <a href="tel:10111" className="text-lg font-bold text-red-600 dark:text-red-400 hover:underline">
            10111
          </a>
        </div>
      </div>
    </aside>
  )
}

export default LeftSidebar