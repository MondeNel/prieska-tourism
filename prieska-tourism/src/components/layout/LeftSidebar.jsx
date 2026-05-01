// src/components/layout/LeftSidebar.jsx
import { Link, useLocation } from 'react-router-dom'
import { 
  Newspaper, Landmark, Store, Fuel, Bed, Briefcase, Map as MapIcon,
  Shield, Phone, GraduationCap, Users, Home, Clock, Image, HelpCircle,
  Calendar, Megaphone, AlertCircle
} from 'lucide-react'

const LeftSidebar = ({ openModal, switchFeed, activeFeed, className = '' }) => {
  const location = useLocation()

  const pageLinks = [
    { id: 'home', label: 'Home', icon: Home, to: '/' },
    { id: 'services', label: 'Services', icon: Clock, to: '/services' },
    { id: 'gallery', label: 'Gallery', icon: Image, to: '/gallery' },
    { id: 'faq', label: 'FAQ', icon: HelpCircle, to: '/faq' },
    { id: 'booking', label: 'Book Now', icon: Calendar, to: '/booking' },
  ]

  const feedTabs = [
    { id: 'feed', label: 'News Feed', icon: Newspaper, action: () => switchFeed('feed') },
    { id: 'history', label: 'History', icon: Landmark, action: () => switchFeed('history') },
    { id: 'news', label: 'Local News', icon: Newspaper, action: () => switchFeed('news') },
    { id: 'noticeboard', label: 'Notice Board', icon: Megaphone, action: () => switchFeed('noticeboard') },
    { id: 'events', label: 'Events', icon: Calendar, action: () => switchFeed('events') },
    { id: 'businesses', label: 'Businesses', icon: Store, action: () => switchFeed('businesses') },
    { id: 'vacancies', label: 'Vacancies', icon: Briefcase, action: () => switchFeed('vacancies') },
    { id: 'guesthouses', label: 'Guesthouses', icon: Bed, action: () => switchFeed('guesthouses') },
    { id: 'fuel', label: 'Fuel Prices', icon: Fuel, action: () => switchFeed('fuel') },
    { id: 'map', label: 'Map', icon: MapIcon, action: () => switchFeed('map') },
    { id: 'emergency', label: 'Emergency', icon: Shield, action: () => switchFeed('emergency') },
    { id: 'schools', label: 'Schools', icon: GraduationCap, action: () => switchFeed('schools') },
    { id: 'community', label: 'Community', icon: Users, action: () => switchFeed('community') },
    { id: 'report', label: 'Report Issue', icon: AlertCircle, action: () => openModal?.('report') },
  ]

  return (
    <aside className={`hidden lg:block ${className}`}>
      <div className="sticky top-24 space-y-6">
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

        <div className="border-t border-gray-200 dark:border-gray-700" />

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