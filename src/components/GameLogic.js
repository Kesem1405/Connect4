
export function checkWinner(board) {
    const rowCount = board.length;
    const colCount = board[0].length;
    const requiredToWin = 4;

    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col <= colCount - requiredToWin; col++) {
            if (board[row][col] && board[row][col] === board[row][col + 1] && board[row][col] === board[row][col + 2] && board[row][col] === board[row][col + 3]) {
                return [[row, col], [row, col + 1], [row, col + 2], [row, col + 3]];
            }
        }
    }

    for (let col = 0; col < colCount; col++) {
        for (let row = 0; row <= rowCount - requiredToWin; row++) {
            if (board[row][col] && board[row][col] === board[row + 1][col] && board[row][col] === board[row + 2][col] && board[row][col] === board[row + 3][col]) {
                return [[row, col], [row + 1, col], [row + 2, col], [row + 3, col]];
            }
        }
    }

    for (let row = 0; row <= rowCount - requiredToWin; row++) {
        for (let col = 0; col <= colCount - requiredToWin; col++) {
            if (board[row][col] && board[row][col] === board[row + 1][col + 1] && board[row][col] === board[row + 2][col + 2] && board[row][col] === board[row + 3][col + 3]) {
                return [[row, col], [row + 1, col + 1], [row + 2, col + 2], [row + 3, col + 3]];
            }
        }
    }

    for (let row = requiredToWin - 1; row < rowCount; row++) {
        for (let col = 0; col <= colCount - requiredToWin; col++) {
            if (board[row][col] && board[row][col] === board[row - 1][col + 1] && board[row][col] === board[row - 2][col + 2] && board[row][col] === board[row - 3][col + 3]) {
                return [[row, col], [row - 1, col + 1], [row - 2, col + 2], [row - 3, col + 3]];
            }
        }
    }

    return null; // No winner found
}

export function isBoardFull(board) {
    return board.every(row => row.every(cell => cell !== null));
}