// src/pages/GalleryPage.jsx
import { useState } from 'react'
import LeftSidebar from '../components/layout/LeftSidebar'
import RightSidebar from '../components/layout/RightSidebar'
import SectionTitle from '../components/ui/SectionTitle'
import { X } from 'lucide-react'
import { getQuickStats } from '../data/activityFeed'
import { Newspaper, Calendar, Megaphone } from 'lucide-react'

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800', alt: 'Orange River sunset', caption: 'Orange River at golden hour' },
  { id: 2, src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800', alt: 'Karoo landscape', caption: 'Endless Karoo plains' },
  { id: 3, src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800', alt: 'Aloe garden', caption: 'Ria Huysamen Aloe Garden' },
  { id: 4, src: 'https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=800', alt: 'Historic fort', caption: 'Prieska Koppie Fort' },
  { id: 5, src: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800', alt: 'Die Bos', caption: 'Die Bos Nature Reserve' },
  { id: 6, src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800', alt: 'Starry sky', caption: 'Karoo starry night' },
  { id: 7, src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', alt: 'River bend', caption: 'Wonderdraai optical illusion' },
  { id: 8, src: 'https://images.unsplash.com/photo-1533575770077-052fa2c609fc?w=800', alt: 'Rock art', caption: 'Ancient San rock paintings' },
]

const GalleryPage = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)

  const stats = getQuickStats()

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <LeftSidebar className="lg:col-span-3" />
          
          {/* Main Content Area */}
          <div id="main-feed" className="lg:col-span-6 overflow-y-auto max-h-[calc(100vh-100px)]">
            {/* Quick Stats */}
            <div className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-950 pb-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm">
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{stats.newsThisWeek}</p>
                  <div className="flex items-center justify-center gap-1">
                    <Newspaper className="w-3 h-3 text-blue-500" />
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">News</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm">
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">{stats.upcomingEvents}</p>
                  <div className="flex items-center justify-center gap-1">
                    <Calendar className="w-3 h-3 text-green-500" />
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Events</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm">
                  <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{stats.newNotices}</p>
                  <div className="flex items-center justify-center gap-1">
                    <Megaphone className="w-3 h-3 text-purple-500" />
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Notices</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Content */}
            <SectionTitle subtitle="VISUAL JOURNEY" title="Prieska Gallery" />
            
            <div className="grid grid-cols-2 gap-3">
              {galleryImages.map((img) => (
                <div
                  key={img.id}
                  onClick={() => { setCurrentImage(img); setLightboxOpen(true) }}
                  className="aspect-square overflow-hidden rounded-xl cursor-pointer group relative shadow-sm hover:shadow-md transition"
                >
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end p-3">
                    <p className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {img.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Sidebar */}
          <RightSidebar className="lg:col-span-3" />
        </div>

        {lightboxOpen && currentImage && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <button 
              onClick={() => setLightboxOpen(false)} 
              className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 z-10"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <img 
              src={currentImage.src} 
              alt={currentImage.alt} 
              className="max-h-[85vh] max-w-full object-contain rounded-lg"
            />
            <p className="absolute bottom-6 text-white text-sm md:text-lg text-center px-4">
              {currentImage.caption}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default GalleryPage