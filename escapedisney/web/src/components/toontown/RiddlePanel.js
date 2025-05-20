import React from 'react';
import styled from 'styled-components';
import NavButton from '../NavButton';

const PanelOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const PanelContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 15px;
  padding: 30px;
  max-width: 600px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  text-align: center;
  font-family: ${props => props.theme.fonts.body};
  animation: pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  border: 3px solid ${props => props.theme.colors.secondary};
  
  @keyframes pop-in {
    0% { transform: scale(0.5); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 20px;
  font-size: 28px;
  font-family: ${props => props.theme.fonts.heading};
`;

const RiddleContent = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-left: 5px solid ${props => props.theme.colors.accent};
  padding: 15px;
  margin-bottom: 20px;
  text-align: left;
  border-radius: 5px;
  font-style: italic;
  white-space: pre-line;
  color: ${props => props.theme.colors.text};
`;

const Instructions = styled.p`
  color: ${props => props.theme.colors.light};
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 25px;
`;

const RiddlePanel = ({ riddle, onComplete }) => {
  return (
    <PanelOverlay>
      <PanelContainer>
        <Title>Congratulations! You found all the hidden Mickeys!</Title>
        <RiddleContent>
          {riddle}
        </RiddleContent>
        <Instructions>
          Now look for puzzle pieces around the classroom according to the riddle!
        </Instructions>
        <NavButton 
          onClick={onComplete} 
          text="Continue to Fantasyland" 
          direction="right" 
        />
      </PanelContainer>
    </PanelOverlay>
  );
};

export default RiddlePanel;
