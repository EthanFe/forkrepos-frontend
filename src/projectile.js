class Projectile extends GameObject {
	constructor(pos, direction, collisionTargets) {
		super({x: pos.x, y: pos.y, width: 80, height: 72, imageName: "cookie"})
		this.collisionTargets = collisionTargets
		this.collided = false
		this.damage = 10
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
		return this.collided || this.pos.x > 1200 // edge of screen
	}

	checkCollisions() {
		for (const target of this.collisionTargets) {
			if (this.isColliding(target)) {
				this.onCollideWith(target)
			}
		}
	}

	isColliding(target) {
		const collisionPos = {x: this.pos.x + this.width / 2, y: this.pos.y + this.height / 2}
		const targetCollisionPos = {x: target.pos.x + target.width / 2, y: target.pos.y + target.height / 2}
		const xDistance = Math.abs(targetCollisionPos.x - collisionPos.x)
		const yDistance = Math.abs(targetCollisionPos.y - collisionPos.y)
		return (xDistance <= (target.width + this.width) / 2 &&
						yDistance <= (target.height + this.height) / 2)
	}

	onCollideWith(target) {
		this.collided = true
		target.takeDamage(this.damage)
	}
}
