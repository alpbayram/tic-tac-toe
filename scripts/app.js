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
	const dialog = document.querySelector("dialog");
	const dialogText = dialog.querySelector(".dialog-text");
	const dialogButton = dialog.querySelector(".dialog-button");
	const slotAll = document.querySelectorAll(".slot-img");
	const markX = document.querySelector(".x-select");
	const markO = document.querySelector(".o-select");
	input1.value = "Player1";
	input2.value = "Player2";

	dialogButton.addEventListener("click", dialogButtonFunction);

	function dialogButtonFunction(event) {
		const getValue = markX.dataset.value == "1" ? "x" : "o";
		const players = createPlayers({
			playerOneName: input1.value,
			playerOneMarker: getValue,
			playerTwoName: input2.value,
		});
		gameFlowInstance = playGame(players);
		slotAll.forEach((element) => {
			element.src = "";
		});
		dialog.close();
	}
	nameContainer.addEventListener("input", updateValue);
	function updateValue(event) {
		if (event.target.matches("#player-1-name")) {
			event.target.value = event.target.value.trim();
		} else if (event.target.matches("#player-2-name")) {
			event.target.value = event.target.value.trim();
		}
	}

	createGameContainer.addEventListener("click", createDom);
	container.addEventListener("click", renderDom);

	function createDom(event) {
		const regex = /^[A-Za-zşŞıİçÇöÖüÜĞğ\d]{3,12}$/;

		const player1Stat = container.querySelector(".player-1-stat");
		const player2Stat = container.querySelector(".player-2-stat");
		if (event.target.closest(".mark-select")) {
			const markContainer = event.target.closest(".mark-select");
			const relative = markContainer.querySelector(".relative-switch");

			if (event.target.matches(".x-select") || event.target.matches(".mark-X")) {
				markX.dataset.value = "1";
				markO.dataset.value = "0";
				relative.style.transform = "translate(0%, 0%)";
			} else if (event.target.closest(".o-select")) {
				markX.dataset.value = "0";
				markO.dataset.value = "1";
				relative.style.transform = "translate(100%, 0%)";
			}
		} else if (event.target.closest(".create-game-button")) {
			if (regex.test(input1.value) && regex.test(input2.value)) {
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
			} else {
				input2.reportValidity();
				input1.reportValidity();
			}
		}
	}

	function renderDom(event) {
		if (event.target.closest(".restart")) {
			console.log("girdi");
			createGameContainer.style.display = "flex";
			container.style.display = "none";
			input1.value = "Player1";
			input2.value = "Player2";
			slotAll.forEach((element) => {
				element.src = "";
			});
		} else if (event.target.closest(".pushable")) {
			event.preventDefault();

			const imageSource = event.target.querySelector(".slot-img");
			const winnerSource = document.querySelector(".winner-img");
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
				console.log(gameFlowInstance.gameOver() == true);
				if (gameFlowInstance.gameOver() == true) {
					mark.style.fontSize = "1.1rem";
					dialog.showModal();
					console.log(gameFlowInstance.getWinner()[1] + "bu");
					winnerSource.src =
						gameFlowInstance.getWinner()[1] == "x" ? "images/x.svg" : "images/o.svg";
					dialogText.style.color =
						gameFlowInstance.getWinner()[1] == "x" ? "#31c4be" : "#f2b237";
					dialogText.textContent = `${gameFlowInstance.getWinner()[0]} TAKES THE ROUND`;
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
