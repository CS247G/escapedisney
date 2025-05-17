import React from 'react';
import styled from 'styled-components';
import backgroundImg from '../../assets/images/toontown/background.jpg';

const BackgroundContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 100px);
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const Background = ({ children }) => {
  return (
    <BackgroundContainer image={backgroundImg}>
      {children}
    </BackgroundContainer>
  );
};

export default Background;