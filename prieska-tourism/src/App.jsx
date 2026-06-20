import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryStrip from './components/CategoryStrip';
import Stats from './components/Stats';
import TopAttractions from './components/TopAttractions'; 
import Experiences from './components/Experiences';
import MapSection from './components/MapSection';
import EventsAndAI from './components/EventsAndAI';
import Accommodation from './components/Accommodation';
import BusinessDirectory from './components/BusinessDirectory';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { initData } from './services/dataService';

function App() {
  useEffect(() => { 
    initData(); 
  }, []);

  return (
    <div className="bg-karoo-cream min-h-screen font-sans antialiased selection:bg-[#E8A020]/30">
      
      {/* 1. Header & Brand Navigation Layer with Imaged Mega Dropdowns */}
      <Navbar />
      
      {/* 2. Visual Hook (Editorial Image / Headline Showcase - Fully Unobstructed) */}
      <Hero />
      
      {/* 3. Orientation & Core Overview Anchors */}
      <main className="pt-12 space-y-24 md:space-y-32">
        <CategoryStrip />
        
        {/* Destination Authority Metrics */}
        <Stats />
        
        {/* Signature Highlights (Cape Town styled regional filtration grid) */}
        <TopAttractions />
        
        {/* Prime Focus Discovery Cards (What to see & maps) */}
        <Experiences />
        <MapSection />
        
        {/* Live / Dynamic Integration Layer */}
        <EventsAndAI />
        
        {/* Conversion Blocks (Where to sleep & full tourism listing directory) */}
        <Accommodation />
        <BusinessDirectory />
        
        {/* Visual Inspiration & Validation */}
        <Gallery />
        <Testimonials />
        
        {/* Contextual Assistance */}
        <FAQ />
      </main>
      
      {/* 4. Clean-cut High Contrast Directory Footer */}
      <Footer />
      
    </div>
  );
}

export default App;