import React, { useState, useEffect } from 'react';
import './App.css';
import MainPage from './components/MainPage';
import GameIntro from './components/GameIntro';
import LogoFinder from './components/toontown/LogoFinder';
import PuzzleInstructions from './components/toontown/PuzzleInstructions';
import FantasylandIntro from './components/fantasyland/fantasylandIntro';
import AudioChallenge from './components/fantasyland/audioChallenge';
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

function App() {
  // Start directly with the game intro instead of the main page
  const [currentPage, setCurrentPage] = useState('intro');
  
  useEffect(() => {
    console.log("Current page:", currentPage);
  }, [currentPage]);
  
  const [gameState, setGameState] = useState({
    toontown: { completed: false, number: '' },
    fantasyland: { completed: false, number: '' }
  });
  
  const navigateTo = (page) => {
    console.log(`Navigating to: ${page}`);
    setCurrentPage(page);
  };
  
  const completeChallenge = (land, number) => {
    console.log(`Completing challenge for ${land} with number ${number}`);
    setGameState(prevState => ({
      ...prevState,
      [land]: { completed: true, number: number || '' }
    }));
  };

  // After finding all hidden Mickeys, navigate to puzzle instructions
  const handleMickeysFound = () => {
    console.log("All Mickeys found, navigating to puzzle instructions");
    navigateTo('puzzle-instructions');
  };

  // After finding puzzle pieces in classroom, navigate to Fantasyland
  const handlePuzzlePiecesFound = () => {
    console.log("Puzzle pieces found, completing Toontown challenge");
    completeChallenge('toontown', '7');
    navigateTo('fantasyland-intro');
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        {/* Debug info - you can remove this in production */}
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#eee', 
          fontSize: '12px', 
          fontFamily: 'monospace',
          display: process.env.NODE_ENV === 'development' ? 'block' : 'none'
        }}>
          Current Page: {currentPage}
        </div>
        
        {/* Start with GameIntro - no back button needed */}
        {currentPage === 'intro' && (
          <GameIntro 
            onContinue={() => navigateTo('toontown')} 
          />
        )}
        
        {currentPage === 'toontown' && (
          <LogoFinder 
            onBack={() => navigateTo('intro')} 
            onComplete={handleMickeysFound}
          />
        )}
        
        {/* New page for puzzle piece instructions */}
        {currentPage === 'puzzle-instructions' && (
          <PuzzleInstructions 
            onContinue={handlePuzzlePiecesFound}
          />
        )}
        
        {currentPage === 'fantasyland-intro' && (
          <FantasylandIntro 
            onBack={() => navigateTo('puzzle-instructions')} 
            onContinue={() => navigateTo('fantasyland-audio')} 
          />
        )}
        
        {currentPage === 'fantasyland-audio' && (
          <AudioChallenge 
            onBack={() => navigateTo('fantasyland-intro')}
            onComplete={() => {
              completeChallenge('fantasyland', '3');
              navigateTo('crossword');
            }}
          />
        )}
        
        {currentPage === 'crossword' && (
          <div>
            <h1>Crossword Challenge</h1>
            <p>This would be the crossword challenge component</p>
            <button onClick={() => navigateTo('fantasyland-audio')}>Back</button>
          </div>
        )}
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;