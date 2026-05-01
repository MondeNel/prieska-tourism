// src/pages/Home.jsx
import { useState, useEffect } from 'react'
import LeftSidebar from '../components/layout/LeftSidebar'
import RightSidebar from '../components/layout/RightSidebar'
import MainFeed from '../components/layout/MainFeed'

import ContentHubModal from '../components/ui/ContentHubModal'
import History from '../components/sections/History'
import CommunityNoticeBoard from '../components/sections/CommunityNoticeBoard'
import LocalNews from '../components/sections/LocalNews'
import IssueReporting from '../components/sections/IssueReporting'
import CommunityGroups from '../components/sections/CommunityGroups'
import EventsCalendar from '../components/sections/EventsCalendar'
import Attractions from '../components/sections/Attractions'
import Vacancies from '../components/sections/Vacancies'
import BusinessesDirectory from '../components/sections/BusinessesDirectory'
import FuelPriceTracker from '../components/sections/FuelPriceTracker'
import Accommodation from '../components/sections/Accommodation'
import InteractiveMap from '../components/sections/InteractiveMap'
import EmergencyNumbers from '../components/sections/EmergencyNumbers'
import Schools from '../components/sections/Schools'

import HomepageSkeleton from '../components/ui/skeletons/HomepageSkeleton'

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

  const renderMainContent = () => {
    switch (activeFeed) {
      case 'history':
        return <History />
      case 'news':
        return <LocalNews />
      case 'businesses':
        return <BusinessesDirectory />
      case 'vacancies':
        return <Vacancies />
      case 'noticeboard':
        return <CommunityNoticeBoard />
      case 'events':
        return <EventsCalendar />
      case 'community':
        return <CommunityGroups />
      case 'attractions':
        return <Attractions />
      case 'fuel':
        return <FuelPriceTracker />
      case 'guesthouses':
        return <Accommodation />
      case 'map':
        return <InteractiveMap />
      case 'emergency':
        return <EmergencyNumbers />
      case 'schools':
        return <Schools />
      default:
        return <MainFeed openModal={openModal} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <LeftSidebar 
            openModal={openModal} 
            switchFeed={switchFeed}
            activeFeed={activeFeed}
            className="lg:col-span-3" 
          />
          
          <div id="main-feed" className="lg:col-span-6 overflow-y-auto max-h-[calc(100vh-100px)]">
            {renderMainContent()}
          </div>
          
          <RightSidebar 
            openModal={openModal}
            className="lg:col-span-3" 
          />
        </div>
      </div>
      
      {/* Keep only the Report modal since it's not a feed replacement */}
      <ContentHubModal isOpen={activeModal === 'report'} onClose={closeModal} title="Report an Issue">
        <IssueReporting />
      </ContentHubModal>
    </div>
  )
}

export default Home