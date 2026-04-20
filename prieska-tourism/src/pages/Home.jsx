// src/pages/Home.jsx
import Hero from '../components/sections/Hero'
import WhyPrieska from '../components/sections/WhyPrieska'
import Notices from '../components/sections/Notices'
import News from '../components/sections/News'
import History from '../components/sections/History'
import Attractions from '../components/sections/Attractions'
import Testimonials from '../components/sections/Testimonials'
import Accommodation from '../components/sections/Accommodation'
import Businesses from '../components/sections/Businesses' 

const Home = () => {
  return (
    <>
      <Hero />
      <WhyPrieska />
      <Notices />
      <History />
      <Attractions />
      <Businesses />
      <Accommodation />
      <Testimonials />
      <News />
    </>
  )
}

export default Home