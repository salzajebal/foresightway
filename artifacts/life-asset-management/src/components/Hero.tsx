import { useState, useEffect } from 'react';
import { homeContent } from '../content';

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setFadeState('out');
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % homeContent.hero.phrases.length);
        setFadeState('in');
      }, 1000); // 1 second for fade out
      
    }, 4000); // Change phrase every 4 seconds
    
    return () => clearInterval(cycleInterval);
  }, []);

  return (
    <section 
      className="hero" 
      data-testid="hero-section"
    >
      {/* Background Media Container */}
      <div className="hero-media-container" data-testid="hero-media-container" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0
      }}>
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          poster={`${import.meta.env.BASE_URL}images/hero-poster.jpg`}
          data-testid="video-hero"
        >
          <source
            src={`${import.meta.env.BASE_URL}videos/main_movie.mp4`}
            type="video/mp4"
        />
        </video>
      </div>

      <div className="hero-overlay" data-testid="hero-overlay"></div>
      
      <div className="hero-content">
        <h1 
          className={`hero-title fade-${fadeState}`} 
          data-testid="hero-title"
        >
          {homeContent.hero.phrases[currentIndex].split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < homeContent.hero.phrases[currentIndex].split('\n').length - 1 && <br />}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}
