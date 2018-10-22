class Enemy {
  constructor() {
    this.pos = { x: 0, y: 0 };
  }

  render() {
    const image_path = "./images/cookie.png";
    return `<img class="enemy" src="${image_path}" style="top: ${
      this.pos.y
    }px; left: ${this.pos.x}px"></img>`;
  }

  attack(x) {
    const moveSpeed = 5;
    if (this.pos.x < x + 400) {
      this.pos = { x: this.pos.x + moveSpeed };
    } else if (this.pos.x > x + 1000) {
      this.pos = { x: this.pos.x - moveSpeed };
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
