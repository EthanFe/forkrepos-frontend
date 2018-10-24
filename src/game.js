class Game {
    constructor(data) {
        this.villains = data.villains
        this.projectiles = [];
        this.enemies = [];
        this.kills = 0

        this.spawnNewEnemy()
        this.chelsea = new Character(this.projectiles, this.enemies, data.heroes);

        this.playMusic()

        this.speedUpFactor = 1
        document.addEventListener("keydown", (event) => {
            if (event.keyCode == "189")
                this.speedUpFactor *= 0.5
            else if (event.keyCode == "187")
                this.speedUpFactor *= 2
        })

        // start rendering n stuff
        window.requestAnimationFrame(this.loop.bind(this));
    }

    playMusic() {
        document.addEventListener('keydown', () => {
            const thriller = document.getElementById('thriller');
            thriller.play();
        })
    }

    playFatality() {
        const fatality = document.getElementById('fatality');
        fatality.play();
    }

    loop() {
        if (this.speedUpFactor > 1) {
            for (let i = 0; i < this.speedUpFactor; i++) {
                this.renderComponents()
            }
            window.requestAnimationFrame(this.loop.bind(this));
        } else if (this.speedUpFactor < 1) {
            this.renderComponents()
            const delay = (1000 / 30) * ((1 / this.speedUpFactor) - 1)
            console.log("delaying for " + delay + " milliseconds")
            setTimeout(() => {
                window.requestAnimationFrame(this.loop.bind(this));
            }, delay);
        } else {
            this.renderComponents()
            window.requestAnimationFrame(this.loop.bind(this));
        }
    }

    renderComponents() {
        document.getElementById('game-view').innerHTML = this.chelsea.render();

        for (const projectile of this.projectiles) {
            if (projectile.deleteable())
                this.projectiles.splice(this.projectiles.indexOf(projectile), 1);
            else document.getElementById('game-view').innerHTML += projectile.render();
        }

        for (const enemy of this.enemies) {
            if (enemy.deleteable()) {
                this.enemies.splice(this.enemies.indexOf(enemy), 1);
                this.playFatality();
                this.incrementKills()
                this.spawnNewEnemy();
            } else {
                document.getElementById('game-view').innerHTML += enemy.render();
                enemy.attack(this.chelsea);
            }
        }

        if (this.chelsea.deleteable()) {
            document.getElementById('game-view').innerHTML = "<h1 style='margin-top: 0;, text-align: center;'> FATALITY!</h1>"
            document.getElementById('life-stats').innerHTML = "this will have leaderboards..."
        }
    }

    incrementKills() {
        let killCount = document.getElementById('kill-count')
        killCount.innerText = parseInt(++this.kills)
        if (this.kills % 5 === 0 && this.kills > 0) {
            let stars = document.getElementById('stars')
            stars.innerHTML += `<span>&#9733;</span>`
        }
    }

    spawnNewEnemy() {
        const enemyType = this.villains[Math.floor(Math.random() * this.villains.length)];
        this.enemies.push(new Enemy(enemyType));
    }
}