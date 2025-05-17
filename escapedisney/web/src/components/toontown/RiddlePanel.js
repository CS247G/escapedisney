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
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  max-width: 600px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  text-align: center;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  animation: pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  
  @keyframes pop-in {
    0% { transform: scale(0.5); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
`;

const Title = styled.h2`
  color: #e91e63;
  margin-bottom: 20px;
  font-size: 28px;
`;

const RiddleContent = styled.div`
  background-color: #f9f6e5;
  border-left: 5px solid #ffca28;
  padding: 15px;
  margin-bottom: 20px;
  text-align: left;
  border-radius: 5px;
  font-style: italic;
  white-space: pre-line;
`;

const Instructions = styled.p`
  color: #5e35b1;
  font-weight: bold;
  margin-top: 20px;
`;

const RiddlePanel = ({ riddle }) => {
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
      </PanelContainer>
    </PanelOverlay>
  );
};

export default RiddlePanel;