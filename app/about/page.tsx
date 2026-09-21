import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Mail, Twitter, Github, Linkedin } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-ivory-50 dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-serif font-semibold text-warm-gray-900 dark:text-gray-100 mb-8">
              About the Author
            </h1>
            
            <div className="prose prose-lg prose-sage dark:prose-invert max-w-none">
              <div className="bg-ivory-100 dark:bg-gray-800 rounded-lg p-8 mb-8 border border-warm-gray-200 dark:border-gray-700">
                <div className="w-32 h-32 rounded-full bg-sage-200 dark:bg-sage-800/50 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-5xl">✍️</span>
                </div>
                <h2 className="text-2xl font-serif font-semibold text-warm-gray-900 dark:text-gray-100 text-center mb-4">
                  Your Name
                </h2>
                <p className="text-warm-gray-600 dark:text-gray-300 text-center">
                  Writer & Storyteller
                </p>
              </div>

              <div className="space-y-6 text-warm-gray-700 dark:text-gray-300">
                <p>
                  Welcome to my quiet corner of the internet. I believe in the power of stories to transport us, to help us understand ourselves and others, and to find meaning in the everyday.
                </p>
                
                <p>
                  My writing explores themes of connection, memory, and the subtle magic that exists in ordinary moments. Whether it's a quiet train journey through an unfamiliar night or the gentle rhythm of rain on a windowpane, I find inspiration in the world around us.
                </p>
                
                <p>
                  This space is designed to be a peaceful reading room—a place where you can settle in with a story, perhaps choose some ambient sounds, and let yourself get lost in the words for a while.
                </p>
                
                <h3 className="text-2xl font-serif font-semibold text-warm-gray-900 dark:text-gray-100 mt-8 mb-4">
                  Writing Interests
                </h3>
                
                <ul className="list-disc list-inside space-y-2">
                  <li>Literary fiction</li>
                  <li>Character-driven narratives</li>
                  <li>Atmospheric storytelling</li>
                  <li>Short stories and flash fiction</li>
                  <li>Explorations of memory and time</li>
                </ul>

                <h3 className="text-2xl font-serif font-semibold text-warm-gray-900 dark:text-gray-100 mt-8 mb-4">
                  Connect
                </h3>
                
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="mailto:hello@storyblog.com"
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-sage-100 text-sage-700 hover:bg-sage-200 dark:bg-sage-900 dark:text-sage-300 dark:hover:bg-sage-800 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </a>
                  <a 
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-sage-100 text-sage-700 hover:bg-sage-200 dark:bg-sage-900 dark:text-sage-300 dark:hover:bg-sage-800 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                    <span>Twitter</span>
                  </a>
                  <a 
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-sage-100 text-sage-700 hover:bg-sage-200 dark:bg-sage-900 dark:text-sage-300 dark:hover:bg-sage-800 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a 
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-sage-100 text-sage-700 hover:bg-sage-200 dark:bg-sage-900 dark:text-sage-300 dark:hover:bg-sage-800 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
