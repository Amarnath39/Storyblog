'use client'

import { useState, useEffect } from 'react'
import { X, Music, Headphones, Play } from 'lucide-react'
import { AmbienceTrack, getAllTracks } from '@/lib/audio'

interface AmbienceModalProps {
  storyAmbience: string | null
  onAmbienceSelect: (track: AmbienceTrack | null) => void
  onClose: () => void
}

export default function AmbienceModal({ storyAmbience, onAmbienceSelect, onClose }: AmbienceModalProps) {
  const [selectedTrack, setSelectedTrack] = useState<AmbienceTrack | null>(null)
  const tracks = getAllTracks()

  useEffect(() => {
    if (storyAmbience) {
      const track = tracks.find(t => t.id === storyAmbience)
      setSelectedTrack(track || null)
    }
  }, [storyAmbience, tracks])

  const handleSelect = (track: AmbienceTrack | null) => {
    setSelectedTrack(track)
    onAmbienceSelect(track)
    onClose()
  }

  const handleSkip = () => {
    onAmbienceSelect(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-ivory-100 dark:bg-warm-gray-800 rounded-2xl shadow-2xl max-w-md w-full border border-warm-gray-200 dark:border-warm-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sage-600 to-sage-500 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Reading Ambience</h3>
                <p className="text-sm text-white/80">Enhance your reading experience</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-warm-gray-700 dark:text-warm-gray-300 mb-6 text-center">
            Would you like to add some ambient music while you read? It can help create a more immersive experience.
          </p>

          {/* Recommended Track */}
          {selectedTrack && (
            <div className="mb-6 p-4 rounded-xl bg-sage-50 dark:bg-sage-900/50 border-2 border-sage-300 dark:border-sage-700">
              <div className="flex items-center space-x-3 mb-2">
                <Headphones className="w-5 h-5 text-sage-600 dark:text-sage-400" />
                <span className="text-sm font-medium text-sage-700 dark:text-sage-300">Recommended for this story</span>
              </div>
              <button
                onClick={() => handleSelect(selectedTrack)}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-sage-100 dark:bg-sage-800 hover:bg-sage-200 dark:hover:bg-sage-700 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Play className="w-5 h-5 text-sage-600 dark:text-sage-400" />
                  <span className="font-medium text-warm-gray-900 dark:text-ivory-100">{selectedTrack.name}</span>
                </div>
                <span className="text-xs text-sage-600 dark:text-sage-400">Play</span>
              </button>
            </div>
          )}

          {/* All Tracks */}
          <div className="space-y-2 mb-6">
            <p className="text-xs font-medium text-warm-gray-500 dark:text-warm-gray-400 uppercase tracking-wide">
              All Ambience Options
            </p>
            {tracks.map((track) => (
              <button
                key={track.id}
                onClick={() => handleSelect(track)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                  selectedTrack?.id === track.id
                    ? 'bg-sage-100 dark:bg-sage-800 border-2 border-sage-400'
                    : 'bg-ivory-200 dark:bg-warm-gray-700 hover:bg-sage-100 dark:hover:bg-sage-900 border border-transparent'
                }`}
              >
                <span className="font-medium text-warm-gray-900 dark:text-ivory-100">{track.name}</span>
                <Play className="w-4 h-4 text-sage-600 dark:text-sage-400" />
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <button
              onClick={handleSkip}
              className="flex-1 px-4 py-3 rounded-lg border border-warm-gray-300 dark:border-warm-gray-600 text-warm-gray-700 dark:text-warm-gray-300 hover:bg-warm-gray-100 dark:hover:bg-warm-gray-700 transition-colors font-medium"
            >
              No Thanks
            </button>
            {selectedTrack && (
              <button
                onClick={() => handleSelect(selectedTrack)}
                className="flex-1 px-4 py-3 rounded-lg bg-sage-600 text-white hover:bg-sage-700 transition-colors font-medium"
              >
                Play {selectedTrack.name}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
