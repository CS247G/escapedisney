import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import NavButton from './NavButton';
// Add your background image import here
import tomorrowlandBg from '../assets/images/tomorrowland/tomorrowland-bg.jpg';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 500;
const TARGET_SIZE = 60;

// UPDATED: Different target types for each level
const LEVEL_CONFIGS = {
  1: {
    name: "Training Ground",
    goal: 500,
    timeLimit: 30,
    targets: {
      MICKEY: { points: 50, color: '#FF6B6B', emoji: '🐭', speed: 4 },
      MINNIE: { points: 40, color: '#FF69B4', emoji: '🐭', speed: 4.5 },
      GOOFY: { points: 30, color: '#45B7D1', emoji: '🐕', speed: 4 },
      PLUTO: { points: 20, color: '#FFD700', emoji: '🐕', speed: 4.5 },
      VILLAIN: { points: -20, color: '#8E44AD', emoji: '🦹', speed: 3.5 },
    },
    villainChance: 0.1,
    spawnRate: 0.03
  },
  2: {
    name: "Space Patrol",
    goal: 800,
    timeLimit: 35,
    targets: {
      BUZZ: { points: 60, color: '#00FF7F', emoji: '🚀', speed: 5.5 },
      ALIEN: { points: 45, color: '#32CD32', emoji: '👽', speed: 6 },
      ROBOT: { points: 35, color: '#4169E1', emoji: '🤖', speed: 5 },
      STAR: { points: 80, color: '#FFD700', emoji: '⭐', speed: 4 },
      METEOR: { points: -40, color: '#8B0000', emoji: '☄️', speed: 7 },
    },
    villainChance: 0.15,
    spawnRate: 0.035
  },
  3: {
    name: "Final Challenge",
    goal: 1500,
    timeLimit: 40,
    targets: {
      DONALD: { points: 50, color: '#4ECDC4', emoji: '🦆', speed: 6.5 },
      MICKEY: { points: 70, color: '#FF6B6B', emoji: '🐭', speed: 6 },
      VILLAIN: { points: -50, color: '#8E44AD', emoji: '🦹', speed: 5.5 },
      BULLSEYE: { points: 200, color: '#E74C3C', emoji: '🎯', speed: 3 },
      BONUS: { points: 100, color: '#9400D3', emoji: '💎', speed: 7 },
    },
    villainChance: 0.2,
    spawnRate: 0.04
  }
};

// Animations for background distractions
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.2); opacity: 0.6; }
`;

const drift = keyframes`
  0% { transform: translateX(-100px); }
  100% { transform: translateX(${GAME_WIDTH + 100}px); }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
`;

const levelComplete = keyframes`
  0% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.1) rotate(5deg); }
  50% { transform: scale(1.2) rotate(-5deg); }
  75% { transform: scale(1.1) rotate(5deg); }
  100% { transform: scale(1) rotate(0deg); }
`;

const Container = styled.div`
  font-family: ${props => props.theme.fonts.body};
  background-image: url(${tomorrowlandBg});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: #FFFFFF;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(15, 20, 25, 0.6);
    pointer-events: none;
  }
`;

const StartScreen = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  position: relative;
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  color: #00D4FF;
  text-align: center;
  margin-bottom: 10px;
`;

const LevelTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2rem;
  color: #FFD700;
  text-align: center;
  margin: 1rem 0;
`;

const StartButton = styled.button`
  background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: ${props => props.theme.colors.white};
  border: none;
  padding: 15px 40px;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
  font-family: ${props => props.theme.fonts.heading};
  
  &:hover {
    transform: scale(1.05);
  }
`;

const BackButtonContainer = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 10;
`;

const GameArea = styled.div`
  position: relative;
  width: ${GAME_WIDTH}px;
  height: ${GAME_HEIGHT}px;
  background: linear-gradient(45deg, #2C3E50 0%, #34495e 25%, #2C3E50 50%, #34495e 75%, #2C3E50 100%);
  margin: 20px auto;
  border-radius: 10px;
  overflow: hidden;
  cursor: crosshair;
  border: 2px solid #00D4FF;
`;

