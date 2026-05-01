// src/pages/Home.jsx
import { useState, useEffect } from 'react'
import LeftSidebar from '../components/layout/LeftSidebar'
import RightSidebar from '../components/layout/RightSidebar'
import MainFeed from '../components/layout/MainFeed'
import { getQuickStats } from '../data/activityFeed'

import ContentHubModal from '../components/ui/ContentHubModal'
import History from '../components/sections/History'
import LocalNews from '../components/sections/LocalNews'
import IssueReporting from '../components/sections/IssueReporting'
import CommunityGroups from '../components/sections/CommunityGroups'
import EventsCalendar from '../components/sections/EventsCalendar'
import Attractions from '../components/sections/Attractions'
import Vacancies from '../components/sections/Vacancies'
import BusinessesDirectory from '../components/sections/BusinessesDirectory'
import CommunityNoticeBoard from '../components/sections/CommunityNoticeBoard'
import FuelPriceTracker from '../components/sections/FuelPriceTracker'
import Accommodation from '../components/sections/Accommodation'
import InteractiveMap from '../components/sections/InteractiveMap'
import EmergencyNumbers from '../components/sections/EmergencyNumbers'
import Schools from '../components/sections/Schools'

import HomepageSkeleton from '../components/ui/skeletons/HomepageSkeleton'
import { Newspaper, Calendar, Megaphone } from 'lucide-react'

const Home = () => {
  const [activeModal, setActiveModal] = useState(null)
  const [activeFeed, setActiveFeed] = useState('feed')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const closeModal = () => setActiveModal(null)
  
  const openModal = (modalName) => {
    setActiveModal(modalName)
  }

  const switchFeed = (feedName) => {
    setActiveFeed(feedName)
    document.getElementById('main-feed')?.scrollTo(0, 0)
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
      default: return <MainFeed openModal={openModal} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <LeftSidebar 
            openModal={openModal} 
            switchFeed={switchFeed}
            activeFeed={activeFeed}
            className="lg:col-span-3" 
          />
          
          {/* Main Content Area */}
          <div id="main-feed" className="lg:col-span-6 overflow-y-auto max-h-[calc(100vh-100px)]">
            {/* Quick Stats - Always Visible */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm">
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{stats.newsThisWeek}</p>
                <div className="flex items-center justify-center gap-1">
                  <Newspaper className="w-3 h-3 text-blue-500" />
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">News</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm">
                <p className="text-lg font-bold text-green-600 dark:text-green-400">{stats.upcomingEvents}</p>
                <div className="flex items-center justify-center gap-1">
                  <Calendar className="w-3 h-3 text-green-500" />
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">Events</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm">
                <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{stats.newNotices}</p>
                <div className="flex items-center justify-center gap-1">
                  <Megaphone className="w-3 h-3 text-purple-500" />
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">Notices</p>
                </div>
              </div>
            </div>

            {/* Feed Content */}
            {renderMainContent()}
          </div>
          
          {/* Right Sidebar */}
          <RightSidebar 
            openModal={openModal}
            className="lg:col-span-3" 
          />
        </div>
      </div>
      
      {/* Report Issue Modal */}
      <ContentHubModal isOpen={activeModal === 'report'} onClose={closeModal} title="Report an Issue">
        <IssueReporting />
      </ContentHubModal>
    </div>
  )
}

export default Home