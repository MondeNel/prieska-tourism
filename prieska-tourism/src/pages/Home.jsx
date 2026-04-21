// src/pages/Home.jsx
import { useState, useEffect } from 'react'
import Hero from '../components/sections/Hero'
import QuickAccess from '../components/sections/QuickAccess'
import AdBanner from '../components/sections/AdBanner'
import WeatherWidget from '../components/sections/WeatherWidget'
import EmergencyNumbers from '../components/sections/EmergencyNumbers'
import FuelPriceTracker from '../components/sections/FuelPriceTracker'
import Businesses from '../components/sections/Businesses'
import Schools from '../components/sections/Schools'
import Vacancies from '../components/sections/Vacancies'
import Accommodation from '../components/sections/Accommodation'
import InteractiveMap from '../components/sections/InteractiveMap'
import EventsCalendar from '../components/sections/EventsCalendar'
import RecentActivity from '../components/sections/RecentActivity'

// Modal imports
import ContentHubModal from '../components/ui/ContentHubModal'
import History from '../components/sections/History'
import CommunityNoticeBoard from '../components/sections/CommunityNoticeBoard'
import LocalNews from '../components/sections/LocalNews'
import IssueReporting from '../components/sections/IssueReporting'
import MunicipalUpdates from '../components/sections/MunicipalUpdates'
import CommunityGroups from '../components/sections/CommunityGroups'

// Dashboard Card imports
import DashboardCard from '../components/ui/DashboardCard'
import { Landmark, Newspaper, Calendar, Megaphone, AlertCircle, Users } from 'lucide-react'

// Skeleton imports
import HomepageSkeleton from '../components/ui/skeletons/HomepageSkeleton'

const Home = () => {
  const [activeModal, setActiveModal] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const closeModal = () => setActiveModal(null)
  
  // Function to open specific modals from Quick Access
  const openModal = (modalName) => {
    console.log('Opening modal:', modalName) // Debug log
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
      
      {/* Dashboard Grid - Town Hub */}
      <section id="town-hub" className="py-8 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-800 dark:text-white">
            Town Hub
          </h2>
          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
            Tap cards to explore
          </span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          <DashboardCard
            icon={<Landmark className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
            title="Town History"
            subtitle="Ancient origins · Tiger's Eye Fort"
            color="bg-amber-50 dark:bg-amber-900/30"
            onClick={() => setActiveModal('history')}
          />
          <DashboardCard
            icon={<Newspaper className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
            title="Local News"
            subtitle="Latest stories & updates"
            color="bg-blue-50 dark:bg-blue-900/30"
            onClick={() => setActiveModal('news')}
          />
          <DashboardCard
            icon={<Megaphone className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
            title="Notice Board"
            subtitle="Classifieds & community"
            color="bg-purple-50 dark:bg-purple-900/30"
            onClick={() => setActiveModal('noticeboard')}
          />
          <DashboardCard
            icon={<Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />}
            title="Events"
            subtitle="What's happening"
            color="bg-green-50 dark:bg-green-900/30"
            onClick={() => setActiveModal('events')}
          />
          <DashboardCard
            icon={<AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
            title="Report Issue"
            subtitle="Notify municipality"
            color="bg-orange-50 dark:bg-orange-900/30"
            onClick={() => setActiveModal('report')}
          />
          <DashboardCard
            icon={<Users className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
            title="Community"
            subtitle="Churches & groups"
            color="bg-teal-50 dark:bg-teal-900/30"
            onClick={() => setActiveModal('community')}
          />
        </div>
      </section>

      {/* Original sections that remain in scroll */}
      <WeatherWidget />
      <EmergencyNumbers />
      <MunicipalUpdates />
      <InteractiveMap />
      <FuelPriceTracker />
      <Businesses />
      <Schools />
      <Vacancies />
      <Accommodation />
      
      {/* Modals - All rendered at the root level */}
      <ContentHubModal
        isOpen={activeModal === 'history'}
        onClose={closeModal}
        title="A Land of Legends & Legacy"
      >
        <History />
      </ContentHubModal>

      <ContentHubModal
        isOpen={activeModal === 'news'}
        onClose={closeModal}
        title="Local News"
      >
        <LocalNews />
      </ContentHubModal>

      <ContentHubModal
        isOpen={activeModal === 'noticeboard'}
        onClose={closeModal}
        title="Community Notice Board"
      >
        <CommunityNoticeBoard />
      </ContentHubModal>

      <ContentHubModal
        isOpen={activeModal === 'events'}
        onClose={closeModal}
        title="Community Events"
      >
        <EventsCalendar />
      </ContentHubModal>

      <ContentHubModal
        isOpen={activeModal === 'report'}
        onClose={closeModal}
        title="Report an Issue"
      >
        <IssueReporting />
      </ContentHubModal>

      <ContentHubModal
        isOpen={activeModal === 'community'}
        onClose={closeModal}
        title="Churches & Community Groups"
      >
        <CommunityGroups />
      </ContentHubModal>
    </>
  )
}

export default Home