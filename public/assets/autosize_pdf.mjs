document.addEventListener('DOMContentLoaded', () => {
  const object = document.querySelector('object')
  if (!object) return
  object.addEventListener('load', () => {
    autosize(object)
    document.getElementById('program-link').style.display = 'none'
  })
  object.addEventListener('error', () => {
    object.style.display = 'none'
  })
})

function autosize (object) {
  const { width, height } = (window.visualViewport || window.screen)
  object.width = Math.min(Math.trunc(width * 0.9), 1000)
  object.height = Math.min(Math.trunc(height * 0.75), 800)
}
