// src/components/sections/LocalNews.jsx
import { useState, useEffect } from 'react'
import { newsArticles, newsCategories, getRelativeTime } from '../../data/localNews'
import { MapPin, User, Clock, Plus, TrendingUp, Sparkles, X } from 'lucide-react'
import SubmitNewsModal from '../ui/SubmitNewsModal'
import NewsSkeleton from '../ui/skeletons/NewsSkeleton'

const LocalNews = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  // FIXED: Changed from NewsSectionSkeleton to NewsSkeleton
  if (loading) {
    return <NewsSkeleton />
  }

  const filteredArticles = selectedCategory === 'all' 
    ? newsArticles 
    : newsArticles.filter(a => a.category === selectedCategory)

  const sortedArticles = [...filteredArticles].sort((a, b) => 
    new Date(b.publishedDate) - new Date(a.publishedDate)
  )

  const featuredArticles = newsArticles.filter(a => a.featured).slice(0, 3)

  const getCategoryIcon = (categoryId) => {
    const category = newsCategories.find(c => c.id === categoryId)
    return category?.icon
  }

  const getCategoryLabel = (categoryId) => {
    const category = newsCategories.find(c => c.id === categoryId)
    return category?.label || categoryId
  }

  return (
    <div className="space-y-4">
      {/* Header with Submit Button */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Community journalism from the heart of the Karoo
        </p>
        <button
          onClick={() => setShowSubmitModal(true)}
          className="flex items-center gap-1.5 bg-prieska-terracotta text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition"
        >
          <Plus className="w-4 h-4" />
          Submit Story
        </button>
      </div>

      {/* Featured Stories */}
      {featuredArticles.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-prieska-terracotta" />
            Featured Stories
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {featuredArticles.map(article => {
              const CategoryIcon = getCategoryIcon(article.category)
              return (
                <div 
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="bg-gradient-to-br from-prieska-terracotta/5 to-prieska-river/5 dark:from-prieska-terracotta/10 dark:to-prieska-river/10 rounded-xl p-4 border border-prieska-terracotta/20 cursor-pointer hover:shadow-md transition"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {CategoryIcon && <CategoryIcon className="w-4 h-4 text-prieska-terracotta" />}
                    <span className="text-xs font-medium text-prieska-terracotta">
                      {getCategoryLabel(article.category)}
                    </span>
                  </div>
                  <h5 className="font-semibold text-gray-800 dark:text-white text-sm mb-1 line-clamp-2">
                    {article.title}
                  </h5>
                  <p className="text-gray-600 dark:text-gray-300 text-xs mb-2 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {getRelativeTime(article.publishedDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {article.author}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-1.5 pb-2">
        {newsCategories.map(cat => {
          const Icon = cat.icon
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${
                selectedCategory === cat.id
                  ? 'bg-prieska-terracotta text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Latest News */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-prieska-terracotta" />
          Latest News
        </h4>
        <div className="space-y-3">
          {sortedArticles.map(article => {
            const CategoryIcon = getCategoryIcon(article.category)
            
            return (
              <div 
                key={article.id} 
                className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-md transition"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
                    {CategoryIcon && <CategoryIcon className="w-4 h-4 text-prieska-terracotta" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-gray-800 dark:text-white text-sm mb-1">
                      {article.title}
                    </h5>
                    <p className="text-gray-600 dark:text-gray-300 text-xs mb-2 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {getRelativeTime(article.publishedDate)} • {article.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {article.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {article.location}
                      </span>
                    </div>
                    {article.tags && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {article.tags.map(tag => (
                          <span key={tag} className="text-[10px] bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {sortedArticles.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8 text-sm">
          No news articles in this category yet.
        </p>
      )}

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  {(() => {
                    const Icon = getCategoryIcon(selectedArticle.category)
                    return Icon && <Icon className="w-5 h-5 text-prieska-terracotta" />
                  })()}
                  <span className="text-xs font-medium text-prieska-terracotta">
                    {getCategoryLabel(selectedArticle.category)}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-800 dark:text-white mb-3">
                {selectedArticle.title}
              </h2>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {selectedArticle.author}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedArticle.publishedDate} • {selectedArticle.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {selectedArticle.location}
                </span>
              </div>
              
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {selectedArticle.content}
                </p>
              </div>
              
              {selectedArticle.tags && (
                <div className="flex flex-wrap gap-1 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {selectedArticle.tags.map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <SubmitNewsModal 
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
      />
    </div>
  )
}

export default LocalNews