import React from 'react';
import styled from 'styled-components';
import NavButton from './NavButton';

const InstructionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f8b195, #f67280);
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 900px;
  text-align: center;
`;

const MagicalCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  border: 3px solid #f8b195;
  backdrop-filter: blur(10px);
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 3rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
`;

const Subtitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.8rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 2rem;
`;

const InstructionText = styled.p`
  font-size: 1.3rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.body};
`;

const HighlightBox = styled.div`
  background: linear-gradient(90deg, #ffe6ec, #fff0f4);
  border: 3px solid ${props => props.theme.colors.secondary}33;
  padding: 2rem;
  border-radius: 15px;
  margin: 2rem 0;
  text-align: center;
`;

const ImportantText = styled.span`
  background: linear-gradient(90deg, #f8b195, #f67280);
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  font-weight: bold;
  color: white;
  box-shadow: 0 2px 8px rgba(246, 114, 128, 0.3);
`;

const EmojiIcon = styled.span`
  font-size: 2rem;
  margin: 0 0.5rem;
`;

const ButtonContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;

// Floating magical elements
const FloatingElement = styled.div`
  position: absolute;
  opacity: 0.1;
  font-size: 3rem;
  animation: float 6s ease-in-out infinite;
  pointer-events: none;
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`;

const InstructionPage = ({ onContinue }) => {
  return (
    <InstructionContainer>
      {/* Floating magical elements */}
      <FloatingElement style={{ top: '10%', left: '10%', animationDelay: '0s' }}>✨</FloatingElement>
      <FloatingElement style={{ top: '20%', right: '15%', animationDelay: '2s' }}>🏰</FloatingElement>
      <FloatingElement style={{ bottom: '20%', left: '20%', animationDelay: '4s' }}>🎭</FloatingElement>
      <FloatingElement style={{ bottom: '10%', right: '10%', animationDelay: '1s' }}>🎪</FloatingElement>
      <FloatingElement style={{ top: '50%', left: '5%', animationDelay: '3s' }}>🎨</FloatingElement>
      <FloatingElement style={{ top: '60%', right: '5%', animationDelay: '5s' }}>🎠</FloatingElement>

      <ContentWrapper>
        <MagicalCard>
          <Title>
            <EmojiIcon>🏰</EmojiIcon>
            Welcome to Disney's Escape Adventure!
            <EmojiIcon>✨</EmojiIcon>
          </Title>
          
          <Subtitle>Get Ready for an Immersive Experience!</Subtitle>
          
          <InstructionText>
            You're about to embark on a magical journey through four enchanted Disney lands. 
            Each land holds secrets and challenges that will test your wit, creativity, and teamwork!
          </InstructionText>

          <HighlightBox>
            <InstructionText style={{ marginBottom: '1rem', fontSize: '1.4rem', fontWeight: 'bold' }}>
              <EmojiIcon>🎯</EmojiIcon> Your Mission <EmojiIcon>🎯</EmojiIcon>
            </InstructionText>
            <InstructionText style={{ marginBottom: '0' }}>
              Complete challenges in each Disney land to collect <ImportantText>four special numbers</ImportantText>. 
              These numbers will form your final escape code to break free from the park!
            </InstructionText>
          </HighlightBox>

          <InstructionText>
            <strong>🎪 Important Instructions:</strong>
          </InstructionText>
          
          <InstructionText style={{ textAlign: 'left', maxWidth: '700px', margin: '0 auto 2rem auto' }}>
            • <strong>Stay Immersed:</strong> Think like you're truly trapped in Disney's magical world<br/>
            • <strong>Work Together:</strong> Some challenges require teamwork and communication<br/>
            • <strong>Pay Attention:</strong> Every clue matters for your final escape<br/>
            • <strong>Have Fun:</strong> Embrace the Disney magic and enjoy the adventure!
          </InstructionText>

          <HighlightBox>
            <InstructionText style={{ marginBottom: '1rem', fontSize: '1.2rem', color: '#c06c84' }}>
              <EmojiIcon>🔐</EmojiIcon> <strong>Testing Your Escape Code</strong> <EmojiIcon>🔐</EmojiIcon>
            </InstructionText>
            <InstructionText style={{ marginBottom: '0' }}>
              After starting your adventure, <ImportantText>scroll down to the bottom</ImportantText> of the land selection page 
              to find the <ImportantText>Interactive Escape Code</ImportantText> section where you can test your collected numbers!
            </InstructionText>
          </HighlightBox>

          <InstructionText style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#c06c84' }}>
            The magic begins now... Are you ready to escape the most magical place on earth? ✨
          </InstructionText>

          <ButtonContainer>
            <NavButton 
              onClick={onContinue}
              text="Enter the Magic Kingdom"
              direction="right"
            />
          </ButtonContainer>
        </MagicalCard>
      </ContentWrapper>
    </InstructionContainer>
  );
};

export default InstructionPage;