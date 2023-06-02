/*-------------------------------- Constants --------------------------------*/

  const winningCombos: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  /*---------------------------- Variables (state) ----------------------------*/

  let board: (number | null)[];
  let turn: number;
  let winner: boolean;
  let tie: boolean;
  let player: string;

  /*------------------------ Cached Element References ------------------------*/

  const squareEls: HTMLDivElement[] = Array.from(document.querySelectorAll('.sqr'));
  const messageEl: HTMLElement | null = document.getElementById('message');
  const resetBtnEl: HTMLButtonElement | null = document.getElementById('reset') as HTMLButtonElement;


  /*----------------------------- Event Listeners -----------------------------*/

  squareEls.forEach((sqr: HTMLDivElement, index: number) => {
    sqr.addEventListener('click', () => handleClick(index));
  });

  if (resetBtnEl) {
    resetBtnEl.addEventListener('click', init);
  }

  /*-------------------------------- Functions --------------------------------*/

  function init(): void {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = false;
    tie = false;
    playerName();
    render();
  }

  init();

  function render(): void {
    updateBoard();
    updateMessage();
  }

  function updateBoard(): void {
    squareEls.forEach((el: HTMLDivElement, index: number) => {
      if (board[index] === null) {
        el.textContent = '';
      } else if (board[index] === 1) {
        el.textContent = 'X';
      } else {
        el.textContent = 'O';
      }
    });
  }

  function updateMessage(): void {
    if (messageEl) {
      if (!winner && !tie) {
        messageEl.textContent = `It's ${player}'s turn!`;
      } else if (!winner && tie) {
        messageEl.textContent = `It's a Tie!`;
      } else {
        messageEl.textContent = `Congrats, ${player}, You Win!`;
      }
    }
  }

  function handleClick(index: number): void {
    if (board[index] || winner) return;
    placePiece(index);
    checkForTie();
    checkForWinner();
    switchPlayerTurn();
    playerName();
    render();
  }

  function placePiece(index: number): void {
    board[index] = turn;
  }

  function checkForTie(): void {
    if (!board.includes(null)) {
      tie = true;
    }
  }

  function checkForWinner(): void {
    winningCombos.forEach((combo: number[]) => {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = true;
      }
    });
  }

  function switchPlayerTurn(): void {
    if (!winner) turn *= -1;
  }

  function playerName(): void {
    if (turn === 1) {
      player = 'Player 1';
    } else if (turn === -1) {
      player = 'Player 2';
    }
  }
