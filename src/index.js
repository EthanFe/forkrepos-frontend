
const chelsea = new Character()

function loop(timestamp) {
  var progress = timestamp - lastRender

  document.getElementById("game-view").innerHTML = chelsea.render()

  lastRender = timestamp
  window.requestAnimationFrame(loop)
}
var lastRender = 0
window.requestAnimationFrame(loop)