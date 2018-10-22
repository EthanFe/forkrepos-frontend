class Enemy {
	constructor() {
		this.pos = {x: 1000, y: 200};
	}

	render() {
		const image_path = './images/ep.png';
		return `<img class="enemy" src="${image_path}" style="top: ${
			this.pos.y
		}px; left: ${this.pos.x}px"></img>`;
	}

	attack(x) {
		const moveSpeed = 3;
		if (this.pos.x < x) {
			this.pos.x = this.pos.x + moveSpeed;
		} else if (this.pos.x > x) {
			this.pos.x = this.pos.x - moveSpeed;
		}
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
