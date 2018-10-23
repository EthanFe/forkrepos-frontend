class Enemy extends GameObject {
	constructor() {
		const x = Math.random() * 1000
		const y = 125 + Math.random() * 150
		super({x: x, y: y, width: 200, height: 360, imageName: 'ep'});
		this.health = 40;
		this.damageFlashTime = 150; //milliseconds
	}

	render() {
		this.updateDamagedState();
		const imagePath = `./images/${this.imageName}.png`;
		return `<img class="enemy" src="${imagePath}" style="top: ${
			this.pos.y
		}px; left: ${this.pos.x}px"></img>`;
	}

	attack(x) {
		const moveSpeed = 5;
		if (this.pos.x < x) {
			this.pos.x = this.pos.x + moveSpeed;
		} else if (this.pos.x > x) {
			this.pos.x = this.pos.x - moveSpeed;
		}
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
			this.imageName = 'ep_hit';
		} else {
			this.imageName = 'ep';
		}
	}

	deleteable() {
		return this.health <= 0;
	}

	//   move() {
	//     const moveSpeed = 15;
	//         if (this.moving === "right") {
	//           this.pos = {x: this.pos.x + moveSpeed}
	//         }
	//         else if (this.moving === "left")
	//           this.pos = {x: this.pos.x - moveSpeed}
	//       }
	//   }
}
