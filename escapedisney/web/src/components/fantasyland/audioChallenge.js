import React from 'react';
import styled from 'styled-components';
import NavButton from '../NavButton';
import dumboImage from '../../assets/images/fantasyland/dumbo.png';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: ${props => props.theme.colors.background};
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Card = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 15px;
  padding: 2.5rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  max-width: 800px;
  width: 100%;
  margin: 0 auto 2rem auto;
  position: relative;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const DumboImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin-bottom: 1.5rem;
  animation: float 3s ease-in-out infinite;
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
  text-align: center;
`;

const Instructions = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-left: 4px solid ${props => props.theme.colors.accent};
  padding: 1rem;
  margin: 1.5rem 0;
  border-radius: 0 8px 8px 0;
`;

const Highlight = styled.span`
  font-weight: bold;
  color: ${props => props.theme.colors.accent};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  margin-top: 2rem;
`;

const audioChallenge = ({ onBack, onComplete }) => {
  console.log("Rendering AudioChallenge component");
  console.log("onBack is:", typeof onBack === 'function' ? "a function" : "not a function");
  console.log("onComplete is:", typeof onComplete === 'function' ? "a function" : "not a function");
  
  return (
    <PageContainer>
      <Title>Dumbo's Audio Charades Challenge</Title>
      
      <Card>
        <ContentContainer>
          <DumboImage src={dumboImage} alt="Dumbo" />
          
          <Description>
            Welcome to Dumbo's Audio Charades Challenge! In this activity, you'll help Dumbo solve puzzles by acting out words you hear.
          </Description>
          
          <Instructions>
            <p><strong>How to play:</strong></p>
            <p>1. Listen carefully to the audio story about Dumbo's adventures</p>
            <p>2. When you hear a <Highlight>key word</Highlight>, pause the audio</p>
            <p>3. Act out the word using charades for your team to guess</p>
            <p>4. Add each correctly guessed word to your word bank</p>
            <p>5. Collect all words to complete the challenge!</p>
          </Instructions>
          
          <Description>
            <strong>Remember:</strong> The park manager passes by every 7 minutes. Work quickly as a team to complete this challenge!
          </Description>
        </ContentContainer>
      </Card>
      
      <ButtonContainer>
        <NavButton 
          onClick={onBack ? onBack : () => console.error("onBack is undefined")} 
          text="Back to Instructions" 
          direction="left" 
        />
        <NavButton 
          onClick={onComplete ? onComplete : () => console.error("onComplete is undefined")} 
          text="Continue to Crossword" 
          direction="right" 
        />
      </ButtonContainer>
    </PageContainer>
  );
};

export default audioChallenge;