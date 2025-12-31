import React, { useState } from 'react';
import IntroStage from './components/IntroStage';
import Book from './components/Book';
import Gallery from './components/Gallery';
import WishingJar from './components/WishingJar'; // Import
import Cake from './components/Cake';
import Fireworks from './components/Fireworks';
import { content } from './content';

function App() {
  const [scene, setScene] = useState('intro'); // intro, book, gallery, wishes, cake, finale

  const handleStart = () => {
    setScene('book');
  };

  const handleFinishBook = () => {
    setScene('gallery');
  };

  const handleFinishGallery = () => {
    setScene('wishes');
  };

  const handleFinishWishes = () => {
    setScene('cake');
  };

  const handleCakeCut = () => {
    setScene('finale');
  };

  return (
    <div className="app-container">
      {scene === 'intro' && <IntroStage onOpen={handleStart} data={content.intro} />}
      {scene === 'book' && <Book onComplete={handleFinishBook} data={content.book} />}
      {scene === 'gallery' && <Gallery onComplete={handleFinishGallery} data={content.gallery} />}
      {scene === 'wishes' && <WishingJar onComplete={handleFinishWishes} data={content.wishes} />}
      {scene === 'cake' && <Cake onCut={handleCakeCut} data={content.cake} />}
      {scene === 'finale' && <Fireworks data={content.finale} />}
    </div>
  );
}

export default App;
