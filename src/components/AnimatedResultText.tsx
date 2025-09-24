import React, { useEffect, useState } from 'react';
import { soundManager } from '../utils/soundManager';

interface AnimatedResultTextProps {
  isWin: boolean;
  show: boolean;
}

export const AnimatedResultText: React.FC<AnimatedResultTextProps> = ({ isWin, show }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, color: string, delay: number}>>([]);

  useEffect(() => {
    if (show) {
      setIsAnimating(true);
      
      if (isWin) {
        soundManager.playWinSound();
        const newParticles = Array.from({ length: 15 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: -10 - (Math.random() * 20),
          color: ['#f9c752', '#00ff88', '#ffd700', '#ffffff'][Math.floor(Math.random() * 4)],
          delay: Math.random() * 1.5
        }));
        setParticles(newParticles);
      } else {
        soundManager.playLossSound();
        setParticles([]); // Clear particles for losses
      }
      
      // Reset animation state after completion
      const timer = setTimeout(() => {
        setIsAnimating(false);
        // Clear particles after animation
        setTimeout(() => setParticles([]), 2000);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [show, isWin]);

  if (!show) return null;

  return (
    <div className={`animated-result-container ${isAnimating ? 'animating' : ''}`}>
      <div className={`glow-layer ${isWin ? 'win-glow' : 'loss-glow'}`} />
      
      <h2 className={`result-text ${isWin ? 'win-text' : 'loss-text'}`}>
        {isWin ? 'YOU WON!' : 'YOU LOSE!'}
      </h2>
      
      {/* Confetti particles for wins */}
      {isWin && particles.map(particle => (
        <div
          key={particle.id}
          className="confetti-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedResultText;
