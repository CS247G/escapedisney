import React from 'react';
import styled from 'styled-components';

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

// Create a button styled like the one in your screenshot
const ContinueButton = styled.button`
  background-color: #6c5b7b; /* The lavender color from your theme */
  color: white;
  border: none;
  border-radius: 25px;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #c06c84; /* The accent color from your theme */
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Arrow = styled.span`
  margin-left: 8px;
`;

const RiddlePanel = ({ riddle, onComplete }) => {
  // This function will be called when the button is clicked
  const handleClick = () => {
    console.log("Find puzzle pieces button clicked");
    
    // Call onComplete to navigate to the next stage
    if (typeof onComplete === 'function') {
      onComplete();
    } else {
      console.error("onComplete is not a function or is undefined");
    }
  };

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
        
        {/* Changed button text to match new instruction */}
        <ContinueButton onClick={handleClick}>
          Find Puzzle Pieces <Arrow>→</Arrow>
        </ContinueButton>
      </PanelContainer>
    </PanelOverlay>
  );
};

export default RiddlePanel;