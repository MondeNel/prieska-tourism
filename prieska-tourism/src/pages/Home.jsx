import Hero from '../components/sections/Hero'
import QuickAccess from '../components/sections/QuickAccess'
import AdBanner from '../components/sections/AdBanner'
import WhyPrieska from '../components/sections/WhyPrieska'
import WeatherWidget from '../components/sections/WeatherWidget'
import Notices from '../components/sections/Notices'
import EmergencyNumbers from '../components/sections/EmergencyNumbers'
import History from '../components/sections/History'
import InteractiveMap from '../components/sections/InteractiveMap'
import Attractions from '../components/sections/Attractions'
import FuelPriceTracker from '../components/sections/FuelPriceTracker'
import Businesses from '../components/sections/Businesses'
import Vacancies from '../components/sections/Vacancies'
import Accommodation from '../components/sections/Accommodation'
import Testimonials from '../components/sections/Testimonials'
import News from '../components/sections/News'

const Home = () => {
  return (
    <>
      <Hero />
      <QuickAccess />
      <AdBanner />
      <WhyPrieska />
      <WeatherWidget />
      <Notices />
      <EmergencyNumbers />
      <History />
      <InteractiveMap />
      <Attractions />
      <FuelPriceTracker />
      <Businesses />
      <Vacancies />
      <Accommodation />
      <Testimonials />
      <News />
    </>
  )
}

export default Home