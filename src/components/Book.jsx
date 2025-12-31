import React, { useState } from 'react';
import './Book.css';

const Book = ({ onComplete, data }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = data.pages.length + 1; // +1 for cover

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Helper to determine z-index and rotation for each page
    const getPageClass = (index) => {
        if (index < currentPage) return 'flipped';
        return '';
    };

    return (
        <div className="book-container">
            <div className="book">
                {/* Cover */}
                <div className={`page cover ${getPageClass(0)}`} style={{ zIndex: totalPages }} onClick={handleNext}>
                    <div className="front">
                        <h1>{data.title}</h1>
                        <p>Tap to Open</p>
                    </div>
                    <div className="back">
                        <p>Page 1</p>
                    </div>
                </div>

                {/* Content Pages */}
                {data.pages.map((page, i) => {
                    // Page indices start at 1 (0 is cover)
                    const pageIndex = i + 1;
                    // Z-index logic: Unflipped pages stack normally, Flipped pages stack reverse
                    const zIndex = pageIndex < currentPage ? pageIndex : totalPages - pageIndex;

                    return (
                        <div
                            key={i}
                            className={`page ${getPageClass(pageIndex)}`}
                            style={{ zIndex: zIndex }}
                            onClick={() => {
                                if (pageIndex === currentPage) handleNext(); // If it's the current top page, flip verify
                                if (pageIndex < currentPage) handlePrev(); // If it's on the left stack, flip back
                            }}
                        >
                            <div className="front">
                                <div className="page-content">
                                    <p>{page.text}</p>
                                    {page.img && <img src={page.img} alt="memory" />}
                                </div>
                                <span className="page-number">{i + 1}</span>
                            </div>
                            <div className="back">
                                {/* Back of the page is usually empty or deco, unless it's the last one */}
                            </div>
                        </div>
                    );
                })}

                {/* Back Cover / Final Step */}
                <div className={`page final-page ${getPageClass(totalPages)}`} style={{ zIndex: 0 }}>
                    <div className="front">
                        <h2>A bridge to the sweetness...</h2>
                        <button onClick={(e) => { e.stopPropagation(); onComplete(); }}>
                            {data.finaleButton}
                        </button>
                    </div>
                </div>

            </div>
            <div className="controls">
                <button onClick={handlePrev} disabled={currentPage === 0}>Prev</button>
                <button onClick={handleNext} disabled={currentPage > totalPages}>Next</button>
            </div>
        </div>
    );
};

export default Book;
