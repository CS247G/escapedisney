import React from 'react';
import styled from 'styled-components';
import NavButton from '../NavButton';
import dumboImage from '../../assets/images/fantasyland/dumbo.png';
import fantasylandImage from '../../assets/images/fantasyland/fantasyland.png';

const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  background-image: url(${fantasylandImage});
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 1;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 800px;
`;

const Card = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 15px;
  padding: 2.5rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  margin: 0 auto;
  border: 3px solid ${props => props.theme.colors.primary}33;
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 1.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.8rem;
  color: ${props => props.theme.colors.accent};
  margin: 1rem 0;
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
`;

const Highlight = styled.span`
  font-weight: bold;
  color: ${props => props.theme.colors.accent};
`;

const CharacterImage = styled.img`
  width: 120px;
  height: 120px;
  margin: 1rem auto;
  object-fit: contain;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  margin: 2rem auto 0;
`;

// Renamed to match the case in your import statement in App.js
const fantasylandIntro = ({ onBack, onContinue }) => {
  console.log("Rendering FantasylandIntro component");
  console.log("onBack is:", typeof onBack === 'function' ? "a function" : "not a function");
  console.log("onContinue is:", typeof onContinue === 'function' ? "a function" : "not a function");
  
  return (
    <IntroContainer>
      <ContentWrapper>
        <Card>
          <Title>Welcome to Fantasyland!</Title>
          
          <CharacterImage src={dumboImage} alt="Dumbo" />
          
          <Subtitle>Dumbo's Audio Charades Challenge</Subtitle>
          
          <Description>
            Now that you've escaped Toontown, you've arrived at Fantasyland! Here, 
            <Highlight> Dumbo needs your help</Highlight> to solve a special audio puzzle.
          </Description>
          
          <Description>
            <strong>How to play:</strong> You'll hear an audio clip of Dumbo's adventures. When you 
            hear a <Highlight>key word</Highlight>, pause the audio and act it out for your teammates 
            using charades. Your team must guess the word correctly to add it to your word bank.
          </Description>
          
          <Description>
            <strong>Your goal:</strong> Collect all the key words to build your word bank. 
            These words will help you solve the crossword puzzle in the next challenge!
          </Description>
          
          <Description>
            <strong>Remember:</strong> The park manager passes by every 7 minutes. Try to complete 
            this challenge quickly!
          </Description>
          
          <ButtonContainer>
            <NavButton 
              onClick={onBack ? onBack : () => console.error("onBack is undefined")} 
              text="Back to Toontown" 
              direction="left" 
            />
            <NavButton 
              onClick={onContinue ? onContinue : () => console.error("onContinue is undefined")} 
              text="Start Challenge" 
              direction="right" 
            />
          </ButtonContainer>
        </Card>
      </ContentWrapper>
    </IntroContainer>
  );
};

export default fantasylandIntro;