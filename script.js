const TicTacToe = (function () {
  const domCache = {
    iconContainer: document.querySelector('.icon-container'),
    gameMode: document.querySelector('.game-mode'),
    main: document.querySelector('.main-container'),
    playerOne: document.querySelector('.player-one'),
    playerTwo: document.querySelector('.player-two'),
    difficulty: document.querySelector('.difficulty'),
  };

  const winner = domCache.main.querySelector('.winner');
  const pveButton = domCache.gameMode.querySelector('.pve');
  const pvpButton = domCache.gameMode.querySelector('.pvp');
  const easyButton = domCache.gameMode.querySelector('.easy');
  const mediumButton = domCache.gameMode.querySelector('.medium');
  const godlikeButton = domCache.gameMode.querySelector('.godlike');
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
  const fullBoard = domCache.main.querySelector('.board');
  const board = domCache.main.querySelectorAll('.board div');
  const start = domCache.main.querySelector('.start');
  const reStart = domCache.main.querySelector('.restart');
  const errorMessage = domCache.main.querySelector('.error');

  const GameBoard = (function () {
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
      resetFullGame();
      resetDisplay();
      domCache.difficulty.classList.remove('hidden');
      easyButton.addEventListener('click', difficulty.easySelected);
      mediumButton.addEventListener('click', difficulty.mediumSelected);
      godlikeButton.addEventListener('click', difficulty.godlikeSelected);
    },

    pvpClicked() {
      resetFullGame();
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
  };

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

  function setDisplay() {
    domCache.playerOne.classList.remove('hidden');
    domCache.playerTwo.classList.remove('hidden');
    hidenOneDisplay.forEach((e) => e.classList.remove('hidden'));
    hiddenTwoDisplay.forEach((e) => e.classList.remove('hidden'));
    iconHeading.classList.remove('hidden');
    x.classList.remove('hidden');
    o.classList.remove('hidden');
  }

  function setDisplayForPve() {
    domCache.playerTwo.classList.remove('hidden');
    hidenOneDisplay.forEach((e) => e.classList.remove('hidden'));
    hiddenTwoDisplay.forEach((e) => e.classList.add('hidden'));
    domCache.playerOne.classList.remove('hidden');
    buttonOne.classList.remove('hidden');
    domCache.difficulty.classList.add('hidden');
  }

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

  function resetFullGame() {
    stopGame();
    GameBoard.boardArray.forEach((cell) => (cell.textContent = ''));
    GameBoard.boardArray.forEach((cell) => (cell.myProp = ''));
  }

  function reStartGame() {
    if (iconSelectedOne.textContent === '') {
      errorMessage.textContent = `Select a name and then an icon to start playing`;
      return;
    }
    const previusRandom = random;
    const previusFirstPlayer = GameBoard.boardArray[0].myProp.firstPlayer;
    const previusSecondPlayer = GameBoard.boardArray[0].myProp.secondPlayer;
    stopGame();
    GameBoard.boardArray.forEach((cell) => (cell.textContent = ''));
    const newRandom = random;

    if (
      (previusRandom > 50 && newRandom > 50) ||
      (previusRandom <= 50 && newRandom <= 50)
    ) {
      Game();
    } else if (
      (previusRandom > 50 && newRandom <= 50) ||
      (previusRandom < 50 && newRandom > 50)
    ) {
      GameBoard.boardArray[0].myProp.firstPlayer = previusSecondPlayer;
      GameBoard.boardArray[0].myProp.secondPlayer = previusFirstPlayer;
      Game();
    }
  }

  const stopGame = function () {
    GameBoard.boardArray.forEach((e) => (e.style.pointerEvents = 'none'));
    click = 0;
    random = Math.floor(Math.random() * 100);
  };

  function checkWinner() {
    const winnerCells = GameBoard.divider();
    const players = winnerCells.firstCol[0].myProp;
    const colOne = winnerCells.firstCol.map((e) => e.textContent);
    const colTwo = winnerCells.secondCol.map((e) => e.textContent);
    const colThree = winnerCells.thirdCol.map((e) => e.textContent);
    const rowOne = winnerCells.firstRow.map((e) => e.textContent);
    const rowTwo = winnerCells.secondRow.map((e) => e.textContent);
    const rowThree = winnerCells.thirdRow.map((e) => e.textContent);
    const diagOne = winnerCells.firstDiag.map((e) => e.textContent);
    const diagTwo = winnerCells.secondDiag.map((e) => e.textContent);

    if (
      colOne[0] !== '' &&
      colOne[0] === colOne[1] &&
      colOne[0] === colOne[2]
    ) {
      victory(colOne[0], players);
    }
    if (
      colTwo[0] !== '' &&
      colTwo[0] === colTwo[1] &&
      colTwo[0] === colTwo[2]
    ) {
      victory(colTwo[0], players);
    }
    if (
      colThree[0] !== '' &&
      colThree[0] === colThree[1] &&
      colThree[0] === colThree[2]
    ) {
      victory(colThree[0], players);
    }
    if (
      rowOne[0] !== '' &&
      rowOne[0] === rowOne[1] &&
      rowOne[0] === rowOne[2]
    ) {
      victory(rowOne[0], players);
    }
    if (
      rowTwo[0] !== '' &&
      rowTwo[0] === rowTwo[1] &&
      rowTwo[0] === rowTwo[2]
    ) {
      victory(rowTwo[0], players);
    }
    if (
      rowThree[0] !== '' &&
      rowThree[0] === rowThree[1] &&
      rowThree[0] === rowThree[2]
    ) {
      victory(rowThree[0], players);
    }
    if (
      diagOne[0] !== '' &&
      diagOne[0] === diagOne[1] &&
      diagOne[0] === diagOne[2]
    ) {
      victory(diagOne[0], players);
    }
    if (
      diagTwo[0] !== '' &&
      diagTwo[0] === diagTwo[1] &&
      diagTwo[0] === diagTwo[2]
    ) {
      victory(diagTwo[0], players);
    }
  }

  function writeIcon(e) {
    if (e.target.textContent !== '') {
      return;
    }
    if (e.target.myProp.firstPlayer.key === 'Icon X') {
      if (click === 0 || click % 2 === 0) {
        e.target.textContent = 'X';
        click += 1;
      } else if (click !== 0 || click % 2 !== 0) {
        e.target.textContent = `0`;
        click += 1;
      }
    } else if (e.target.myProp.firstPlayer.key === 'Icon 0') {
      if (click === 0 || click % 2 === 0) {
        e.target.textContent = '0';
        click += 1;
      } else if (click !== 0 || click % 2 !== 0) {
        e.target.textContent = `X`;
        click += 1;
      }
    }
    checkWinner();
  }

  function victory(icon, players) {
    const first = players.firstPlayer;
    const second = players.secondPlayer;

    if (first.key === 'Icon X' && icon === 'X') {
      if (first.name === '') {
        winner.textContent = `Victory!!! player 1 wins the match`;
      } else {
        winner.textContent = `Victory!!! ${first.name} wins the match`;
      }
    } else if (first.key === 'Icon 0' && icon === '0') {
      if (first.name === '') {
        winner.textContent = `Victory!!! player 1 wins the match`;
      } else {
        winner.textContent = `Victory!!! ${first.name} wins the match`;
      }
    }

    if (second.key === 'Icon X' && icon === 'X') {
      if (second.name === '') {
        winner.textContent = `Victory!!! player 2 wins the match`;
      } else {
        winner.textContent = `Victory!!! ${second.name} wins the match`;
      }
    } else if (second.key === 'Icon 0' && icon === '0') {
      if (second.name === '') {
        winner.textContent = `Victory!!! player 2 wins the match`;
      } else {
        winner.textContent = `Victory!!! ${second.name} wins the match`;
      }
    }
    stopGame();
  }

  const writeOnBoard = (function () {
    let executed = false;
    return function () {
      if (!executed) {
        executed = true;
        fullBoard.addEventListener('click', writeIcon);
      }
    };
  })();

  const Game = function () {
    if (iconSelectedOne.textContent === '') {
      errorMessage.textContent = `Select a name and then an icon to start playing`;
      return;
    }
    errorMessage.textContent = ``;
    GameBoard.boardArray.forEach((e) => (e.style.pointerEvents = ''));
    const turn = (function firstTurn() {
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
    })();

    if (iconSelectedOne.textContent === turn.firstPlayer.key) {
      if (turn.firstPlayer.name === '') {
        console.log('a');
        winner.textContent = `Player 1 goes first with the ${turn.firstPlayer.key.toLowerCase()}`;
      } else if (turn.firstPlayer.name !== '') {
        console.log('b');
        winner.textContent = `${
          turn.firstPlayer.name
        } goes first with the ${turn.firstPlayer.key.toLowerCase()}`;
      }
    }

    if (iconSelectedTwo.textContent === turn.firstPlayer.key) {
      if (turn.firstPlayer.name === '') {
        console.log('c');
        winner.textContent = `Player 2 goes first with the ${turn.firstPlayer.key.toLowerCase()}`;
      } else if (turn.firstPlayer.name !== '') {
        console.log('d');
        winner.textContent = `${
          turn.firstPlayer.name
        } goes first with the ${turn.firstPlayer.key.toLowerCase()}`;
      }
    }

    if (
      GameBoard.boardArray[0].myProp === '' ||
      GameBoard.boardArray[0].myProp === undefined
    ) {
      GameBoard.boardArray.forEach((cell) => (cell.myProp = turn));
    }

    writeOnBoard();
  };

  function run() {
    o.addEventListener('click', events.symbol0);
    x.addEventListener('click', events.symbolX);
    pveButton.addEventListener('click', events.pveClicked);
    pvpButton.addEventListener('click', events.pvpClicked);
    buttonOne.addEventListener('click', events.playOne);
    buttonTwo.addEventListener('click', events.playTwo);
    start.addEventListener('click', Game);
    reStart.addEventListener('click', reStartGame);
  }

  return { run };
})();

TicTacToe.run();
