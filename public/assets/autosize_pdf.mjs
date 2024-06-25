document.addEventListener('DOMContentLoaded', (event) => {
  const { width, height } = (window.visualViewport || window.screen)
  const object = document.querySelector('object')
  if (object.width > width) object.width = Math.trunc(width * 0.9)
  if (object.height > height) object.height = Math.trunc(height * 0.75)
})
