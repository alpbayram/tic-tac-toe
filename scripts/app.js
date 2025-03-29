"use strict";

function createPlayers(firstPlayerName, secondPlayerName) {
	const firstMarker = prompt("X mi O mu?");
	const secondMarker = firstMarker === "X" ? "O" : "X";

	const player1 = {
		name: firstPlayerName,
		marker: firstMarker,
	};

	const player2 = {
		name: secondPlayerName,
		marker: secondMarker,
	};

	return [player1, player2];
}
const playerX = createPlayer({ name: "Alp", marker: "x" });
const playerO = createPlayer({ name: "Sezi", marker: "o" });

function playGame(player1, player2) {
	let round = 0;

	const playerOneName = player1.name;
	const playerOneMarker = player1.marker;
	const playerTwoName = player2.name;
	const playerTwoMarker = player2.marker;

	const gameBoard = [
		[null, null, null],
		[null, null, null],
		[null, null, null],
	];

	return function gameFlow() {
		const getRound = function () {
			let turn;
			if (round % 2 == 0) {
				turn = "X";
			} else {
				turn = "O";
			}
			return `Şuanki olduğunuz round ${round} ve sıra ${turn} kişisinde.`;
		};

		const showBoard = function () {
			const a = `${gameBoard[0][0]} | ${gameBoard[0][1]} | ${gameBoard[0][2]}\n${gameBoard[1][0]} | ${gameBoard[1][1]} | ${gameBoard[1][2]}\n${gameBoard[2][0]} | ${gameBoard[2][1]} | ${gameBoard[2][2]}`;
			return a;
		};
		const getPlayersNames = function () {
			return `Oyuncularımız ${playerOneName} ve ${playerTwoName}.`;
		};

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

		return { getRound, playOneRound, showBoard, getPlayersNames, checkWinning };
	};
}
const game1 = playGame(playerX, playerO);
