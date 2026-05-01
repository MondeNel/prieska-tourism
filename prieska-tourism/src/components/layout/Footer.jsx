// src/components/layout/Footer.jsx
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div>
            <h3 className="text-white font-serif text-lg md:text-xl mb-3 md:mb-4">Visit Prieska</h3>
            <p className="text-xs md:text-sm leading-relaxed">
              Discover the hidden gem of the Northern Cape — where the Orange River meets timeless Karoo hospitality.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-3 md:space-x-4 mt-3 md:mt-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-base md:text-lg mb-3 md:mb-4">Quick Links</h4>
            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
              <li><a href="/" className="hover:text-prieska-terracotta transition">Home</a></li>
              <li><a href="/services" className="hover:text-prieska-terracotta transition">Services</a></li>
              <li><a href="/gallery" className="hover:text-prieska-terracotta transition">Gallery</a></li>
              <li><a href="/faq" className="hover:text-prieska-terracotta transition">FAQ</a></li>
              <li><a href="/booking" className="hover:text-prieska-terracotta transition">Book Now</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-base md:text-lg mb-3 md:mb-4">Contact</h4>
            <ul className="space-y-2 md:space-y-2.5 text-xs md:text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 mt-0.5 flex-shrink-0" />
                <span>Prieska, Northern Cape, 8940</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                <span>+27 (0)53 353 1234</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                <span>info@visitprieska.co.za</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-base md:text-lg mb-3 md:mb-4">Partners</h4>
            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
              <li>Northern Cape Tourism</li>
              <li>SA Tourism</li>
              <li>Siyathemba Municipality</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-xs md:text-sm">
          <p>© 2026 Visit Prieska. Created by Monde Nel.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer