// src/pages/Home.jsx
import { useState, useEffect } from 'react'
import Hero from '../components/sections/Hero'
import QuickAccess from '../components/sections/QuickAccess'
import AdBanner from '../components/sections/AdBanner'
import WeatherWidget from '../components/sections/WeatherWidget'
import EmergencyNumbers from '../components/sections/EmergencyNumbers'
import FuelPriceTracker from '../components/sections/FuelPriceTracker'
import BusinessesPreview from '../components/sections/BusinessesPreview'
import Schools from '../components/sections/Schools'
import Accommodation from '../components/sections/Accommodation'
import InteractiveMap from '../components/sections/InteractiveMap'
import RecentActivity from '../components/sections/RecentActivity'

import ContentHubModal from '../components/ui/ContentHubModal'
import History from '../components/sections/History'
import CommunityNoticeBoard from '../components/sections/CommunityNoticeBoard'
import LocalNews from '../components/sections/LocalNews'
import IssueReporting from '../components/sections/IssueReporting'
import MunicipalUpdates from '../components/sections/MunicipalUpdates'
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
    <>
      <Hero />
      <QuickAccess openModal={openModal} />
      <RecentActivity />
      <AdBanner />
      
      <WeatherWidget />
      <EmergencyNumbers />
      <MunicipalUpdates />
      <InteractiveMap />
      <FuelPriceTracker />
      <BusinessesPreview openModal={openModal} />
      <Schools />
      <Accommodation />
      
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
    </>
  )
}

export default Home