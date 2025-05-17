import React, { useState } from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  opacity: ${props => props.isVisible ? (props.isHovered ? 0.5 : 0.25) : 0};
  transition: opacity 0.5s ease, transform 0.3s ease;
  transform: ${props => props.isFound ? 'scale(1.5)' : 'scale(1)'};
  cursor: pointer;
  border-radius: 50%;
  
  &:hover {
    opacity: ${props => props.isFound ? 0 : 0.5};
  }
`;

const MickeyLogo = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  
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

const Logo = ({ logo, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <LogoContainer
      x={logo.x}
      y={logo.y}
      width={logo.width}
      height={logo.height}
      isFound={logo.found}
      isVisible={!logo.found}
      isHovered={isHovered}
      onClick={() => !logo.found && onClick(logo.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <MickeyLogo />
    </LogoContainer>
  );
};

export default Logo;