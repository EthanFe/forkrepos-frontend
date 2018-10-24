class Character extends GameObject {
	constructor(projectilesList, enemiesList, heroesData) {
		super({ x: 500, y: 0, width: 240, height: 100, imageName: 'blue' });
		this.projectilesList = projectilesList;
		this.enemiesList = enemiesList;
		this.heroesData = heroesData
		this.setCurrentHero(0)

		this.knockbackState = {
			active: false,
			timeStarted: null,
			direction: null,
			speed: null,
			duration: null
		}

		this.keyMap = {
			39: 'right', //{x: 1, y: 0}, //'right',
			37: 'left' //{x: -1, y: 0}, //'left',
			// 40: {x: 0, y: 1}, //'up',
			// 38: {x: 0, y: -1}, //'down'
		};
		this.fallSpeed = 0;
		this.health = 100;
		this.damageFlashTime = 1000

		document.addEventListener('keydown', this.keyPressed.bind(this));
		document.addEventListener('keyup', this.keyReleased.bind(this));
	}

	playShotEffect() {
		const shot = document.getElementById('shot');
		shot.play();
	}

	playHurtEffect() {
		const hurt = document.getElementById('hurt');
		hurt.play();
	}

	keyPressed(event) {
		if (this.keyMap[event.keyCode] !== undefined && !this.knockbackState.active)
			this.moving = this.keyMap[event.keyCode];
		if (event.keyCode === 38 && this.isOnGround && !this.knockbackState.active) {
			this.jump();
		}

		if (event.keyCode === 90) {
			this.fireProjectile('left');
			this.playShotEffect();
		} else if (event.keyCode === 88) {
			this.fireProjectile('right');
			this.playShotEffect()
		}

		if (event.keyCode === 72) {
			this.cycleHero()
		}
	}

	keyReleased(event) {
		const movementDirection = this.keyMap[event.keyCode];
		if (movementDirection === this.moving) this.moving = null;
	}

	render() {
		this.updateKnockbackStatus()
		this.move();
		this.verticalMovement();
		this.updateDamagedState();
		const image_path = `./images/${this.imageName}.png`;
		return `<img class="character" src="${image_path}" style="bottom: ${this.pos.y}px; left: ${this.pos.x}px"></img>`;
	}

	updateKnockbackStatus() {
		if (this.knockbackState.active && new Date().getTime() - this.knockbackState.timeStarted > this.knockbackState.duration) {
			this.knockbackState.active = false
		}
	}

	move() {
		const moveSpeed = 15;
		let newX = this.pos.x;
		if (this.moving === 'right') {
			newX += moveSpeed;
		} else if (this.moving === 'left') {
			newX -= moveSpeed;
		} else if (this.knockbackState.active) {
			if (this.knockbackState.direction === "right")
				newX = this.pos.x + this.knockbackState.speed
			else if (this.knockbackState.direction === "left")
				newX = this.pos.x - this.knockbackState.speed
		}
		if (newX > 1200) newX = 1200;
		if (newX < 0) newX = 0;
		this.pos.x = newX;
	}

	fireProjectile(direction) {
		this.projectilesList.push(
			new Projectile(this.pos, direction, this.enemiesList)
		);
	}

	isOnGround() {
		return this.pos.y <= 0;
	}

	jump() {
		this.fallSpeed = -30;
	}

	verticalMovement() {
		this.pos.y = this.pos.y - this.fallSpeed;
		const fallAccel = 3;
		if (!this.isOnGround()) {
			this.fallSpeed += fallAccel;
		} else {
			this.pos.y = 0;
		}
	}

	setCurrentHero(index) {
		this.currentHeroIndex = index
		this.idleImage = this.heroesData[index].idle_image
		this.hitImage = this.heroesData[index].hit_image
		this.width = this.heroesData[index].width
		this.height = this.heroesData[index].height
	}

	cycleHero() {
		const newIndex = this.currentHeroIndex < this.heroesData.length - 1 ? this.currentHeroIndex + 1 : 0
		this.setCurrentHero(newIndex)
	}

	takeDamage(amount, damageSource) {
		if (!this.wasRecentlyDamaged()) {
			this.playHurtEffect();
			this.health -= amount;
			this.timeDamaged = new Date().getTime();
			let hearts = document.getElementById('hearts')
			if (hearts) {
				let remaining = hearts.innerText.slice(2)
				hearts.innerHTML = remaining;
			}
		}

		this.knockBackFrom(damageSource)
	}

	knockBackFrom(source) {
		const knockbackDirection = source.x - this.centerPoint.x >= 0 ? "left" : "right"
		this.knockbackState = {
			active: true,
			timeStarted: new Date().getTime(),
			direction: knockbackDirection,
			speed: 15,
			duration: 600
		}
		this.moving = null
		this.fallSpeed = -30;
	}

	updateDamagedState() {
		// dis is some lame-o hardcoding but hey w/e
		if (this.wasRecentlyDamaged()) {
			this.imageName = this.hitImage
		} else {
			this.imageName = this.idleImage
		}
	}

	wasRecentlyDamaged() {
		return this.timeDamaged !== undefined && new Date().getTime() - this.timeDamaged <= this.damageFlashTime
	}

	deleteable() {
		return this.health <= 0;
	}
}
