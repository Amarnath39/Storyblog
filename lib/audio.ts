export interface AmbienceTrack {
  id: string
  name: string
  src: string
}

export const ambienceTracks: AmbienceTrack[] = [
  {
    id: "geotia",
    name: "Geotia",
    src: "/audio/geotia.mp3"
  },
]

export function getTrackById(id: string): AmbienceTrack | undefined {
  return ambienceTracks.find((track) => track.id === id)
}

export function getAllTracks(): AmbienceTrack[] {
  return ambienceTracks
}
