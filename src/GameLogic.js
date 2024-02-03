export function checkWinner(board) {
    const rowCount = board.length;
    const colCount = board[0].length;
    const requiredToWin = 4; // Number of consecutive tokens required to win

    // Horizontal check
    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col <= colCount - requiredToWin; col++) {
            if (board[row][col] && board[row][col] === board[row][col + 1] && board[row][col] === board[row][col + 2] && board[row][col] === board[row][col + 3]) {
                return board[row][col];
            }
        }
    }

    // Vertical check
    for (let col = 0; col < colCount; col++) {
        for (let row = 0; row <= rowCount - requiredToWin; row++) {
            if (board[row][col] && board[row][col] === board[row + 1][col] && board[row][col] === board[row + 2][col] && board[row][col] === board[row + 3][col]) {
                return board[row][col];
            }
        }
    }

    // Diagonal (top-left to bottom-right)
    for (let row = 0; row <= rowCount - requiredToWin; row++) {
        for (let col = 0; col <= colCount - requiredToWin; col++) {
            if (board[row][col] && board[row][col] === board[row + 1][col + 1] && board[row][col] === board[row + 2][col + 2] && board[row][col] === board[row + 3][col + 3]) {
                return board[row][col];
            }
        }
    }

    // Anti-diagonal (bottom-left to top-right)
    for (let row = requiredToWin - 1; row < rowCount; row++) {
        for (let col = 0; col <= colCount - requiredToWin; col++) {
            if (board[row][col] && board[row][col] === board[row - 1][col + 1] && board[row][col] === board[row - 2][col + 2] && board[row][col] === board[row - 3][col + 3]) {
                return board[row][col];
            }
        }
    }

    return null; // No winner found
}

export function isBoardFull(board) {
    return board.every(row => row.every(cell => cell !== null));
}