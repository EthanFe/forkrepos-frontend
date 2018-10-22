const projectiles = [];
const chelsea = new Character(projectiles);

function loop(timestamp) {
	var progress = timestamp - lastRender;

	document.getElementById('game-view').innerHTML = chelsea.render();
	for (element of projectiles) {
		document.getElementById('game-view').innerHTML += element.render();
	}

	lastRender = timestamp;
	window.requestAnimationFrame(loop);
}
var lastRender = 0;
window.requestAnimationFrame(loop);
