import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Background from './Background';
import Logo from './Logo';
import Counter from './Counter';
import RiddlePanel from './RiddlePanel';

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: #282c34;
  margin-bottom: 20px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
`;

// Explicit array with exactly 6 logos
const LOGOS = [
  { id: 1, x: 100, y: 100, width: 40, height: 40, found: false },
  { id: 2, x: 300, y: 150, width: 35, height: 35, found: false },
  { id: 3, x: 500, y: 200, width: 30, height: 30, found: false },
  { id: 4, x: 150, y: 300, width: 45, height: 45, found: false },
  { id: 5, x: 400, y: 350, width: 50, height: 50, found: false },
  { id: 6, x: 600, y: 300, width: 40, height: 40, found: false }
];

const riddle = `When the mouse plays with his friends,
Look for pieces around the bend.
Some under seats, some high on shelves,
Find all six to help yourselves.
Once the picture is complete,
The first number you shall meet.`;

const LogoFinder = () => {
  // Initialize with exactly 6 logos
  const [logos, setLogos] = useState(LOGOS);
  const [logosFound, setLogosFound] = useState(0);
  const [showRiddle, setShowRiddle] = useState(false);
  
  // Debug state - set to false to hide debug outlines
  const [showDebug, setShowDebug] = useState(false);

  // Handle logo click
  const handleLogoClick = (id) => {
    console.log(`Clicked logo with id: ${id}`);
    const newLogos = logos.map(logo => 
      logo.id === id ? { ...logo, found: true } : logo
    );
    
    setLogos(newLogos);
    setLogosFound(prev => prev + 1);
  };

  // Check if all logos are found
  useEffect(() => {
    console.log(`Logos found: ${logosFound} out of ${logos.length}`);
    if (logosFound === logos.length) {
      setTimeout(() => {
        setShowRiddle(true);
      }, 1000);
    }
  }, [logosFound, logos.length]);

  // Toggle debug overlay with 'd' key (for developer use only)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'd') {
        setShowDebug(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <Container>
      <Title>Find the Hidden Mickeys!</Title>
      <div style={{ position: 'relative', marginBottom: '20px', border: '1px solid #ddd' }}>
        <Background>
          {/* Render all 6 logos */}
          {logos.map(logo => (
            <Logo 
              key={logo.id} 
              logo={logo} 
              onClick={handleLogoClick} 
            />
          ))}
          
          {/* Debug overlay - hidden by default */}
          {showDebug && (
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1000 }}>
              {logos.map(logo => (
                <div 
                  key={`debug-${logo.id}`}
                  style={{
                    position: 'absolute',
                    left: `${logo.x}px`,
                    top: `${logo.y}px`,
                    width: `${logo.width}px`,
                    height: `${logo.height}px`,
                    border: '3px dashed red',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'red',
                    fontWeight: 'bold',
                    pointerEvents: 'none',
                    zIndex: 999
                  }}
                >
                  {logo.id}
                </div>
              ))}
            </div>
          )}
          
          <Counter found={logosFound} total={logos.length} />
          {showRiddle && <RiddlePanel riddle={riddle} />}
        </Background>
      </div>
      
      {/* Debug button - remove this in production */}
      {false && (
        <div style={{ marginTop: '10px', padding: '10px', background: '#f0f0f0', borderRadius: '5px' }}>
          <button onClick={() => setShowDebug(!showDebug)}>
            {showDebug ? 'Hide' : 'Show'} Debug Overlay
          </button>
        </div>
      )}
    </Container>
  );
};

export default LogoFinder;