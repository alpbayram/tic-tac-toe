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
		getPlayersNames,
		checkWinning,
	};
})();

// Instance Factory Function'ım
function playGame({ playerOneMarker, playerOneName, playerTwoMarker, playerTwoName }) {
	let round = 0;
	let isGameOver = false;
	const gameBoard = [
		[null, null, null],
		[null, null, null],
		[null, null, null],
	];

	return function gameFlow() {
		const getRound = () => gameMethods.getRound(round);
		const showBoard = () => gameMethods.showBoard(gameBoard);
		const getPlayersNames = gameMethods.getPlayersNames(playerOneName, playerTwoName);
		const isCellEmpty = function(y,x){
			return gameBoard[y][x]==null?true:false
		}
		const gameOver = () =>
			isGameOver == true ? true:false;
		const turn = () =>
			round % 2 == 0 ? [playerOneMarker, playerOneName] : [playerTwoMarker, playerTwoName];
		console.log(turn());
		const playOneRound = function (y, x) {
			if (isGameOver) {
				console.log("oyun bitti lütfen yeni oyun başlatınız");
				return showBoard();
			}

			if (gameBoard[y][x] == null) {
				gameBoard[y][x] = turn()[0];

				if (gameMethods.checkWinning(turn()[0], gameBoard) == true) {
					isGameOver = gameMethods.checkWinning(turn()[0], gameBoard);
					console.log(`${turn()[1]} siz kazandınız. İşaretiniz: ${turn()[0]}`);
				} else {
					
					round++;
				
				}
			} else {
				console.log("orayı seçemezsiniz zaten seçildi lütfen tekrar yer seçin");
			}

			return showBoard();
		};

		return { playOneRound, showBoard, getPlayersNames, getRound, turn, isGameOver,isCellEmpty,gameOver };
	};
}

const game1 = playGame(players);
const gameFlowInstance = game1();
const domMethods = (function () {
	const container = document.querySelector(".container");

	container.addEventListener("click", renderDom);

	function renderDom(event) {
		if (event.target.closest(".pushable")) {
			event.preventDefault();
			const imageSource = event.target.querySelector(".slot-img");
			const coordinateY = event.target.closest(".pushable").dataset.y;
			const coordinateX = event.target.closest(".pushable").dataset.x;
			// console.log(coordinateY, coordinateX);
			// console.log(event.target);
			
			if (gameFlowInstance.gameOver() == false && gameFlowInstance.isCellEmpty(coordinateY,coordinateX)==true) {
				console.log(gameFlowInstance.gameOver())
				console.log(imageSource)
				if(gameFlowInstance.turn()[0]=="x"){
					imageSource.src="../images/x.svg"
				}else{
					imageSource.src="../images/o.svg"
				}
				// event.target.textContent = gameFlowInstance.turn()[0];
				gameFlowInstance.playOneRound(coordinateY, coordinateX);
			} else {
				console.log("bitti");
			}
		}
	}

	return {};
})();
