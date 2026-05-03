// src/components/ui/skeletons/HomepageSkeleton.jsx
import Skeleton from '../Skeleton'

const HomepageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar Skeleton */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-4">
              {/* Pages section */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-16 mb-3" />
                {Array(5).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-9 w-full rounded-lg" />
                ))}
              </div>
              <Skeleton className="h-px w-full" />
              {/* Quick Links section */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 mb-3" />
                {Array(10).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-9 w-full rounded-lg" />
                ))}
              </div>
            </div>
          </div>
          
          {/* Main Content Skeleton */}
          <div className="lg:col-span-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-16 rounded-lg" />
              ))}
            </div>

            {/* Post Composer */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="flex-1 h-10 rounded-full" />
              </div>
              <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                <Skeleton className="h-8 w-16 rounded-full" />
                <Skeleton className="h-8 w-16 rounded-full" />
                <Skeleton className="h-8 w-16 rounded-full ml-auto" />
              </div>
            </div>

            {/* Feed Posts */}
            <div className="space-y-3">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Skeleton className="w-10 h-10 rounded-lg" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-3 w-full mb-1" />
                      <Skeleton className="h-3 w-2/3 mb-3" />
                      <div className="flex gap-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Sidebar Skeleton */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-4">
              {/* Ad */}
              <Skeleton className="h-24 rounded-xl" />
              {/* Weather */}
              <Skeleton className="h-20 rounded-xl" />
              {/* Upcoming Events */}
              <Skeleton className="h-40 rounded-xl" />
              {/* Fuel Quick View */}
              <Skeleton className="h-24 rounded-xl" />
              {/* Another Ad */}
              <Skeleton className="h-24 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomepageSkeleton