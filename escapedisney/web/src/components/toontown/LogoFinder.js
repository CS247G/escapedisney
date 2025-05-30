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

const TimerContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Timer = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.timeWarning ? '#FF4444' : props.theme.colors.secondary};
  background: ${props => props.timeWarning ? 'rgba(255, 68, 68, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  padding: 15px 30px;
  border-radius: 25px;
  display: inline-block;
  border: 3px solid ${props => props.timeWarning ? '#FF4444' : props.theme.colors.secondary};
  animation: ${props => props.timeWarning ? 'pulse 1s infinite' : 'none'};

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

const HintOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 215, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 15;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const HintContainer = styled.div`
  background: linear-gradient(135deg, #FFD700, #FFA500);
  border: 4px solid #FF8C00;
  border-radius: 20px;
  padding: 30px;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: bounceIn 0.6s ease-out;

  @keyframes bounceIn {
    0% { transform: scale(0.3); opacity: 0; }
    50% { transform: scale(1.05); }
    70% { transform: scale(0.9); }
    100% { transform: scale(1); opacity: 1; }
  }
`;

const HintTitle = styled.h2`
  color: #8B4513;
  font-size: 24px;
  margin-bottom: 15px;
  font-family: ${props => props.theme.fonts.heading};
`;

const HintText = styled.p`
  color: #8B4513;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  line-height: 1.4;
`;

const HintButton = styled.button`
  background: #FF8C00;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #FF7F00;
    transform: scale(1.05);
  }
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

// UPDATED: Added onComplete prop
const LogoFinder = ({ onBack, onComplete }) => {
  // Initialize with exactly 6 logos
  const [logos, setLogos] = useState(LOGOS);
  const [logosFound, setLogosFound] = useState(0);
  const [showRiddle, setShowRiddle] = useState(false);
  
  // Timer states
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes = 300 seconds
  const [showHint, setShowHint] = useState(false);
  const [hintShown, setHintShown] = useState(false);

  // Format time for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !showRiddle) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeLeft, showRiddle]);

  // Show hint at 3-minute mark (180 seconds remaining)
  useEffect(() => {
    if (timeLeft === 180 && !hintShown && logosFound < logos.length) {
      setShowHint(true);
      setHintShown(true);
    }
  }, [timeLeft, hintShown, logosFound, logos.length]);

  // Handle logo click
  const handleLogoClick = (id) => {
    console.log(`Clicked logo with id: ${id}`);
    const newLogos = logos.map(logo => 
      logo.id === id ? { ...logo, found: true } : logo
    );
        
    setLogos(newLogos);
    setLogosFound(prev => prev + 1);
  };

  // ADDED: Handle riddle completion
  const handleRiddleComplete = () => {
    // Give them the number 1 for Toontown (as per lock combination 1-9-2-3)
    const toontownNumber = 1;
    onComplete(toontownNumber);
  };

  // Handle hint dismissal
  const handleHintDismiss = () => {
    setShowHint(false);
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
      
      <TimerContainer>
        <Timer timeWarning={timeLeft <= 60}>
          ⏰ Time Remaining: {formatTime(timeLeft)}
        </Timer>
      </TimerContainer>

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
          
          {/* Hint overlay */}
          {showHint && (
            <HintOverlay>
              <HintContainer>
                <HintTitle>💡 Need a Hint?</HintTitle>
                <HintText>
                  Look closely in the <strong>upper left quadrant</strong> of the image! 
                  Some Mickey silhouettes might be hiding in the decorative elements or shadows up there.
                </HintText>
                <HintButton onClick={handleHintDismiss}>
                  Got it! Continue Searching
                </HintButton>
              </HintContainer>
            </HintOverlay>
          )}
          
          {/* UPDATED: Pass onComplete handler to RiddlePanel */}
          {showRiddle && (
            <RiddlePanel
              riddle={riddle}
              onComplete={handleRiddleComplete}
            />
          )}
        </Background>
      </div>
            
      <ButtonContainer>
        <NavButton onClick={onBack} text="Back to Instructions" direction="left" />
      </ButtonContainer>
    </Container>
  );
};

export default LogoFinder;