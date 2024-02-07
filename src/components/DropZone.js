import React, { useState } from 'react';
import '../styles/DropZone.css'; // Ensure you have styles for this

function DropZone({ onPlayerAction, currentPlayer, player1Color, player2Color, isColumnFull, isPlayingWithPC }) {
    const [hoveredColumn, setHoveredColumn] = useState(null); // Track the hovered column
    const currentPlayerColor = currentPlayer === 'p1' ? player1Color : player2Color;

    const handleMouseEnter = (index) => {
        if(!isColumnFull(index) || !isPlayingWithPC && currentPlayer !== 'p1'){  setHoveredColumn(index);}
    };

    const handleMouseLeave = () => {
        if(isColumnFull || isPlayingWithPC && currentPlayer !== 'p1') { setHoveredColumn(null);}
    };

    const handleClick = (index) => {
        if(isPlayingWithPC && currentPlayer !== 'p1') return;
        onPlayerAction(index);
    };

    return (
        <div className="DropZoneArea" onMouseLeave={handleMouseLeave} style={{ borderColor: currentPlayerColor }}>
            {[...Array(7)].map((_, index) => (
                <div
                    key={index}
                    className="columnIndicator"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onClick={() => handleClick(index)}
                    style={{ position: 'relative', width: '100%', height: '100%' }} // Ensure the column divs fill the parent
                >
                    {hoveredColumn === index && (
                        <div
                            className="coinPreview"
                            style={{
                                backgroundColor: currentPlayerColor,
                            }}
                        ></div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default DropZone;
