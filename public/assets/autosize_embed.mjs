document.addEventListener('DOMContentLoaded', (event) => {
  const { width, height } = (window.visualViewport || window.screen)
  const embed = document.querySelector('embed')
  if (embed.width > width) embed.width = Math.trunc(width * 0.9)
  if (embed.height > height) embed.height = Math.trunc(height * 0.75)
})
