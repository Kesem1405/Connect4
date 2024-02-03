import './Board.css';

import { rows, cols } from './constants.js';

const Board = ({ boardState,player1Color,player2Color }) => {
    const getCellColor = (cellValue) => {
        if (cellValue === 'p1') {
            return player1Color;
        } else if (cellValue === 'p2') {
            return player2Color;
        }
        return 'transparent'; // Default color if the cell is empty
    };
    return (
        <div className="board">
            {boardState.map((row, i) =>
                row.map((cell, j) => (
                    <div key={i + '-' + j} className={`cell ${cell}`}>
                        {/* Render something based on cell value */}
                        {cell && <div className="circle" style={{backgroundColor: getCellColor(cell)}}></div>
                        }
                    </div>
                ))
            )}
        </div>
    );
};


export default Board;
