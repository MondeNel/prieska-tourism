// src/components/sections/LocalNews.jsx
import { useState, useEffect } from 'react'
import { newsArticles, newsCategories, getRelativeTime } from '../../data/localNews'
import { MapPin, User, Clock, Plus, Image, Smile, X, Heart, MessageCircle, Share2 } from 'lucide-react'
import NewsSkeleton from '../ui/skeletons/NewsSkeleton'

const LocalNews = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [postText, setPostText] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <NewsSkeleton />
  }

  const filteredArticles = selectedCategory === 'all' 
    ? newsArticles 
    : newsArticles.filter(a => a.category === selectedCategory)

  const sortedArticles = [...filteredArticles].sort((a, b) => 
    new Date(b.publishedDate) - new Date(a.publishedDate)
  )

  const getCategoryIcon = (categoryId) => {
    const category = newsCategories.find(c => c.id === categoryId)
    return category?.icon
  }

  const getCategoryLabel = (categoryId) => {
    const category = newsCategories.find(c => c.id === categoryId)
    return category?.label || categoryId
  }

  const getCategoryColor = (categoryId) => {
    switch(categoryId) {
      case 'sports': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'community': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'business': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
      case 'schools': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
      case 'municipal': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  return (
    <div className="space-y-4">
      {/* Post Composer */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm">
            N
          </div>
          <input
            type="text"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Share a news story or community update..."
            className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-prieska-terracotta"
          />
        </div>
        <div className="flex items-center gap-2 border-t border-gray-100 dark:border-gray-700 pt-3">
          <button className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-prieska-terracotta transition px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Image className="w-4 h-4" />
            Photo
          </button>
          <button className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-prieska-terracotta transition px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Smile className="w-4 h-4" />
            Feeling
          </button>
          <button 
            disabled={!postText.trim()}
            className="ml-auto bg-prieska-terracotta text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post
          </button>
        </div>
      </div>

      {/* Category Filter - Compact Chips */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
            selectedCategory === 'all'
              ? 'bg-prieska-terracotta text-white'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-prieska-terracotta'
          }`}
        >
          All News
        </button>
        {newsCategories.filter(c => c.id !== 'all').map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
              selectedCategory === cat.id
                ? 'bg-prieska-terracotta text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-prieska-terracotta'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* News Feed */}
      <div className="space-y-3">
        {sortedArticles.map(article => (
          <div 
            key={article.id} 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            {/* Post Header */}
            <div className="p-4 pb-2">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${getCategoryColor(article.category)}`}>
                  {(() => {
                    const Icon = getCategoryIcon(article.category)
                    return Icon ? <Icon className="w-4 h-4" /> : <Newspaper className="w-4 h-4" />
                  })()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800 dark:text-white">
                      {getCategoryLabel(article.category)}
                    </span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">•</span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">
                      {getRelativeTime(article.publishedDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[10px] text-gray-400 dark:text-gray-500">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {article.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {article.location}
                    </span>
                    <span>• {article.readTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-3">
              <h4 className="font-semibold text-gray-800 dark:text-white text-sm mb-1">
                {article.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                {article.excerpt}
              </p>
              {/* Tags */}
              {article.tags && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {article.tags.map(tag => (
                    <span key={tag} className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Post Actions */}
            <div className="flex items-center border-t border-gray-100 dark:border-gray-700">
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                <Heart className="w-4 h-4" />
                Like
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition border-x border-gray-100 dark:border-gray-700">
                <MessageCircle className="w-4 h-4" />
                Comment
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        ))}
      </div>

      {sortedArticles.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-sm">
          No news articles in this category yet.
        </p>
      )}
    </div>
  )
}

export default LocalNews