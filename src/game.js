class Game {
    constructor(villains) {
        this.villains = villains
        this.projectiles = [];
        this.enemies = [];

        this.spawnNewEnemy()
        this.chelsea = new Character(this.projectiles, this.enemies);

        this.playMusic()

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

    loop(timestamp) {
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
                this.spawnNewEnemy();
            } else {
                document.getElementById('game-view').innerHTML += enemy.render();
                enemy.attack(this.chelsea.pos.x);
            }
        }

        window.requestAnimationFrame(this.loop.bind(this));
    }

    spawnNewEnemy() {
        const enemyType = this.villains[Math.floor(Math.random() * this.villains.length)];
        this.enemies.push(new Enemy(enemyType));
        let killCount = document.getElementById('kill-count')
        let count = parseInt(killCount.innerText)
        killCount.innerText = parseInt(count + 1)
        if (count % 5 === 0 && count > 1) {
            let stars = document.getElementById('stars')
            stars.innerHTML += `<span>&#9733;</span>`
        }
    }
}