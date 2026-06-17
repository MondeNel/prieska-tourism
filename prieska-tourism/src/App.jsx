import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExploreCategories from './components/ExploreCategories';
import CategoryStrip from './components/CategoryStrip';
import Stats from './components/Stats';
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
    // Clean, modern, bright canvas structure. Ensure 'bg-karoo-cream' is a 
    // very soft, minimal off-white (e.g., #FAFAf9 or #FBFBFA) to keep that airy feel.
    <div className="bg-karoo-cream min-h-screen font-sans antialiased selection:bg-[#E8A020]/30">
      
      {/* 1. Header & Brand Navigation Layer */}
      <Navbar />
      
      {/* 2. Visual Hook (Editorial Image / Headline Showcase) */}
      <Hero />
      
      {/* 3. The Interactive Anchor Panel (Shifted below Hero for the signature overlay look) */}
      <div className="relative z-30 -mt-16 max-w-5xl mx-auto px-4">
        <ExploreCategories />
      </div>
      
      {/* 4. Orientation & Core Overview Anchors */}
      <main className="pt-12 space-y-24 md:space-y-32">
        <CategoryStrip />
        
        {/* Destination Authority Metrics */}
        <Stats />
        
        {/* 5. Prime Focus Discovery Cards (What to see & maps) */}
        <Experiences />
        <MapSection />
        
        {/* 6. Live / Dynamic Integration Layer */}
        <EventsAndAI />
        
        {/* 7. Conversion Blocks (Where to sleep & full tourism listing directory) */}
        <Accommodation />
        <BusinessDirectory />
        
        {/* 8. Visual Inspiration & Validation */}
        <Gallery />
        <Testimonials />
        
        {/* 9. Contextual Assistance */}
        <FAQ />
      </main>
      
      {/* 10. Clean-cut High Contrast Directory Footer */}
      <Footer />
      
    </div>
  );
}

export default App;