import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Notices from './components/sections/Notices'
import News from './components/sections/News'
import Gallery from './components/sections/Gallery'
import Attractions from './components/sections/Attractions'
import Accommodation from './components/sections/Accommodation'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Notices />
        <News />
        <Gallery />
        <Attractions />
        <Accommodation />
      </main>
      <Footer />
    </div>
  )
}

export default App