// src/data/fuelPrices.js

export const fuelPrices = [
  {
    id: 1,
    station: 'GWK Fuel Station',
    location: 'Main Road, Prieska',
    prices: {
      petrol93: 23.45,
      petrol95: 23.89,
      diesel50: 22.10,
      diesel500: 21.85
    },
    lastUpdated: '2025-04-15'
  },
  {
    id: 2,
    station: 'OVK Fuel Station',
    location: 'Main Road, Prieska',
    prices: {
      petrol93: 23.52,
      petrol95: 23.95,
      diesel50: 22.18,
      diesel500: 21.90
    },
    lastUpdated: '2025-04-16'
  }
]

export const getLowestPrice = (fuelType) => {
  return Math.min(...fuelPrices.map(s => s.prices[fuelType]))
}