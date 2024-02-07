import React, {useEffect, useRef, useState} from 'react';
import buttonTapSound from "../sounds/ButtonTapSound.wav";
import GamePlay from "../components/GamePlay.js";
import '../styles/GameSetup.css';
import '../styles/App.css';

const GameSetup = ({
                       player1Color,
                       setPlayer1Color,
                       player2Color,
                       setPlayer2Color,
                       colorOptions,
                   }) => {

    const [gameStarted, setGameStarted] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [message, setMessage] = useState('');
    const [timeLeft, setTimeLeft] = useState(10);
    const tapSoundRef = useRef(null);
    const [difficulty, setDifficulty] = useState('easy');
    const [gameMode, setGameMode] = useState('vsPlayer');
    const [isPlayingWithPC, setIsPlayingWithPC] = useState(false);


    const onStartGame = (data) => {
        setGameStarted(true);
    };


    const handleStartGame = () => {
        if (player1Color && player2Color && player1Color !== player2Color) {
            setGameStarted(true);
            onStartGame();
        } else {
            alert("Please select different colors for each player.");
        }
    };
    const handleColorSelection = (color) => {
        if (!player1Color) {
            setPlayer1Color(color);
        } else if (!player2Color && color !== player1Color) {
            setPlayer2Color(color);
        }
    };

    const handleResetColors = () => {
        setPlayer1Color('');
        setPlayer2Color('');
    };


    const playTapSound = () => {
        if (tapSoundRef.current) {
            tapSoundRef.current.currentTime = 0;
            tapSoundRef.current.play().catch(error => console.error("Error playing sound:", error));
        }
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
            setTimeLeft(10);
        }
        return () => clearInterval(intervalId);
    }, [gameStarted, countdown]);


    return (
        <div className="GameSetup">
            {!gameStarted && countdown > 0 && (
                <>
                    <h1 className="Header">Connect 4!</h1>
                    <audio ref={tapSoundRef} src={buttonTapSound} preload="auto"/>
                    <h2>{!player1Color ? 'Select Player 1 Color' : 'Select Player 2 Color'}</h2>
                    <div className="color-selection">
                        {colorOptions.map((color) => (
                            <button className="colorSelectionButton"
                                    key={color}
                                    style={{
                                        backgroundColor: color,
                                        cursor: (player1Color && player2Color) ? 'not-allowed' : 'pointer'
                                    }}
                                    disabled={color === player1Color || color === player2Color}
                                    onClick={() => {
                                        handleColorSelection(color);
                                        playTapSound();
                                    }}>
                                {player1Color === color ? 'Player 1' : player2Color === color ? 'Player 2' : ''}
                            </button>
                        ))}
                    </div>
                    <div className="color-selection">
                        <button className="resetColorsButton"
                                style={{cursor: (player1Color || player2Color) ? 'pointer' : 'not-allowed'}}
                                onClick={() => {
                                    handleResetColors();
                                    playTapSound();
                                }}>
                            Reset Colors
                        </button>
                    </div>
                    <div>
                        <h2>Select Game Mode:</h2>
                        <button className="gameModeButton"
                                onClick={() => {
                                    setGameMode('vsPlayer')
                                    playTapSound();
                                }}
                                style={{
                                    backgroundColor: gameMode === 'vsPlayer' ? '#4CAF50' : '',
                                    color: gameMode === 'vsPlayer' ? 'white' : '',
                                }}>
                            Player vs. Player
                        </button>
                        <button className="gameModeButton"
                                onClick={() => {
                                    setGameMode('vsPC')
                                    setIsPlayingWithPC(true);
                                    playTapSound();
                                }}
                                style={{
                                    backgroundColor: gameMode === 'vsPC' ? '#4CAF50' : '',
                                    color: gameMode === 'vsPC' ? 'white' : '',
                                }}>
                            Play Against PC
                        </button>
                        {gameMode === 'vsPC' && (
                            <>
                                <h3 className="difficultyHeader">Select Difficulty:</h3>
                                <select className="selectDifficultyButton"
                                        onChange={(e) => {
                                            setDifficulty(e.target.value)
                                            playTapSound();
                                        }}
                                        value={difficulty}>
                                    <option className="easyOption" value="easy">Easy</option>
                                    <option className="hardOption" value="hard">Hard</option>
                                </select>
                            </>
                        )}
                    </div>
                    <div id="gameMessage">{message}</div>
                    <div>
                        <button className="startButton" onClick={() => {
                            handleStartGame();
                            playTapSound();
                        }}
                                style={{cursor: (player1Color || player2Color || player1Color && player2Color) ? 'pointer' : ' not-allowed'}}
                                disabled={!player1Color || !player2Color || player1Color === player2Color}>Start
                            Game
                        </button>
                    </div>
                </>
            )
            }
            {gameStarted && countdown > 0 && (
                <div id="startingGameCount">Starting in {countdown}...</div>
            )}
            {gameStarted && countdown === 0 && (
                <GamePlay
                    player1Color={player1Color}
                    player2Color={player2Color}
                    isPlayingWithPC={isPlayingWithPC}
                    setDifficulty={difficulty}
                    gameStarted={gameStarted}
                    message={message}
                />)
            }
        </div>
    );
}

export default GameSetup;