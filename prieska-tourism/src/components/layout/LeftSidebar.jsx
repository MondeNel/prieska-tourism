// src/components/layout/LeftSidebar.jsx
import { Link, useLocation } from 'react-router-dom'
import { 
  Newspaper, Landmark, Store, Fuel, Bed, Briefcase, Map as MapIcon,
  Shield, Phone, GraduationCap, Users, Home, Clock, Image, HelpCircle,
  Calendar
} from 'lucide-react'

const LeftSidebar = ({ openModal, switchFeed, activeFeed, className = '' }) => {
  const location = useLocation()

  // Page links
  const pageLinks = [
    { id: 'home', label: 'Home', icon: Home, to: '/' },
    { id: 'services', label: 'Services', icon: Clock, to: '/services' },
    { id: 'gallery', label: 'Gallery', icon: Image, to: '/gallery' },
    { id: 'faq', label: 'FAQ', icon: HelpCircle, to: '/faq' },
    { id: 'booking', label: 'Book Now', icon: Calendar, to: '/booking' },
  ]

  // Feed tabs - these switch the main content area
  const feedTabs = [
    { id: 'feed', label: 'News Feed', icon: Newspaper, action: () => switchFeed('feed') },
    { id: 'history-modal', label: 'History', icon: Landmark, action: () => openModal?.('history') },
    { id: 'businesses-modal', label: 'Businesses', icon: Store, action: () => openModal?.('businesses') },
    { id: 'fuel', label: 'Fuel Prices', icon: Fuel, action: () => switchFeed('fuel') },
    { id: 'guesthouses', label: 'Guesthouses', icon: Bed, action: () => switchFeed('guesthouses') },
    { id: 'vacancies-modal', label: 'Vacancies', icon: Briefcase, action: () => openModal?.('vacancies') },
    { id: 'map', label: 'Map', icon: MapIcon, action: () => switchFeed('map') },
    { id: 'emergency', label: 'Emergency', icon: Shield, action: () => switchFeed('emergency') },
    { id: 'schools', label: 'Schools', icon: GraduationCap, action: () => switchFeed('schools') },
    { id: 'community-modal', label: 'Community', icon: Users, action: () => openModal?.('community') },
  ]

  return (
    <aside className={`hidden lg:block ${className}`}>
      <div className="sticky top-24 space-y-6">
        {/* Page Navigation */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-3">
            Pages
          </h3>
          <nav className="space-y-1">
            {pageLinks.map(link => (
              <Link
                key={link.id}
                to={link.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'bg-prieska-terracotta/10 text-prieska-terracotta'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-prieska-terracotta'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700" />

        {/* Feed Tabs */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-3">
            Quick Links
          </h3>
          <nav className="space-y-1">
            {feedTabs.map(tab => (
              <button
                key={tab.id}
                onClick={tab.action}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeFeed === tab.id
                    ? 'bg-prieska-terracotta/10 text-prieska-terracotta border-l-2 border-prieska-terracotta'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-prieska-terracotta'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Emergency Contact */}
        <div className="mx-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400 mb-1">
            <Phone className="w-3 h-3" />
            <span>Emergency</span>
          </div>
          <a href="tel:10111" className="text-lg font-bold text-red-600 dark:text-red-400 hover:underline">
            10111
          </a>
          <p className="text-[10px] text-red-500 dark:text-red-500 mt-1">Police / Ambulance</p>
        </div>
      </div>
    </aside>
  )
}

export default LeftSidebar