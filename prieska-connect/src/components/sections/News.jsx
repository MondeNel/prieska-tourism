// src/components/sections/News.jsx
import SectionTitle from '../ui/SectionTitle'
import { newsItems } from '../../data/news'

const News = () => {
  const featureNews = newsItems[0]
  const sideNews = newsItems.slice(1, 3)

  return (
     <section id="news" className="py-12 md:py-16 px-4 max-w-7xl mx-auto bg-prieska-sand/30 dark:bg-gray-900">
      <SectionTitle subtitle="LATEST STORIES" title="News from Prieska" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Feature Story */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
          <div className="w-full h-44 md:h-56 lg:h-64 bg-gradient-to-r from-prieska-river to-prieska-terracotta flex items-center justify-center">
            <span className="text-white text-base md:text-lg font-semibold opacity-70">News Image Placeholder</span>
          </div>
          <div className="p-4 md:p-6">
            <span className="text-prieska-terracotta dark:text-prieska-terracotta text-xs md:text-sm font-semibold uppercase">
              {featureNews.category}
            </span>
            <h3 className="text-xl md:text-2xl font-serif font-bold mt-2 mb-3 text-gray-800 dark:text-white">
              {featureNews.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base mb-4">
              {featureNews.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">{featureNews.date}</span>
              <button className="text-prieska-river dark:text-prieska-river text-sm md:text-base font-medium hover:underline">
                Read More →
              </button>
            </div>
          </div>
        </div>

        {/* Side Stories */}
        <div className="space-y-4 md:space-y-6">
          {sideNews.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition flex flex-col sm:flex-row lg:flex-col">
              <div className="w-full sm:w-1/3 lg:w-full h-24 md:h-32 bg-gradient-to-r from-prieska-sand to-prieska-terracotta flex items-center justify-center">
                <span className="text-xs text-white opacity-70">Image</span>
              </div>
              <div className="p-3 md:p-4">
                <span className="text-prieska-terracotta dark:text-prieska-terracotta text-[10px] md:text-xs font-semibold uppercase">
                  {item.category}
                </span>
                <h4 className="font-serif font-bold text-base md:text-lg mt-1 mb-1.5 text-gray-800 dark:text-white">
                  {item.title}
                </h4>
                <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default News