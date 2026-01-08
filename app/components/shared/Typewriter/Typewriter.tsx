import React, { useState, useEffect } from "react";

interface TypewriterProps {
  text: string; // может содержать HTML
  speed?: number; // скорость печати
  className?: string;
  initialDelay?: number; // задержка перед началом
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 50,
  className,
  initialDelay = 0,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const startTyping = () => {
      if (index < text.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedText((prev) => prev + text.charAt(index));
          setIndex((prev) => prev + 1);
        }, speed);
      }
    };

    if (initialDelay > 0 && index === 0) {
      const delayTimeout = setTimeout(() => {
        startTyping();
      }, initialDelay);
      return () => {
        clearTimeout(delayTimeout);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    } else {
      startTyping();
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, text, speed, initialDelay]);

  useEffect(() => {
    if (index >= text.length && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [index, text]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: displayedText }}
    />
  );
};

export default Typewriter;
