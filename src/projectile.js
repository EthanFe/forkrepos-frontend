class Projectile extends GameObject {
	constructor(pos, direction, collisionTargets) {
		super({x: pos.x, y: pos.y, width: 50, height: 50, imageName: "cookie"})
		this.collisionTargets = collisionTargets
		this.collided = false
	}

	render() {
		this.move();
		const image_path = `./images/${this.imageName}.png`;
		return `<img class="projectile" src="${image_path}" style="bottom: ${this.pos.y + 50}px; left: ${this.pos.x}px"></img>`;
	}

	move() {
		const moveSpeed = 25;
		let newX = this.pos.x + moveSpeed;
		this.pos.x = newX;

		this.checkCollisions()
	}

	deleteable() {
		return this.collided || this.pos.x > 1200
	}

	checkCollisions() {
		for (const target of this.collisionTargets) {
			if (this.isColliding(target)) {
				this.onCollideWith(target)
			}
		}
	}

	isColliding(target) {
		const xDistance = Math.abs(target.pos.x - this.pos.x)
		const yDistance = Math.abs(target.pos.y - this.pos.y)
		return (xDistance <= (target.width + this.width) / 2 &&
						yDistance <= (target.height + this.height) / 2)
	}

	onCollideWith(target) {
		console.log("punched eggplant in the face")
		this.collided = true
	}
}
