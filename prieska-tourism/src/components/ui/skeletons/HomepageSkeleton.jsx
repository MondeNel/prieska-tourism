// src/components/ui/skeletons/HomepageSkeleton.jsx
import Skeleton from '../Skeleton'
import QuickAccessSkeleton from './QuickAccessSkeleton'

const HomepageSkeleton = () => {
  return (
    <>
      {/* Hero Skeleton */}
      <section className="relative h-[60vh] md:h-[70vh] min-h-[450px] flex items-center justify-center bg-gradient-to-br from-prieska-river via-prieska-terracotta to-prieska-sand">
        <div className="text-center">
          <Skeleton className="h-8 w-48 bg-white/20 mx-auto mb-4" />
          <Skeleton className="h-16 w-64 bg-white/20 mx-auto mb-4" />
          <Skeleton className="h-6 w-80 bg-white/20 mx-auto" />
        </div>
      </section>

      <QuickAccessSkeleton />

      {/* Recent Activity Skeleton */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <Skeleton className="w-5 h-5" />
                <Skeleton className="w-8 h-8" />
              </div>
              <Skeleton className="h-3 w-24 mt-2" />
            </div>
          ))}
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <Skeleton className="h-4 w-32" />
          </div>
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="px-4 py-3">
              <div className="flex items-start gap-3">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-3/4 mb-1" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default HomepageSkeleton