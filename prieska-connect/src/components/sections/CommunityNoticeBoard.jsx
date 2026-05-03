// src/components/sections/CommunityNoticeBoard.jsx
import { useState, useEffect } from 'react'
import { notices, noticeCategories, getRelativeTime } from '../../data/noticeBoard'
import { MapPin, Phone, X, Heart, MessageCircle, Share2, Megaphone } from 'lucide-react'
import NoticeBoardSkeleton from '../ui/skeletons/NoticeBoardSkeleton'

const CommunityNoticeBoard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [postText, setPostText] = useState('')
  const [showComposer, setShowComposer] = useState(false)

  useEffect(() => { const timer = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(timer) }, [])
  if (loading) return <NoticeBoardSkeleton />

  const filteredNotices = selectedCategory === 'all' ? notices : notices.filter(n => n.category === selectedCategory)
  const sortedNotices = [...filteredNotices].sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))

  const getCategoryIcon = (categoryId) => { const cat = noticeCategories.find(c => c.id === categoryId); return cat?.icon }
  const getCategoryLabel = (categoryId) => { const cat = noticeCategories.find(c => c.id === categoryId); return cat?.label || categoryId }
  const getCategoryColor = (categoryId) => {
    switch(categoryId) { case 'forsale': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'; case 'lostfound': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'; case 'housing': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'; case 'community': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'; default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' }
  }

  return (
    <div className="space-y-3">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-2.5 sm:p-4">
        {!showComposer ? (
          <button onClick={() => setShowComposer(true)} className="w-full flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-[10px] sm:text-sm flex-shrink-0">N</div>
            <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-3 sm:px-4 py-1.5 sm:py-2.5 text-[11px] sm:text-sm text-gray-500 dark:text-gray-400 text-left truncate">Post a notice, sell an item, or make an announcement...</div>
          </button>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-[11px] sm:text-sm font-medium text-gray-800 dark:text-white">Create Post</span>
              <button onClick={() => setShowComposer(false)} className="text-gray-400 hover:text-gray-600 p-0.5"><X className="w-3 h-3 sm:w-4 sm:h-4" /></button>
            </div>
            <textarea value={postText} onChange={(e) => setPostText(e.target.value)} placeholder="Post a notice..." className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-prieska-terracotta resize-none" rows={3} />
            <div className="flex items-center justify-end mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100 dark:border-gray-700">
              <button onClick={() => { setPostText(''); setShowComposer(false) }} disabled={!postText.trim()} className="bg-prieska-terracotta text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed">Post</button>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-1 overflow-x-auto pb-1">
        {noticeCategories.map(cat => { const Icon = cat.icon; return (
          <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap transition ${selectedCategory === cat.id ? 'bg-prieska-terracotta text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-prieska-terracotta'}`}><Icon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />{cat.label}</button>
        )})}
      </div>

      <div className="space-y-2 sm:space-y-3">
        {sortedNotices.map(notice => { const CategoryIcon = getCategoryIcon(notice.category); return (
          <div key={notice.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-2.5 sm:p-4 pb-1 sm:pb-2">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className={`p-1 sm:p-2 rounded-lg ${getCategoryColor(notice.category)}`}>{CategoryIcon ? <CategoryIcon className="w-3 h-3 sm:w-4 sm:h-4" /> : <Megaphone className="w-3 h-3 sm:w-4 sm:h-4" />}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 sm:gap-2"><span className="text-[11px] sm:text-sm font-medium text-gray-800 dark:text-white">{getCategoryLabel(notice.category)}</span><span className="text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500">•</span><span className="text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500">{getRelativeTime(notice.postedDate)}</span></div>
                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5">Posted by {notice.postedBy}</p>
                </div>
              </div>
            </div>
            <div className="px-2.5 sm:px-4 pb-2 sm:pb-3">
              <h4 className="font-semibold text-gray-800 dark:text-white text-[11px] sm:text-sm mb-0.5">{notice.title}</h4>
              <p className="text-gray-600 dark:text-gray-300 text-[10px] sm:text-xs leading-relaxed">{notice.description}</p>
            </div>
            <div className="px-2.5 sm:px-4 pb-2 sm:pb-3 flex items-center gap-3 text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1"><MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" />{notice.location}</span>
              <a href={`tel:${notice.contact.replace(/\s/g, '')}`} className="flex items-center gap-1 text-prieska-terracotta hover:underline"><Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3" />{notice.contact}</a>
            </div>
            <div className="flex items-center border-t border-gray-100 dark:border-gray-700">
              <button className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><Heart className="w-3 h-3 sm:w-4 sm:h-4" />Like</button>
              <button className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition border-x border-gray-100 dark:border-gray-700"><MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />Comment</button>
              <button className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"><Share2 className="w-3 h-3 sm:w-4 sm:h-4" />Share</button>
            </div>
          </div>
        )})}
      </div>
      {sortedNotices.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-[11px] sm:text-sm">No notices in this category yet.</p>}
    </div>
  )
}

export default CommunityNoticeBoard