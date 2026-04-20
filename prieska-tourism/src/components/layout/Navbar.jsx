import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Discover', href: '#discover' },
    { name: 'Notices', href: '#notices' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Stay', href: '#accommodation' },
  ]

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <span className="text-2xl font-serif font-bold text-prieska-terracotta">
              Visit Prieska
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-prieska-terracotta font-medium transition"
              >
                {link.name}
              </a>
            ))}
            <button className="bg-prieska-terracotta text-white px-5 py-2 rounded-full hover:bg-opacity-90 transition">
              Plan Your Trip
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 text-gray-700 hover:text-prieska-terracotta"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="w-full bg-prieska-terracotta text-white py-2 rounded-full mt-2">
              Plan Your Trip
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar