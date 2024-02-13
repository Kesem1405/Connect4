import React from 'react';
import '../styles/PopupStyles.css';


const About = ({ onClose,playTapSound }) => {
    return (

        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>About Connect 4</h2>
                <p>This game is a classic two-player connection game or against pc,
                    in which the players first choose a color and then take turns dropping colored discs from the top
                    into a seven-column, six-row vertically suspended grid.
                    The pieces fall straight down, occupying the next available
                    space within the column. The objective of the game is to be the
                    first to form a horizontal, vertical, or diagonal line of four of one's own discs.</p>
                <p>Created by: Kesem Halis</p>
                <button onClick={() => {
                    onClose();
                    playTapSound();
                }}>Close</button>
            </div>
        </div>
    );
};

export default About;