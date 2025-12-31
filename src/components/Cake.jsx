import React, { useState } from 'react';
import './Cake.css';

const Cake = ({ onCut, data }) => {
    const [isCut, setIsCut] = useState(false);
    const [knifePos, setKnifePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        // Basic knife follow logic
        const rect = e.currentTarget.getBoundingClientRect();
        setKnifePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleClick = () => {
        if (!isCut) {
            setIsCut(true);
            setTimeout(() => {
                onCut();
            }, 3000); // Wait for cut animation
        }
    };

    return (
        <div className="cake-stage" onMouseMove={handleMouseMove} onClick={handleClick}>
            <div className={`instruction ${isCut ? 'fade-out' : ''}`}>
                {data.instruction}
            </div>

            <div className={`cake-structure ${isCut ? 'cut-action' : ''}`}>
                <div className="plate"></div>

                {/* Main Body of Cake - Split Architecture matching CSS */}
                <div className="cake-body">
                    <div className="cake-left"></div>
                    <div className="cake-right"></div>
                </div>

                {/* Text/Candle on top */}
                <div className="toppings">
                    <div className="candle">
                        <div className="flame"></div>
                    </div>
                    <div className="text-decoration">2026</div>
                </div>
            </div>

            {/* Knife Follower */}
            <div
                className={`knife ${isCut ? 'cutting' : ''}`}
                style={{
                    left: knifePos.x,
                    top: knifePos.y
                }}
            >
                🔪
            </div>
        </div>
    );
};

export default Cake;
