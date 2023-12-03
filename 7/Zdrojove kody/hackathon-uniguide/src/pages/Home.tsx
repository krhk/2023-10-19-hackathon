import React from 'react';
import LandingPageImage from "../assets/LandingPageImage.png"

function App() {
  return (
    <div className="HomeBox1">
      <div className='HomeW1'>
        <h1 className='LandingTitle'><strong>Uni</strong>Guide<strong>.</strong></h1>
        <h2 className='LandingUnderTitle'>Univerzální studentská <strong>volnočasová</strong> aplikace</h2>
      </div>
      <div className='HomeW2'>
        <img className='LandingPageImage' src={LandingPageImage} alt='LandingPageImage'/>
      </div>
    </div>
  );
}

export default App;
