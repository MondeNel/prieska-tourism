// src/components/ui/FuelCalculatorModal.jsx
import { useState } from 'react'
import { X, Fuel, Calculator } from 'lucide-react'

const FuelCalculatorModal = ({ isOpen, onClose, station }) => {
  const [amount, setAmount] = useState('100')
  const [selectedFuel, setSelectedFuel] = useState('petrol95')

  if (!isOpen || !station) return null

  const fuelOptions = [
    { key: 'petrol93', label: 'Petrol 93', price: station.prices.petrol93 },
    { key: 'petrol95', label: 'Petrol 95', price: station.prices.petrol95 },
    { key: 'diesel50', label: 'Diesel 50ppm', price: station.prices.diesel50 },
    { key: 'diesel500', label: 'Diesel 500ppm', price: station.prices.diesel500 },
  ]

  const currentPrice = fuelOptions.find(f => f.key === selectedFuel)?.price || 0
  const litres = amount && currentPrice ? (parseFloat(amount) / currentPrice).toFixed(2) : '0.00'

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full">
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg md:text-xl font-serif font-bold text-gray-800 dark:text-white">
              Fuel Calculator
            </h3>
            <button 
              onClick={onClose} 
              className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Station Info */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Fuel className="w-5 h-5 text-prieska-terracotta" />
              <span className="font-semibold text-gray-800 dark:text-white">{station.station}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{station.location}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Prices updated: {station.lastUpdated}
            </p>
          </div>

          {/* Fuel Type Selection */}
          <div className="mb-4">
            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Fuel Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {fuelOptions.map(fuel => (
                <button
                  key={fuel.key}
                  onClick={() => setSelectedFuel(fuel.key)}
                  className={`p-3 rounded-lg border text-sm transition ${
                    selectedFuel === fuel.key
                      ? 'border-prieska-terracotta bg-prieska-terracotta/10 dark:bg-prieska-terracotta/20 text-prieska-terracotta font-medium'
                      : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-prieska-terracotta'
                  }`}
                >
                  <div>{fuel.label}</div>
                  <div className="text-lg font-bold mt-1">R {fuel.price.toFixed(2)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount in Rands (ZAR)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">R</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                step="10"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg pl-8 pr-4 py-3 text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-prieska-terracotta focus:border-transparent"
                placeholder="100"
              />
            </div>
          </div>

          {/* Result */}
          <div className="bg-gradient-to-r from-prieska-terracotta/10 to-prieska-river/10 dark:from-prieska-terracotta/20 dark:to-prieska-river/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-5 h-5 text-prieska-terracotta" />
              <span className="font-medium text-gray-800 dark:text-white">Estimated Result</span>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-prieska-terracotta">{litres} L</div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                R {amount} worth of {fuelOptions.find(f => f.key === selectedFuel)?.label}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Based on price: R {currentPrice.toFixed(2)} per litre
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FuelCalculatorModal