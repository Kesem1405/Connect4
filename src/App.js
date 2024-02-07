import React, { useState} from 'react';
import './styles/App.css';
import GameSetup from "./components/GameSetup.js";
function App() {
    const [player1Color, setPlayer1Color] = useState('');
    const [player2Color, setPlayer2Color] = useState('');
    const colorOptions = ['#ff0044', '#F333FF', '#F3FF33', '#33FF57', '#33FFF3', '#3357FF', '#8400ff', '#8B4513', '#ff7b00', '#00ffbb'];
    const [gameStarted, setGameStarted] = useState(false);

    return (
        <div className="App">
            <div>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <GameSetup
                    player1Color={player1Color}
                    setPlayer1Color={setPlayer1Color}
                    player2Color={player2Color}
                    setPlayer2Color={setPlayer2Color}
                    colorOptions={colorOptions}
                    onStartGame={gameStarted}
                />
            </div>
        </div>
    );
}

export default App;