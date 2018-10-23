class Enemy extends GameObject {
	constructor() {
		const x = Math.random() * 1000
		const y = 125 + Math.random() * 150
		super({x: x, y: y, width: 200, height: 360, imageName: 'ep'});
		this.health = 40;
		this.damageFlashTime = 150; //milliseconds

		this.timeLastWiggled = 0
		this.wiggleDirection = "up"
		this.wiggleTime = 3000
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

		const wiggleSpeed = 1
		if (new Date().getTime() - this.timeLastWiggled > this.wiggleTime) {
			this.wiggleDirection = this.wiggleDirection === "up" ? "down" : "up"
			this.timeLastWiggled = new Date().getTime()
		}
		if (this.wiggleDirection === "up") {
			this.pos.y += wiggleSpeed
		} else if (this.wiggleDirection === "down") {
			this.pos.y -= wiggleSpeed
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
