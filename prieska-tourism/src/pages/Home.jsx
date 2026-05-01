// src/pages/Home.jsx
import { useState, useEffect } from 'react'
import LeftSidebar from '../components/layout/LeftSidebar'
import RightSidebar from '../components/layout/RightSidebar'
import MainFeed from '../components/layout/MainFeed'
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

import HomepageSkeleton from '../components/ui/skeletons/HomepageSkeleton'
import { Newspaper, Calendar, Megaphone } from 'lucide-react'

const Home = () => {
  const [activeFeed, setActiveFeed] = useState('feed')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const switchFeed = (feedName) => {
    setActiveFeed(feedName)
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
      default: return <MainFeed />
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-950 pt-20">
      {/* Quick Stats - Fixed below navbar */}
      <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-4 py-2.5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-2 max-w-2xl mx-auto">
            <button
              onClick={() => switchFeed('news')}
              className={`bg-white dark:bg-gray-800 rounded-lg p-2.5 text-center shadow-sm hover:shadow-md transition cursor-pointer border-2 ${
                activeFeed === 'news' 
                  ? 'border-blue-500 dark:border-blue-400' 
                  : 'border-transparent hover:border-blue-300 dark:hover:border-blue-700'
              }`}
            >
              <p className="text-base font-bold text-blue-600 dark:text-blue-400">{stats.newsThisWeek}</p>
              <div className="flex items-center justify-center gap-1">
                <Newspaper className="w-3 h-3 text-blue-500" />
                <p className="text-[10px] text-gray-500 dark:text-gray-400">News</p>
              </div>
            </button>
            <button
              onClick={() => switchFeed('events')}
              className={`bg-white dark:bg-gray-800 rounded-lg p-2.5 text-center shadow-sm hover:shadow-md transition cursor-pointer border-2 ${
                activeFeed === 'events' 
                  ? 'border-green-500 dark:border-green-400' 
                  : 'border-transparent hover:border-green-300 dark:hover:border-green-700'
              }`}
            >
              <p className="text-base font-bold text-green-600 dark:text-green-400">{stats.upcomingEvents}</p>
              <div className="flex items-center justify-center gap-1">
                <Calendar className="w-3 h-3 text-green-500" />
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Events</p>
              </div>
            </button>
            <button
              onClick={() => switchFeed('noticeboard')}
              className={`bg-white dark:bg-gray-800 rounded-lg p-2.5 text-center shadow-sm hover:shadow-md transition cursor-pointer border-2 ${
                activeFeed === 'noticeboard' 
                  ? 'border-purple-500 dark:border-purple-400' 
                  : 'border-transparent hover:border-purple-300 dark:hover:border-purple-700'
              }`}
            >
              <p className="text-base font-bold text-purple-600 dark:text-purple-400">{stats.newNotices}</p>
              <div className="flex items-center justify-center gap-1">
                <Megaphone className="w-3 h-3 text-purple-500" />
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Notices</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full">
            {/* Left Sidebar */}
            <div className="hidden lg:block lg:col-span-3 h-full overflow-y-auto pb-4">
              <LeftSidebar 
                switchFeed={switchFeed}
                activeFeed={activeFeed}
              />
            </div>
            
            {/* Feed Content - This scrolls independently */}
            <div id="feed-scroll" className="lg:col-span-6 h-full overflow-y-auto pb-8">
              {renderMainContent()}
            </div>
            
            {/* Right Sidebar */}
            <div className="hidden lg:block lg:col-span-3 h-full overflow-y-auto pb-4">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home