import { useContext } from 'react'
import { GlobalAudioContext } from './GlobalAudioContext'

export function useGlobalAudio() {
  const ctx = useContext(GlobalAudioContext)
  if (!ctx) {
    throw new Error('useGlobalAudio must be used within GlobalAudioProvider')
  }
  return ctx
}
