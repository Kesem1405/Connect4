import React from 'react';
import '../styles/GameOverModal.css';

const GameOverModal = ({isOpen, onRestart, onClose, changeColors, playTapSound}) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>Game Over! Do you want to restart the game?</p>
                <button className="modal-button yes"  onClick={() => {
                    onRestart();
                    playTapSound();
                }}>Yes!
                </button>
               <button className="modal-button no"  onClick={() => {
                onClose();
                playTapSound();
            }}>No!
                </button>
                <button className="modal-button changeColors" onClick={() => {
                    changeColors();
                    playTapSound();
                }}>Lets change colors!
                </button>
            </div>
        </div>
    );
};
    export default GameOverModal;
