(function () {
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

  const Players = function (name, key) {
    const player = function () {
      const player1Name = name;
      const player1Key = key;
      return { player1Name, player1Key };
    };
    return { player };
  };

  let click = 0;

  const events = {
    fillBoard(e) {
      if (e.target.textContent !== '') return;
      if (click === 0 || click % 2 === 0) {
        e.target.textContent = `${marker[0]}`;
        click += 1;
      } else if (click !== 0 || click % 2 !== 0) {
        e.target.textContent = `${marker[1]}`;
        click += 1;
      }
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
  };

  const player1 = Players('player1', '0');
  const player2 = Players('player2', 'X');
  const marker = [player1.player().player1Key, player2.player().player1Key];

  const Game = (function () {
    const flow = (function () {
      GameBoard.boardArray.forEach((square) =>
        square.addEventListener('click', events.fillBoard)
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
  })();
  console.log(Game);
})();
