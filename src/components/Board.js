import '../styles/Board.css';


const Board = ({ boardState,player1Color,player2Color,winningSequence  }) => {

    const isWinningCell = (rowIndex, colIndex) => {
        return winningSequence.some(sequence => sequence[0] === rowIndex && sequence[1] === colIndex);
    };
    const getCellColor = (cellValue) => {
        if (cellValue === 'p1') {
            return player1Color;
        } else if (cellValue === 'p2') {
            return player2Color;
        }
        return 'transparent';
    };
    return (
        <div className="board-container">
            <div className="board-side left-side"></div>
            <div className="board">
                {boardState.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <div key={`${rowIndex}-${colIndex}`} className={`cell ${cell} ${isWinningCell(rowIndex, colIndex) ? 'winning-cell' : ''}`}>
                            {cell && <div className="circle" style={{ backgroundColor: getCellColor(cell) }}></div>}
                        </div>
                    ))
                )}
            </div>
            <div className="board-side right-side"></div>
        </div>
    );
};

export default Board;