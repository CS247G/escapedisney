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

// Define Mickey logo positions
const logoPositions = [
  { id: 1, x: 120, y: 80, width: 40, height: 40, found: false },
  { id: 2, x: 450, y: 150, width: 35, height: 35, found: false },
  { id: 3, x: 650, y: 200, width: 30, height: 30, found: false },
  { id: 4, x: 200, y: 350, width: 45, height: 45, found: false },
  { id: 5, x: 550, y: 400, width: 50, height: 50, found: false },
  { id: 6, x: 350, y: 250, width: 40, height: 40, found: false },
];

const riddle = `When the mouse plays with his friends,
Look for pieces around the bend.
Some under seats, some high on shelves,
Find all six to help yourselves.
Once the picture is complete,
The first number you shall meet.`;

const LogoFinder = () => {
  const [logos, setLogos] = useState(logoPositions);
  const [logosFound, setLogosFound] = useState(0);
  const [showRiddle, setShowRiddle] = useState(false);

  // Handle logo click
  const handleLogoClick = (id) => {
    const newLogos = logos.map(logo => 
      logo.id === id ? { ...logo, found: true } : logo
    );
    
    setLogos(newLogos);
    setLogosFound(logosFound + 1);
    
    // Play sound effect
    const sound = new Audio('/assets/sounds/logo_found.mp3');
    sound.play();
  };

  // Check if all logos are found
  useEffect(() => {
    if (logosFound === logoPositions.length) {
      setTimeout(() => {
        setShowRiddle(true);
      }, 1000);
    }
  }, [logosFound]);

  return (
    <Container>
      <Title>Find the Hidden Mickeys!</Title>
      <Background>
        {logos.map(logo => (
          <Logo 
            key={logo.id} 
            logo={logo} 
            onClick={handleLogoClick} 
          />
        ))}
        <Counter found={logosFound} total={logoPositions.length} />
        {showRiddle && <RiddlePanel riddle={riddle} />}
      </Background>
    </Container>
  );
};

export default LogoFinder;