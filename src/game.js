class Game {
  constructor(data) {
    this.villains = data.villains;
    this.projectiles = [];
    this.enemies = [];
    this.score = {
      cookiesFired: 0,
      cookiesHit: 0,
      kills: 0
    };
    this.gameStartTime = new Date().getTime();
    this.game_ended = false;

    this.timeLastEnemySpawned = this.gameStartTime;
    this.timeBetweenEnemySpawns = 5000;
    this.chelsea = new Character(
      this.projectiles,
      this.enemies,
      data.heroes,
      this.score
    );

    this.playMusic();

    this.speedUpFactor = 1;
    document.addEventListener("keydown", event => {
      if (event.keyCode == "189") this.speedUpFactor *= 0.5;
      else if (event.keyCode == "187") this.speedUpFactor *= 2;
    });

    // start rendering n stuff
    window.requestAnimationFrame(this.loop.bind(this));
  }

  playMusic() {
    document.addEventListener("keydown", () => {
      const thriller = document.getElementById("thriller");
      thriller.play();
    });
  }

  playFatality() {
    const fatality = document.getElementById("fatality");
    fatality.play();
  }

  loop() {
    if (this.game_ended) return;

    if (
      new Date().getTime() - this.timeLastEnemySpawned >=
      this.timeBetweenEnemySpawns
    ) {
      console.log(this.timeBetweenEnemySpawns);
      this.spawnNewEnemy();
      this.timeLastEnemySpawned = new Date().getTime();
      if (this.timeBetweenEnemySpawns >= 750)
        this.timeBetweenEnemySpawns -= 200;
      else this.timeBetweenEnemySpawns = 750;
    }

    if (this.speedUpFactor > 1) {
      for (let i = 0; i < this.speedUpFactor; i++) {
        this.renderComponents();
      }
      window.requestAnimationFrame(this.loop.bind(this));
    } else if (this.speedUpFactor < 1) {
      this.renderComponents();
      const delay = (1000 / 30) * (1 / this.speedUpFactor - 1);
      console.log("delaying for " + delay + " milliseconds");
      setTimeout(() => {
        window.requestAnimationFrame(this.loop.bind(this));
      }, delay);
    } else {
      this.renderComponents();
      window.requestAnimationFrame(this.loop.bind(this));
    }
  }

  renderComponents() {
    document.getElementById("game-view").innerHTML = this.chelsea.render();

    for (const projectile of this.projectiles) {
      if (projectile.deleteable()) {
        if (projectile.collided) this.score.cookiesHit++;
        this.projectiles.splice(this.projectiles.indexOf(projectile), 1);
      } else
        document.getElementById("game-view").innerHTML += projectile.render();
    }

    for (const enemy of this.enemies) {
      if (enemy.deleteable()) {
        this.enemies.splice(this.enemies.indexOf(enemy), 1);
        this.playFatality();
        this.incrementKills();
      } else {
        document.getElementById("game-view").innerHTML += enemy.render();
        enemy.attack(this.chelsea);
      }
    }

    if (this.chelsea.deleteable()) {
      this.endGame();
    }
  }

  incrementKills() {
    let killCount = document.getElementById("kill-count");
    ++this.score.kills;
    killCount.innerText = this.score.kills;
    if (this.score.kills % 5 === 0 && this.score.kills > 0) {
      let stars = document.getElementById("stars");
      stars.innerHTML += `<span>&#9733;</span>`;
    }
  }

  spawnNewEnemy() {
    const enemyType = this.villains[
      Math.floor(Math.random() * this.villains.length)
    ];
    this.enemies.push(new Enemy(enemyType));
  }

  endGame() {
    this.game_ended = true;
    document.getElementById("life-stats").innerHTML =
      "<h1 style='margin-top: 0;, text-align: center;'> FATALITY!</h1>";
    let username = prompt("What's yo name?", "Tyranny");
    document.querySelector("footer").innerText = "";
    this.submitScores(username);
  }

  submitScores(username) {
    fetch("http://localhost:3000/submit_score", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        kills: this.score.kills,
        cookiesFired: this.score.cookiesFired,
        cookiesHit: this.score.cookiesHit,
        time: new Date().getTime() - this.gameStartTime
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(this.getScores.bind(this));
  }

  getScores() {
    fetch("http://localhost:3000/scores")
      .then(resp => resp.json())
      .then(this.displayLeaderboard.bind(this));
  }

  displayLeaderboard(scores) {
    // document.getElementById('game-view').innerHTML = ""

    const dataTable = [["Player", "Vegetables Murdered", { role: "style" }]];

    for (const score of scores) {
      let scoreInfo = [score.name, score.kills, "gold"];
      dataTable.push(scoreInfo);
    }

    google.charts.load("current", { packages: ["corechart", "bar"] });
    google.charts.setOnLoadCallback(() => {
      this.drawChart(dataTable);
    });
  }

  drawChart(dataTable) {
    var data = google.visualization.arrayToDataTable(dataTable);

    var options = {
      title: "Spooky Leaderboard",
      hAxis: {
        title: "Cookie Chucker"
      },
      animation: {
        startup: true,
        duration: 500,
        easing: "out"
      }
    };

    var chart = new google.visualization.ColumnChart(
      document.getElementById("game-view")
    );
    chart.draw(data, options);
    document.querySelector("nav").innerHTML = `
        <div id='stats'>
        <h2><u>Stats:</u></h2>
        <p>&nbsp;&nbsp;&nbsp; Cookies Fired: ${this.score.cookiesFired}</p>
        <p>&nbsp;&nbsp;&nbsp; Cookies Hit: ${this.score.cookiesHit}</p>
        <p>&nbsp;&nbsp;&nbsp; Cookie Accuracy: ${Math.floor(
        (this.score.cookiesHit / this.score.cookiesFired) * 100
      )}%</p>
        </div>
        `;
  }
}