const Target = styled.div`
  position: absolute;
  width: ${TARGET_SIZE}px;
  height: ${TARGET_SIZE}px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #FFFFFF;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  transition: all 0.1s ease;
  cursor: pointer;
  z-index: 5;
`;

const FloatingDecoy = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: ${float} 3s ease-in-out infinite;
  pointer-events: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const PulsingCircle = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, transparent 70%);
  animation: ${pulse} 2s ease-in-out infinite;
  pointer-events: none;
`;

const DriftingCloud = styled.div`
  position: absolute;
  width: 120px;
  height: 60px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50px;
  animation: ${drift} 8s linear infinite;
  pointer-events: none;
`;

const SparkleEffect = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, #FFD700 0%, transparent 70%);
  border-radius: 50%;
  animation: ${sparkle} 1.5s ease-in-out infinite;
  pointer-events: none;
`;

const HitEffect = styled.div`
  position: absolute;
  font-size: 20px;
  font-weight: bold;
  color: #00FF00;
  pointer-events: none;
  animation: fadeOut 1s forwards;
  text-shadow: 0 0 10px #00FF00;
  
  @keyframes fadeOut {
    0% { opacity: 1; transform: translateY(0) scale(1); }
    100% { opacity: 0; transform: translateY(-30px) scale(1.2); }
  }
`;

const LevelCompleteOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 255, 0, 0.95);
  color: white;
  padding: 30px;
  border-radius: 15px;
  font-size: 28px;
  font-weight: bold;
  z-index: 10;
  animation: ${levelComplete} 1s ease-in-out;
  border: 3px solid #fff;
  text-align: center;
`;

const BullseyeWarning = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(231, 76, 60, 0.9);
  color: white;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 24px;
  font-weight: bold;
  z-index: 5;
  animation: ${pulse} 0.5s ease-in-out;
  border: 2px solid #fff;
`;

