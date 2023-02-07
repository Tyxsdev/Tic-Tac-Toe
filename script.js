const GameBoard = (function () {
  const board = document.querySelectorAll('.board div');
  const boardArray = [...board];

  return { boardArray };
})();

const Players = function (name, key) {
  const player = function () {
    const player1Name = name;
    const player1Key = key;
    return { player1Name, player1Key };
  };
  return { player, name, key };
};

const Game = (function () {
  const ulises = Players('ulises', '0');
  const player2 = Players('player2', 'X');
  const marker = [ulises.player().player1Key, player2.player().player1Key];
  let click = 0;
  const flow = function () {
    GameBoard.boardArray.forEach((square) =>
      square.addEventListener('click', (e) => {
        if (e.target.textContent !== '') return;
        if (click === 0 || click % 2 === 0) {
          e.target.textContent = `${marker[0]}`;
          click += 1;
        } else if (click !== 0 || click % 2 !== 0) {
          e.target.textContent = `${marker[1]}`;
          click += 1;
        }
      })
    );
  };
  return { flow };
})();

Game.flow();
