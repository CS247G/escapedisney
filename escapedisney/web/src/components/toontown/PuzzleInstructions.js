import React from 'react';
import styled from 'styled-components';
import NavButton from '../NavButton';
import fantasylandImage from '../../assets/images/fantasyland/fantasyland.png';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
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
  text-align: center;
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
  width: 100%;
  margin-top: 2rem;
`;

// This component serves as the instruction page after finding puzzle pieces
const PuzzleInstructions = ({ onContinue }) => {
  return (
    <PageContainer>
      <ContentWrapper>
        <Card>
          <Title>Congrats on finishing this level. Your clue is as follows.</Title>
          
          <Description style={{ fontStyle: 'italic', textAlign: 'center' }}>
            <em>Four pieces scattered, not by chance,<br />
            Together they make Mickey's stance.<br />
            One you're given—no need to chase,<br />
            The rest are hiding in their place:</em>
          </Description>
          
          <Description style={{ fontStyle: 'italic', textAlign: 'center' }}>
            <em>One hides where toons might rest their feet,<br />
            Not on a chair, but under your seat.</em>
          </Description>
          
          <Description style={{ fontStyle: 'italic', textAlign: 'center' }}>
            <em>Another waits where guests walk in,<br />
            Near the place where tales begin.</em>
          </Description>
          
          <Description style={{ fontStyle: 'italic', textAlign: 'center' }}>
            <em>One peeks out where books may stay,<br />
            <em>Stacked up high or tucked away.</em>
          </Description>
          
          <Description style={{ fontStyle: 'italic', textAlign: 'center' }}>
            <em>Put all four numbers side by side,<br />
            They'll help you turn the final tide.<br />
            The Mickeys show the code you seek—<br />
            To leave this land of toon mystique!</em>
          </Description>
          
          <ButtonContainer>
            <NavButton 
              onClick={onContinue}
              text="Continue Adventure" // CHANGED: From "Continue to Fantasyland"
              direction="right"
            />
          </ButtonContainer>
        </Card>
      </ContentWrapper>
    </PageContainer>
  );
};

export default PuzzleInstructions;