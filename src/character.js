class Character extends GameObject {
	constructor(projectilesList, enemiesList) {
		super({x: 0, y: 0, width: 100, height: 100, imageName: 'kirby'});
		this.projectilesList = projectilesList;
		this.enemiesList = enemiesList;
		this.keyMap = {
			39: 'right', //{x: 1, y: 0}, //'right',
			37: 'left' //{x: -1, y: 0}, //'left',
			// 40: {x: 0, y: 1}, //'up',
			// 38: {x: 0, y: -1}, //'down'
		};
		this.fallSpeed = 0;

		document.addEventListener('keydown', this.keyPressed.bind(this));
		document.addEventListener('keyup', this.keyReleased.bind(this));
	}

	keyPressed(event) {
		if (this.keyMap[event.keyCode] !== undefined)
			this.moving = this.keyMap[event.keyCode];
		if (event.keyCode === 38 && this.isOnGround) {
			this.jump();
		}

		if (event.keyCode === 90) {
			this.fireProjectile('left');
		} else if (event.keyCode === 88) {
			this.fireProjectile('right');
		}
	}

	keyReleased(event) {
		const movementDirection = this.keyMap[event.keyCode];
		if (movementDirection === this.moving) this.moving = null;
	}

	render() {
		this.move();
		this.verticalMovement();
		const image_path = `./images/${this.imageName}.png`;
		return `<img class="character" src="${image_path}" style="bottom: ${
			this.pos.y
		}px; left: ${this.pos.x}px"></img>`;
	}

	move() {
		const moveSpeed = 15;
		if (this.moving === 'right') {
			let newX = this.pos.x + moveSpeed;
			if (newX > 1200) newX = 1200;
			this.pos.x = newX;
		} else if (this.moving === 'left') {
			let newX = this.pos.x - moveSpeed;
			if (newX < 0) newX = 0;
			this.pos.x = newX;
		}
	}

	fireProjectile(direction) {
		this.projectilesList.push(
			new Projectile(this.pos, direction, this.enemiesList)
		);
	}

	isOnGround() {
		return this.pos.y <= 0;
	}

	jump() {
		this.fallSpeed = -30;
	}

	verticalMovement() {
		this.pos.y = this.pos.y - this.fallSpeed;
		const fallAccel = 3;
		if (!this.isOnGround()) {
			this.fallSpeed += fallAccel;
		} else {
			this.pos.y = 0;
		}
	}
}
