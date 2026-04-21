// src/components/ui/DashboardCard.jsx
const DashboardCard = ({ icon, title, subtitle, color, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-gray-800 p-4 md:p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer group"
    >
      <div className={`p-2 md:p-3 rounded-xl ${color} w-fit mb-3 group-hover:scale-105 transition-transform`}>
        {icon}
      </div>
      <h3 className="font-semibold text-gray-800 dark:text-white text-sm md:text-base mb-0.5">
        {title}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {subtitle}
      </p>
    </div>
  )
}

export default DashboardCard