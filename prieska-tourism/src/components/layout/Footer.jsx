import { MapPin, Phone, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-serif text-xl mb-4">Visit Prieska</h3>
            <p className="text-sm">
              Discover the hidden gem of the Northern Cape — where the Orange River meets timeless Karoo hospitality.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-prieska-terracotta">About Prieska</a></li>
              <li><a href="#" className="hover:text-prieska-terracotta">Things to Do</a></li>
              <li><a href="#" className="hover:text-prieska-terracotta">Accommodation</a></li>
              <li><a href="#" className="hover:text-prieska-terracotta">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Prieska, Northern Cape, 8940</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+27 (0)53 353 1234</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@visitprieska.co.za</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Partners</h4>
            <ul className="space-y-2 text-sm">
              <li>Northern Cape Tourism</li>
              <li>SA Tourism</li>
              <li>Siyathemba Municipality</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>© 2025 Visit Prieska. Demo frontend project — not an official tourism site.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer