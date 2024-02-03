import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import Board from "./Board";
import DropZone from "./DropZone";
import { checkWinner, isBoardFull } from './GameLogic';
import dropSound from './CoinDrop.wav';

function App() {

    const [winner, setWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false);
    const [player1Color, setPlayer1Color] = useState('');
    const [player2Color, setPlayer2Color] = useState('');
    const colorOptions = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF3', '#F3FF33', '#3F3F3F', '#8B4513', '#FFD700', '#C0C0C0'];
    const [countdown, setCountdown] = useState(3);
    const [message, setMessage] = useState('');
    const [gameStarted, setGameStarted] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState('p1'); // Initial player
    const [boardState, setBoardState] = useState(Array(6).fill(null).map(() => Array(7).fill(null)));
    const soundRef = useRef(null);



    const goToStartPage = () => {
        window.location.reload();
    };

    const startGame = () => {
        setGameStarted(true);
        setCountdown(3);
        setMessage('');
        setBoardState(Array(6).fill(null).map(() => Array(7).fill(null)));
    };

    const handleColorSelection = (color) => {
        if (!player1Color) {
            setPlayer1Color(color);
        } else if (!player2Color && color !== player1Color) {
            setPlayer2Color(color);
        }
    };

    const handleStartGame = () => {
        if (player1Color && player2Color && player1Color !== player2Color) {
            setGameStarted(true);
        } else {
            alert("Please select different colors for each player.");
        }
    };
    const handlePlayerAction = (column) => {
        // First, check if the game already has a winner or if it's the player's turn.
        if (winner) return; // Ignore clicks if the game is over

        const newBoardState = boardState.map(row => [...row]);
        let moveMade = false;

        for (let row = 5; row >= 0; row--) {
            if (newBoardState[row][column] === null) {
                newBoardState[row][column] = currentPlayer; // Place the player's token
                moveMade = true;
                break; // Exit the loop after placing the token
            }
        }

        if (moveMade) {
            if (soundRef.current) {
                soundRef.current.play();
            }
            setBoardState(newBoardState);
            const gameWinner = checkWinner(newBoardState);
            if (gameWinner) {
                setWinner(gameWinner);
            } else if (isBoardFull(newBoardState)) {
                setWinner('Draw');
            } else {
                setCurrentPlayer(currentPlayer === 'p1' ? 'p2' : 'p1');
            }
        }
    };


    const isColumnFull = (columnIndex) => {
        return boardState[0][columnIndex] !== null;
    };


    useEffect(() => {
        let intervalId;
        if (gameStarted && countdown > 0) {
            intervalId = setInterval(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else if (countdown === 0) {
            setMessage('Good luck');
            intervalId = setInterval(() => {
                setCountdown(countdown - 1);
            }, 1000);
            clearInterval(intervalId);
            setMessage('');
        }
        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [gameStarted, countdown]);


    if (!gameStarted || countdown > 0) {
        return (
            <div className="App">
                <h1 className="Header">Connect 4!</h1>
                {!gameStarted && (
                    <>
                        <h2>Select Player Colors</h2>
                        <div className="color-selection">
                            {colorOptions.map((color) => (
                                <button
                                    key={color}
                                    style={{ backgroundColor: color, margin: '5px' }}
                                    disabled={color === player1Color || color === player2Color}
                                    onClick={() => handleColorSelection(color)}
                                >
                                    {player1Color === color ? 'Player 1' : player2Color === color ? 'Player 2' : 'Select'}
                                </button>
                            ))}
                        </div>
                        <button className="startButton" onClick={handleStartGame}disabled={!player1Color || !player2Color || player1Color === player2Color}>Start Game</button>
                    </>
                )}
                {gameStarted && countdown > 0 && (
                    <div id="startingGameCount">Starting in {countdown}...</div>
                )}
            </div>
        );
    }

    return (
        <div className="App">
            <audio ref={soundRef} src={dropSound} preload="auto"/>
            <div id="gameMessage">{message}</div>
            <DropZone onPlayerAction={handlePlayerAction}
                      currentPlayer={currentPlayer}
                      player1Color={player1Color}
                      player2Color={player2Color}
            />
            <Board boardState={boardState} player1Color={player1Color} player2Color={player2Color}/>
            {winner && (
                <div
                    className="winnerMessage"
                    style={{color: winner === 'p1' ? player1Color : player2Color}}
                >
                    {winner === 'p1' ? 'Player 1 Wins!' : 'Player 2 Wins!'}
                </div>)}
            {isDraw && <div>It's a draw!</div>}
            <button onClick={goToStartPage}>Back to Start</button>
        </div>
    );
}

export default App;
