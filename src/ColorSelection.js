function ColorSelection({ colorOptions, player1Color, player2Color, setPlayer1Color, setPlayer2Color, onStartGame }) {
    return (
        <div>
            <h2>Player 1: Choose Your Color</h2>
            <div>
                {colorOptions.map(color => (
                    <button
                        key={color}
                        disabled={color === player2Color}
                        style={{ backgroundColor: color }}
                        onClick={() => setPlayer1Color(color)}
                    >
                        {color}
                    </button>
                ))}
            </div>
            <h2>Player 2: Choose Your Color</h2>
            <div>
                {colorOptions.map(color => (
                    <button
                        key={color}
                        disabled={color === player1Color}
                        style={{ backgroundColor: color }}
                        onClick={() => setPlayer2Color(color)}
                    >
                        {color}
                    </button>
                ))}
            </div>
            <button onClick={onStartGame} disabled={!player1Color || !player2Color || player1Color === player2Color}>Start Game</button>
        </div>
    );
}

export default ColorSelection;