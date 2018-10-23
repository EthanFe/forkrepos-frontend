const projectiles = [];
const enemies = [];
enemies.push(new Enemy());
const chelsea = new Character(projectiles, enemies);

document.addEventListener('keydown', () => {
	const thriller = document.getElementById('thriller');
	thriller.play();
})

function loop(timestamp) {
	var progress = timestamp - lastRender;

	const enemySpawnChance = 0.025
	if (Math.random() <= enemySpawnChance) {
		// enemies.push(new Enemy());
	}

	document.getElementById('game-view').innerHTML = chelsea.render();

	for (element of projectiles) {
		if (element.deleteable())
			projectiles.splice(projectiles.indexOf(element), 1);
		else document.getElementById('game-view').innerHTML += element.render();
	}

	for (element of enemies) {
		if (element.deleteable()) {
			enemies.splice(enemies.indexOf(element), 1);
			enemies.push(new Enemy());
			// enemies.push(new Enemy());
		} else {
			document.getElementById('game-view').innerHTML += element.render();
			element.attack(chelsea.pos.x);
		}
	}

	lastRender = timestamp;
	window.requestAnimationFrame(loop);
}
var lastRender = 0;
window.requestAnimationFrame(loop);
