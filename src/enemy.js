class Enemy extends GameObject {
	constructor(villainData) {
		const x = Math.random() > 0.5 ? -150 : 1200
		const y = 125 + Math.random() * 150;
		super({
			x: x,
			y: y,
			width: 200,
			height: 360,
			imageName: "i dont even care"
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
		return `<img class="enemy" src="${imagePath}" style="top: ${
			this.pos.y
			}px; left: ${this.pos.x}px"></img>`;
	}

	attack(target) {
		const moveSpeed = 6;
		if (this.pos.x < target.pos.x) {
			this.pos.x = this.pos.x + moveSpeed;
		} else if (this.pos.x > target.pos.x) {
			this.pos.x = this.pos.x - moveSpeed;
		}

		this.checkCollision(target);

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

	checkCollision(target) {
		if (this.isColliding(target)) {
			this.onCollideWith(target)
		}
	}

	isColliding(target) {
		const collisionPos = { x: this.pos.x + this.width / 2, y: this.pos.y + this.height / 2 }
		const targetCollisionPos = { x: target.pos.x + target.width / 2, y: target.pos.y + target.height / 2 }
		const xDistance = Math.abs(targetCollisionPos.x - collisionPos.x)
		const yDistance = Math.abs(targetCollisionPos.y - collisionPos.y)
		return (xDistance <= (target.width + this.width) / 2 &&
			yDistance <= this.pos.y - 60)
	}

	onCollideWith(target) {
		this.collided = true
		target.takeDamage(this.damage)
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
			console.log(this.imageName)
		} else {
			this.imageName = this.villainData.idle_image;
		}
	}

	deleteable() {
		return this.health <= 0;
	}

}
