'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  delay: number;
}

export function ParticleEffects() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = [
      'var(--wave-foam)',
      'var(--ocean-light)',
      'var(--sunset-coral)',
      'var(--wave-crest)',
      'rgba(135, 206, 235, 0.6)',
      'rgba(255, 140, 105, 0.4)'
    ];

    const newParticles: Particle[] = [];
    
    // Create 20 floating particles
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100, // percentage
        y: Math.random() * 100,
        size: Math.random() * 4 + 2, // 2-6px
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 20 + 15, // 15-35s
        delay: Math.random() * 15 // 0-15s delay
      });
    }
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="particle-container">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            bottom: '0px',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.color,
            animationDuration: `${particle.speed}s`,
            animationDelay: `-${particle.delay}s`,
            borderRadius: '50%',
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
}

// Wave ripple effect component for interactive elements
export function WaveRipple({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`ripple-effect ${className}`}>
      {children}
    </div>
  );
}

// Floating animation wrapper
export function FloatingElement({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`floating-element ${className}`}>
      {children}
    </div>
  );
}

// Ocean wave background component
export function OceanWaveBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="day-night-transition geometric-waves smooth-scroll">
      <ParticleEffects />
      {children}
    </div>
  );
}