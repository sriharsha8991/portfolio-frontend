/**
 * TypewriterEffect Component
 * Cycles through titles with realistic typing effect
 * ['GenAI Engineer', 'Freelancer', 'YouTuber', 'Developer']
 */

import { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  titles: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export const TypewriterEffect = ({
  titles,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: TypewriterEffectProps) => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];

    const handleTyping = () => {
      if (isPaused) {
        // Wait before starting to delete
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseDuration);
        return;
      }

      if (!isDeleting) {
        // Typing
        if (currentText.length < currentTitle.length) {
          setCurrentText(currentTitle.substring(0, currentText.length + 1));
        } else {
          // Finished typing, pause before deleting
          setIsPaused(true);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentTitle.substring(0, currentText.length - 1));
        } else {
          // Finished deleting, move to next title
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    };

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timeoutId = setTimeout(handleTyping, isPaused ? 0 : speed);

    return () => clearTimeout(timeoutId);
  }, [
    currentText,
    currentTitleIndex,
    isDeleting,
    isPaused,
    titles,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return (
    <span className="inline-block">
      {currentText}
      <span className="animate-pulse-glow">|</span>
    </span>
  );
};

export default TypewriterEffect;
