// src/components/ui/skeletons/BusinessSkeleton.jsx
import Skeleton from '../Skeleton'

const BusinessSkeleton = ({ count = 6 }) => {
  return (
    <section className="py-12 md:py-16 px-4 max-w-7xl mx-auto">
      <div className="mb-8 md:mb-12 text-center">
        <Skeleton className="h-4 w-32 mx-auto mb-2" />
        <Skeleton className="h-8 w-64 mx-auto" />
        <Skeleton className="h-1 w-16 mx-auto mt-3" />
      </div>
      
      <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 mb-8 md:mb-10">
        {Array(6).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-full" />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {Array(count).fill(0).map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm">
            <div className="flex items-start gap-3 md:gap-4">
              <Skeleton className="w-12 h-12 rounded-xl" />
              <div className="flex-1">
                <Skeleton className="h-5 w-3/4 mb-1" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
            <Skeleton className="h-4 w-full mt-3" />
            <Skeleton className="h-4 w-2/3 mt-1 mb-3" />
            <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BusinessSkeleton