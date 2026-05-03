// src/components/sections/FuelPriceTracker.jsx
import { useState, useEffect } from 'react'
import SectionTitle from '../ui/SectionTitle'
import { fuelPrices } from '../../data/fuelPrices'
import { Fuel, TrendingDown, MapPin } from 'lucide-react'
import FuelCalculatorModal from '../ui/FuelCalculatorModal'

const FuelPriceSkeleton = () => (
  <div className="space-y-3">
    <div className="text-center">
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto mb-2 animate-pulse" />
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto animate-pulse" />
      <div className="h-0.5 bg-gray-200 dark:bg-gray-700 w-16 mx-auto mt-2 animate-pulse" />
    </div>
    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto animate-pulse" />
    {Array(2).fill(0).map((_, i) => (
      <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-3 animate-pulse">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="flex-1">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-1" />
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {Array(4).fill(0).map((_, j) => <div key={j} className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />)}
        </div>
      </div>
    ))}
  </div>
)

const FuelPriceTracker = () => {
  const [selectedStation, setSelectedStation] = useState(null)
  const [showCalculator, setShowCalculator] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => { const timer = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(timer) }, [])
  if (loading) return <FuelPriceSkeleton />

  const fuelTypes = [
    { key: 'petrol93', label: '93', color: 'text-orange-500 dark:text-orange-400' },
    { key: 'petrol95', label: '95', color: 'text-orange-600 dark:text-orange-500' },
    { key: 'diesel50', label: 'D50', color: 'text-green-600 dark:text-green-500' },
    { key: 'diesel500', label: 'D500', color: 'text-green-700 dark:text-green-600' }
  ]

  const handleStationClick = (station) => { setSelectedStation(station); setShowCalculator(true) }

  return (
    <div className="space-y-3">
      <SectionTitle subtitle="SAVE AT THE PUMP" title="Fuel Prices in Prieska" />
      <p className="text-center text-[10px] sm:text-sm text-gray-600 dark:text-gray-300">Click on any station to open the fuel calculator</p>
      <div className="grid grid-cols-1 gap-3">
        {fuelPrices.map(station => (
          <div key={station.id} onClick={() => handleStationClick(station)} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 sm:p-4 cursor-pointer hover:shadow-lg hover:border-prieska-terracotta dark:hover:border-prieska-terracotta hover:scale-[1.02] transition-all duration-200 group">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="p-1.5 sm:p-2 bg-prieska-terracotta/10 dark:bg-prieska-terracotta/20 rounded-lg group-hover:bg-prieska-terracotta/20 transition-colors"><Fuel className="w-4 h-4 sm:w-5 sm:h-5 text-prieska-terracotta" /></div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 dark:text-white text-[11px] sm:text-sm group-hover:text-prieska-terracotta transition-colors">{station.station}</h3>
                <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400"><MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" /><span>{station.location}</span></div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {fuelTypes.map(ft => (
                <div key={ft.key} className="text-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-1.5 sm:p-2 group-hover:bg-white dark:group-hover:bg-gray-700 transition-colors">
                  <p className="text-[8px] sm:text-[10px] text-gray-500 dark:text-gray-400 mb-0.5">{ft.label}</p>
                  <p className={`font-mono font-bold text-[10px] sm:text-sm ${ft.color}`}>R {station.prices[ft.key].toFixed(2)}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-500 mt-2">Updated: {station.lastUpdated}</p>
          </div>
        ))}
      </div>
      <p className="text-center text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400"><TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline mr-0.5" />Prices updated daily. Actual pump price may vary slightly.</p>
      <FuelCalculatorModal isOpen={showCalculator} onClose={() => setShowCalculator(false)} station={selectedStation} />
    </div>
  )
}

export default FuelPriceTracker