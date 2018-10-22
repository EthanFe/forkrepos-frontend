class Character {
  keyPressed(event) {
    if (this.keyMap[event.keyCode] !== undefined)
      this.moving = this.keyMap[event.keyCode];

    if (event.keyCode === 32 && this.isOnGround()) {
      this.jump();
    }

    if (event.keyCode === 16) {
      this.fireProjectile();
    }
  }

  keyReleased(event) {
    const movementDirection = this.keyMap[event.keyCode];
    if (movementDirection === this.moving) this.moving = null;
  }

  constructor(projectilesList) {
    this.projectilesList = projectilesList;
    this.keyMap = {
      39: "right", //{x: 1, y: 0}, //'right',
      37: "left" //{x: -1, y: 0}, //'left',
      // 40: {x: 0, y: 1}, //'up',
      // 38: {x: 0, y: -1}, //'down'
    };

    this.pos = { x: 0, y: 100 };
    this.fallSpeed = 0;

    document.addEventListener("keydown", this.keyPressed.bind(this));
    document.addEventListener("keyup", this.keyReleased.bind(this));
  }

  render() {
    this.move();
    this.verticalMovement();
    const image_path = this.getImagePathForAction();
    return `<img class="character" src="${image_path}" style="bottom: ${
      this.pos.y
      }px; left: ${this.pos.x}px"></img>`;
  }

  getImagePathForAction() {
    if (this.moving !== "right" && this.moving !== "left" && this.isOnGround()) {
      return "./images/castle_assets/Gothic-hero-Files/GIFS/gothic-hero-idle.gif";
    } else if (!this.isOnGround()) {
      return "./images/castle_assets/Gothic-hero-Files/GIFS/gothic-hero-jump.gif";
    } else {
      return "./images/castle_assets/Gothic-hero-Files/GIFS/gothic-hero-run.gif";
    }
  }

  move() {
    const moveSpeed = 15;
    if (this.moving === "right") {
      let newX = this.pos.x + moveSpeed;
      if (newX > 1200) newX = 1200;
      this.pos.x = newX;
    } else if (this.moving === "left") {
      let newX = this.pos.x - moveSpeed;
      if (newX < 0) newX = 0;
      this.pos.x = newX;
    }
  }

  fireProjectile() {
    this.projectilesList.push(new Projectile(this.pos, null));
  }

  isOnGround() {
    return this.pos.y <= 60;
  }

  jump() {
    this.fallSpeed = -35;
  }

  verticalMovement() {
    this.pos.y = this.pos.y - this.fallSpeed;
    const fallAccel = 3;
    if (!this.isOnGround()) {
      this.fallSpeed += fallAccel;
    } else {
      this.pos.y = 60;
    }
  }
}
