"use strict";

function createPlayers({ playerOneName, playerOneMarker, playerTwoName }) {
	const playerTwoMarker = playerOneMarker == "x" ? "o" : "x";

	return {
		playerOneName,
		playerOneMarker,
		playerTwoName,
		playerTwoMarker,
	};
}
// const players = createPlayers({
// 	playerOneName: "Alp",
// 	playerOneMarker: "x",
// 	playerTwoName: "Sezi",
// });

// Her oyunda gereken iife methodlarım.
const gameMethods = (function () {
	const getRound = function (round) {
		const turn = round % 2 == 0 ? "X" : "O";
		return `Şuanki olduğunuz round ${round} ve sıra ${turn} kişisinde.`;
	};

	const showBoard = function (gameBoard) {
		return `${gameBoard[0][0]} | ${gameBoard[0][1]} | ${gameBoard[0][2]}\n${gameBoard[1][0]} | ${gameBoard[1][1]} | ${gameBoard[1][2]}\n${gameBoard[2][0]} | ${gameBoard[2][1]} | ${gameBoard[2][2]}`;
	};

	const getPlayers = function (playerOneName, playerOneMarker, playerTwoName, playerTwoMarker) {
		const playerOneMarkerText = playerOneMarker == "x" ? "X" : "O";
		const playerTwoMarkerText = playerTwoMarker == "o" ? "O" : "X";
		return [playerOneName, playerOneMarkerText, playerTwoName, playerTwoMarkerText];
	};

	const checkWinning = function (mark, gameBoard) {
		let checkRow = gameBoard.find(function (item, index, array) {
			let xCountInRow = item.filter(function (item, index, array) {
				if (item == mark) {
					return true;
				}
			}).length;

			if (xCountInRow == 3) {
				return true;
			}
		});
		let returnColumn = (function (marker) {
			function column(element, index, array) {
				let checkColumn = gameBoard.reduce(function (acc, item, index, array) {
					if (item[element] == marker) {
						acc.push(item[element]);
						console.log(acc);
						return acc;
					} else {
						return acc;
					}
				}, []).length;
				if (checkColumn == 3) {
					return true;
				}
			}
			if ([0, 1, 2].some(column) == true) {
				return true;
			}
		})(mark);

		if (checkRow != undefined || returnColumn == true) {
			return true;
		} else {
			return false;
		}
	};

	return {
		getRound,
		showBoard,
		getPlayers,
		checkWinning,
	};
})();

// Instance Factory Function'ım
function playGame({ playerOneMarker, playerOneName, playerTwoMarker, playerTwoName }) {
	let round = 0;
	let isGameOver = false;
	let winner = null;
	const gameBoard = [
		[null, null, null],
		[null, null, null],
		[null, null, null],
	];
	const getRound = () => gameMethods.getRound(round);
	const showBoard = () => gameMethods.showBoard(gameBoard);
	const getPlayersNames = gameMethods.getPlayers(
		playerOneName,
		playerOneMarker,
		playerTwoName,
		playerTwoMarker
	);
	const isCellEmpty = function (y, x) {
		return gameBoard[y][x] == null ? true : false;
	};
	const gameOver = () => (isGameOver == true ? true : false);
	const turn = () =>
		round % 2 == 0 ? [playerOneMarker, playerOneName] : [playerTwoMarker, playerTwoName];

	const getWinner = () => (winner != null ? winner : null);
	const playOneRound = function (y, x) {
		const currentPlayer = turn();

		if (isGameOver) {
			console.log("oyun bitti lütfen yeni oyun başlatınız");
			return showBoard();
		}

		if (gameBoard[y][x] == null) {
			gameBoard[y][x] = currentPlayer[0];

			if (gameMethods.checkWinning(turn()[0], gameBoard) == true) {
				isGameOver = gameMethods.checkWinning(turn()[0], gameBoard);
				winner = [currentPlayer[1], currentPlayer[0]];
				console.log(winner);
				console.log(`${currentPlayer[1]} siz kazandınız. İşaretiniz: ${currentPlayer[0]}`);
			} else {
				round++;
			}
		} else {
			console.log("orayı seçemezsiniz zaten seçildi lütfen tekrar yer seçin");
		}
	};

	return {
		playOneRound,
		showBoard,
		getPlayersNames,
		getRound,
		isGameOver,
		turn,
		isCellEmpty,
		gameOver,
		getWinner,
	};
}

