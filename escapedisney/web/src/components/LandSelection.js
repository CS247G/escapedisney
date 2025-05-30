import React, { useState } from 'react';
import styled from 'styled-components';
import NavButton from './NavButton';

const LandSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f8b195 0%, #f67280 50%, #c06c84 100%);
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 3.5rem;
  color: ${props => props.theme.colors.white};
  text-align: center;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.h2`
  font-family: ${props => props.theme.fonts.body};
  font-size: 1.5rem;
  color: ${props => props.theme.colors.white};
  text-align: center;
  margin-bottom: 3rem;
  max-width: 600px;
  opacity: 0.9;
`;

const LandsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 900px;
  margin-bottom: 2rem;
`;

const LandCard = styled.div`
  background: ${props => {
    if (props.locked) return '#f5f5f5';
    return props.theme.colors.white;
  }};
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: ${props => props.locked ? 'not-allowed' : 'pointer'};
  position: relative;
  overflow: hidden;
  opacity: ${props => props.locked ? 0.6 : 1};
  
  &:hover {
    transform: ${props => props.locked ? 'none' : 'translateY(-5px)'};
    box-shadow: ${props => props.locked ? '0 8px 32px rgba(0, 0, 0, 0.1)' : '0 12px 48px rgba(0, 0, 0, 0.15)'};
  }
  
  ${props => props.completed && `
    border: 3px solid #28a745;
    background: linear-gradient(135deg, #d4edda 0%, #ffffff 100%);
    opacity: 1;
  `}
  
  ${props => props.locked && `
    border: 2px solid #ccc;
    background: #f8f9fa;
  `}
`;

const CompletedBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #28a745;
  color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
`;

const LockedBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #6c757d;
  color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
`;

const LandIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  filter: ${props => props.locked ? 'grayscale(100%)' : 'none'};
`;

const LandTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.8rem;
  color: ${props => props.locked ? '#6c757d' : props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const LandDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.locked ? '#999' : props.theme.colors.text};
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const PlayButton = styled.button`
  background: ${props => {
    if (props.locked) return '#ccc';
    if (props.completed) return '#28a745';
    return `linear-gradient(45deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary})`;
  }};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: ${props => props.locked ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: ${props => props.locked ? 'none' : 'scale(1.05)'};
    box-shadow: ${props => props.locked ? 'none' : '0 4px 16px rgba(248, 177, 149, 0.4)'};
  }
  
  &:active {
    transform: ${props => props.locked ? 'none' : 'scale(0.98)'};
  }
`;

const LockMessage = styled.div`
  margin-top: 1rem;
  padding: 0.5rem;
  background: rgba(108, 117, 125, 0.1);
  border-radius: 8px;
  font-size: 0.9rem;
  color: #6c757d;
  font-style: italic;
`;

const NumbersSection = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: 15px;
  padding: 2rem;
  margin-top: 2rem;
  text-align: center;
  max-width: 600px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const NumbersTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const NumberDisplay = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const NumberSlot = styled.input`
  width: 60px;
  height: 60px;
  border: 3px solid ${props => props.theme.colors.primary};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: ${props => props.hasNumber ? props.theme.colors.primary : '#999'};
  background: ${props => props.hasNumber ? '#f0f4ff' : '#f9f9f9'};
  font-family: ${props => props.theme.fonts.heading};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.secondary};
    box-shadow: 0 0 0 2px rgba(246, 114, 128, 0.2);
  }
  
  &::placeholder {
    color: #ccc;
    font-size: 1.5rem;
  }
`;

const TestCodeButton = styled.button`
  background: linear-gradient(45deg, ${props => props.theme.colors.secondary}, ${props => props.theme.colors.accent});
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin: 0.5rem;
  transition: all 0.3s ease;
  font-family: ${props => props.theme.fonts.heading};
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 16px rgba(246, 114, 128, 0.4);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const CodeResult = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 10px;
  font-weight: bold;
  text-align: center;
  
  ${props => props.success && `
    background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
    border: 2px solid #28a745;
    color: #155724;
  `}
  
  ${props => props.error && `
    background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
    border: 2px solid #dc3545;
    color: #721c24;
  `}
`;

const ResetButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 15px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 1rem;
  
  &:hover {
    background: #5a6268;
  }
`;

const CelebrationOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.5s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const CelebrationCard = styled.div`
  background: linear-gradient(135deg, #ff6b9d, #ffa726, #ab47bc, #667eea);
  border-radius: 25px;
  padding: 3rem;
  text-align: center;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: bounceIn 0.8s ease-out;
  position: relative;
  overflow: hidden;

  @keyframes bounceIn {
    0% { transform: scale(0.3) rotate(-10deg); opacity: 0; }
    50% { transform: scale(1.1) rotate(5deg); }
    70% { transform: scale(0.9) rotate(-2deg); }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%) translateY(-100%); }
    100% { transform: translateX(100%) translateY(100%); }
  }
