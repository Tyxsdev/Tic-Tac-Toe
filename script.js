const TicTacToe = (function () {
  const domCache = {
    iconContainer: document.querySelector('.icon-container'),
    start: document.querySelector('.start'),
    gameMode: document.querySelector('.game-mode'),
    playerOne: document.querySelector('.player-one'),
    playerTwo: document.querySelector('.player-two'),
    difficulty: document.querySelector('.difficulty'),
  };

  const pveButton = domCache.gameMode.querySelector('.pve');
  const pvpButton = domCache.gameMode.querySelector('.pvp');
  const easyButton = domCache.gameMode.querySelector('.easy');
  const mediumButton = domCache.gameMode.querySelector('.medium');
  const godlikeButton = domCache.gameMode.querySelector('.godlike');
  const winner = domCache.gameMode.querySelector('.winner');
  const iconHeading = domCache.iconContainer.querySelector('p');
  const x = domCache.iconContainer.querySelector('.x');
  const o = domCache.iconContainer.querySelector('.o');
  const iconSelectedOne =
    domCache.iconContainer.querySelector('.icon-selected-one');
  const iconSelectedTwo =
    domCache.playerTwo.querySelector('.icon-selected-two');
  const inputOne = domCache.playerOne.querySelector('input');
  const inputTwo = domCache.playerTwo.querySelector('input');
  const nameOneDisplay = domCache.playerOne.querySelector('.name-selected-one');
  const nameTwoDisplay = domCache.playerTwo.querySelector('.name-selected-two');
  const hidenOneDisplay = domCache.playerOne.querySelectorAll('.hidden-too');
  const hiddenTwoDisplay = domCache.playerTwo.querySelectorAll('.hidden-too');
  const buttonOne = domCache.playerOne.querySelector('.play-one');
  const buttonTwo = domCache.playerTwo.querySelector('.play-two');
  let random = Math.floor(Math.random() * 100);
  let click = 0;

  const GameBoard = (function () {
    const board = document.querySelectorAll('.board div');
    const boardArray = [...board];
    const divider = function () {
      const firstRow = GameBoard.boardArray.slice(0, 3);
      const secondRow = GameBoard.boardArray.slice(3, 6);
      const thirdRow = GameBoard.boardArray.slice(6, 9);
      const firstCol = [
        ...GameBoard.boardArray.slice(0, 1),
        ...GameBoard.boardArray.slice(3, 4),
        ...GameBoard.boardArray.slice(6, 7),
      ];
      const secondCol = [
        ...GameBoard.boardArray.slice(1, 2),
        ...GameBoard.boardArray.slice(4, 5),
        ...GameBoard.boardArray.slice(7, 8),
      ];
      const thirdCol = [
        ...GameBoard.boardArray.slice(2, 3),
        ...GameBoard.boardArray.slice(5, 6),
        ...GameBoard.boardArray.slice(8, 9),
      ];
      const firstDiag = [
        ...GameBoard.boardArray.slice(0, 1),
        ...GameBoard.boardArray.slice(4, 5),
        ...GameBoard.boardArray.slice(8, 9),
      ];
      const secondDiag = [
        ...GameBoard.boardArray.slice(2, 3),
        ...GameBoard.boardArray.slice(4, 5),
        ...GameBoard.boardArray.slice(6, 7),
      ];
      return {
        firstRow,
        secondRow,
        thirdRow,
        firstCol,
        secondCol,
        thirdCol,
        firstDiag,
        secondDiag,
      };
    };

    return { boardArray, divider };
  })();

  function resetDisplay() {
    domCache.playerOne.classList.add('hidden');
    domCache.playerTwo.classList.add('hidden');
    domCache.iconContainer.classList.add('hidden');
    domCache.difficulty.classList.add('hidden');
    inputOne.value = '';
    inputTwo.value = '';
    nameOneDisplay.textContent = '';
    nameTwoDisplay.textContent = '';
    iconSelectedOne.textContent = '';
    iconSelectedTwo.textContent = '';
  }

  function setDisplay() {
    domCache.playerOne.classList.remove('hidden');
    domCache.playerTwo.classList.remove('hidden');
    hidenOneDisplay.forEach((e) => e.classList.remove('hidden'));
    hiddenTwoDisplay.forEach((e) => e.classList.remove('hidden'));
    iconHeading.classList.remove('hidden');
    x.classList.remove('hidden');
    o.classList.remove('hidden');
  }

  function resetGame() {
    GameBoard.boardArray.forEach((cell) => (cell.textContent = ''));
    GameBoard.boardArray.forEach((e) => (e.style.pointerEvents = ''));
  }

  function setDisplayForPve() {
    domCache.playerTwo.classList.remove('hidden');
    hidenOneDisplay.forEach((e) => e.classList.remove('hidden'));
    hiddenTwoDisplay.forEach((e) => e.classList.add('hidden'));
    domCache.playerOne.classList.remove('hidden');
    buttonOne.classList.remove('hidden');
    domCache.difficulty.classList.add('hidden');
  }

  const difficulty = {
    easySelected() {
      setDisplayForPve();
      nameTwoDisplay.textContent = 'Bob';
    },

    mediumSelected() {
      setDisplayForPve();
      nameTwoDisplay.textContent = 'Carlos Magnusen';
    },

    godlikeSelected() {
      setDisplayForPve();
      nameTwoDisplay.textContent = 'Skynet';
    },
  };

  function victory(c) {
    const iconWinner = c;
    winner.textContent = `Victory!!! ${iconWinner} wins the match`;
  }

  const events = {
    pveClicked() {
      resetGame();
      resetDisplay();
      domCache.difficulty.classList.remove('hidden');
      easyButton.addEventListener('click', difficulty.easySelected);
      mediumButton.addEventListener('click', difficulty.mediumSelected);
      godlikeButton.addEventListener('click', difficulty.godlikeSelected);
    },

    pvpClicked() {
      resetGame();
      resetDisplay();
      setDisplay();
    },

    playOne() {
      nameOneDisplay.textContent = inputOne.value;
      buttonOne.classList.add('hidden');
      hidenOneDisplay.forEach((e) => e.classList.add('hidden'));
      domCache.iconContainer.classList.remove('hidden');
    },

    playTwo() {
      nameTwoDisplay.textContent = inputTwo.value;
      buttonTwo.classList.add('hidden');
      hiddenTwoDisplay.forEach((e) => e.classList.add('hidden'));
    },

    symbolX() {
      iconHeading.classList.add('hidden');
      x.classList.add('hidden');
      o.classList.add('hidden');
      iconSelectedOne.textContent = 'Icon X';
      iconSelectedTwo.textContent = 'Icon 0';
    },

    symbol0() {
      iconHeading.classList.add('hidden');
      x.classList.add('hidden');
      o.classList.add('hidden');
      iconSelectedOne.textContent = 'Icon 0';
      iconSelectedTwo.textContent = 'Icon X';
    },

    checkWinner() {
      let text1 = '';
      let text2 = '';
      let text3 = '';
      let text4 = '';
      let text5 = '';
      let text6 = '';
      let text7 = '';
      let text8 = '';
      let check = '';
      const winnerCells = GameBoard.divider();
      winnerCells.firstCol.forEach((cell) => {
        text1 += cell.textContent;
        if (text1 === 'XXX' || text1 === '000') {
          check = cell.textContent;
          victory(check);
          stopGame();
        }
      });
      winnerCells.secondCol.forEach((cell) => {
        text2 += cell.textContent;
        if (text2 === 'XXX' || text2 === '000') {
          check = cell.textContent;
          victory(check);
          stopGame();
        }
      });
      winnerCells.thirdCol.forEach((cell) => {
        text3 += cell.textContent;
        if (text3 === 'XXX' || text3 === '000') {
          check = cell.textContent;
          victory(check);
          stopGame();
        }
      });
      winnerCells.firstRow.forEach((cell) => {
        text4 += cell.textContent;
        if (text4 === 'XXX' || text4 === '000') {
          check = cell.textContent;
          victory(check);
          stopGame();
        }
      });
      winnerCells.secondRow.forEach((cell) => {
        text5 += cell.textContent;
        if (text5 === 'XXX' || text5 === '000') {
          check = cell.textContent;
          victory(check);
          stopGame();
        }
      });
      winnerCells.thirdRow.forEach((cell) => {
        text6 += cell.textContent;
        if (text6 === 'XXX' || text6 === '000') {
          check = cell.textContent;
          victory(check);
          stopGame();
        }
      });
      winnerCells.firstDiag.forEach((cell) => {
        text7 += cell.textContent;
        if (text7 === 'XXX' || text7 === '000') {
          check = cell.textContent;
          victory(check);
          stopGame();
        }
      });
      winnerCells.secondDiag.forEach((cell) => {
        text8 += cell.textContent;
        if (text8 === 'XXX' || text8 === '000') {
          check = cell.textContent;
          victory(check);
          stopGame();
        }
      });
    },
  };

  const stopGame = function () {
    GameBoard.boardArray.forEach((e) => (e.style.pointerEvents = 'none'));
    click = 0;
    random = Math.floor(Math.random() * 100);
  };

  function addClickHandler(elem, turn) {
    elem.addEventListener('click', (e) => {
      if (turn.firstPlayer.key === 'Icon X') {
        if (e.target.textContent !== '') return;
        if (click === 0 || click % 2 === 0) {
          e.target.textContent = 'X';
          click += 1;
        } else if (click !== 0 || click % 2 !== 0) {
          e.target.textContent = `0`;
          click += 1;
        }
      } else {
        if (e.target.textContent !== '') return;
        if (click === 0 || click % 2 === 0) {
          e.target.textContent = '0';
          click += 1;
        } else if (click !== 0 || click % 2 !== 0) {
          e.target.textContent = `X`;
          click += 1;
        }
      }
    });
  }

  const Game = function () {
    const turn = firstTurn();
    winner.textContent = `${
      turn.firstPlayer.name
    } goes first with the ${turn.firstPlayer.key.toLowerCase()}`;
    GameBoard.boardArray.forEach((square) => addClickHandler(square, turn));
    const winnerCells = GameBoard.divider();
    winnerCells.firstCol.forEach((square) =>
      square.addEventListener('click', events.checkWinner)
    );
    winnerCells.secondCol.forEach((square) =>
      square.addEventListener('click', events.checkWinner)
    );
    winnerCells.thirdCol.forEach((square) =>
      square.addEventListener('click', events.checkWinner)
    );
    winnerCells.firstRow.forEach((square) =>
      square.addEventListener('click', events.checkWinner)
    );
    winnerCells.secondRow.forEach((square) =>
      square.addEventListener('click', events.checkWinner)
    );
    winnerCells.thirdRow.forEach((square) =>
      square.addEventListener('click', events.checkWinner)
    );
    winnerCells.firstDiag.forEach((square) =>
      square.addEventListener('click', events.checkWinner)
    );
    winnerCells.secondDiag.forEach((square) =>
      square.addEventListener('click', events.checkWinner)
    );
  };

  function firstTurn() {
    if (random > 50) {
      const firstPlayer = {
        name: document.querySelector('.name-selected-one').textContent,
        key: document.querySelector('.icon-selected-one').textContent,
      };
      const secondPlayer = {
        name: document.querySelector('.name-selected-two').textContent,
        key: document.querySelector('.icon-selected-two').textContent,
      };
      return { firstPlayer, secondPlayer };
    }
    if (random <= 50) {
      const firstPlayer = {
        name: document.querySelector('.name-selected-two').textContent,
        key: document.querySelector('.icon-selected-two').textContent,
      };
      const secondPlayer = {
        name: document.querySelector('.name-selected-one').textContent,
        key: document.querySelector('.icon-selected-one').textContent,
      };
      return { firstPlayer, secondPlayer };
    }
  }

  function run() {
    o.addEventListener('click', events.symbol0);
    x.addEventListener('click', events.symbolX);
    pveButton.addEventListener('click', events.pveClicked);
    pvpButton.addEventListener('click', events.pvpClicked);
    buttonOne.addEventListener('click', events.playOne);
    buttonTwo.addEventListener('click', events.playTwo);
    domCache.start.addEventListener('click', Game);
  }

  return { run };
})();

TicTacToe.run();
