// src/components/layout/MainFeed.jsx
import { getRecentActivity, getTimeAgo } from '../../data/activityFeed'
import { Newspaper, Megaphone, Calendar, AlertTriangle, Heart, MessageCircle, Share2, X, ImageIcon } from 'lucide-react'
import { useState, useRef } from 'react'

const postCategories = [
  { id: 'news', label: 'News', icon: Newspaper },
  { id: 'notice', label: 'Notice', icon: Megaphone },
  { id: 'event', label: 'Event', icon: Calendar },
  { id: 'report', label: 'Report', icon: AlertTriangle },
]

const MainFeed = () => {
  const staticActivities = getRecentActivity(10)
  const [postText, setPostText] = useState('')
  const [showComposer, setShowComposer] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('news')
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [postedActivities, setPostedActivities] = useState([])
  const fileInputRef = useRef(null)
  const [likedPosts, setLikedPosts] = useState(new Set())

  const allActivities = [...postedActivities, ...staticActivities]

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const clearImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handlePost = () => {
    if (!postText.trim()) return

    const newPost = {
      id: `user-${Date.now()}`,
      type: selectedCategory,
      title: postText,
      description: '',
      date: new Date().toISOString().split('T')[0],
      image: imagePreview,
      color: `bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300`
    }

    setPostedActivities(prev => [newPost, ...prev])
    setPostText('')
    setShowComposer(false)
    setSelectedCategory('news')
    clearImage()
  }

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const next = new Set(prev)
      if (next.has(postId)) {
        next.delete(postId)
      } else {
        next.add(postId)
      }
      return next
    })
  }

  const getIcon = (type) => {
    const iconClass = "w-3 h-3 sm:w-4 sm:h-4"
    switch (type) {
      case 'news': return <Newspaper className={iconClass} />
      case 'notice': return <Megaphone className={iconClass} />
      case 'event': return <Calendar className={iconClass} />
      case 'report': return <AlertTriangle className={iconClass} />
      default: return <Megaphone className={iconClass} />
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case 'news': return 'News'
      case 'notice': return 'Notice'
      case 'event': return 'Event'
      case 'report': return 'Report'
      default: return 'Update'
    }
  }

  const LikeButton = ({ postId }) => (
    <button
      onClick={() => handleLike(postId)}
      className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 text-[10px] sm:text-xs transition ${
        likedPosts.has(postId)
          ? 'text-red-500 dark:text-red-400'
          : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
      }`}
    >
      <Heart
        className={`w-3 h-3 sm:w-4 sm:h-4 ${
          likedPosts.has(postId) ? 'fill-red-500 dark:fill-red-400' : ''
        }`}
      />
      Like
    </button>
  )

  const PostActions = ({ postId }) => (
    <div className="flex items-center border-t border-gray-100 dark:border-gray-700">
      <LikeButton postId={postId} />
      <button className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition border-x border-gray-100 dark:border-gray-700">
        <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
        Comment
      </button>
      <button className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
        <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
        Share
      </button>
    </div>
  )

  return (
    <div className="space-y-2 sm:space-y-3">
      {/* Post Composer */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-2.5 sm:p-4">
        {!showComposer ? (
          <button onClick={() => setShowComposer(true)} className="w-full flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-prieska-terracotta to-prieska-river flex items-center justify-center text-white font-bold text-[10px] sm:text-sm flex-shrink-0">P</div>
            <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-3 sm:px-4 py-1.5 sm:py-2.5 text-[11px] sm:text-sm text-gray-500 dark:text-gray-400 text-left truncate">What's happening in Prieska?</div>
          </button>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-[11px] sm:text-sm font-medium text-gray-800 dark:text-white">Create Post</span>
              <button onClick={() => { setShowComposer(false); clearImage() }} className="text-gray-400 hover:text-gray-600 p-0.5"><X className="w-3 h-3 sm:w-4 sm:h-4" /></button>
            </div>
            <div className="flex gap-1 sm:gap-1.5 mb-2 sm:mb-3 flex-wrap">
              {postCategories.map(cat => (
                <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition ${selectedCategory === cat.id ? 'bg-prieska-terracotta text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                  <cat.icon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />{cat.label}
                </button>
              ))}
            </div>
            <textarea value={postText} onChange={(e) => setPostText(e.target.value)} placeholder={`Share ${selectedCategory === 'news' ? 'a news story' : selectedCategory === 'notice' ? 'a notice' : selectedCategory === 'event' ? 'an event' : 'an issue'}...`} className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-prieska-terracotta resize-none" rows={3} />

            {imagePreview && (
              <div className="relative mt-2">
                <img src={imagePreview} alt="Preview" className="w-full h-36 sm:h-44 object-cover rounded-lg" />
                <button onClick={clearImage} className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            <div className="flex items-center justify-between mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100 dark:border-gray-700">
              <input type="file" ref={fileInputRef} onChange={handleImageSelect} accept="image/*" className="hidden" />
              <button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 hover:text-prieska-terracotta transition px-2 sm:px-3 py-1 sm:py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Add Photo</span>
              </button>
              <button onClick={handlePost} disabled={!postText.trim()} className="bg-prieska-terracotta text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed">Post as {postCategories.find(c => c.id === selectedCategory)?.label}</button>
            </div>
          </div>
        )}
      </div>

      {/* User Posted Activities */}
      {postedActivities.map(activity => (
        <div key={activity.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-2.5 sm:p-4 pb-1 sm:pb-2">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className={`p-1 sm:p-2 rounded-lg ${activity.color}`}>{getIcon(activity.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-[11px] sm:text-sm font-medium text-gray-800 dark:text-white">{getTypeLabel(activity.type)}</span>
                  <span className="text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500">•</span>
                  <span className="text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500">Just now</span>
                </div>
              </div>
            </div>
          </div>
          {activity.image && (
            <div className="px-2.5 sm:px-4 pb-2">
              <img src={activity.image} alt={activity.title} className="w-full h-36 sm:h-44 object-cover rounded-lg" />
            </div>
          )}
          <div className="px-2.5 sm:px-4 pb-2 sm:pb-3">
            <h4 className="font-semibold text-gray-800 dark:text-white text-[11px] sm:text-sm mb-0.5">{activity.title}</h4>
          </div>
          <PostActions postId={activity.id} />
        </div>
      ))}

      {/* Static Activity Feed */}
      {staticActivities.map(activity => (
        <div key={activity.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-2.5 sm:p-4 pb-1 sm:pb-2">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className={`p-1 sm:p-2 rounded-lg ${activity.color}`}>{getIcon(activity.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-[11px] sm:text-sm font-medium text-gray-800 dark:text-white">{getTypeLabel(activity.type)}</span>
                  <span className="text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500">•</span>
                  <span className="text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500">{getTimeAgo(activity.date)}</span>
                </div>
              </div>
            </div>
          </div>
          {activity.image && (
            <div className="px-2.5 sm:px-4 pb-2">
              <img src={activity.image} alt={activity.title} className="w-full h-36 sm:h-44 object-cover rounded-lg" loading="lazy" />
            </div>
          )}
          <div className="px-2.5 sm:px-4 pb-2 sm:pb-3">
            <h4 className="font-semibold text-gray-800 dark:text-white text-[11px] sm:text-sm mb-0.5">{activity.title}</h4>
            <p className="text-gray-600 dark:text-gray-300 text-[10px] sm:text-xs leading-relaxed">{activity.description}</p>
          </div>
          <PostActions postId={activity.id} />
        </div>
      ))}
    </div>
  )
}

export default MainFeed