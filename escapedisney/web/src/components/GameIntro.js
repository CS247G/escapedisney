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

const HighlightBox = styled.div`
  background: linear-gradient(135deg, #FFE4E1, #FFF0F5);
  border: 2px solid #FF69B4;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  box-shadow: 0 4px 8px rgba(255, 105, 180, 0.2);
`;

const ChallengeText = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  color: #FF1493;
  margin-bottom: 0.5rem;
`;

const InstructionText = styled.p`
  font-size: 1.1rem;
  color: #8B008B;
  margin: 0;
`;

const Highlight = styled.span`
  background: linear-gradient(120deg, #FFD700 0%, #FFA500 100%);
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: bold;
  color: #8B4513;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const AnimatedButton = styled(NavButton)`
  animation: pulse 2s infinite;
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(255, 105, 180, 0.4);
  
  @keyframes pulse {
    0% {
      box-shadow: 0 6px 20px rgba(255, 105, 180, 0.4);
    }
    50% {
      box-shadow: 0 8px 25px rgba(255, 105, 180, 0.6);
      transform: scale(1.12);
    }
    100% {
      box-shadow: 0 6px 20px rgba(255, 105, 180, 0.4);
      transform: scale(1.1);
    }
  }
  
  &:hover {
    transform: scale(1.15);
    box-shadow: 0 10px 30px rgba(255, 105, 180, 0.6);
  }
`;

// Removed onBack prop since we don't need it anymore
const GameIntro = ({ onContinue }) => {
  return (
    <IntroContainer>
      <IntroCard>
        <Title>Welcome to Disney Escape Room!</Title>
        
        <Description>
          You've been locked inside the Disney park after hours! To escape, you'll need to complete challenges in each land.
        </Description>
        
        <HighlightBox>
          <ChallengeText>🎯 YOUR MISSION:</ChallengeText>
          <InstructionText>
            Find <Highlight>6 hidden Mickey silhouettes</Highlight> in the Toontown image
          </InstructionText>
        </HighlightBox>
        
        <Description>
          <strong>💡 Tip:</strong> Look carefully - the Mickey silhouettes are <Highlight>cleverly disguised</Highlight> throughout the scene! They might be hiding in shadows, objects, or decorations.
        </Description>
        
        <Description>
          Once you find all <Highlight>6 hidden Mickeys</Highlight>, you'll receive a special riddle that will help you solve the next part of the challenge.
        </Description>
        
        <ButtonContainer>
          <AnimatedButton 
            onClick={onContinue} 
            text="🚀 Start Your Adventure!" 
            direction="right" 
          />
        </ButtonContainer>
      </IntroCard>
    </IntroContainer>
  );
};

export default GameIntro;