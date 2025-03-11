
import { useEffect, useRef, useState } from 'react';

// Intersection Observer Hook for reveal animations
export const useRevealAnimation = (threshold = 0.1, rootMargin = '0px') => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Use setTimeout to prevent double animation/jittering
          setTimeout(() => {
            setIsVisible(true);
          }, 50);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
};

// Text animation helper (character by character)
export const animateCharacters = (text: string, delay = 100) => {
  const characters = text.split('');
  
  return characters.map((char, index) => (
    <span 
      key={index}
      className="inline-block opacity-0"
      style={{ 
        animation: 'fade-in 500ms forwards',
        animationDelay: `${index * delay}ms`,
        // Use style-based animation to prevent class conflicts
        opacity: 0 
      }}
    >
      {char}
    </span>
  ));
};

// Parallax effect for mouse movement
export const useMouseParallax = (strength = 20) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.clientX) / strength;
      const y = (window.innerHeight / 2 - e.clientY) / strength;
      setPosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [strength]);
  
  return position;
};

// Staggered animation for lists
export const useStaggeredAnimation = (items: any[], baseDelay = 100) => {
  return items.map((item, index) => ({
    ...item,
    animationDelay: index * baseDelay
  }));
};
