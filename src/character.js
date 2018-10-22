class Character {
	keyPressed(event) {
		this.moving = this.keyMap[event.keyCode];

		if (event.keyCode === 16) {
			this.fireProjectile();
		}
	}

	keyReleased(event) {
		const movementDirection = this.keyMap[event.keyCode];
		if (movementDirection === this.moving) this.moving = null;
	}

	constructor(projectilesList) {
		this.projectilesList = projectilesList;
		this.keyMap = {
			39: 'right', //{x: 1, y: 0}, //'right',
			37: 'left' //{x: -1, y: 0}, //'left',
			// 40: {x: 0, y: 1}, //'up',
			// 38: {x: 0, y: -1}, //'down'
		};

		this.pos = {x: 0, y: 0};

		document.addEventListener('keydown', this.keyPressed.bind(this));
		document.addEventListener('keyup', this.keyReleased.bind(this));
	}

	render() {
		this.move();
		this.fall();
		const image_path = './images/kirby.png';
		return `<img class="character" src="${image_path}" style="top: ${
			this.pos.y
		}px; left: ${this.pos.x}px"></img>`;
	}

	move() {
		const moveSpeed = 15;
		if (this.moving === 'right') {
			let newX = this.pos.x + moveSpeed;
			if (newX > 800) newX = 800;
			this.pos = {x: newX};
		} else if (this.moving === 'left') {
			let newY = this.pos.x - moveSpeed;
			if (newY < 0) newY = 0;
			this.pos = {x: newY};
		}
	}

	fall() {
		const fallAccel = 15;
		if (this.pos.y > 0) {
		}
	}

	fireProjectile() {
		this.projectilesList.push(new Projectile(this.pos, null));
	}
}
