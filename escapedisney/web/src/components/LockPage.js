import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const celebrate = keyframes`
  0% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.1) rotate(5deg); }
  50% { transform: scale(1.2) rotate(-5deg); }
  75% { transform: scale(1.1) rotate(5deg); }
  100% { transform: scale(1) rotate(0deg); }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 1; transform: translateY(0px); }
  50% { opacity: 0.5; transform: translateY(-10px); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 2px, transparent 2px),
    radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 2px, transparent 2px);
  background-size: 50px 50px;
  animation: ${sparkle} 3s infinite ease-in-out;
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
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const LockContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 3rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  
  ${props => props.success && `
    animation: ${celebrate} 1s ease-in-out;
    background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
    border-color: #28a745;
  `}
  
  ${props => props.error && `
    animation: ${shake} 0.5s ease-in-out;
  `}
`;

const LockIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  
  ${props => props.success && `
    animation: ${celebrate} 1s ease-in-out;
  `}
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${props => props.success ? '#155724' : '#2c3e50'};
  margin-bottom: 1rem;
  font-family: 'Bubblegum Sans', cursive;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: ${props => props.success ? '#155724' : '#2c3e50'};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const LandLabels = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
`;

const CombinationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CombinationInput = styled.input`
  width: 60px;
  height: 60px;
  border: 3px solid ${props => {
    if (props.success) return '#28a745';
    if (props.error) return '#dc3545';
    return props.hasValue ? '#667eea' : '#ddd';
  }};
  border-radius: 10px;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  background: ${props => {
    if (props.success) return '#d4edda';
    if (props.error) return '#f8d7da';
    return props.hasValue ? '#f0f4ff' : 'white';
  }};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #764ba2;
    box-shadow: 0 0 10px rgba(118, 75, 162, 0.3);
  }
  
  &:disabled {
    background: #f5f5f5;
    color: #999;
  }
`;

const TestButton = styled.button`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const StatusMessage = styled.div`
  padding: 1rem;
  border-radius: 10px;
  margin: 1rem 0;
  font-weight: bold;
  font-size: 1.1rem;
  
  ${props => props.type === 'success' && `
    background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
    color: #155724;
    border: 2px solid #28a745;
    animation: ${celebrate} 1s ease-in-out;
  `}
  
  ${props => props.type === 'error' && `
    background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
    color: #721c24;
    border: 2px solid #dc3545;
    animation: ${shake} 0.5s ease-in-out;
  `}
`;

const CelebrationEmojis = styled.div`
  font-size: 3rem;
  margin: 1rem 0;
  animation: ${celebrate} 2s infinite ease-in-out;
`;

const ContinueButton = styled.button`
  background: linear-gradient(135deg, #28a745, #20c997);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);
  }
`;

const LockPage = ({ onBack, onUnlock }) => {
  const [combination, setCombination] = useState(['', '', '', '']);
  const [statusMessage, setStatusMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inputError, setInputError] = useState(false);
  
  const correctCombination = ['1', '9', '2', '3'];
  const landNames = ['Toontown', 'Fantasyland', 'Tomorrowland', 'Adventureland'];

  const handleInputChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newCombination = [...combination];
      newCombination[index] = value;
      setCombination(newCombination);
      setStatusMessage('');
      setInputError(false);
    }
  };

  const testCombination = () => {
    if (combination.some(digit => digit === '')) {
      setStatusMessage('Please enter all 4 numbers!');
      setMessageType('error');
      setInputError(true);
      return;
    }

    const isCorrect = combination.every((digit, index) => digit === correctCombination[index]);
    
    if (isCorrect) {
      setIsUnlocked(true);
      setStatusMessage('🎉 COMBINATION UNLOCKED! 🎉');
      setMessageType('success');
      setInputError(false);
      
      // Call onUnlock after a short delay to let animation finish
      setTimeout(() => {
        onUnlock && onUnlock();
      }, 3000);
    } else {
      setStatusMessage('❌ Incorrect combination! Try again.');
      setMessageType('error');
      setInputError(true);
    }
  };

  const resetCombination = () => {
    setCombination(['', '', '', '']);
    setStatusMessage('');
    setMessageType('');
    setInputError(false);
  };

  const isComplete = combination.every(digit => digit !== '');

  return (
    <PageContainer>
      <BackgroundPattern />
      
      <BackButton onClick={onBack}>← Back to Lands</BackButton>
      
      <LockContainer success={isUnlocked} error={inputError}>
        <LockIcon success={isUnlocked}>
          {isUnlocked ? '🔓' : '🔒'}
        </LockIcon>
        
        <Title success={isUnlocked}>
          {isUnlocked ? 'Access Granted!' : 'Test Lock Combination'}
        </Title>
        
        <Description success={isUnlocked}>
          {isUnlocked 
            ? 'Congratulations! You have successfully unlocked the game. You can now access all Disney lands!'
            : 'Enter the 4-digit combination to unlock access to all Disney lands. Each number corresponds to a specific land.'
          }
        </Description>

        {!isUnlocked && (
          <>
            <LandLabels>
              {landNames.map(name => (
                <div key={name}>{name}</div>
              ))}
            </LandLabels>
            
            <CombinationGrid>
              {combination.map((value, index) => (
                <CombinationInput
                  key={index}
                  type="text"
                  value={value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  maxLength={1}
                  hasValue={value !== ''}
                  error={inputError}
                  success={isUnlocked}
                  placeholder="?"
                />
              ))}
            </CombinationGrid>

            <TestButton 
              onClick={testCombination}
              disabled={!isComplete}
            >
              🔓 Test Combination
            </TestButton>

            {isComplete && (
              <button
                onClick={resetCombination}
                style={{
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  marginLeft: '1rem'
                }}
              >
                Clear
              </button>
            )}
          </>
        )}

        {statusMessage && (
          <StatusMessage type={messageType}>
            {statusMessage}
          </StatusMessage>
        )}

        {isUnlocked && (
          <>
            <CelebrationEmojis>
              🎊 🎉 ✨ 🎊 🎉
            </CelebrationEmojis>
            
            <ContinueButton onClick={onBack}>
              Continue to Disney Lands! 🏰
            </ContinueButton>
          </>
        )}
      </LockContainer>
    </PageContainer>
  );
};

export default LockPage;