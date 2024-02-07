import React, {useEffect, useRef, useState} from 'react';
import '../styles/App.css';
import '../styles/GamePlay.css';
import Board from "../components/Board.js";
import DropZone from "../components/DropZone.js";
import {checkWinner, isBoardFull} from './GameLogic.js';
import dropSound from '../sounds/CoinDrop.wav';
import winnerSound from '../sounds/WinnerSound.mp3'
import buttonTapSound from '../sounds/ButtonTapSound.wav'
import Confetti from "../components/Confetti.js";
import GameOverModal from "../components/GameOverModal.js";
import Navbar from "../components/NavBar.js";
import RulesModal from "../components/RulesComp.js";
import About from "../components/About.js";


const GamePlay = ({player1Color, player2Color, isPlayingWithPC, difficulty, gameStarted, message}) => {

    const [boardState, setBoardState] = useState(Array(6).fill(Array(7).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState('p1');
    const [winner, setWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false);
    const [winningSequence, setWinningSequence] = useState([]);
    const [isPCTurn, setIsPCTurn] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const [showConfetti, setShowConfetti] = useState(false);
    const soundRef = useRef(null);
    const winnerRef = useRef(null);
    const tapSoundRef = useRef(null);
    const [isTimerPaused, setIsTimerPaused] = useState(false);
    const [showGameOverModal, setShowGameOverModal] = useState(false);
    const [showRules, setShowRules] = useState(false);
    const [showAbout, setShowAbout] = useState(false);


    const goToStartPage = () => {
        window.location.reload();
    };

    const handlePCMove = () => {
        if (!isPlayingWithPC || currentPlayer !== 'p2' || winner) return;
        setTimeout(() => {
            let column;
            if (difficulty === 'hard') {
                column = findStrategicMove('p2') ?? findRandomMove();
            } else {
                column = findRandomMove();
            }
            if (column !== undefined) {
                handlePlayerAction(column);
            }
        }, 2000);
    };

    const findStrategicMove = (player) => {
        const cols = boardState[0].length;
        for (let col = 0; col < cols; col++) {
            const row = getLowestEmptyRowIndex(col);
            if (row !== -1) {
                boardState[row][col] = player;
                if (checkWinner(boardState) === player) {
                    boardState[row][col] = null;
                    return col;
                }
                boardState[row][col] = null;
            }
        }
        return null;
    };


    const findRandomMove = () => {
        const availableColumns = boardState[0].map((_, colIndex) => colIndex).filter(col => boardState[0][col] === null);
        return availableColumns[Math.floor(Math.random() * availableColumns.length)];
    };

    const getLowestEmptyRowIndex = (col) => {
        for (let row = boardState.length - 1; row >= 0; row--) {
            if (!boardState[row][col]) {
                return row;
            }
        }
        return -1;
    };

    const isColumnFull = (columnIndex) => {
        return boardState[0][columnIndex] != null;
    };

    const handlePlayerAction = (column) => {
        if (isPCTurn || winner || isColumnFull(column)) return;
        const newBoardState = boardState.map(row => [...row]);
        let moveMade = false;
        for (let row = 5; row >= 0; row--) {
            if (newBoardState[row][column] === null) {
                newBoardState[row][column] = currentPlayer;
                moveMade = true;
                break;
            }
        }
        if (moveMade) {
            updateBoard(newBoardState);
        }
    };

    const updateBoard = (newBoardState) => {
        setTimeLeft(10);
        if (soundRef.current) soundRef.current.play();
        setBoardState(newBoardState);
        const result = checkWinner(newBoardState);
        if (result) {
            setWinner(currentPlayer);
            handleWinConfetti();
            handleGameOver();
            setWinningSequence(result);
            setTimeout(() => setWinningSequence([]), 5000);
            setIsTimerPaused(true);
            if (winnerRef.current) {
                winnerRef.current.play();
            }
        } else if (isBoardFull(newBoardState)) {
            setWinner('Draw');
            setIsDraw(true);
        } else {
            setCurrentPlayer(currentPlayer === 'p1' ? 'p2' : 'p1');
            if (isPlayingWithPC && currentPlayer === 'p1') {
                handlePCMove();
            }
        }
    }

    const handleWinConfetti = () => {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
    };

    const handleGameOver = () => {
        setTimeout(() => {
            setShowGameOverModal(true);
        }, 3000);
    };


    const handleAboutClick = () => {
        setShowAbout(!showAbout);
        setIsTimerPaused(true);
    };

    const handleRulesClick = () => {
        setShowRules(true);
        setIsTimerPaused(true);

    };

    const closeModal = () => {
        setShowGameOverModal(false);
        setShowAbout(false);
        setShowRules(false);
        setIsTimerPaused(false);
    };

    const handleRematch = () => {
        setWinner(null);
        setIsDraw(false);
        setCurrentPlayer('p1');
        setBoardState(Array(6).fill(null).map(() => Array(7).fill(null)));
        setIsTimerPaused(false);
        setTimeLeft(10);
        setShowGameOverModal(false);
        if (isPlayingWithPC) {
            setIsPCTurn(false);
        }
    };

    const playTapSound = () => {
        if (tapSoundRef.current) {
            tapSoundRef.current.currentTime = 0;
            tapSoundRef.current.play().catch(error => console.error("Error playing sound:", error));
        }
    };

    useEffect(() => {
        if (timeLeft === 0 && !winner) {
            setCurrentPlayer(currentPlayer === 'p1' ? 'p2' : 'p1');
            setTimeLeft(10);
        }
    }, [timeLeft, currentPlayer]);


    useEffect(() => {
        if (!gameStarted || winner || isTimerPaused) return;
        const timerId = setInterval(() => {
            setTimeLeft(prevTime => prevTime > 0 ? prevTime - 1 : 0);
        }, 1000);

        if (timeLeft === 0) {
            setCurrentPlayer(currentPlayer === 'p1' ? 'p2' : 'p1');
            setTimeLeft(10);
        }
        return () => clearInterval(timerId);
    }, [gameStarted, currentPlayer, isTimerPaused, winner, timeLeft]);

    useEffect(() => {
        if (currentPlayer === 'p2' && isPlayingWithPC && !winner) {
            handlePCMove();
        }
    }, [currentPlayer, isPlayingWithPC, winner]);

    if(gameStarted){
    return (
        <div className="GamePlay">
            <div>
                <Navbar
                    onHomeClick={goToStartPage}
                    onRulesClick={handleRulesClick}
                    onAboutClick={handleAboutClick}
                    onRestartClick={handleRematch}
                    playTapSound={playTapSound}
                />
                {showRules && <RulesModal
                    onClose={() => closeModal()}
                    playTapSound={playTapSound}
                />}
                {showAbout && <About
                    onClose={() => closeModal()}
                    playTapSound={playTapSound}
                />}
            </div>
            {showConfetti && <Confetti/>}
            <audio ref={soundRef} src={dropSound} preload="auto"/>
            <audio ref={winnerRef} src={winnerSound} preload="auto"/>
            <audio ref={tapSoundRef} src={buttonTapSound} preload="auto"/>
            <div id="gameMessage">{message}</div>
            <DropZone onPlayerAction={handlePlayerAction}
                      currentPlayer={currentPlayer}
                      player1Color={player1Color}
                      player2Color={player2Color}
                      isColumnFull={isColumnFull}
                      isPlayingWithPC={isPlayingWithPC}
                      winner={winner}
            />
            <div className="game-area">
                <div className="player-status player1">
                    <div className="player-status-circle" style={{backgroundColor: player1Color}}></div>
                    <div className={currentPlayer === 'p1' ? "player-turn-active" : "player-turn"}>
                        {currentPlayer === 'p1' ? "Player 1 Turn" : "Player 1"}
                    </div>
                    {currentPlayer === 'p1' && !winner && <div className="timer">Time left: {timeLeft}</div>}
                </div>
                <Board boardState={boardState}
                       player1Color={player1Color}
                       player2Color={player2Color}
                       winningSequence={winningSequence}
                />
                <div className="player-status player2">
                    <div className="player-status-circle" style={{backgroundColor: player2Color}}></div>
                    <div className={currentPlayer === 'p2' ? "player-turn-active" : "player-turn"}>
                        {currentPlayer === 'p2' ? "Player 2 Turn" : "Player 2"}
                    </div>
                    {currentPlayer === 'p2' && !winner && <div className="timer">Time left: {timeLeft}</div>}
                </div>
            </div>
            <GameOverModal
                isOpen={showGameOverModal}
                onRestart={handleRematch}
                onClose={closeModal}
                changeColors={goToStartPage}
                playTapSound={playTapSound}
            />
            {isDraw && <div>It's a draw!</div>}
            {winner && (
                <div
                    className="winnerMessage"
                    style={{
                        color: winner === 'p1' ? player1Color : player2Color
                    }}
                >
                    {winner === 'p1' ? 'Player 1 Wins!' : isPlayingWithPC ? 'PC Wins!' : 'Player 2 Wins!'}
                </div>
            )}
        </div>
    );
    }
};
export default GamePlay;