`;

const CelebrationTitle = styled.h1`
  font-size: 3rem;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  font-family: ${props => props.theme.fonts.heading};
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;

const EmojiRain = styled.div`
  font-size: 4rem;
  margin: 1.5rem 0;
  animation: bounce 1s infinite alternate;

  @keyframes bounce {
    0% { transform: translateY(0px); }
    100% { transform: translateY(-20px); }
  }
`;

const CelebrationMessage = styled.p`
  font-size: 1.3rem;
  color: white;
  margin-bottom: 2rem;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  font-weight: bold;
`;

const CelebrationButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  animation: glow 2s infinite alternate;

  @keyframes glow {
    0% { box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); }
    100% { box-shadow: 0 8px 30px rgba(255, 255, 255, 0.4); }
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
    background: white;
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const BackButtonContainer = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
`;

const LandSelection = ({ onBack, onSelectLand, collectedNumbers, allNumbersCollected }) => {
  const [guessedNumbers, setGuessedNumbers] = useState({
    toontown: '',
    fantasyland: '',
    tomorrowland: '',
    adventureland: ''
  });
  const [codeResult, setCodeResult] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Define the order of lands
  const landOrder = ['toontown', 'fantasyland', 'tomorrowland', 'adventureland'];
  
  const lands = [
    {
      id: 'toontown',
      icon: '🏠',
      title: 'Toontown',
      description: 'Find hidden Mickey silhouettes and solve riddles to discover puzzle pieces around the classroom.',
      order: 1
    },
    {
      id: 'fantasyland',
      icon: '🏰',
      title: 'Fantasyland',
      description: 'Listen to audio clues and play charades to build your word bank for the crossword puzzle.',
      order: 2
    },
    {
      id: 'tomorrowland',
      icon: '🚀',
      title: 'Tomorrowland',
      description: 'Test your aim in the futuristic shooting gallery. Hit Disney targets to earn points and your number!',
      order: 3
    },
    {
      id: 'adventureland',
      icon: '🗺️',
      title: 'Adventureland',
      description: 'Help Indiana Jones navigate the map and direct field agents to find the hidden treasure.',
      order: 4
    }
  ];

  // Function to check if a land is locked
  const isLandLocked = (landId) => {
    const landIndex = landOrder.indexOf(landId);
    if (landIndex === 0) return false; // First land (Toontown) is never locked
    
    // Check if previous land is completed
    const previousLandId = landOrder[landIndex - 1];
    return collectedNumbers[previousLandId] === null;
  };

  // Function to get lock message
  const getLockMessage = (landId) => {
    const landIndex = landOrder.indexOf(landId);
    if (landIndex === 0) return '';
    
    const previousLand = lands.find(land => land.id === landOrder[landIndex - 1]);
    return `Complete ${previousLand.title} first to unlock this challenge`;
  };

  const handleLandClick = (landId) => {
    if (isLandLocked(landId)) {
      return; // Do nothing if locked
    }
    onSelectLand(landId);
  };

  const handleNumberChange = (land, value) => {
    // Only allow single digits 0-9
    if (value === '' || (value.length === 1 && /^[0-9]$/.test(value))) {
      setGuessedNumbers(prev => ({
        ...prev,
        [land]: value
      }));
      setCodeResult(null); // Clear previous results when user types
    }
  };

  const testCode = () => {
    const guessedCode = Object.values(guessedNumbers).join('');
    
    if (guessedCode.length !== 4) {
      setCodeResult({ error: true, message: 'Please enter all 4 numbers!' });
      return;
    }
    
    if (guessedCode === '1923') {
      setCodeResult({ 
        success: true, 
        message: '🎉 CONGRATULATIONS! You have successfully escaped Disney! 🎉' 
      });
    } else {
      setCodeResult({ 
        error: true, 
        message: '❌ Incorrect code! Keep playing to discover the right numbers.' 
      });
    }
  };

  const resetGuesses = () => {
    setGuessedNumbers({
      toontown: '',
      fantasyland: '',
      tomorrowland: '',
      adventureland: ''
    });
    setCodeResult(null);
    setShowCelebration(false);
  };

  const closeCelebration = () => {
    setShowCelebration(false);
  };

  const isGuessComplete = Object.values(guessedNumbers).every(num => num !== '');
  const hasAnyGuess = Object.values(guessedNumbers).some(num => num !== '');

  return (
    <LandSelectionContainer>
      <BackButtonContainer>
        <NavButton 
          onClick={onBack}
          text="Back"
          direction="left"
        />
      </BackButtonContainer>
      
      <Title>🏰 Choose Your Adventure</Title>
      <Subtitle>
        Complete challenges in each Disney land in order to collect the four numbers needed to escape the park!
      </Subtitle>
      
      <LandsGrid>
        {lands.map(land => {
          const isLocked = isLandLocked(land.id);
          const isCompleted = collectedNumbers[land.id] !== null;
          
          return (
            <LandCard 
              key={land.id} 
              onClick={() => handleLandClick(land.id)}
              completed={isCompleted}
              locked={isLocked}
            >
              {isCompleted && <CompletedBadge>✓</CompletedBadge>}
              {isLocked && <LockedBadge>🔒</LockedBadge>}
              
              <LandIcon locked={isLocked}>{land.icon}</LandIcon>
              <LandTitle locked={isLocked}>{land.title}</LandTitle>
              <LandDescription locked={isLocked}>{land.description}</LandDescription>
              
              <PlayButton 
                completed={isCompleted} 
                locked={isLocked}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLandClick(land.id);
                }}
              >
                {isLocked ? '🔒 Locked' : isCompleted ? '✓ Completed' : 'Start Challenge'}
              </PlayButton>
              
              {isLocked && (
                <LockMessage>
                  {getLockMessage(land.id)}
                </LockMessage>
              )}
            </LandCard>
          );
        })}
      </LandsGrid>

      <NumbersSection>
        <NumbersTitle>Interactive Escape Code</NumbersTitle>
        <p style={{ color: '#666', fontSize: '1rem', marginBottom: '1rem' }}>
          Enter your discovered numbers and test the code to escape!
        </p>
        
        <NumberDisplay>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Toontown</div>
            <NumberSlot
              type="text"
              maxLength="1"
              placeholder="?"
              value={guessedNumbers.toontown}
              onChange={(e) => handleNumberChange('toontown', e.target.value)}
              hasNumber={guessedNumbers.toontown !== ''}
            />
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Fantasyland</div>
            <NumberSlot
              type="text"
              maxLength="1"
              placeholder="?"
              value={guessedNumbers.fantasyland}
              onChange={(e) => handleNumberChange('fantasyland', e.target.value)}
              hasNumber={guessedNumbers.fantasyland !== ''}
            />
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Tomorrowland</div>
            <NumberSlot
              type="text"
              maxLength="1"
              placeholder="?"
              value={guessedNumbers.tomorrowland}
              onChange={(e) => handleNumberChange('tomorrowland', e.target.value)}
              hasNumber={guessedNumbers.tomorrowland !== ''}
            />
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Adventureland</div>
            <NumberSlot
              type="text"
              maxLength="1"
              placeholder="?"
              value={guessedNumbers.adventureland}
              onChange={(e) => handleNumberChange('adventureland', e.target.value)}
              hasNumber={guessedNumbers.adventureland !== ''}
            />
          </div>
        </NumberDisplay>
        
        <ButtonGroup>
          <TestCodeButton 
            onClick={testCode} 
            disabled={!isGuessComplete}
          >
            🔓 Test Escape Code
          </TestCodeButton>
        </ButtonGroup>
        
        {/* Debug indicator */}
        {showCelebration && (
          <div style={{ color: 'red', fontWeight: 'bold', margin: '10px 0' }}>
            DEBUG: Celebration should be showing!
          </div>
        )}
        
        {hasAnyGuess && (
          <ResetButton onClick={resetGuesses}>
            Clear Numbers
          </ResetButton>
        )}
        
        {codeResult && !showCelebration && (
          <CodeResult success={codeResult.success} error={codeResult.error}>
            {codeResult.message}
          </CodeResult>
        )}
        
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '10px' }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#495057' }}>Your Progress:</h4>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {Object.entries(collectedNumbers).map(([land, number]) => (
              <div key={land} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: '#666', textTransform: 'capitalize' }}>
                  {land}
                </div>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  border: '2px solid #28a745', 
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  background: number ? '#d4edda' : '#f8f9fa',
                  color: number ? '#155724' : '#999'
                }}>
                  {number || '?'}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {!allNumbersCollected && (
          <p style={{ color: '#666', fontStyle: 'italic', marginTop: '1rem' }}>
            Complete all challenges in order to discover the escape code!
          </p>
        )}
      </NumbersSection>

      {/* Celebration Pop-up - Debug version */}
      {showCelebration ? (
        <CelebrationOverlay onClick={closeCelebration}>
          <CelebrationCard onClick={(e) => e.stopPropagation()}>
            <CelebrationTitle>🎉 CONGRATULATIONS! 🎉</CelebrationTitle>
            
            <EmojiRain>
              🎊 ✨ 🏰 ✨ 🎊
            </EmojiRain>
            
            <CelebrationMessage>
              You have successfully escaped from Disney!
              <br />
              🌟 You cracked the code and completed your magical adventure! 🌟
            </CelebrationMessage>
            
            <EmojiRain>
              🎈 🎁 🎪 🎁 🎈
            </EmojiRain>
            
            <CelebrationButton onClick={closeCelebration}>
              ✨ Amazing! Continue Playing ✨
            </CelebrationButton>
          </CelebrationCard>
        </CelebrationOverlay>
      ) : null}
    </LandSelectionContainer>
  );
};

export default LandSelection;