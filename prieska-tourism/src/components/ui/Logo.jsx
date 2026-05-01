// src/components/ui/Logo.jsx
const Logo = ({ scrolled = false, size = 'default' }) => {
  const sizes = {
    small: { icon: 'w-7 h-7', text: 'text-base' },
    default: { icon: 'w-10 h-10', text: 'text-xl md:text-2xl' },
    large: { icon: 'w-12 h-12', text: 'text-2xl md:text-3xl' }
  }

  const { icon, text } = sizes[size] || sizes.small

  return (
    <div className="flex items-center gap-2 group">
      {/* Icon */}
      <div className={`${icon} rounded-xl bg-gradient-to-br from-prieska-terracotta to-prieska-river flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg`}>
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
        >
          <circle cx="12" cy="12" r="4" fill="white" fillOpacity="0.9" />
          <circle cx="28" cy="12" r="4" fill="white" fillOpacity="0.9" />
          <circle cx="20" cy="28" r="4" fill="white" fillOpacity="0.9" />
          <line x1="16" y1="12" x2="24" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="16" x2="18" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="26" y1="16" x2="22" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Wordmark - Always dark in light mode, white only on transparent/dark backgrounds */}
      <span className={`${text} font-sans font-bold tracking-tight text-gray-900 dark:text-white`}>
        Prieska<span className="text-prieska-terracotta font-normal">Connect</span>
      </span>
    </div>
  )
}

export default Logo