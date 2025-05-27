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
  background: ${props => props.theme.colors.white};
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
  }
  
  ${props => props.completed && `
    border: 3px solid #28a745;
    background: linear-gradient(135deg, #d4edda 0%, #ffffff 100%);
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

const LandIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const LandTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.8rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const LandDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const PlayButton = styled.button`
  background: ${props => props.completed ? '#28a745' : `linear-gradient(45deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary})`};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 16px rgba(248, 177, 149, 0.4);
  }
  
  &:active {
    transform: scale(0.98);
  }
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

/* ADDED: Lock Button Styling */
const LockButton = styled.button`
  background: linear-gradient(135deg, #667eea, #764ba2);
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
    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
  }
`;

/* ADDED: Button Group for multiple buttons */
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

const BackButtonContainer = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
`;

// MODIFIED: Added onTestLock prop
const LandSelection = ({ onBack, onSelectLand, onTestLock, collectedNumbers, allNumbersCollected, finalCode }) => {
  const [guessedNumbers, setGuessedNumbers] = useState({
    toontown: '',
    fantasyland: '',
    tomorrowland: '',
    adventureland: ''
  });
  const [codeResult, setCodeResult] = useState(null);

  const lands = [
    {
      id: 'toontown',
      icon: '🏠',
      title: 'Toontown',
      description: 'Find hidden Mickey silhouettes and solve riddles to discover puzzle pieces around the classroom.'
    },
    {
      id: 'tomorrowland',
      icon: '🚀',
      title: 'Tomorrowland',
      description: 'Test your aim in the futuristic shooting gallery. Hit Disney targets to earn points and your number!'
    },
    {
      id: 'fantasyland',
      icon: '🏰',
      title: 'Fantasyland',
      description: 'Listen to audio clues and play charades to build your word bank for the crossword puzzle.'
    },
    {
      id: 'adventureland',
      icon: '🗺️',
      title: 'Adventureland',
      description: 'Help Indiana Jones navigate the map and direct field agents to find the hidden treasure.'
    }
  ];

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
    const actualCode = Object.values(collectedNumbers).map(num => num || '0').join('');
    
    if (guessedCode.length !== 4) {
      setCodeResult({ error: true, message: 'Please enter all 4 numbers!' });
      return;
    }
    
    if (guessedCode === actualCode && allNumbersCollected) {
      setCodeResult({ 
        success: true, 
        message: '🎉 CORRECT CODE! You have successfully escaped Disney! 🎉' 
      });
    } else if (guessedCode === finalCode && allNumbersCollected) {
      setCodeResult({ 
        success: true, 
        message: '🎉 PERFECT! You have cracked the escape code! 🎉' 
      });
    } else {
      const correctCount = guessedCode.split('').filter((digit, index) => 
        digit === (collectedNumbers[Object.keys(collectedNumbers)[index]] || '0').toString()
      ).length;
      
      if (correctCount > 0) {
        setCodeResult({ 
          error: true, 
          message: `❌ Incorrect code! You have ${correctCount} number${correctCount !== 1 ? 's' : ''} in the right position.` 
        });
      } else {
        setCodeResult({ 
          error: true, 
          message: '❌ Incorrect code! Keep playing to discover the right numbers.' 
        });
      }
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
        Complete challenges in each Disney land to collect the four numbers needed to escape the park!
      </Subtitle>
      
      <LandsGrid>
        {lands.map(land => (
          <LandCard 
            key={land.id} 
            onClick={() => onSelectLand(land.id)}
            completed={collectedNumbers[land.id] !== null}
          >
            {collectedNumbers[land.id] && (
              <CompletedBadge>✓</CompletedBadge>
            )}
            <LandIcon>{land.icon}</LandIcon>
            <LandTitle>{land.title}</LandTitle>
            <LandDescription>{land.description}</LandDescription>
            <PlayButton completed={collectedNumbers[land.id] !== null}>
              {collectedNumbers[land.id] ? '✓ Completed' : 'Start Challenge'}
            </PlayButton>
          </LandCard>
        ))}
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
        
        {/* MODIFIED: Added ButtonGroup with both buttons */}
        <ButtonGroup>
          <TestCodeButton 
            onClick={testCode} 
            disabled={!isGuessComplete}
          >
            🔓 Test Escape Code
          </TestCodeButton>
          
          <LockButton onClick={onTestLock}>
            🔒 Test Lock Combination
          </LockButton>
        </ButtonGroup>
        
        {hasAnyGuess && (
          <ResetButton onClick={resetGuesses}>
            Clear Numbers
          </ResetButton>
        )}
        
        {codeResult && (
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
            Complete all challenges to discover the escape code!
          </p>
        )}
      </NumbersSection>
    </LandSelectionContainer>
  );
};

export default LandSelection;