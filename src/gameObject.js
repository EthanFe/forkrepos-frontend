class GameObject {
  constructor({x=0, y=0, width=25, height=25, imageName}) {
    this.imageName = imageName
    this.width = width
    this.height = height
    this.pos = {x: x, y: y}
  }
}