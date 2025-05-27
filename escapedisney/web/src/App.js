import React, { useState } from 'react';
import './App.css';
import MainPage from './components/MainPage';
import GameIntro from './components/GameIntro';
import LogoFinder from './components/toontown/LogoFinder';
import ShootingGame from './components/ShootingGame';
import LandSelection from './components/LandSelection';
import LockPage from './components/LockPage'; // ADDED: Import LockPage
import NavButton from './components/NavButton';
import styled, { ThemeProvider } from 'styled-components';

// Pastel Disney theme
const theme = {
  colors: {
    primary: '#f8b195', // Soft coral
    secondary: '#f67280', // Soft pink
    accent: '#c06c84', // Muted purple
    light: '#6c5b7b', // Lavender
    dark: '#355c7d', // Blue
    background: '#f9f7f7', // Off-white
    text: '#2e4057', // Dark blue-gray
    white: '#ffffff',
    black: '#333333'
  },
  fonts: {
    heading: "'Bubblegum Sans', cursive",
    body: "'Quicksand', sans-serif"
  }
};

const AppContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.body};
`;

// Placeholder component for lands not yet implemented
const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
`;

const PlaceholderCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 15px;
  padding: 3rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  max-width: 600px;
  margin: 2rem auto;
`;

const PlaceholderTitle = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const PlaceholderText = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const PlaceholderLand = ({ landName, onBack, onComplete }) => {
  const landInfo = {
    fantasyland: {
      icon: '🏰',
      title: 'Fantasyland',
      description: 'Listen to audio clues and play charades to build your word bank for the crossword puzzle. Help Dumbo and friends solve magical riddles!'
    },
    adventureland: {
      icon: '🗺️',
      title: 'Adventureland', 
      description: 'Join Indiana Jones on a treasure hunt! Use the map to direct field agents across the room and discover the hidden location.'
    }
  };

  const info = landInfo[landName];
  
  return (
    <PlaceholderContainer>
      <PlaceholderCard>
        <PlaceholderTitle>
          {info.icon} {info.title}
        </PlaceholderTitle>
        <PlaceholderText>
          {info.description}
        </PlaceholderText>
        <PlaceholderText style={{ fontStyle: 'italic', color: '#666' }}>
          This challenge is coming soon! For now, you can collect a demo number.
        </PlaceholderText>
        
        <ButtonContainer>
          <NavButton 
            onClick={onBack}
            text="Back to Lands"
            direction="left"
          />
          <NavButton 
            onClick={() => onComplete(Math.floor(Math.random() * 9) + 1)}
            text={`Complete ${info.title} (Demo)`}
            direction="right"
          />
        </ButtonContainer>
      </PlaceholderCard>
    </PlaceholderContainer>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState('main');
  const [collectedNumbers, setCollectedNumbers] = useState({
    toontown: null,
    fantasyland: null,
    tomorrowland: null,
    adventureland: null
  });

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const handleNumberCollected = (land, number) => {
    setCollectedNumbers(prev => ({
      ...prev,
      [land]: number
    }));
    // After collecting a number, return to land selection
    navigateTo('lands');
  };

  const allNumbersCollected = Object.values(collectedNumbers).every(num => num !== null);
  const finalCode = Object.values(collectedNumbers).join('');

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        {currentPage === 'main' && (
          <MainPage onContinue={() => navigateTo('lands')} />
        )}
        
        {currentPage === 'lands' && (
          <LandSelection 
            onBack={() => navigateTo('main')}
            onSelectLand={(land) => {
              if (land === 'toontown') {
                navigateTo('intro');
              } else if (land === 'tomorrowland') {
                navigateTo('tomorrowland');
              } else {
                // For other lands, navigate to placeholder
                navigateTo(land);
              }
            }}
            onTestLock={() => navigateTo('lockPage')} // ADDED: Pass lock page navigation
            collectedNumbers={collectedNumbers}
            allNumbersCollected={allNumbersCollected}
            finalCode={finalCode}
          />
        )}
        
        {/* ADDED: Lock Page Route */}
        {currentPage === 'lockPage' && (
          <LockPage 
            onBack={() => navigateTo('lands')}
            onUnlock={() => navigateTo('lands')}
          />
        )}
        
        {currentPage === 'intro' && (
          <GameIntro 
            onBack={() => navigateTo('lands')}
            onContinue={() => navigateTo('toontown')}
          />
        )}
        
        {currentPage === 'toontown' && (
          <LogoFinder 
            onBack={() => navigateTo('intro')}
            onComplete={(number) => handleNumberCollected('toontown', number)}
          />
        )}
        
        {currentPage === 'tomorrowland' && (
          <ShootingGame 
            onBack={() => navigateTo('lands')}
            onComplete={(number) => handleNumberCollected('tomorrowland', number)}
          />
        )}
        
        {/* Placeholder pages for other lands */}
        {(currentPage === 'fantasyland' || currentPage === 'adventureland') && (
          <PlaceholderLand 
            landName={currentPage}
            onBack={() => navigateTo('lands')}
            onComplete={(number) => handleNumberCollected(currentPage, number)}
          />
        )}
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;