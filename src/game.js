class Game {
    constructor(data) {
        this.villains = data.villains
        this.projectiles = [];
        this.enemies = [];
        this.score = {
            cookiesFired: 0,
            cookiesHit: 0,
            kills: 0
        }
        this.game_ended = false

        this.spawnNewEnemy()
        this.chelsea = new Character(this.projectiles, this.enemies, data.heroes, this.score);

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
        if (this.game_ended)
            return

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
            if (projectile.deleteable()) {
                this.projectiles.splice(this.projectiles.indexOf(projectile), 1);
                this.score.cookiesHit++
            }
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
            this.endGame()
        }
    }

    incrementKills() {
        let killCount = document.getElementById('kill-count')
        killCount.innerText = parseInt(++this.score.kills)
        if (this.score.kills % 5 === 0 && this.score.kills > 0) {
            let stars = document.getElementById('stars')
            stars.innerHTML += `<span>&#9733;</span>`
        }
    }

    spawnNewEnemy() {
        const enemyType = this.villains[Math.floor(Math.random() * this.villains.length)];
        this.enemies.push(new Enemy(enemyType));
    }

    endGame() {
        this.game_ended = true
        document.getElementById('life-stats').innerHTML = "<h1 style='margin-top: 0;, text-align: center;'> FATALITY!</h1>"
        let player = prompt("What's yo name?", "Tyranny");
        document.getElementById('game-view').innerHTML = `<p id='leaderboards'><strong>${player} Wins!</strong></p>`

        this.submitScores()
    }

    submitScores() {
        fetch("http://localhost:3000/submit_score", {
            method: 'POST',
            body: JSON.stringify({ username: "test", score: this.score }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => console.log("korean bbq"))
    }
}