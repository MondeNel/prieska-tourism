// src/pages/Home.jsx
import { useState, useEffect } from 'react'
import LeftSidebar from '../components/layout/LeftSidebar'
import RightSidebar from '../components/layout/RightSidebar'
import MainFeed from '../components/layout/MainFeed'
import Hero from '../components/sections/Hero'

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
  const [activeFeed, setActiveFeed] = useState('feed') // 'feed', 'fuel', 'guesthouses', 'map', 'emergency', 'schools'
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
    // Scroll feed to top
    document.getElementById('main-feed')?.scrollTo(0, 0)
  }

  if (loading) {
    return <HomepageSkeleton />
  }

  // Determine what to show in the main content area
  const renderMainContent = () => {
    switch (activeFeed) {
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <LeftSidebar 
            openModal={openModal} 
            switchFeed={switchFeed}
            activeFeed={activeFeed}
            className="lg:col-span-3" 
          />
          
          {/* Main Content Area */}
          <div id="main-feed" className="lg:col-span-6 overflow-y-auto max-h-[calc(100vh-120px)]">
            {renderMainContent()}
          </div>
          
          {/* Right Sidebar */}
          <RightSidebar 
            openModal={openModal}
            className="lg:col-span-3" 
          />
        </div>
      </div>
      
      {/* Modals */}
      <ContentHubModal isOpen={activeModal === 'history'} onClose={closeModal} title="A Land of Legends & Legacy">
        <History />
      </ContentHubModal>
      <ContentHubModal isOpen={activeModal === 'news'} onClose={closeModal} title="Local News">
        <LocalNews />
      </ContentHubModal>
      <ContentHubModal isOpen={activeModal === 'noticeboard'} onClose={closeModal} title="Community Notice Board">
        <CommunityNoticeBoard />
      </ContentHubModal>
      <ContentHubModal isOpen={activeModal === 'events'} onClose={closeModal} title="Community Events">
        <EventsCalendar />
      </ContentHubModal>
      <ContentHubModal isOpen={activeModal === 'report'} onClose={closeModal} title="Report an Issue">
        <IssueReporting />
      </ContentHubModal>
      <ContentHubModal isOpen={activeModal === 'community'} onClose={closeModal} title="Churches & Community Groups">
        <CommunityGroups />
      </ContentHubModal>
      <ContentHubModal isOpen={activeModal === 'attractions'} onClose={closeModal} title="Things to Do in Prieska">
        <Attractions />
      </ContentHubModal>
      <ContentHubModal isOpen={activeModal === 'vacancies'} onClose={closeModal} title="Job Vacancies">
        <Vacancies />
      </ContentHubModal>
      <ContentHubModal isOpen={activeModal === 'businesses'} onClose={closeModal} title="Local Businesses & Amenities">
        <BusinessesDirectory />
      </ContentHubModal>
    </div>
  )
}

export default Home