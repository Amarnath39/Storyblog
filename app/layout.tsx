import type { Metadata } from 'next'
import { Inter, Noto_Serif_Malayalam } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const notoSerifMalayalam = Noto_Serif_Malayalam({ 
  subsets: ['malayalam'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-malayalam'
})

export const metadata: Metadata = {
  title: 'Storyblog',
  description: 'A personal storytelling website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${notoSerifMalayalam.variable} font-sans`}>{children}</body>
    </html>
  )
}
