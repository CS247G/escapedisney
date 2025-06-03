import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import NavButton from '../NavButton';
import riddleAudio from '../../assets/audio/fantasyland-riddle.mp3';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #fdf6f6;
  position: relative;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 800px;
`;

const Card = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 15px;
  padding: 2.5rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  margin: 0 auto;
  border: 3px solid ${props => props.theme.colors.primary}33;
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 1.5rem;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
`;

const EmojiTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 1rem;
  text-shadow: 1px 1px 0 ${props => props.theme.colors.primary};
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.body};
  text-align: center;
`;

const Highlight = styled.span`
  background: linear-gradient(90deg, #f8b195, #f67280);
  padding: 0.2rem 0.5rem;
  border-radius: 8px;
  font-weight: bold;
  color: white;
  box-shadow: 0 2px 8px rgba(246, 114, 128, 0.3);
  font-family: ${props => props.theme.fonts.body};
`;

const MissionBox = styled.div`
  background: linear-gradient(90deg, #ffe6ec, #fff0f4);
  border: 3px solid ${props => props.theme.colors.secondary}33;
  padding: 1.5rem;
  border-radius: 12px;
  margin: 2rem 0;
  text-align: center;
`;

const AudioPlayer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
`;

const AudioControls = styled.input`
  width: 100%;
  max-width: 300px;
  margin-top: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  margin-top: 1rem;
  font-family: ${props => props.theme.fonts.body};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 1rem;
`;

const Hint = styled.p`
  color: ${props => props.theme.colors.accent};
  font-style: italic;
  text-align: center;
  margin-top: 1rem;
`;

const Timer = styled.p`
  text-align: center;
  font-weight: bold;
  color: ${props => props.theme.colors.accent};
  margin-top: 0.5rem;
  font-family: ${props => props.theme.fonts.body};
`;

const NumberReveal = ({ onContinue }) => (
  <PageContainer>
    <ContentWrapper>
      <Card>
        <Title>Puzzle Complete!</Title>
        <Description>
          ✅ You entered the correct blue word: <strong>smile</strong><br />
          Your Fantasyland escape number is: <strong>9</strong>
        </Description>
        <ButtonContainer>
          <NavButton text="Continue Adventure" direction="right" onClick={onContinue} />
        </ButtonContainer>
      </Card>
    </ContentWrapper>
  </PageContainer>
);

const Fantasyland = ({ onBack, onComplete }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [answer, setAnswer] = useState('');
  const [timePassed, setTimePassed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimePassed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timePassed >= 300) setShowHint(true);
  }, [timePassed]);

  useEffect(() => {
    const audio = audioRef.current;
    const update = () => setProgress(audio.currentTime);
    audio.addEventListener('timeupdate', update);
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    return () => audio.removeEventListener('timeupdate', update);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const handleSubmit = () => {
    if (answer.trim().toLowerCase() === 'smile') {
      setCompleted(true);
      onComplete(9); // Final number
    } else {
      alert('❌ Try again. The word must be exactly as shown on the crossword.');
    }
  };

  if (completed) return <NumberReveal onContinue={onBack} />;

  return (
    <PageContainer>
      <ContentWrapper>
        <Card>
          <Title>Welcome to Fantasyland! 🏰</Title>

          <MissionBox>
            <EmojiTitle>🔮 YOUR MISSION:</EmojiTitle>
            <Description>
              Listen to the enchanted riddle. It contains clues to help you solve a <Highlight>physical crossword</Highlight>!
              After 5 minutes, you’ll receive a <Highlight color="#fbc531">magical hint</Highlight>.
            </Description>
          </MissionBox>

          <Timer>
            ⏱ Time Remaining: {Math.floor((300 - timePassed) / 60)}:{String((300 - timePassed) % 60).padStart(2, '0')}
          </Timer>

          <Description>
            The riddle will guide you through the puzzle — pay close attention! ✨
          </Description>


          <AudioPlayer>
            <button onClick={togglePlay}>
              {isPlaying ? '⏸ Pause Audio' : '▶️ Play Audio'}
            </button>
            <AudioControls
              type="range"
              min="0"
              max={duration}
              step="1"
              value={progress}
              onChange={handleSeek}
            />
            <audio ref={audioRef} src={riddleAudio} />
          </AudioPlayer>

          {showHint && (
            <Hint>💡 Hint: One of the crossword words is <strong>_mile</strong>.</Hint>
          )}

          <Description>
            Once your puzzle is complete, enter the <Highlight color="#dcdde1">blue highlighted word</Highlight> to complete this land!
          </Description>

          <Input
            type="text"
            placeholder="Enter the blue word"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <ButtonContainer>
            <NavButton onClick={onBack} text="Back to Lands" direction="left" />
            <NavButton onClick={handleSubmit} text="Submit Answer" direction="right" />
          </ButtonContainer>
        </Card>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Fantasyland;
