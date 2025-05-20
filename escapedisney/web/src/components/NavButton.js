import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: 30px;
  padding: 12px 24px;
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: ${props => props.theme.colors.light};
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const ArrowRight = styled.span`
  margin-left: 8px;
`;

const ArrowLeft = styled.span`
  margin-right: 8px;
`;

const NavButton = ({ onClick, text, direction }) => {
  return (
    <Button onClick={onClick}>
      {direction === 'left' && <ArrowLeft>←</ArrowLeft>}
      {text}
      {direction === 'right' && <ArrowRight>→</ArrowRight>}
    </Button>
  );
};

export default NavButton;