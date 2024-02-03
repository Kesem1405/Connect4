import React from 'react';
import './DropZone.css'; // Ensure you have styles for this

function DropZone({ onPlayerAction, currentPlayer, player1Color, player2Color }) {
    const currentPlayerColor = currentPlayer === 'p1' ? player1Color : player2Color;

    const handleClick = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const column = Math.floor(x / 100);
        onPlayerAction(column);
    };

    return (
        <div className="DropZoneArea" onClick={handleClick} style={{ borderColor: currentPlayerColor }}>
            {/* Visual indicators or separators can be placed here */}
            {[...Array(7)].map((_, index) => (
                <div key={index} className="columnIndicator" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                    {/* This can be styled further to indicate columns visually */}
                </div>
            ))}
        </div>
    );
}

export default DropZone;
