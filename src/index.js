const projectiles = [];
const chelsea = new Character(projectiles);
const eggplant = new Enemy();

function loop(timestamp) {
	var progress = timestamp - lastRender;

	document.getElementById('game-view').innerHTML = chelsea.render();
	for (element of projectiles) {
		if (element.deleteable())
			projectiles.splice(projectiles.indexOf(element), 1);
		else document.getElementById('game-view').innerHTML += element.render();
	}
	document.getElementById('game-view').innerHTML += eggplant.render();
	eggplant.attack(chelsea.pos.x);

	lastRender = timestamp;
	window.requestAnimationFrame(loop);
}
var lastRender = 0;
window.requestAnimationFrame(loop);
