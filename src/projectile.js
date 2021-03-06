class Projectile extends GameObject {
  constructor(pos, direction, collisionTargets) {
    // super({ x: pos.x, y: pos.y, width: 80, height: 72, imageName: "cookie" })
    super({ x: pos.x, y: pos.y, width: 62, height: 90, imageName: "pina" });
    this.direction = direction;
    this.collisionTargets = collisionTargets;
    this.collided = false;
    this.damage = 15;
  }

  render() {
    this.move();
    const image_path = `./images/${this.imageName}.png`;
    return `<img class="projectile" src="${image_path}" style="bottom: ${this
      .pos.y + 100}px; left: ${this.pos.x}px"></img>`;
  }

  move() {
    const moveSpeed = 25;

    if (this.direction === "right") this.pos.x += moveSpeed;
    else this.pos.x -= moveSpeed;

    this.checkCollision(this.collisionTargets);
  }

  deleteable() {
    return this.collided || this.pos.x > 1200 || this.pos.x < 0; // edge of screen
  }

  onCollideWith(target) {
    this.collided = true;
    target.takeDamage(this.damage);
    target.knockbackFrom(this.centerPoint);
  }
}
