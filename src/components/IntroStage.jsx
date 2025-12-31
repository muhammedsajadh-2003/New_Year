import React, { useState } from 'react';
import './IntroStage.css';

const IntroStage = ({ onOpen, data }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(true);
        setTimeout(() => {
            onOpen();
        }, 1500); // Wait for animation
    };

    return (
        <div className="intro-container">
            <div className={`envelope ${isOpen ? 'open' : ''}`} onClick={!isOpen ? handleClick : undefined}>
                <div className="flap"></div>
                <div className="pocket"></div>
                <div className="letter">
                    <h1>{data.title}</h1>
                    <p>Click to start</p>
                </div>
            </div>
            {!isOpen && <div className="click-hint">Click the envelope</div>}
        </div>
    );
};

export default IntroStage;
