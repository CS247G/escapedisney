import React from 'react';
import styled from 'styled-components';

const CounterContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px
  background-color: ${props => props.theme.colors.white};
  padding: 10px 15px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  font-family: ${props => props.theme.fonts.heading};
  border: 2px solid ${props => props.theme.colors.primary};
`;

const MickeyIcon = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  margin-right: 10px;
  
  &::before, &::after {
    content: '';
    position: absolute;
    background-color: ${props => props.theme.colors.accent};
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
    box-shadow: 90% -20% 0 0 ${props => props.theme.colors.accent};
  }
`;

const CounterText = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  color: white;
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