import React, { useState } from 'react';
import './App.css';
import MainPage from './components/MainPage';
import GameIntro from './components/GameIntro';
import LogoFinder from './components/toontown/LogoFinder';
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

function App() {
  const [currentPage, setCurrentPage] = useState('main');
  
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        {currentPage === 'main' && (
          <MainPage onContinue={() => navigateTo('intro')} />
        )}
        
        {currentPage === 'intro' && (
          <GameIntro 
            onBack={() => navigateTo('main')} 
            onContinue={() => navigateTo('toontown')} 
          />
        )}
        
        {currentPage === 'toontown' && (
          <LogoFinder 
            onBack={() => navigateTo('intro')} 
          />
        )}
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

