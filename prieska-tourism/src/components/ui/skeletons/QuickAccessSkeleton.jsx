// src/components/ui/skeletons/QuickAccessSkeleton.jsx
import Skeleton from '../Skeleton'

const QuickAccessSkeleton = ({ count = 8 }) => {
  return (
    <section className="py-8 md:py-12 px-4 max-w-7xl mx-auto">
      <div className="mb-6 md:mb-8">
        <Skeleton className="h-8 w-40 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4">
        {Array(count).fill(0).map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-3 md:p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col items-center">
              <Skeleton className="w-10 h-10 rounded-full mb-2" />
              <Skeleton className="h-4 w-16 mb-1" />
              <Skeleton className="h-3 w-20 hidden sm:block" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default QuickAccessSkeleton