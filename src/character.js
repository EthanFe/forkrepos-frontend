class Character {

  keyPressed(event) {
    const keyMap = {
      39: {x: 1, y: 0}, //'right',
      37: {x: -1, y: 0}, //'left',
      40: {x: 0, y: 1}, //'up',
      38: {x: 0, y: -1}, //'down'
    }

    const movementDirection = keyMap[event.keyCode]
    if (movementDirection !== undefined) {
      this.pos = {x: this.pos.x + movementDirection.x * 10, y: this.pos.y + movementDirection.y * 10}
    }
  }

  constructor() {
    this.pos = {x: 0, y: 0}

    document.addEventListener("keydown", this.keyPressed.bind(this))
  }

  render() {
    return `<img class="character" src="./images/cookie.png" style="top: ${this.pos.y}px; left: ${this.pos.x}px"></img>`
  }
}