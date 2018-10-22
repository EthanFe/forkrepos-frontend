class Character {

  keyPressed(event) {
    const keyMap = {
      39: "right",//{x: 1, y: 0}, //'right',
      37: "left",//{x: -1, y: 0}, //'left',
      // 40: {x: 0, y: 1}, //'up',
      // 38: {x: 0, y: -1}, //'down'
    }

    this.moving = keyMap[event.keyCode]
  }

  constructor() {
    this.pos = {x: 0, y: 0}

    document.addEventListener("keydown", this.keyPressed.bind(this))
  }

  render() {
    this.move()
    const image_path = "./images/kirby.png"
    return `<img class="character" src="${image_path}" style="top: ${this.pos.y}px; left: ${this.pos.x}px"></img>`
  }

  move() {
    const moveSpeed = 15
    if (this.moving === "right") {
      this.pos = {x: this.pos.x + moveSpeed}
    }
    else if (this.moving === "left")
      this.pos = {x: this.pos.x - moveSpeed}
  }
}