const chelsea = new Character();
const evil = new Enemy();

function loop(timestamp) {
  var progress = timestamp - lastRender;

  document.getElementById("game-view").innerHTML = chelsea.render();
  document.getElementById("game-view").innerHTML += evil.render();
  evil.attack(chelsea.pos.x);

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}
var lastRender = 0;
window.requestAnimationFrame(loop);
