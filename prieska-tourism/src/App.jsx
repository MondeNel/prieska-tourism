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
import BookingModal from './components/BookingModal'; 
import AdminDashboard from './components/AdminDashboard';
import { initData } from './services/dataService';
import PartnerSlider from './components/PartnerSlider';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isBusinessModalOpen, setIsBusinessModalOpen] = useState(false);
  const [preselectedBooking, setPreselectedBooking] = useState(null);
  const [adminUser, setAdminUser] = useState(null);

  // Check for existing admin session
  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin_logged_in');
    if (storedAdmin) {
      setAdminUser(JSON.parse(storedAdmin));
    }
  }, []);

  useEffect(() => { 
    initData(); 
  }, []);

  const openBooking = (itemName = null) => {
    setPreselectedBooking(itemName);
    setIsBookingOpen(true);
  };

  const openBusinessRegistration = () => {
    setIsBusinessModalOpen(true);
  };

  const handleAdminLogin = (email, password) => {
    // Simple login – any credentials work (demo mode)
    const dummyUser = { email, name: email.split('@')[0] };
    localStorage.setItem('admin_logged_in', JSON.stringify(dummyUser));
    setAdminUser(dummyUser);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('admin_logged_in');
    setAdminUser(null);
  };

  return (
    <div className="bg-karoo-cream min-h-screen font-sans antialiased selection:bg-[#E8A020]/30">
      
      <Navbar 
        onBookNow={openBooking} 
        onListBusiness={openBusinessRegistration} 
      />
      
      <Hero />
      
      <main className="pt-12 space-y-24 md:space-y-32">
        <CategoryStrip />
        <PartnerSlider />
        <Stats />
        <TopAttractions />
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

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        preselectedExperience={preselectedBooking}
      />

      {/* Business Registration / Admin Dashboard Modal */}
      <AdminDashboard 
        isOpen={isBusinessModalOpen}
        onClose={() => setIsBusinessModalOpen(false)}
        user={adminUser}
        onLogin={handleAdminLogin}
        onLogout={handleAdminLogout}
      />
      
    </div>
  );
}

export default App;