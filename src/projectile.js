class Projectile {
	constructor(pos, direction) {
		this.pos = pos;
	}

	render() {
		this.move();
		const image_path = './images/cookie.png';
		return `<img class="projectile" src="${image_path}" style="bottom: 500px; left: ${
			this.pos.x
		}px"></img>`;
	}

	move() {
		const moveSpeed = 25;
		let newX = this.pos.x + moveSpeed;
		if (newX > 800) newX = 800;
		this.pos = {x: newX};
	}
}
