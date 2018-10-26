class Enemy extends GameObject {
	constructor(villainData) {
		const x = Math.random() > 0.5 ? -150 : 1200
		const y = 125 + Math.random() * 150;
		super({
			x: x,
			y: y,
			width: villainData.width,
			height: villainData.height,
			imageName: villainData.idle_image
		});
		this.villainData = villainData
		this.health = 40;
		this.damage = 20;
		this.damageFlashTime = 150; //milliseconds
		this.collided = false;

		this.timeLastWiggled = 0;
		this.wiggleDirection = 'up';
		this.wiggleTime = 3000;
	}

	render() {
		this.updateDamagedState();
		const imagePath = `./images/${this.imageName}.png`;
		return `<img class="enemy" src="${imagePath}"
						style="bottom: ${this.pos.y}px; left: ${this.pos.x}px; width: ${this.width}; height: ${this.height}px;"></img>`;

	}

	attack(target) {
		const moveSpeed = 6;
		if (this.pos.x < target.pos.x) {
			this.pos.x = this.pos.x + moveSpeed;
		} else if (this.pos.x > target.pos.x) {
			this.pos.x = this.pos.x - moveSpeed;
		}

		this.wiggle()

		this.checkCollision([target]);
	}

	wiggle() {
		const wiggleSpeed = 1.2;
		if (new Date().getTime() - this.timeLastWiggled > this.wiggleTime) {
			this.wiggleDirection =
				this.wiggleDirection === 'up' ? 'down' : 'up';
			this.timeLastWiggled = new Date().getTime();
		}
		if (this.wiggleDirection === 'up') {
			this.pos.y += wiggleSpeed;
		} else if (this.wiggleDirection === 'down') {
			this.pos.y -= wiggleSpeed;
		}
	}

	onCollideWith(target) {
		this.collided = true
		target.takeDamage(this.damage, this.centerPoint)
	}

	takeDamage(amount) {
		this.health -= amount;
		this.timeDamaged = new Date().getTime();
	}

	updateDamagedState() {
		// dis is some lame-o hardcoding but hey w/e
		if (
			this.timeDamaged !== undefined &&
			new Date().getTime() - this.timeDamaged <= this.damageFlashTime
		) {
			this.imageName = this.villainData.hit_image;
		} else {
			this.imageName = this.villainData.idle_image;
		}
	}

	deleteable() {
		return this.health <= 0;
	}

	knockbackFrom(source) {
		const knockbackDistance = 50
		const knockbackDirection = source.x - this.centerPoint.x >= 0 ? "left" : "right"
		let newX
		if (knockbackDirection === "right")
			newX = this.pos.x + knockbackDistance
		else if (knockbackDirection === "left")
			newX = this.pos.x - knockbackDistance
		if (newX > 1200) newX = 1200;
		if (newX < 0) newX = 0;
		this.pos.x = newX;
	}
}
