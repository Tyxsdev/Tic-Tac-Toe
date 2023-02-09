const TicTacToe = (function () {
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
  const events = {
    pveClicked() {
      resetGame();
      resetDisplay();
      nameTwoDisplay.textContent = '';
      computerDisplay.forEach((e) => e.classList.add('hidden'));
      domCache.difficulty.classList.remove('hidden');
      domCache.easy.addEventListener('click', difficulty.easySelected);
      domCache.medium.addEventListener('click', difficulty.mediumSelected);
      domCache.godlike.addEventListener('click', difficulty.godlikeSelected);
    },
    pvpClicked() {
      resetGame();
      resetDisplay();
      domCache.buttonOne.classList.remove('hidden');
      domCache.playerOne.classList.remove('hidden');
      domCache.playerTwo.classList.remove('hidden');
      domCache.playerTwoName.textContent = '';
    },
    playOne() {
      nameOneDisplay.textContent = inputOne.value;
      domCache.buttonOne.classList.add('hidden');
      inputOne.value = '';
      hidenOneDisplay.forEach((e) => e.classList.add('hidden'));
      domCache.iconContainer.classList.remove('hidden');
    },
    playTwo() {
      nameTwoDisplay.textContent = inputTwo.value;
      domCache.buttonTwo.classList.add('hidden');
      inputTwo.value = '';
      computerDisplay.forEach((e) => e.classList.add('hidden'));
    },
    symbolX() {
      iconHeading.classList.add('hidden');
      x.classList.add('hidden');
      o.classList.add('hidden');
      iconSelectedOne.textContent = 'Plays with X';
      iconSelectedTwo.textContent = 'Plays with 0';
    },
    symbol0() {
      iconHeading.classList.add('hidden');
      x.classList.add('hidden');
      o.classList.add('hidden');
      iconSelectedOne.textContent = 'Plays with 0';
      iconSelectedTwo.textContent = 'Plays with X';
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
      const winnerCells = GameBoard.divider();
      winnerCells.firstCol.forEach((cell) => {
        text1 += cell.textContent;
        if (text1 === 'XXX' || text1 === '000') {
          alert('Victory');
          stopGame();
        }
      });
      winnerCells.secondCol.forEach((cell) => {
        text2 += cell.textContent;
        if (text2 === 'XXX' || text2 === '000') {
          alert('Victory');
          stopGame();
        }
      });
      winnerCells.thirdCol.forEach((cell) => {
        text3 += cell.textContent;
        if (text3 === 'XXX' || text3 === '000') {
          alert('Victory');
          stopGame();
        }
      });
      winnerCells.firstRow.forEach((cell) => {
        text4 += cell.textContent;
        if (text4 === 'XXX' || text4 === '000') {
          alert('Victory');
          stopGame();
        }
      });
      winnerCells.secondRow.forEach((cell) => {
        text5 += cell.textContent;
        if (text5 === 'XXX' || text5 === '000') {
          alert('Victory');
          stopGame();
        }
      });
      winnerCells.thirdRow.forEach((cell) => {
        text6 += cell.textContent;
        if (text6 === 'XXX' || text6 === '000') {
          alert('Victory');
          stopGame();
        }
      });
      winnerCells.firstDiag.forEach((cell) => {
        text7 += cell.textContent;
        if (text7 === 'XXX' || text7 === '000') {
          alert('Victory');
          stopGame();
        }
      });
      winnerCells.secondDiag.forEach((cell) => {
        text8 += cell.textContent;
        if (text8 === 'XXX' || text8 === '000') {
          alert('Victory');
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

  let click = 0;
  function fill(e) {
    console.log(random);
    const turn = firstTurn();
    if (turn.firstPlayer.key === 'Plays with X') {
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
  }

  const Game = function () {
    const flow = (function () {
      GameBoard.boardArray.forEach((square) =>
        square.addEventListener('click', fill)
      );
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
    })();
  };
  const domCache = {
    iconContainer: document.querySelector('.icon-container'),
    start: document.querySelector('.start'),
    pvp: document.querySelector('.pvp'),
    pve: document.querySelector('.pve'),
    playerOne: document.querySelector('.player-one'),
    playerTwo: document.querySelector('.player-two'),
    playerTwoName: document.querySelector('.name-selected-two'),
    buttonOne: document.querySelector('.play-one'),
    buttonTwo: document.querySelector('.play-two'),
    difficulty: document.querySelector('.difficulty'),
    easy: document.querySelector('.easy'),
    medium: document.querySelector('.medium'),
    godlike: document.querySelector('.godlike'),
  };
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
  const computerDisplay = domCache.playerTwo.querySelectorAll('.hidden-too');
  const hidenOneDisplay = domCache.playerOne.querySelectorAll('.hidden-too');
  const difficulty = {
    easySelected() {
      domCache.playerTwo.classList.remove('hidden');
      computerDisplay.forEach((e) => e.classList.add('hidden'));
      domCache.playerTwoName.textContent = 'Bob';
      domCache.difficulty.classList.add('hidden');
      domCache.playerOne.classList.remove('hidden');
      domCache.buttonOne.classList.remove('hidden');
    },

    mediumSelected() {
      domCache.playerTwo.classList.remove('hidden');
      computerDisplay.forEach((e) => e.classList.add('hidden'));
      domCache.playerTwoName.textContent = 'Carlos Magnusen';
      domCache.difficulty.classList.add('hidden');
      domCache.playerOne.classList.remove('hidden');
      domCache.buttonOne.classList.remove('hidden');
    },

    godlikeSelected() {
      domCache.playerTwo.classList.remove('hidden');
      computerDisplay.forEach((e) => e.classList.add('hidden'));
      domCache.playerTwoName.textContent = 'Skynet';
      domCache.difficulty.classList.add('hidden');
      domCache.playerOne.classList.remove('hidden');
      domCache.buttonOne.classList.remove('hidden');
    },
  };

  function resetDisplay() {
    inputOne.value = '';
    nameOneDisplay.textContent = '';
    hidenOneDisplay.forEach((e) => e.classList.remove('hidden'));
    computerDisplay.forEach((e) => e.classList.remove('hidden'));
    domCache.iconContainer.classList.add('hidden');
    iconHeading.classList.remove('hidden');
    x.classList.remove('hidden');
    o.classList.remove('hidden');
    iconSelectedOne.textContent = '';
    iconSelectedTwo.textContent = '';
    domCache.playerOne.classList.add('hidden');
    domCache.buttonOne.classList.add('hidden');
    domCache.difficulty.classList.add('hidden');
  }

  function resetGame() {
    TicTacToe.GameBoard.boardArray.forEach((cell) => (cell.textContent = ''));
    TicTacToe.GameBoard.boardArray.forEach((e) => (e.style.pointerEvents = ''));
  }

  let random = Math.floor(Math.random() * 100);
  function firstTurn() {
    console.log(random);
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

  function test() {
    o.addEventListener('click', events.symbol0);
    x.addEventListener('click', events.symbolX);
    domCache.pve.addEventListener('click', events.pveClicked);
    domCache.pvp.addEventListener('click', events.pvpClicked);
    domCache.buttonOne.addEventListener('click', events.playOne);
    domCache.buttonTwo.addEventListener('click', events.playTwo);
    domCache.start.addEventListener('click', TicTacToe.Game);
  }

  return { Game, GameBoard, test };
})();
TicTacToe.test();
