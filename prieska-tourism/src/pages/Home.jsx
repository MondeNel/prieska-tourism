// src/pages/Home.jsx
import { useState, useEffect } from 'react'
import LeftSidebar from '../components/layout/LeftSidebar'
import RightSidebar from '../components/layout/RightSidebar'
import MainFeed from '../components/layout/MainFeed'
import AdBanner from '../components/sections/AdBanner'
import { getQuickStats } from '../data/activityFeed'

import History from '../components/sections/History'
import LocalNews from '../components/sections/LocalNews'
import BusinessesDirectory from '../components/sections/BusinessesDirectory'
import Vacancies from '../components/sections/Vacancies'
import CommunityNoticeBoard from '../components/sections/CommunityNoticeBoard'
import EventsCalendar from '../components/sections/EventsCalendar'
import CommunityGroups from '../components/sections/CommunityGroups'
import Attractions from '../components/sections/Attractions'
import FuelPriceTracker from '../components/sections/FuelPriceTracker'
import Accommodation from '../components/sections/Accommodation'
import InteractiveMap from '../components/sections/InteractiveMap'
import EmergencyNumbers from '../components/sections/EmergencyNumbers'
import Schools from '../components/sections/Schools'
import IssueReporting from '../components/sections/IssueReporting'
import MobileBottomNav from '../components/layout/MobileBottomNav'
import MunicipalUpdates from '../components/sections/MunicipalUpdates'

import HomepageSkeleton from '../components/ui/skeletons/HomepageSkeleton'
import { Newspaper, Calendar, Megaphone, Sun } from 'lucide-react'

const Home = ({ activeFeed, switchFeed }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleSwitchFeed = (feedName) => {
    switchFeed(feedName)
    const feedEl = document.getElementById('feed-scroll')
    if (feedEl) feedEl.scrollTop = 0
  }

  if (loading) {
    return <HomepageSkeleton />
  }

  const stats = getQuickStats()

  const renderMainContent = () => {
    switch (activeFeed) {
      case 'history': return <History />
      case 'news': return <LocalNews />
      case 'businesses': return <BusinessesDirectory />
      case 'vacancies': return <Vacancies />
      case 'noticeboard': return <CommunityNoticeBoard />
      case 'events': return <EventsCalendar />
      case 'community': return <CommunityGroups />
      case 'attractions': return <Attractions />
      case 'fuel': return <FuelPriceTracker />
      case 'guesthouses': return <Accommodation />
      case 'map': return <InteractiveMap />
      case 'emergency': return <EmergencyNumbers />
      case 'schools': return <Schools />
      case 'report': return <IssueReporting />
      case 'municipal': return <MunicipalUpdates />
      default: return <MainFeed />
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-950">
      {/* Quick Stats */}
      <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-950 px-4 py-2 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-2 max-w-2xl mx-auto">
            <button
              onClick={() => handleSwitchFeed('news')}
              className={`bg-white dark:bg-gray-800 rounded-lg p-2 text-center shadow-sm hover:shadow-md transition cursor-pointer border-2 ${
                activeFeed === 'news' 
                  ? 'border-blue-500 dark:border-blue-400' 
                  : 'border-transparent hover:border-blue-300 dark:hover:border-blue-700'
              }`}
            >
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400">{stats.newsThisWeek}</p>
              <div className="flex items-center justify-center gap-1">
                <Newspaper className="w-3 h-3 text-blue-500" />
                <p className="text-[10px] text-gray-500 dark:text-gray-400">News</p>
              </div>
            </button>
            <button
              onClick={() => handleSwitchFeed('events')}
              className={`bg-white dark:bg-gray-800 rounded-lg p-2 text-center shadow-sm hover:shadow-md transition cursor-pointer border-2 ${
                activeFeed === 'events' 
                  ? 'border-green-500 dark:border-green-400' 
                  : 'border-transparent hover:border-green-300 dark:hover:border-green-700'
              }`}
            >
              <p className="text-sm font-bold text-green-600 dark:text-green-400">{stats.upcomingEvents}</p>
              <div className="flex items-center justify-center gap-1">
                <Calendar className="w-3 h-3 text-green-500" />
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Events</p>
              </div>
            </button>
            <button
              onClick={() => handleSwitchFeed('noticeboard')}
              className={`bg-white dark:bg-gray-800 rounded-lg p-2 text-center shadow-sm hover:shadow-md transition cursor-pointer border-2 ${
                activeFeed === 'noticeboard' 
                  ? 'border-purple-500 dark:border-purple-400' 
                  : 'border-transparent hover:border-purple-300 dark:hover:border-purple-700'
              }`}
            >
              <p className="text-sm font-bold text-purple-600 dark:text-purple-400">{stats.newNotices}</p>
              <div className="flex items-center justify-center gap-1">
                <Megaphone className="w-3 h-3 text-purple-500" />
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Notices</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Ad Banner */}
      <div className="lg:hidden flex-shrink-0 bg-gray-100 dark:bg-gray-950 px-4 pb-2">
        <div className="max-w-2xl mx-auto">
          <AdBanner />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full">
            <div className="hidden lg:block lg:col-span-3 h-full overflow-y-auto pb-4 feed-scroll">
              <LeftSidebar switchFeed={handleSwitchFeed} activeFeed={activeFeed} />
            </div>
            
            <div id="feed-scroll" className="lg:col-span-6 h-full overflow-y-auto pb-4 feed-scroll">
              {renderMainContent()}
            </div>
            
            <div className="hidden lg:block lg:col-span-3 h-full overflow-y-auto pb-4 feed-scroll">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>

      {/* Weather Banner - Mobile Only */}
      <div className="lg:hidden flex-shrink-0 bg-gradient-to-r from-prieska-river to-prieska-terracotta px-4 py-2.5">
        <div className="flex items-center justify-between max-w-2xl mx-auto text-white">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-yellow-300" />
            <span className="text-xs font-medium">Prieska</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="font-bold">28°C</span>
            <span className="text-white/70">Sunny</span>
            <span className="text-white/70 hidden sm:inline">• Humidity 35%</span>
            <span className="text-white/70 hidden sm:inline">• Wind 12 km/h</span>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav switchFeed={handleSwitchFeed} activeFeed={activeFeed} />

      {/* Scrollbar Styles */}
      <style>{`
        .feed-scroll::-webkit-scrollbar { width: 6px; }
        .feed-scroll::-webkit-scrollbar-track { background: transparent; }
        .feed-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
        .feed-scroll::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
        .dark .feed-scroll::-webkit-scrollbar-thumb { background: #4b5563; }
        .dark .feed-scroll::-webkit-scrollbar-thumb:hover { background: #6b7280; }
        .feed-scroll { scrollbar-width: thin; scrollbar-color: #d1d5db transparent; }
        .dark .feed-scroll { scrollbar-color: #4b5563 transparent; }
      `}</style>
    </div>
  )
}

export default Home