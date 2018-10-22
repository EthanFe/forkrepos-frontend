class Projectile {
	constructor(pos, direction) {
		this.pos = {x: pos.x, y: pos.y};
	}

	render() {
		this.move();
		const image_path = './images/cookie.png';
		console.log(this.pos);
		return `<img class="projectile" src="${image_path}" style="bottom: ${this
			.pos.y + 50}px; left: ${this.pos.x}px"></img>`;
	}

	move() {
		const moveSpeed = 25;
		let newX = this.pos.x + moveSpeed;
		if (newX > 800) this.remove();
		this.pos.x = newX;
	}
}