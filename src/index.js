fetch('http://localhost:3000/villains')
	.then(resp => resp.json())
	.then(data => {
		new Game(data)
	});
fetch('http://localhost:3000/heros')
	.then(resp => resp.json())
	.then(data => {
		heroes = data
	});
