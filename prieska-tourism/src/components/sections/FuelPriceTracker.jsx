// src/components/sections/FuelPriceTracker.jsx
import SectionTitle from '../ui/SectionTitle'
import { fuelPrices } from '../../data/fuelPrices'
import { Fuel, TrendingDown, Calendar } from 'lucide-react'

const FuelPriceTracker = () => {
  const fuelTypes = [
    { key: 'petrol93', label: 'Petrol 93', color: 'text-orange-500 dark:text-orange-400' },
    { key: 'petrol95', label: 'Petrol 95', color: 'text-orange-600 dark:text-orange-500' },
    { key: 'diesel50', label: 'Diesel 50', color: 'text-green-600 dark:text-green-500' },
    { key: 'diesel500', label: 'Diesel 500', color: 'text-green-700 dark:text-green-600' }
  ]

  return (
    <section id="fuel" className="py-8 md:py-12 px-4 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900/50">
      <SectionTitle subtitle="SAVE AT THE PUMP" title="Fuel Prices in Prieska" />
      
      <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
        <table className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden text-[11px] md:text-sm">
          <thead className="bg-prieska-river text-white">
            <tr>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-serif text-xs md:text-base">Station</th>
              {fuelTypes.map(ft => (
                <th key={ft.key} className="px-1.5 md:px-3 py-2 md:py-3 text-center text-[11px] md:text-sm whitespace-nowrap">{ft.label}</th>
              ))}
              <th className="px-1.5 md:px-3 py-2 md:py-3 text-center text-[11px] md:text-sm whitespace-nowrap">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {fuelPrices.map(station => (
              <tr key={station.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-2 md:px-4 py-2 md:py-3">
                  <div className="flex items-center gap-1.5 md:gap-3">
                    <Fuel className="w-3.5 h-3.5 md:w-5 md:h-5 text-prieska-terracotta flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white text-xs md:text-base">{station.station}</p>
                      <p className="text-[9px] md:text-xs text-gray-500 dark:text-gray-400">{station.location}</p>
                    </div>
                  </div>
                </td>
                {fuelTypes.map(ft => (
                  <td key={ft.key} className="px-1.5 md:px-3 py-2 md:py-3 text-center">
                    <span className={`font-mono font-bold text-[11px] md:text-sm ${ft.color}`}>
                      R {station.prices[ft.key].toFixed(2)}
                    </span>
                  </td>
                ))}
                <td className="px-1.5 md:px-3 py-2 md:py-3 text-center">
                  <div className="flex items-center justify-center gap-0.5 md:gap-1 text-[9px] md:text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    {station.lastUpdated}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <p className="text-center text-[11px] md:text-sm text-gray-500 dark:text-gray-400 mt-3">
        <TrendingDown className="w-3 h-3 md:w-4 md:h-4 inline mr-0.5" />
        Prices updated daily. Actual pump price may vary slightly.
      </p>
    </section>
  )
}

export default FuelPriceTracker