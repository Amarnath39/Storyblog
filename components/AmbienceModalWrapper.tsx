'use client'

import { useState, useEffect } from 'react'
import AmbienceModal from './AmbienceModal'
import { AmbienceTrack } from '@/lib/audio'

interface AmbienceModalWrapperProps {
  storyAmbience: string | null
  onAmbienceSelect: (track: AmbienceTrack | null) => void
}

export default function AmbienceModalWrapper({ storyAmbience, onAmbienceSelect }: AmbienceModalWrapperProps) {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Show modal after a short delay when page loads
    const timer = setTimeout(() => {
      setShowModal(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!showModal) return null

  return (
    <AmbienceModal
      storyAmbience={storyAmbience}
      onAmbienceSelect={onAmbienceSelect}
      onClose={() => setShowModal(false)}
    />
  )
}
