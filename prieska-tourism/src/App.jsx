import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Experiences from './components/Experiences';
import Accommodation from './components/Accommodation';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-karoo-cream">
      <Navbar />
      <Hero />
      <Stats />
      <Experiences />
      <Accommodation />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;