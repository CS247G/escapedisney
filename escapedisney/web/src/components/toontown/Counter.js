import React from 'react';
import styled from 'styled-components';

const CounterContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 15px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  font-family: 'Comic Sans MS', cursive, sans-serif;
`;

const MickeyIcon = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  margin-right: 10px;
  
  &::before, &::after {
    content: '';
    position: absolute;
    background-color: #000;
    border-radius: 50%;
  }
  
  /* Mickey's head */
  &::before {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  
  /* Mickey's ears */
  &::after {
    width: 50%;
    height: 50%;
    top: -20%;
    left: -20%;
    box-shadow: 90% -20% 0 0 #000;
  }
`;

const CounterText = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  color: #282c34;
`;

const Counter = ({ found, total }) => {
  return (
    <CounterContainer>
      <MickeyIcon />
      <CounterText>
        {found} / {total} Mickeys Found
      </CounterText>
    </CounterContainer>
  );
};

export default Counter;