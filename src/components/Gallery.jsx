import React, { useState, useEffect } from 'react';
import './Gallery.css';

const Gallery = ({ onComplete, data }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Auto-play disabled if user interacts manually or modal is open
    const [isAutoPlay, setIsAutoPlay] = useState(true);

    useEffect(() => {
        let interval;
        if (isAutoPlay && !isModalOpen) {
            interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % data.images.length);
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlay, isModalOpen, data.images.length]);

    const handleNext = (e) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % data.images.length);
        setIsAutoPlay(false);
    };

    const handlePrev = (e) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + data.images.length) % data.images.length);
        setIsAutoPlay(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
        setIsAutoPlay(false);
    }

    return (
        <div className="gallery-container">
            <h1 className="title">Our Beautiful Moments</h1>

            {/* Main Slideshow Frame */}
            <div className="frame" onClick={openModal}>
                {data.images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Memory ${index + 1}`}
                        className={`slide ${index === currentIndex ? 'active' : ''}`}
                    />
                ))}
                <div className="click-hint-gallery">Click to Expand</div>
            </div>

            {/* Navigation Controls */}
            <div className="nav-controls">
                <button className="nav-btn" onClick={handlePrev}>❮</button>
                <div className="indicators">
                    {data.images.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentIndex(index);
                                setIsAutoPlay(false);
                            }}
                        ></span>
                    ))}
                </div>
                <button className="nav-btn" onClick={handleNext}>❯</button>
            </div>

            <button className="continue-btn" onClick={onComplete}>
                Continue to Surprise
            </button>

            {/* Lightbox Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <button className="modal-close" onClick={() => setIsModalOpen(false)}>✖</button>

                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={data.images[currentIndex]} alt="Full Size" />

                        <button className="modal-nav prev" onClick={handlePrev}>❮</button>
                        <button className="modal-nav next" onClick={handleNext}>❯</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
