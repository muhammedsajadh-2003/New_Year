import React, { useState } from 'react';
import './WishingJar.css';

const WishingJar = ({ onComplete, data }) => {
    const [wishesShown, setWishesShown] = useState([]);
    const [currentWish, setCurrentWish] = useState(null);
    const [isJarShake, setIsJarShake] = useState(false);

    const handleClick = () => {
        if (currentWish) {
            // Close current wish first if open
            setCurrentWish(null);
            return;
        }

        if (wishesShown.length >= 5) {
            // If enough wishes shown, maybe just show a completed state or allow continue
            return;
        }

        // Shake animation
        setIsJarShake(true);
        setTimeout(() => {
            setIsJarShake(false);
            // Pick random unique wish
            const availableWishes = data.filter(w => !wishesShown.includes(w));
            const newWish = availableWishes[Math.floor(Math.random() * availableWishes.length)];

            if (newWish) {
                setWishesShown([...wishesShown, newWish]);
                setCurrentWish(newWish);
            }
        }, 500);
    };

    return (
        <div className="jar-container">
            <h1 className="title">Pick a Wish for 2026</h1>

            <div className={`jar ${isJarShake ? 'shake' : ''}`} onClick={handleClick}>
                <div className="lid"></div>
                <div className="glass">
                    {/* Decorative stars inside */}
                    <div className="star s1"></div>
                    <div className="star s2"></div>
                    <div className="star s3"></div>
                </div>
            </div>

            {currentWish && (
                <div className="note-overlay" onClick={() => setCurrentWish(null)}>
                    <div className="note-paper">
                        <p>{currentWish}</p>
                        <span>(Click to close)</span>
                    </div>
                </div>
            )}

            <div className="counter">
                Wishes Collected: {wishesShown.length} / 5
            </div>

            {wishesShown.length >= 5 && (
                <button className="continue-btn" onClick={onComplete}>
                    Continue to Cake 🎂
                </button>
            )}
        </div>
    );
};

export default WishingJar;
