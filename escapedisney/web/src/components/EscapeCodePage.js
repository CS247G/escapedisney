import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const sparkle = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
`;

const successPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #ff6b9d, #ffa726, #ab47bc);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const BackButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 25px;
  padding: 0.8rem 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    transform: translateY(-2px);
  }
`;

const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 3rem;
  max-width: 600px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #ff6b9d;
  margin-bottom: 1rem;
  animation: ${sparkle} 2s infinite;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const CodeInputSection = styled.div`
  margin: 2rem 0;
`;

const LandLabels = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
`;

const CodeInputGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CodeInput = styled.input`
  width: 60px;
  height: 60px;
  border: 3px solid ${props => props.hasValue ? '#4CAF50' : '#ff6b9d'};
  border-radius: 10px;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  background: ${props => props.hasValue ? '#e8f5e8' : 'white'};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #ab47bc;
    box-shadow: 0 0 10px rgba(171, 71, 188, 0.3);
  }
  
  &:disabled {
    background: #f5f5f5;
    color: #999;
  }
`;

const TestButton = styled.button`
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(76, 175, 80, 0.3);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ProgressSection = styled.div`
  border-top: 2px solid #f0f0f0;
  padding-top: 2rem;
  margin-top: 2rem;
`;

const ProgressTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const ProgressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ProgressBox = styled.div`
  width: 50px;
  height: 50px;
  border: 2px solid ${props => props.collected ? '#4CAF50' : '#ddd'};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  background: ${props => props.collected ? '#e8f5e8' : '#f9f9f9'};
  color: ${props => props.collected ? '#4CAF50' : '#999'};
  transition: all 0.3s ease;
  animation: ${props => props.collected ? successPulse : 'none'} 1s ease-in-out;
`;

const ProgressLabels = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  font-size: 0.8rem;
  color: #666;
  text-align: center;
`;

const StatusMessage = styled.div`
  padding: 1rem;
  border-radius: 10px;
  margin: 1rem 0;
  font-weight: bold;
  
  ${props => props.type === 'success' && `
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  `}
  
  ${props => props.type === 'error' && `
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  `}
  
  ${props => props.type === 'info' && `
    background: #d1ecf1;
    color: #0c5460;
    border: 1px solid #bee5eb;
  `}
`;

const EscapeCodePage = ({ onBack, collectedNumbers, allNumbersCollected, finalCode }) => {
  const [inputValues, setInputValues] = useState(['', '', '', '']);
  const [statusMessage, setStatusMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleInputChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newValues = [...inputValues];
      newValues[index] = value;
      setInputValues(newValues);
      setStatusMessage('');
    }
  };

  const testCode = () => {
    const enteredCode = inputValues.join('');
    
    if (enteredCode.length !== 4) {
      setStatusMessage('Please enter all 4 numbers!');
      setMessageType('error');
      return;
    }

    if (!allNumbersCollected) {
      setStatusMessage('Complete all challenges first to discover the correct code!');
      setMessageType('info');
      return;
    }

    if (enteredCode === finalCode) {
      setStatusMessage('🎉 Congratulations! You have successfully escaped Disney! 🎉');
      setMessageType('success');
    } else {
      setStatusMessage('❌ Incorrect code. Keep trying!');
      setMessageType('error');
    }
  };

  const lands = ['Toontown', 'Fantasyland', 'Tomorrowland', 'Adventureland'];
  const landKeys = ['toontown', 'fantasyland', 'tomorrowland', 'adventureland'];

  return (
    <PageContainer>
      <BackButton onClick={onBack}>← Back to Lands</BackButton>
      
      <ContentCard>
        <Title>Interactive Escape Code</Title>
        
        <Description>
          Enter your discovered numbers and test the code to escape!
        </Description>

        <CodeInputSection>
          <LandLabels>
            {lands.map(land => (
              <div key={land}>{land}</div>
            ))}
          </LandLabels>
          
          <CodeInputGrid>
            {inputValues.map((value, index) => (
              <CodeInput
                key={index}
                type="text"
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                maxLength={1}
                hasValue={value !== ''}
                placeholder="?"
              />
            ))}
          </CodeInputGrid>

          <TestButton 
            onClick={testCode}
            disabled={inputValues.some(v => v === '')}
          >
            🔓 Test Escape Code
          </TestButton>

          {statusMessage && (
            <StatusMessage type={messageType}>
              {statusMessage}
            </StatusMessage>
          )}
        </CodeInputSection>

        <ProgressSection>
          <ProgressTitle>Your Progress:</ProgressTitle>
          
          <ProgressGrid>
            {landKeys.map((land, index) => (
              <ProgressBox key={land} collected={collectedNumbers[land] !== null}>
                {collectedNumbers[land] || '?'}
              </ProgressBox>
            ))}
          </ProgressGrid>
          
          <ProgressLabels>
            {lands.map(land => (
              <div key={land}>{land}</div>
            ))}
          </ProgressLabels>

          <Description style={{ fontSize: '0.9rem', fontStyle: 'italic', marginTop: '1rem' }}>
            Complete all challenges to discover the escape code!
          </Description>
        </ProgressSection>
      </ContentCard>
    </PageContainer>
  );
};

export default EscapeCodePage;