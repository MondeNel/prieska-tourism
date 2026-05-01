// src/components/ui/SectionTitle.jsx
const SectionTitle = ({ subtitle, title, align = 'center' }) => {
  const alignClass = align === 'center' ? 'text-center' : 'text-left'
  return (
    <div className={`mb-4 md:mb-6 ${alignClass}`}>
      <span className="text-prieska-terracotta dark:text-prieska-terracotta text-[10px] md:text-xs font-semibold tracking-wider uppercase">
        {subtitle}
      </span>
      <h2 className="text-lg md:text-xl lg:text-2xl font-serif font-bold text-gray-800 dark:text-white mt-1">
        {title}
      </h2>
      <div className="w-12 md:w-16 h-0.5 bg-prieska-terracotta dark:bg-prieska-terracotta mt-2 mx-auto"></div>
    </div>
  )
}

export default SectionTitle