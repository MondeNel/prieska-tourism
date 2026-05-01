// src/components/ui/skeletons/NoticeBoardSkeleton.jsx
import Skeleton from '../Skeleton'

const NoticeBoardSkeleton = () => {
  return (
    <div className="space-y-3">
      {/* Post Composer */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="flex-1 h-10 rounded-full" />
        </div>
        <div className="flex items-center justify-end mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-1.5">
        {Array(5).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-7 w-16 rounded-full" />
        ))}
      </div>

      {/* Notice Cards */}
      {Array(4).fill(0).map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
            <div className="flex-1">
              <Skeleton className="h-4 w-3/4 mb-1" />
              <Skeleton className="h-3 w-16 mb-2" />
              <Skeleton className="h-3 w-full mb-1" />
              <Skeleton className="h-3 w-2/3 mb-2" />
              <div className="flex gap-3">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NoticeBoardSkeleton