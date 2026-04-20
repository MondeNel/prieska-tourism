// src/components/ui/SectionTitle.jsx
const SectionTitle = ({ subtitle, title, align = 'center' }) => {
  const alignClass = align === 'center' ? 'text-center' : 'text-left'
  return (
    <div className={`mb-8 md:mb-12 ${alignClass}`}>
      <span className="text-prieska-terracotta dark:text-prieska-terracotta text-xs md:text-sm font-semibold tracking-wider uppercase">
        {subtitle}
      </span>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-800 dark:text-white mt-2">
        {title}
      </h2>
      <div className="w-16 md:w-20 h-0.5 md:h-1 bg-prieska-terracotta dark:bg-prieska-terracotta mt-3 md:mt-4 mx-auto"></div>
    </div>
  )
}

export default SectionTitle