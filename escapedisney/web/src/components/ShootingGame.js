import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import NavButton from './NavButton';
// Add your background image import here
import tomorrowlandBg from '../assets/images/tomorrowland/tomorrowland-bg.jpg';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 500;
const TARGET_SIZE = 60;

const TARGET_TYPES = {
  MICKEY: { points: 50, color: '#FF6B6B', emoji: '🐭', speed: 5 },
  DONALD: { points: 30, color: '#4ECDC4', emoji: '🦆', speed: 6.5 },
  GOOFY: { points: 20, color: '#45B7D1', emoji: '🐕', speed: 5.5 },
  VILLAIN: { points: -30, color: '#8E44AD', emoji: '🦹', speed: 4 },
  BULLSEYE: { points: 200, color: '#E74C3C', emoji: '🎯', speed: 3 }
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
  const [score, setScore] = useState(0);
  const [targets, setTargets] = useState([]);
  const [finalNumber, setFinalNumber] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showHit, setShowHit] = useState(null);
  const [showBullseyeWarning, setShowBullseyeWarning] = useState(false);
  const [bullseyeSpawned, setBullseyeSpawned] = useState(false);
  
  const targetIdRef = useRef(0);
  const gameAreaRef = useRef();

  const createTarget = useCallback((forceBullseye = false, forceVillain = false) => {
    let randomType;
    
    if (forceBullseye) {
      randomType = 'BULLSEYE';
    } else if (forceVillain) {
      randomType = 'VILLAIN';
    } else {
      // Balanced target selection with moderate villain presence
      const types = Object.keys(TARGET_TYPES).filter(type => type !== 'BULLSEYE');
      
      if (Math.random() < 0.15) {
        // 15% chance of villain throughout the game
        randomType = 'VILLAIN';
      } else {
        // 85% chance for good targets
        const goodTypes = types.filter(type => type !== 'VILLAIN');
        randomType = goodTypes[Math.floor(Math.random() * goodTypes.length)];
      }
    }
    
    const targetData = TARGET_TYPES[randomType];
    
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
  }, []);

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

 
  const endGame = useCallback(() => {
    let number;
    let success = false;
    
    if (score >= 1500) {
      number = 2; // CHANGED: From 9 to 2
      success = true;
    } else {
      number = Math.max(1, Math.min(8, Math.floor(score / 200) + 1));
      success = false;
    }
    
    setFinalNumber({ value: number, success, finalScore: score });
    setGameState('complete');
  }, [score]);

  // Spawn bullseye at the end
  useEffect(() => {
    if (gameState === 'playing' && timeLeft === 8 && !bullseyeSpawned) {
      setShowBullseyeWarning(true);
      setTimeout(() => {
        setShowBullseyeWarning(false);
        setTargets(prev => [...prev, createTarget(true)]);
        setBullseyeSpawned(true);
      }, 1500);
    }
  }, [timeLeft, gameState, bullseyeSpawned, createTarget]);

  useEffect(() => {
    if (gameState === 'playing') {
      const gameLoop = setInterval(() => {
        updateTargets();
        
        // Controlled spawn rate to prevent overcrowding
        if (Math.random() < 0.035 && targets.length < 6) {
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
  }, [gameState, updateTargets, createTarget, endGame]);

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
          setScore(prevScore => prevScore + target.points);
          
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
    setScore(0);
    setTimeLeft(30);
    setTargets([]);
    setBullseyeSpawned(false);
    setShowHit(null);
    setShowBullseyeWarning(false);
    
    // Start with just one villain after a brief delay to spread them out
    setTimeout(() => {
      setTargets(prev => [...prev, createTarget(false, true)]);
    }, 2000);
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
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#CCCCCC' }}>
            <strong>GOAL: Score 1500+ points to win!</strong>
            <br />
            Shoot the targets! 30 seconds to complete the challenge!
            <br />
            🎯 <strong>BULLSEYE: 200pts</strong>
            <br />
            🐭 Mickey: 50pts | 🦆 Donald: 30pts | 🐕 Goofy: 20pts
            <br />
            🦹 <strong>Villain: -30pts</strong>
          </p>
          <StartButton onClick={startGame}>
            START SHOOTING!
          </StartButton>
        </StartScreen>
      </Container>
    );
  }

  if (gameState === 'complete') {
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
            {finalNumber.success ? '🎉 CHALLENGE COMPLETED!' : '💥 CHALLENGE FAILED'}
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
            {finalNumber.success ? (
              <>
                <h3 style={{ margin: '0 0 1rem 0', color: '#d4edda' }}>
                  🎯 GOAL ACHIEVED! You scored {finalNumber.finalScore} points!
                </h3>
                <h1 style={{ margin: '0', fontSize: '3rem' }}>Your Number: {finalNumber.value}</h1>
              </>
            ) : (
              <>
                <h3 style={{ margin: '0 0 1rem 0', color: '#f8d7da' }}>
                  Need 1500+ points. You scored {finalNumber.finalScore} points.
                </h3>
                <h1 style={{ margin: '0', fontSize: '3rem' }}>Your Number: {finalNumber.value}</h1>
                <p style={{ margin: '1rem 0 0 0', fontSize: '1rem' }}>
                  Try again to get the winning number!
                </p>
              </>
            )}
          </div>
          <p style={{ color: '#CCCCCC', marginBottom: '2rem' }}>
            Remember this number for the final escape code!
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <StartButton onClick={startGame}>PLAY AGAIN</StartButton>
            <NavButton 
              onClick={handleComplete}
              text="Continue Adventure"
              direction="right"
            />
          </div>
        </StartScreen>
      </Container>
    );
  }

  return (
    <Container>
      <BackButtonContainer>
        <NavButton 
          onClick={onBack}
          text="Back to Lands"
          direction="left"
        />
      </BackButtonContainer>
      
      <div style={{ padding: '20px', textAlign: 'center', background: 'rgba(30, 35, 40, 0.9)' }}>
        <h2 style={{ margin: 0, color: 'white' }}>
          Score: {score} | Time: {timeLeft}s | Goal: 1500+
          {timeLeft <= 10 && !bullseyeSpawned && (
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
              boxShadow: target.type === 'BULLSEYE' ? '0 0 20px #E74C3C' : '0 0 10px rgba(255, 255, 255, 0.3)'
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