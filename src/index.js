fetch('http://localhost:3000/heroes_and_villains')
	.then(resp => resp.json())
	.then(data => {
		new Game(data)
	});
