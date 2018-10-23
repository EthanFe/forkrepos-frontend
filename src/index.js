fetch('http://localhost:3000/villains')
	.then(resp => resp.json())
	.then(data => {
		villains = data;
		startGame()
	});

const projectiles = [];
const enemies = [];

function startGame() {
	spawnNewEnemy()
	const chelsea = new Character(projectiles, enemies);

	var lastRender = 0;
	window.requestAnimationFrame(loop);

	function loop(timestamp) {
		const enemySpawnChance = 0.025;
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
				spawnNewEnemy();
			} else {
				document.getElementById('game-view').innerHTML += element.render();
				element.attack(chelsea.pos.x);
			}
		}

		lastRender = timestamp;
		window.requestAnimationFrame(loop);
	}

	function spawnNewEnemy() {
		const enemyType = villains[Math.floor(Math.random() * villains.length)];
		enemies.push(new Enemy(enemyType));
	}
}