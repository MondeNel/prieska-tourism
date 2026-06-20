import { useState, useEffect } from 'react';
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
import BookingModal from './components/BookingModal'; // Import the Modal
import { initData } from './services/dataService';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedBooking, setPreselectedBooking] = useState(null);

  useEffect(() => { 
    initData(); 
  }, []);

  // Universal opener for components to call directly
  const openBooking = (itemName = null) => {
    setPreselectedBooking(itemName);
    setIsBookingOpen(true);
  };

  return (
    <div className="bg-karoo-cream min-h-screen font-sans antialiased selection:bg-[#E8A020]/30">
      
      {/* Pass openBooking prop down to the navbar */}
      <Navbar onBookNow={() => openBooking()} />
      
      <Hero />
      
      <main className="pt-12 space-y-24 md:space-y-32">
        <CategoryStrip />
        <Stats />
        <TopAttractions />
        
        {/* Pass down to context cards so they can preselect items */}
        <Experiences onBookItem={openBooking} />
        <MapSection />
        <EventsAndAI />
        <Accommodation onBookItem={openBooking} />
        <BusinessDirectory />
        
        <Gallery />
        <Testimonials />
        <FAQ />
      </main>
      
      <Footer />

      {/* Global Modal Insertion */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        preselectedExperience={preselectedBooking}
      />
      
    </div>
  );
}

export default App;