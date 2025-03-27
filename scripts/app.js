"use strict";

function createPlayer({ name, marker }) {
	return {
		name,
		marker,
	};
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
				if ((playerOneMarker == "x") & (gameBoard[y][x] == null)) {
					gameBoard[y][x] = "x";
					round++;
				} else {
					console.log("orayı seçemezsiniz zaten seçildi lütfen tekrar yer seçin");
				}
			} else {
				const y = prompt("oynıcagınız yeri seçiniz");
				const x = prompt("oynıcagınız yeri seçiniz");
				if ((playerTwoMarker == "o") & (gameBoard[y][x] == null)) {
					gameBoard[y][x] = "o";
					round++;
				} else {
					console.log("orayı seçemezsiniz zaten seçildi lütfen tekrar yer seçin");
				}
			}
			return showBoard();
		};

		const checkWinning = function () {
			if ((gameBoard[0][0] == gameBoard[0][1])== gameBoard[0][2]) {
				return gameBoard[0][0]+ "Kazandı."
			}
		};

		return { getRound, playOneRound, showBoard, getPlayersNames, gameBoard,checkWinning };
	};
}
const game1 = playGame(playerX, playerO);
