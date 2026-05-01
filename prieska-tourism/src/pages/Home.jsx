// src/pages/Home.jsx
import { useState, useEffect } from 'react'
import LeftSidebar from '../components/layout/LeftSidebar'
import RightSidebar from '../components/layout/RightSidebar'
import MainFeed from '../components/layout/MainFeed'
import AdBanner from '../components/sections/AdBanner'
import FuelPriceTracker from '../components/sections/FuelPriceTracker'
import Schools from '../components/sections/Schools'
import Accommodation from '../components/sections/Accommodation'
import InteractiveMap from '../components/sections/InteractiveMap'
import EmergencyNumbers from '../components/sections/EmergencyNumbers'
import MunicipalUpdates from '../components/sections/MunicipalUpdates'

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

import HomepageSkeleton from '../components/ui/skeletons/HomepageSkeleton'

const Home = () => {
  const [activeModal, setActiveModal] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const closeModal = () => setActiveModal(null)
  
  const openModal = (modalName) => {
    setActiveModal(modalName)
  }

  if (loading) {
    return <HomepageSkeleton />
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - 3 columns on desktop */}
          <LeftSidebar openModal={openModal} className="lg:col-span-3" />
          
          {/* Main Feed - 6 columns on desktop */}
          <div className="lg:col-span-6">
            <MainFeed />
            
            {/* Below the feed, keep essential sections */}
            <div className="mt-6">
              <AdBanner />
              <MunicipalUpdates />
              <InteractiveMap />
              <FuelPriceTracker />
              <Schools />
              <Accommodation />
              <EmergencyNumbers />
            </div>
          </div>
          
          {/* Right Sidebar - 3 columns on desktop */}
          <RightSidebar className="lg:col-span-3" />
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