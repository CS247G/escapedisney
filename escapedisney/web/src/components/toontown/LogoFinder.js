import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Background from './Background';
import Logo from './Logo';
import Counter from './Counter';
import RiddlePanel from './RiddlePanel';
import NavButton from '../NavButton';

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 20px;
  font-family: ${props => props.theme.fonts.heading};
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
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

const LogoFinder = ({ onBack }) => {
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

  return (
    <Container>
      <Title>Find the Hidden Mickeys!</Title>
      <div style={{ position: 'relative', marginBottom: '20px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <Background>
          {/* Render all 6 logos */}
          {logos.map(logo => (
            <Logo 
              key={logo.id} 
              logo={logo} 
              onClick={handleLogoClick} 
            />
          ))}
          
          <Counter found={logosFound} total={logos.length} />
          {showRiddle && <RiddlePanel riddle={riddle} />}
        </Background>
      </div>
      
      <ButtonContainer>
        <NavButton onClick={onBack} text="Back to Instructions" direction="left" />
      </ButtonContainer>
    </Container>
  );
};

export default LogoFinder;
