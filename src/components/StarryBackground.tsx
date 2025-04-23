
import React, { useEffect, useRef } from 'react';

interface StarryBackgroundProps {
  starCount?: number;
}

const StarryBackground: React.FC<StarryBackgroundProps> = ({ starCount = 150 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    container.innerHTML = '';
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      const size = Math.random();
      
      // Determine star size
      if (size < 0.6) {
        star.classList.add('star', 'star-tiny');
        star.style.animationDuration = `${3 + Math.random() * 4}s`;
      } else if (size < 0.9) {
        star.classList.add('star', 'star-small');
        star.style.animationDuration = `${4 + Math.random() * 5}s`;
      } else {
        star.classList.add('star', 'star-medium');
        star.style.animationDuration = `${5 + Math.random() * 6}s`;
      }
      
      // Position star randomly
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      container.appendChild(star);
    }
  }, [starCount]);

  return <div ref={containerRef} className="fixed inset-0 z-[-1] overflow-hidden" />;
};

export default StarryBackground;
