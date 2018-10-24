class GameObject {
  constructor({x=0, y=0, width=25, height=25, imageName}) {
    this.imageName = imageName
    this.width = width
    this.height = height
    this.pos = {x: x, y: y}
  }

  get centerPoint() {
    return {x: this.pos.x + this.width / 2, y: this.pos.y + this.height / 2}
  }

	checkCollision(targets) {
    if (this.onCollideWith) {
      for (const target of targets) {
        if (this.isColliding(target)) {
          this.onCollideWith(target)
        }
      }
    }
	}

	isColliding(target) {
		const xDistance = Math.abs(target.centerPoint.x - this.centerPoint.x)
    const yDistance = Math.abs(target.centerPoint.y - this.centerPoint.y)
    return (xDistance <= ((target.width + this.width) / 2) &&
            yDistance <= ((target.height + this.height) / 2))
  }

	// isColliding(target) {
	// 	const collisionPos = {x: this.pos.x + this.width / 2, y: this.pos.y + this.height / 2}
	// 	const targetCollisionPos = {x: target.pos.x + target.width / 2, y: target.pos.y + target.height / 2}
	// 	const xDistance = Math.abs(targetCollisionPos.x - collisionPos.x)
  //   const yDistance = Math.abs(targetCollisionPos.y - collisionPos.y)
  //   console.log(xDistance, (target.width + this.width) / 2)
  //   // console.log(xDistance <= (target.width + this.width) / 2,
  //               // yDistance <= (target.height + this.height) / 2)
	// 	return (xDistance <= (target.width + this.width) / 2 &&
	// 					yDistance <= (target.height + this.height) / 2)
	// }
}