let gameFlowInstance;
// const gameFlowInstance = game1();
const domMethods = (function () {
	const container = document.querySelector(".container");
	const createGameContainer = document.querySelector(".create-game-container");
	const mark = document.querySelector(".mark");
	const nameContainer = document.querySelector(".name-container");
	const input1 = nameContainer.querySelector("#player-1-name");
	const input2 = nameContainer.querySelector("#player-2-name");
	createGameContainer.addEventListener("click", createDom);
	container.addEventListener("click", renderDom);

	function createDom(event) {
		const markX = document.querySelector(".x-select");
		const markO = document.querySelector(".o-select");

		const player1Stat = container.querySelector(".player-1-stat");
		const player2Stat = container.querySelector(".player-2-stat");
		if (event.target.closest(".mark-select")) {
			const markContainer = event.target.closest(".mark-select");
			const relative = markContainer.querySelector(".relative-switch");
			console.log(input1.value);
			if (event.target.closest(".x-select")) {
				markX.dataset.value = "1";
				markO.dataset.value = "0";
				relative.style.transform = "translate(0%, 0%)";
			} else if (event.target.closest(".o-select")) {
				markX.dataset.value = "0";
				markO.dataset.value = "1";
				relative.style.transform = "translate(100%, 0%)";
			}
		} else if (event.target.closest(".create-game-button")) {
			const getValue = markX.dataset.value == "1" ? "x" : "o";
			const players = createPlayers({
				playerOneName: input1.value,
				playerOneMarker: getValue,
				playerTwoName: input2.value,
			});
			gameFlowInstance = playGame(players);
			createGameContainer.style.display = "none";
			container.style.display = "grid";
			player1Stat.textContent = `${gameFlowInstance.getPlayersNames[1]} (${gameFlowInstance.getPlayersNames[0]}) `;
			player2Stat.textContent = `${gameFlowInstance.getPlayersNames[3]} (${gameFlowInstance.getPlayersNames[2]}) `;
			mark.textContent = `Turn: ${gameFlowInstance.turn()[0]}`;
			console.log(getValue);
		}
	}

	function renderDom(event) {
		const slotAll = document.querySelectorAll(".slot-img");
		if (event.target.closest(".restart")) {
			console.log("girdi");
			createGameContainer.style.display = "flex";
			container.style.display = "none";
			input1.value = "Player 1";
			input2.value = "Player 2";
			slotAll.forEach((element) => {
				element.src = "";
			});
		} else if (event.target.closest(".pushable")) {
			event.preventDefault();
			mark.textContent = `Turn: ${gameFlowInstance.turn()[0]}`;
			const imageSource = event.target.querySelector(".slot-img");
			const coordinateY = event.target.closest(".pushable").dataset.y;
			const coordinateX = event.target.closest(".pushable").dataset.x;
			// console.log(coordinateY, coordinateX);
			// console.log(event.target);

			if (
				gameFlowInstance.gameOver() == false &&
				gameFlowInstance.isCellEmpty(coordinateY, coordinateX) == true
			) {
				console.log(
					gameFlowInstance.gameOver(),
					gameFlowInstance.isGameOver + " bunlara dikkat"
				);

				console.log(imageSource);
				if (gameFlowInstance.turn()[0] == "x") {
					imageSource.src = "images/x.svg";
				} else {
					imageSource.src = "images/o.svg";
				}

				// event.target.textContent = gameFlowInstance.turn()[0];
				gameFlowInstance.playOneRound(coordinateY, coordinateX);
				if (gameFlowInstance.gameOver() == true) {
					mark.style.fontSize = "1.1rem";
					
					mark.textContent = `Winner: ${gameFlowInstance.getWinner()[0]}`;
				} else {
					mark.textContent = `Turn: ${gameFlowInstance.turn()[0]}`;
				}
			} else {
				console.log("bitti");
			}
		}
	}

	return {};
})();
