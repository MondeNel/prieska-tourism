// src/components/layout/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2026 Prieska Connect. Created by{' '}
            <a 
              href="https://mondenel.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-prieska-terracotta hover:underline font-medium"
            >
              Monde Nel
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer