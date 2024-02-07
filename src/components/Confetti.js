
import React from 'react';
import '../styles/Confetti.css';

const Confetti = ({ count = 50, colors = ['#FF5733', '#33FF57', '#0058ff','#CE7229',''] }) => {
    const generateConfettiPieces = () => {
        let pieces = [];
        for (let i = 0; i < count; i++) {
            const color = colors[i % colors.length];
            const animationDuration = `${Math.random() * 3 + 2}s`;
            const leftPosition = `${Math.random() * 100}%`;

            pieces.push(
                <div
                    key={i}
                    className="confetti-piece"
                    style={{
                        backgroundColor: color,
                        animationDuration,
                        left: leftPosition,
                        animationDelay: `${Math.random() * 2}s`,
                    }}
                ></div>
            );
        }
        return pieces;
    };

    return (
        <div className="confetti-container">
            {generateConfettiPieces()}
        </div>
    );
};

export default Confetti;
