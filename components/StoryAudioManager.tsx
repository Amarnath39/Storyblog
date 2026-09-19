'use client'

import { useState, useEffect } from 'react'
import AudioPlayer from './AudioPlayer'
import { AmbienceTrack, getAllTracks } from '@/lib/audio'
import { Play, X, Music } from 'lucide-react'

interface StoryAudioManagerProps {
  storyAmbience: string | null
}

export default function StoryAudioManager({ storyAmbience }: StoryAudioManagerProps) {
  const [selectedTrack, setSelectedTrack] = useState<AmbienceTrack | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [showButtons, setShowButtons] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [playAudio, setPlayAudio] = useState(false)

  const casualMessage = "hey, wanna add some bg music while reading? 🎵"
  const tracks = getAllTracks()

  useEffect(() => {
    if (storyAmbience) {
      const track = tracks.find(t => t.id === storyAmbience)
      setSelectedTrack(track || null)
    }
  }, [storyAmbience, tracks])

  useEffect(() => {
    // Start typing animation after a short delay
    const timer = setTimeout(() => {
      setShowPrompt(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!showPrompt || dismissed) return

    let index = 0
    const typingInterval = setInterval(() => {
      if (index < casualMessage.length) {
        setTypedText(casualMessage.slice(0, index + 1))
        index++
      } else {
        clearInterval(typingInterval)
        setShowButtons(true)
      }
    }, 50)

    return () => clearInterval(typingInterval)
  }, [showPrompt, dismissed])

  const handlePlay = () => {
    setPlayAudio(true)
    setShowPrompt(false)
    setDismissed(true)
  }

  const handleSkip = () => {
    setShowPrompt(false)
    setDismissed(true)
  }

  const handleReopen = () => {
    setShowPrompt(true)
    setTypedText('')
    setShowButtons(false)
  }

  return (
    <>
      {/* Fixed bottom notification */}
      {showPrompt && !dismissed && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
          <div className="bg-ivory-100 dark:bg-warm-gray-800 rounded-2xl shadow-2xl border border-sage-300 dark:border-sage-600 p-5 max-w-md mx-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Music className="w-5 h-5 text-sage-600 dark:text-sage-400 animate-bounce" />
                  <p className="text-warm-gray-800 dark:text-ivory-200 text-lg font-medium">
                    {typedText}
                    <span className="animate-pulse">|</span>
                  </p>
                </div>
                {showButtons && (
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={handlePlay}
                      className="flex items-center gap-2 px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors font-medium"
                    >
                      <Play className="w-4 h-4" />
                      <span>Play {selectedTrack?.name || 'Music'}</span>
                    </button>
                    <button
                      onClick={handleSkip}
                      className="px-4 py-2 text-warm-gray-600 dark:text-warm-gray-400 hover:text-warm-gray-800 dark:hover:text-warm-gray-200 transition-colors font-medium"
                    >
                      Nah, I'm good
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={handleSkip}
                className="p-1 text-warm-gray-400 hover:text-warm-gray-600 dark:hover:text-warm-gray-200 transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating music button to reopen prompt */}
      {dismissed && !playAudio && (
        <button
          onClick={handleReopen}
          className="fixed bottom-6 right-6 z-40 p-3 bg-sage-600 text-white rounded-full shadow-lg hover:bg-sage-700 transition-all hover:scale-110 animate-pulse"
          title="Add background music"
        >
          <Music className="w-6 h-6" />
        </button>
      )}

      {playAudio && selectedTrack && <AudioPlayer track={selectedTrack} autoPlay={true} />}
    </>
  )
}
