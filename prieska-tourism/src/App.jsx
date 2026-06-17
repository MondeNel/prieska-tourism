import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryStrip from './components/CategoryStrip';
import Stats from './components/Stats';
import Experiences from './components/Experiences';
import Accommodation from './components/Accommodation';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { initData } from './services/dataService';
import MapSection from './components/MapSection';

function App() {
  useEffect(() => {
    initData();
  }, []);

  return (
    <div className="bg-karoo-cream">
      <Navbar />
      <Hero />
      <CategoryStrip />
      <Stats />
      <Experiences />
      <MapSection />
      <Accommodation />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;