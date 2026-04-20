import { ChevronDown } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center">
      {/* Background - Gradient placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-prieska-river via-prieska-terracotta to-prieska-sand opacity-80" />
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <span className="text-prieska-sand uppercase tracking-widest text-sm md:text-base">
          Welcome to the Northern Cape
        </span>
        <h1 className="text-5xl md:text-7xl font-serif font-bold mt-4 mb-6 leading-tight">
          Prieska: <br className="md:hidden" />
          <span className="text-white">Place of the Lost She-Goat</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Discover ancient rock art, the mighty Orange River, and warm Karoo hospitality.
        </p>
        <button className="bg-white text-prieska-terracotta px-8 py-4 rounded-full text-lg font-medium hover:bg-opacity-90 transition shadow-lg">
          Explore Prieska
        </button>
      </div>

      <a 
        href="#notices" 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  )
}

export default Hero