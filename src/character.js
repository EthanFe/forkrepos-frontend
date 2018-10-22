class Character {

  keyPressed(event) {
    this.moving = this.keyMap[event.keyCode]

    if (event.keyCode === 32 && this.isOnGround) {
      this.jump()
    }
  }

  keyReleased(event) {
    const movementDirection = this.keyMap[event.keyCode]
    if (movementDirection === this.moving)
      this.moving = null
  }

  constructor() {
    this.keyMap = {
      39: "right",//{x: 1, y: 0}, //'right',
      37: "left",//{x: -1, y: 0}, //'left',
      // 40: {x: 0, y: 1}, //'up',
      // 38: {x: 0, y: -1}, //'down'
    }

    this.pos = {x: 0, y: 0}
    this.fallSpeed = 0

    document.addEventListener("keydown", this.keyPressed.bind(this))
    document.addEventListener("keyup", this.keyReleased.bind(this))
  }

  render() {
    this.move()
    this.verticalMovement()
    const image_path = "./images/kirby.png"
    return `<img class="character" src="${image_path}" style="bottom: ${this.pos.y}px; left: ${this.pos.x}px"></img>`
  }

  move() {
    const moveSpeed = 15
    if (this.moving === "right") {
      let newX = this.pos.x + moveSpeed
      if (newX > 800)
        newX = 800
      this.pos.x = newX
    } else if (this.moving === "left") {
      let newX = this.pos.x - moveSpeed
      if (newX < 0)
        newX = 0
      this.pos.x = newX
    }
  }

  isOnGround() {
    return this.pos.y <= 0
  }

  jump() {
    this.fallSpeed = -30
  }

  verticalMovement() {
    console.log(this.fallSpeed)
    this.pos.y = this.pos.y - this.fallSpeed
    const fallAccel = 3;
    if (!this.isOnGround()) {
      this.fallSpeed += fallAccel
    } else {
      this.pos.y = 0
    }
  }
}