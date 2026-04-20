import SectionTitle from '../ui/SectionTitle'
import { fuelPrices } from '../../data/fuelPrices'
import { Fuel, TrendingDown, Calendar } from 'lucide-react'

const FuelPriceTracker = () => {
  const fuelTypes = [
    { key: 'petrol93', label: 'Petrol 93', color: 'text-orange-500' },
    { key: 'petrol95', label: 'Petrol 95', color: 'text-orange-600' },
    { key: 'diesel50', label: 'Diesel 50ppm', color: 'text-green-600' },
    { key: 'diesel500', label: 'Diesel 500ppm', color: 'text-green-700' }
  ]

  return (
    <section id="fuel" className="py-16 px-4 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900/50">
      <SectionTitle subtitle="SAVE AT THE PUMP" title="Fuel Prices in Prieska" />
      
      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <thead className="bg-prieska-river text-white">
            <tr>
              <th className="px-6 py-4 text-left font-serif">Station</th>
              {fuelTypes.map(ft => (
                <th key={ft.key} className="px-4 py-4 text-center">{ft.label}</th>
              ))}
              <th className="px-4 py-4 text-center">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {fuelPrices.map(station => (
              <tr key={station.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Fuel size={18} className="text-prieska-terracotta" />
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">{station.station}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{station.location}</p>
                    </div>
                  </div>
                </td>
                {fuelTypes.map(ft => (
                  <td key={ft.key} className="px-4 py-4 text-center">
                    <span className={`font-mono font-bold ${ft.color}`}>
                      R {station.prices[ft.key].toFixed(2)}
                    </span>
                  </td>
                ))}
                <td className="px-4 py-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Calendar size={12} />
                    {station.lastUpdated}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
        <TrendingDown size={14} className="inline mr-1" />
        Prices updated daily. Actual pump price may vary slightly.
      </p>
    </section>
  )
}

export default FuelPriceTracker