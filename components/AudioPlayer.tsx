'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, X, Minimize2, Maximize2 } from 'lucide-react'
import { AmbienceTrack } from '@/lib/audio'

interface AudioPlayerProps {
  track: AmbienceTrack | null
  autoPlay?: boolean
}

export default function AudioPlayer({ track, autoPlay = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isExpanded, setIsExpanded] = useState(true)
  const [isReady, setIsReady] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const savedVolume = localStorage.getItem('audioVolume')
    if (savedVolume) {
      setVolume(parseFloat(savedVolume))
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
      localStorage.setItem('audioVolume', volume.toString())
    }
  }, [volume, isMuted])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && isReady) {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch(console.error)
        }
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, isReady])

  useEffect(() => {
    if (audioRef.current) {
      // Pause any ongoing playback before loading new track
      audioRef.current.pause()
      audioRef.current.load()
      setIsReady(false)
      setIsPlaying(false)

      // Auto-play if requested and track exists
      if (autoPlay && track) {
        // Wait for audio to be ready before playing
        const handleCanPlay = () => {
          setIsReady(true)
          setIsPlaying(true)
        }

        audioRef.current.addEventListener('canplay', handleCanPlay)
        audioRef.current.addEventListener('canplaythrough', handleCanPlay)

        return () => {
          audioRef.current?.removeEventListener('canplay', handleCanPlay)
          audioRef.current?.removeEventListener('canplaythrough', handleCanPlay)
        }
      }
    }
  }, [track, autoPlay])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (newVolume > 0) {
      setIsMuted(false)
    }
  }

  const handleClose = () => {
    setIsPlaying(false)
  }

  if (!track) {
    return null
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 bg-ivory-100 dark:bg-warm-gray-800 rounded-lg shadow-lg border border-warm-gray-200 dark:border-warm-gray-700 transition-all ${isExpanded ? 'w-80' : 'w-auto'}`}>
      <audio
        ref={audioRef}
        src={track.src}
        loop
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg">🎧</span>
            {isExpanded && (
              <div>
                <p className="text-xs text-warm-gray-500 dark:text-warm-gray-400">Reading Ambience</p>
                <p className="text-sm font-medium text-warm-gray-900 dark:text-ivory-100">{track.name}</p>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded hover:bg-warm-gray-200 dark:hover:bg-warm-gray-700 transition-colors"
              aria-label={isExpanded ? 'Minimize' : 'Expand'}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4 text-warm-gray-600 dark:text-warm-gray-300" /> : <Maximize2 className="w-4 h-4 text-warm-gray-600 dark:text-warm-gray-300" />}
            </button>
            <button
              onClick={handleClose}
              className="p-1 rounded hover:bg-warm-gray-200 dark:hover:bg-warm-gray-700 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-warm-gray-600 dark:text-warm-gray-300" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={togglePlay}
            className="p-2 rounded-full bg-sage-100 hover:bg-sage-200 dark:bg-sage-900 dark:hover:bg-sage-800 transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-5 h-5 text-sage-700 dark:text-sage-300" /> : <Play className="w-5 h-5 text-sage-700 dark:text-sage-300" />}
          </button>

          {isExpanded && (
            <>
              <button
                onClick={toggleMute}
                className="p-1 rounded hover:bg-warm-gray-200 dark:hover:bg-warm-gray-700 transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-warm-gray-600 dark:text-warm-gray-300" /> : <Volume2 className="w-5 h-5 text-warm-gray-600 dark:text-warm-gray-300" />}
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="flex-1 h-1 bg-warm-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-warm-gray-700 accent-sage-600"
                aria-label="Volume"
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
