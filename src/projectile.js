class Projectile {
	constructor(pos, direction) {
		this.pos = pos;
	}

	render() {
		this.move();
		const image_path = './images/cookie.png';
		return `<img class="character" src="${image_path}" style="top: ${
			this.pos.y
		}px; left: ${this.pos.x}px"></img>`;
	}

	move() {
		const moveSpeed = 15;
		let newX = this.pos.x + moveSpeed;
		if (newX > 800) newX = 800;
		this.pos = {x: newX};
	}
}
