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
const players = createPlayers({
	playerOneName: "Alp",
	playerOneMarker: "x",
	playerTwoName: "Sezi",
});

// Her oyunda gereken iife methodlarım.
const gameMethods = (function () {
	const getRound = function (round) {
		const turn = round % 2 == 0 ? "X" : "O";
		return `Şuanki olduğunuz round ${round} ve sıra ${turn} kişisinde.`;
	};
	const showBoard = function (gameBoard) {
		return `${gameBoard[0][0]} | ${gameBoard[0][1]} | ${gameBoard[0][2]}\n${gameBoard[1][0]} | ${gameBoard[1][1]} | ${gameBoard[1][2]}\n${gameBoard[2][0]} | ${gameBoard[2][1]} | ${gameBoard[2][2]}`;
	};

	const getPlayersNames = function (playerOneName, playerTwoName) {
		return `Oyuncularımız ${playerOneName} ve ${playerTwoName}.`;
	};
	return {
		getRound,
		showBoard,
		getPlayersNames,
	};
})();

function playGame({ playerOneMarker, playerOneName, playerTwoMarker, playerTwoName }) {
	let round = 0;

	const gameBoard = [
		[null, null, null],
		[null, null, null],
		[null, null, null],
	];

	return function gameFlow() {
		const getRound = gameMethods.getRound(round);
		const showBoard = gameMethods.showBoard(gameBoard);
		const getPlayersNames = gameMethods.getPlayersNames(playerOneName, playerTwoName);

		const playOneRound = function () {
			if (round % 2 == 0) {
				const y = prompt("oynıcagınız yeri seçiniz");
				const x = prompt("oynıcagınız yeri seçiniz");
				if (playerOneMarker == "x" && gameBoard[y][x] == null) {
					gameBoard[y][x] = "x";
					console.log(checkWinning(playerOneMarker));
					if (checkWinning(playerOneMarker) == true) {
						console.log(
							`${playerOneName} siz kazandınız. İşaretiniz: ${playerOneMarker}`
						);
					} else {
						round++;
					}
				} else {
					console.log("orayı seçemezsiniz zaten seçildi lütfen tekrar yer seçin");
				}
			} else {
				const y = prompt("oynıcagınız yeri seçiniz");
				const x = prompt("oynıcagınız yeri seçiniz");
				if (playerTwoMarker == "o" && gameBoard[y][x] == null) {
					gameBoard[y][x] = "o";
					console.log(checkWinning(playerTwoMarker));
					if (checkWinning(playerTwoMarker) == true) {
						console.log(
							`${playerTwoName} siz kazandınız. İşaretiniz: ${playerTwoMarker}`
						);
					} else {
						round++;
					}
				} else {
					console.log("orayı seçemezsiniz zaten seçildi lütfen tekrar yer seçin");
				}
			}
			return showBoard();
		};

		const checkWinning = function (mark) {
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
				let checkColumn = 0;
				let col = 0;
				for (; checkColumn < 3; ) {
					if (checkColumn === 3 || col == 2) {
						break;
					} else {
						col++;
					}
					checkColumn = gameBoard.reduce(function (acc, item, index, array) {
						if (item[col] == marker) {
							acc.push(item[col]);
							console.log(acc);
							return acc;
						} else {
							return acc;
						}
					}, []).length;
				}

				if (checkColumn == 3) {
					return true;
				}
			})(mark);

			if (checkRow != undefined || returnColumn == true) {
				return true;
			} else {
				return false;
			}
		};

		return { playOneRound, showBoard, getPlayersNames, checkWinning, getRound };
	};
}
const game1 = playGame(players);
