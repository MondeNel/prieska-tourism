// src/components/sections/FuelPriceTracker.jsx
import { useState } from 'react'
import SectionTitle from '../ui/SectionTitle'
import { fuelPrices } from '../../data/fuelPrices'
import { Fuel, TrendingDown, MapPin } from 'lucide-react'
import FuelCalculatorModal from '../ui/FuelCalculatorModal'

const FuelPriceTracker = () => {
  const [selectedStation, setSelectedStation] = useState(null)
  const [showCalculator, setShowCalculator] = useState(false)

  const fuelTypes = [
    { key: 'petrol93', label: 'Petrol 93', color: 'text-orange-500 dark:text-orange-400' },
    { key: 'petrol95', label: 'Petrol 95', color: 'text-orange-600 dark:text-orange-500' },
    { key: 'diesel50', label: 'Diesel 50ppm', color: 'text-green-600 dark:text-green-500' },
    { key: 'diesel500', label: 'Diesel 500ppm', color: 'text-green-700 dark:text-green-600' }
  ]

  const handleStationClick = (station) => {
    setSelectedStation(station)
    setShowCalculator(true)
  }

  return (
    <div className="space-y-4">
      <SectionTitle subtitle="SAVE AT THE PUMP" title="Fuel Prices in Prieska" />
      
      {/* Instructional Text */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-300">
        Click on any station below to open the fuel calculator
      </p>

      {/* Station Cards */}
      <div className="grid grid-cols-1 gap-4">
        {fuelPrices.map(station => (
          <div 
            key={station.id} 
            onClick={() => handleStationClick(station)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 cursor-pointer hover:shadow-lg hover:border-prieska-terracotta dark:hover:border-prieska-terracotta hover:scale-[1.02] transition-all duration-200 group"
          >
            {/* Station Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-prieska-terracotta/10 dark:bg-prieska-terracotta/20 rounded-lg group-hover:bg-prieska-terracotta/20 dark:group-hover:bg-prieska-terracotta/30 transition-colors">
                <Fuel className="w-5 h-5 text-prieska-terracotta" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 dark:text-white text-sm group-hover:text-prieska-terracotta transition-colors">
                  {station.station}
                </h3>
                <div className="flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400">
                  <MapPin className="w-3 h-3" />
                  <span>{station.location}</span>
                </div>
              </div>
            </div>

            {/* Price Grid */}
            <div className="grid grid-cols-4 gap-2">
              {fuelTypes.map(ft => (
                <div 
                  key={ft.key} 
                  className="text-center bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 group-hover:bg-white dark:group-hover:bg-gray-700 transition-colors"
                >
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-0.5">{ft.label}</p>
                  <p className={`font-mono font-bold text-sm ${ft.color}`}>
                    R {station.prices[ft.key].toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Updated Info */}
            <p className="text-center text-[10px] text-gray-400 dark:text-gray-500 mt-3">
              Updated: {station.lastUpdated}
            </p>
          </div>
        ))}
      </div>
      
      {/* Disclaimer */}
      <p className="text-center text-[11px] text-gray-500 dark:text-gray-400">
        <TrendingDown className="w-3 h-3 inline mr-1" />
        Prices updated daily. Actual pump price may vary slightly.
      </p>

      {/* Calculator Modal */}
      <FuelCalculatorModal 
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
        station={selectedStation}
      />
    </div>
  )
}

export default FuelPriceTracker