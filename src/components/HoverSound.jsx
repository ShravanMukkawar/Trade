import { useEffect, useRef } from 'react';

const HoverSound = ({ children, className = '' }) => {
  const audioRef = useRef(null);
  const audioUnlocked = useRef(false);

  useEffect(() => {
    // Initialize audio with the correct path
    const audio = new Audio('/audio/robo.wav');
    audio.preload = 'auto';
    audio.volume = 0.5; // Lower the volume a bit
    audioRef.current = audio;

    // Unlock audio on first user interaction
    const unlockAudio = () => {
      if (audioUnlocked.current) return;
      
      // Try to play the audio to unlock it
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            audio.pause();
            audio.currentTime = 0;
            audioUnlocked.current = true;
          })
          .catch(err => {
            console.log('Audio play failed:', err);
            // If autoplay was prevented, show a message
            if (err.name === 'NotAllowedError') {
              console.log('Please interact with the page to enable sound');
            }
          });
      }
    };

    // Add event listeners for first interaction
    const events = ['click', 'touchstart', 'keydown'];
    const unlock = () => {
      unlockAudio();
      // Remove all event listeners after first interaction
      events.forEach(event => {
        document.removeEventListener(event, unlock);
      });
    };

    events.forEach(event => {
      document.addEventListener(event, unlock, { once: true });
    });

    return () => {
      // Cleanup
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      events.forEach(event => {
        document.removeEventListener(event, unlock);
      });
    };
  }, []);

  const playHoverSound = () => {
    if (audioRef.current && audioUnlocked.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Playback failed:', error);
        });
      }
    } else if (!audioUnlocked.current) {
      console.log('Audio not yet unlocked - please interact with the page first');
    }
  };

  return (
    <div 
      className={className}
      onMouseEnter={playHoverSound}
    >
      {children}
    </div>
  );
};

export default HoverSound;
