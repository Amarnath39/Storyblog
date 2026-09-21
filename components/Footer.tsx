import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-warm-gray-200 bg-ivory-50 dark:border-gray-700 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-warm-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Storyblog. All rights reserved.
            </p>
          </div>
          <nav className="flex items-center space-x-6">
            <Link 
              href="/about" 
              className="text-sm text-warm-gray-600 hover:text-warm-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
            >
              About
            </Link>
            <Link 
              href="/stories" 
              className="text-sm text-warm-gray-600 hover:text-warm-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
            >
              Stories
            </Link>
            <a 
              href="mailto:hello@storyblog.com" 
              className="text-sm text-warm-gray-600 hover:text-warm-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
