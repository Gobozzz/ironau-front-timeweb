"use client";
import { useState, useEffect, useRef } from "react";

export default function useIntersectionObserver<
  T extends HTMLElement = HTMLElement
>(options?: IntersectionObserverInit): [React.RefObject<T>, boolean] {
  const ref = useRef<T | null>(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref as React.RefObject<T>, isIntersecting];
}
