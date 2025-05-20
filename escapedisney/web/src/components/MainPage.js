import React from 'react';
import styled from 'styled-components';
import disneyEscapeImg from '../assets/images/toontown/disney-1.jpeg';
import NavButton from './NavButton';

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
`;

const Image = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 5%;
`;

const MainTitle = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 4rem;
  color: ${props => props.theme.colors.white};
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const MainPage = ({ onContinue }) => {
  return (
    <MainPageContainer>
      <Image src={disneyEscapeImg}>
        <NavButton 
          onClick={onContinue} 
          text="Begin Your Adventure" 
          direction="right"
        />
      </Image>
    </MainPageContainer>
  );
};

export default MainPage;