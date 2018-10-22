import React, {Component} from 'react';

export class Character extends Component {
	componentDidMount() {
		this.setState({
			position: {x: 0, y: 0},
			projectiles: []
		});
		this.addKeystrokeListener();

		// this.interval = setInterval(() => this.tick(), 1/60);
	}

	render() {
		if (this.state && this.state.position) {
			console.log(this.state.position.x, this.state.position.y);
			const styles = {
				position: 'absolute',
				top: this.state.position.y,
				left: this.state.position.x
			};
			return (
				<img
					style={styles}
					className="character"
					src={require(`../images/the summoner.png`)}
					alt=""
				/>
			);
		} else {
			return null;
		}
	}

	addKeystrokeListener = () => {
		const keyMap = {
			39: [1, 0], //'right',
			37: [-1, 0], //'left',
			40: [0, 1], //'up',
			38: [0, -1] //'down'
		};

		const onKeyPressed = event => {
			// movement
			console.log(event.keyCode);
			const moveSpeed = 10;
			const movementDirection = keyMap[event.keyCode];
			if (movementDirection !== undefined) {
				const newX =
					this.state.position.x + movementDirection[0] * moveSpeed;
				const newY =
					this.state.position.y + movementDirection[1] * moveSpeed;
				this.setState({position: {x: newX, y: newY}});
			}

			// attacking
			// if (event.keyCode === 32) {
			//   projectiles.push()
			// }
		};

		window.addEventListener('keydown', onKeyPressed, false);
	};
}
