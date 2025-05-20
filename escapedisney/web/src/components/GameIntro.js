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
  text-align: center;
  background-color: ${props => props.theme.colors.background};
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
`;

const IntroText = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 800px;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  margin-top: 2rem;
`;

const Card = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
`;

const GameIntro = ({ onBack, onContinue }) => {
  return (
    <IntroContainer>
      <Card>
        <Title>Welcome to Disney Escape Room!</Title>
        <IntroText>
          You've been locked inside the Disney park after hours! To escape, you'll need to complete challenges in each land.
        </IntroText>
        
        <IntroText>
          Your first challenge is in Toontown, where you need to find 6 hidden Mickey silhouettes in the image. 
          Look carefully - they're disguised throughout the scene!
        </IntroText>
        
        <IntroText>
          Once you find all 6 hidden Mickeys, you'll receive a riddle that will help you solve the next part of the challenge.
        </IntroText>
        
        <ButtonContainer>
          <NavButton onClick={onBack} text="Back" direction="left" />
          <NavButton onClick={onContinue} text="Start Challenge" direction="right" />
        </ButtonContainer>
      </Card>
    </IntroContainer>
  );
};

export default GameIntro;