const ShootingGame = ({ onBack, onComplete }) => {
  const [gameState, setGameState] = useState('start');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [targets, setTargets] = useState([]);
  const [finalNumber, setFinalNumber] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showHit, setShowHit] = useState(null);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [showBullseyeWarning, setShowBullseyeWarning] = useState(false);
  const [bullseyeSpawned, setBullseyeSpawned] = useState(false);
  
  const targetIdRef = useRef(0);
  const gameAreaRef = useRef();

  const getCurrentConfig = () => LEVEL_CONFIGS[currentLevel];

  const createTarget = useCallback((forceBullseye = false, forceVillain = false) => {
    const config = getCurrentConfig();
    const targetTypes = Object.keys(config.targets);
    let randomType;
    
    if (forceBullseye && config.targets.BULLSEYE) {
      randomType = 'BULLSEYE';
    } else if (forceVillain) {
      const villainTypes = targetTypes.filter(type => 
        config.targets[type].points < 0
      );
      randomType = villainTypes[Math.floor(Math.random() * villainTypes.length)];
    } else {
      // Check if we should spawn a villain
      if (Math.random() < config.villainChance) {
        const villainTypes = targetTypes.filter(type => 
          config.targets[type].points < 0
        );
        randomType = villainTypes[Math.floor(Math.random() * villainTypes.length)];
      } else {
        // Spawn good targets
        const goodTypes = targetTypes.filter(type => 
          config.targets[type].points > 0
        );
        randomType = goodTypes[Math.floor(Math.random() * goodTypes.length)];
      }
    }
    
    const targetData = config.targets[randomType];
    
    const startSide = Math.random() > 0.5 ? 'left' : 'right';
    const startX = startSide === 'left' ? -TARGET_SIZE : GAME_WIDTH + TARGET_SIZE;
    
    // Better Y positioning to spread targets across the screen
    const minY = TARGET_SIZE;
    const maxY = GAME_HEIGHT - TARGET_SIZE;
    const y = minY + Math.random() * (maxY - minY);
    
    return {
      id: targetIdRef.current++,
      type: randomType,
      x: startX,
      y: y,
      speed: targetData.speed,
      ...targetData,
      direction: startSide === 'left' ? 1 : -1
    };
  }, [currentLevel]);

  const updateTargets = useCallback(() => {
    setTargets(prev => 
      prev.map(target => ({
        ...target,
        x: target.x + (target.speed * target.direction)
      })).filter(target => 
        target.x > -TARGET_SIZE && target.x < GAME_WIDTH + TARGET_SIZE
      )
    );
  }, []);

  const checkLevelComplete = useCallback((currentScore) => {
    const config = getCurrentConfig();
    if (currentScore >= config.goal) {
      if (currentLevel < 3) {
        // Level completed, move to next level
        setShowLevelComplete(true);
        setTimeout(() => {
          setShowLevelComplete(false);
          const nextLevel = currentLevel + 1;
          setCurrentLevel(nextLevel);
          setTimeLeft(LEVEL_CONFIGS[nextLevel].timeLimit);
          setTargets([]);
          setBullseyeSpawned(false);
        }, 2000);
      } else {
        // All levels completed - END GAME WITH SUCCESS
        setTimeout(() => {
          let number = 2; // Winning number for completing all levels
          let success = true;
          setFinalNumber({ value: number, success, finalScore: currentScore, level: 3 });
          setGameState('complete');
        }, 500);
      }
    }
  }, [currentLevel]);

  const endGame = useCallback(() => {
    // This function is only called when time runs out (failure)
    // Success is handled in checkLevelComplete
    
    if (currentLevel < 3) {
      // Failed before reaching level 3 - no number given
      setFinalNumber({ value: null, success: false, finalScore: score, level: currentLevel });
    } else {
      // Failed at level 3 - give random number (not 2)
      const randomNumbers = [1, 3, 4, 5, 6, 7, 8, 9];
      const number = randomNumbers[Math.floor(Math.random() * randomNumbers.length)];
      setFinalNumber({ value: number, success: false, finalScore: score, level: currentLevel });
    }
    
    setGameState('complete');
  }, [score, currentLevel]);

  // Spawn special targets (bullseye in level 3)
  useEffect(() => {
    if (gameState === 'playing' && currentLevel === 3 && timeLeft === 10 && !bullseyeSpawned) {
      setShowBullseyeWarning(true);
      setTimeout(() => {
        setShowBullseyeWarning(false);
        setTargets(prev => [...prev, createTarget(true)]);
        setBullseyeSpawned(true);
      }, 1500);
    }
  }, [timeLeft, gameState, currentLevel, bullseyeSpawned, createTarget]);

  useEffect(() => {
    if (gameState === 'playing') {
      const config = getCurrentConfig();
      
      const gameLoop = setInterval(() => {
        updateTargets();
        
        // Controlled spawn rate based on level
        if (Math.random() < config.spawnRate && targets.length < 6) {
          setTargets(prev => [...prev, createTarget(false, false)]);
        }
      }, 35);

      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(gameLoop);
        clearInterval(timer);
      };
    }
  }, [gameState, updateTargets, createTarget, endGame, currentLevel, targets.length]);

  const handleShoot = (event) => {
    if (gameState !== 'playing') return;

    const rect = gameAreaRef.current.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    setTargets(prev => {
      return prev.filter(target => {
        const distance = Math.sqrt(
          Math.pow(clickX - (target.x + TARGET_SIZE/2), 2) + 
          Math.pow(clickY - (target.y + TARGET_SIZE/2), 2)
        );
        
        if (distance < TARGET_SIZE/2) {
          const newScore = score + target.points;
          setScore(newScore);
          
          // Check if level is complete
          checkLevelComplete(newScore);
          
          // Show hit effect
          setShowHit({ 
            x: target.x, 
            y: target.y, 
            points: target.points,
            id: Math.random()
          });
          setTimeout(() => setShowHit(null), 1000);
          
          return false;
        }
        return true;
      });
    });
  };

  const startGame = () => {
    setGameState('playing');
    setCurrentLevel(1);
    setScore(0);
    setTimeLeft(LEVEL_CONFIGS[1].timeLimit);
    setTargets([]);
    setBullseyeSpawned(false);
    setShowHit(null);
    setShowBullseyeWarning(false);
    setShowLevelComplete(false);
  };

  const handleComplete = () => {
    if (onComplete && finalNumber) {
      onComplete(finalNumber.value);
    }
  };

  // Generate background decorations
  const generateDecorations = () => {
    const decorations = [];
    for (let i = 0; i < 8; i++) {
      decorations.push(
        <FloatingDecoy
          key={`decoy-${i}`}
          style={{
            left: Math.random() * (GAME_WIDTH - 40),
            top: Math.random() * (GAME_HEIGHT - 40),
            animationDelay: `${Math.random() * 3}s`
          }}
        />
      );
    }
    for (let i = 0; i < 4; i++) {
      decorations.push(
        <PulsingCircle
          key={`pulse-${i}`}
          style={{
            left: Math.random() * (GAME_WIDTH - 80),
            top: Math.random() * (GAME_HEIGHT - 80),
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      );
    }
    for (let i = 0; i < 3; i++) {
      decorations.push(
        <DriftingCloud
          key={`cloud-${i}`}
          style={{
            top: Math.random() * (GAME_HEIGHT - 60),
            animationDelay: `${Math.random() * 8}s`
          }}
        />
      );
    }
    for (let i = 0; i < 12; i++) {
      decorations.push(
        <SparkleEffect
          key={`sparkle-${i}`}
          style={{
            left: Math.random() * (GAME_WIDTH - 20),
            top: Math.random() * (GAME_HEIGHT - 20),
            animationDelay: `${Math.random() * 1.5}s`
          }}
        />
      );
    }
    return decorations;
  };

  if (gameState === 'start') {
    return (
      <Container>
        <BackButtonContainer>
          <NavButton 
            onClick={onBack}
            text="Back to Lands"
            direction="left"
          />
        </BackButtonContainer>
        
        <StartScreen>
          <Title>🚀 TOMORROWLAND SHOOTING GALLERY</Title>
          <LevelTitle>Multi-Level Challenge!</LevelTitle>
          <div style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#CCCCCC', maxWidth: '600px' }}>
            <p><strong>🎯 LEVEL 1: Training Ground</strong> - Score 500+ points (30s)</p>
            <p><strong>🚀 LEVEL 2: Space Patrol</strong> - Score 800+ points (35s)</p>
            <p><strong>⭐ LEVEL 3: Final Challenge</strong> - Score 1500+ points (40s)</p>
            <br />
            <p><strong>Complete all 3 levels to earn your number!</strong></p>
            <p>Each level has different targets and challenges!</p>
          </div>
          <StartButton onClick={startGame}>
            START MULTI-LEVEL CHALLENGE!
          </StartButton>
        </StartScreen>
      </Container>
    );
  }

  if (gameState === 'complete') {
    const config = getCurrentConfig();
    return (
      <Container>
        <BackButtonContainer>
          <NavButton 
            onClick={onBack}
            text="Back to Lands"
            direction="left"
          />
        </BackButtonContainer>
        
        <StartScreen>
          <Title>
            {finalNumber.success ? '🎉 ALL LEVELS COMPLETED!' : 
             finalNumber.level < 3 ? `💥 FAILED AT LEVEL ${finalNumber.level}` : 
             `💥 FAILED LEVEL 3`}
          </Title>
          <div style={{ 
            background: finalNumber.success 
              ? 'linear-gradient(45deg, #28a745, #20c997)' 
              : 'linear-gradient(45deg, #dc3545, #fd7e14)', 
            padding: '2rem', 
            borderRadius: '15px', 
            margin: '2rem 0',
            color: 'white'
          }}>
            <h2 style={{ margin: '0 0 1rem 0' }}>Final Score: {finalNumber.finalScore}</h2>
            <h3 style={{ margin: '0 0 1rem 0' }}>Reached Level: {finalNumber.level}</h3>
            {finalNumber.success ? (
              <>
                <h3 style={{ margin: '0 0 1rem 0', color: '#d4edda' }}>
                  🎯 MASTER SHOOTER! You conquered all 3 levels!
                </h3>
                <h1 style={{ margin: '0', fontSize: '3rem' }}>Your Number: {finalNumber.value}</h1>
              </>
            ) : finalNumber.value ? (
              <>
                <h3 style={{ margin: '0 0 1rem 0', color: '#f8d7da' }}>
                  You reached Level 3 but didn't complete it!
                </h3>
                <h1 style={{ margin: '0', fontSize: '3rem' }}>Your Number: {finalNumber.value}</h1>
                <p style={{ margin: '1rem 0 0 0', fontSize: '1rem' }}>
                  Try again to master all levels!
                </p>
              </>
            ) : (
              <>
                <h3 style={{ margin: '0 0 1rem 0', color: '#f8d7da' }}>
                  Complete all 3 levels to earn your number!
                </h3>
                <p style={{ margin: '1rem 0 0 0', fontSize: '1rem' }}>
                  Try again to reach Level 3!
                </p>
              </>
            )}
          </div>
          {finalNumber.success && (
            <p style={{ color: '#CCCCCC', marginBottom: '2rem' }}>
              Remember this number for the final escape code!
            </p>
          )}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <StartButton onClick={startGame}>PLAY AGAIN</StartButton>
            {finalNumber.value && (
              <NavButton 
                onClick={handleComplete}
                text="Continue Adventure"
                direction="right"
              />
            )}
          </div>
        </StartScreen>
      </Container>
    );
  }

  const config = getCurrentConfig();
  
  return (
    <Container>
      <BackButtonContainer>
        <NavButton 
          onClick={onBack}
          text="Back to Lands"
          direction="left"
        />
      </BackButtonContainer>
      
      <div style={{ padding: '15px', textAlign: 'center', background: 'rgba(30, 35, 40, 0.9)' }}>
        <h2 style={{ margin: 0, color: 'white', fontSize: '1.4rem' }}>
          <span style={{ color: '#FFD700' }}>LEVEL {currentLevel}: {config.name}</span>
          <br />
          Score: {score}/{config.goal} | Time: {timeLeft}s
          {currentLevel === 3 && timeLeft <= 15 && !bullseyeSpawned && (
            <span style={{ color: '#E74C3C', marginLeft: '20px' }}>
              🎯 BULLSEYE INCOMING!
            </span>
          )}
        </h2>
      </div>
      
      <GameArea 
        ref={gameAreaRef}
        onClick={handleShoot}
      >
        {/* Background decorations for distraction */}
        {generateDecorations()}
        
        {/* Level complete overlay */}
        {showLevelComplete && (
          <LevelCompleteOverlay>
            🎉 LEVEL {currentLevel} COMPLETE! 🎉
            <br />
            <span style={{ fontSize: '18px' }}>Moving to Level {currentLevel + 1}...</span>
          </LevelCompleteOverlay>
        )}
        
        {/* Bullseye warning */}
        {showBullseyeWarning && (
          <BullseyeWarning>
            🎯 BULLSEYE SPAWNING! 🎯
          </BullseyeWarning>
        )}
        
        {/* Targets */}
        {targets.map(target => (
          <Target
            key={target.id}
            style={{
              left: target.x,
              top: target.y,
              backgroundColor: target.color,
              boxShadow: target.type === 'BULLSEYE' ? '0 0 20px #E74C3C' : 
                         target.type === 'BONUS' ? '0 0 20px #9400D3' :
                         '0 0 10px rgba(255, 255, 255, 0.3)'
            }}
          >
            <span style={{ fontSize: '24px' }}>{target.emoji}</span>
            <span style={{ 
              fontSize: '10px', 
              position: 'absolute', 
              bottom: '2px',
              color: 'white',
              fontWeight: 'bold'
            }}>
              {target.points > 0 ? '+' : ''}{target.points}
            </span>
          </Target>
        ))}
        
        {/* Hit effects */}
        {showHit && (
          <HitEffect
            style={{
              left: showHit.x,
              top: showHit.y,
            }}
          >
            {showHit.points > 0 ? '+' : ''}{showHit.points}
          </HitEffect>
        )}
      </GameArea>
    </Container>
  );
};

export default ShootingGame;