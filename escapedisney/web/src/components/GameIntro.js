
import React from 'react';
import styled from 'styled-components';
import NavButton from './NavButton';

const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
`;

const IntroCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 15px;
  padding: 2.5rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  text-align: center;
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 2rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

// Removed onBack prop since we don't need it anymore
const GameIntro = ({ onContinue }) => {
  return (
    <IntroContainer>
      <IntroCard>
        <Title>Welcome to Disney Escape Room!</Title>
        
        <Description>
          You've been locked inside the Disney park after hours! To escape, you'll need to complete
          challenges in each land.
        </Description>
        
        <Description>
          Your first challenge is in Toontown, where you need to find 6 hidden Mickey silhouettes in
          the image. Look carefully - they're disguised throughout the scene!
        </Description>
        
        <Description>
          Once you find all 6 hidden Mickeys, you'll receive a riddle that will help you solve the next
          part of the challenge.
        </Description>
        
        <ButtonContainer>
          {/* Removed the Back button, only keeping the Start Challenge button */}
          <NavButton 
            onClick={onContinue} 
            text="Start Challenge" 
            direction="right" 
          />
        </ButtonContainer>
      </IntroCard>
    </IntroContainer>
  );
};

export default GameIntro;