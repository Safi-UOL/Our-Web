export function pauseOtherAudioPlayers(currentAudio: HTMLAudioElement) {
  const allAudio = document.querySelectorAll('audio')

  allAudio.forEach((node) => {
    if (!(node instanceof HTMLAudioElement)) return
    if (node === currentAudio) return
    if (!node.paused) node.pause()
  })
}
