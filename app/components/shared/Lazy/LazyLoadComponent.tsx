import useIntersectionObserver from "@/app/hooks/useIntersectionObserver";
import { useState } from "react";

interface LazyLoadProps {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
}

export default function LazyLoadComponent({
  children,
  placeholder = null,
}: LazyLoadProps) {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>();
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);

  if (isVisible && !hasScrolledIntoView) {
    setHasScrolledIntoView(true);
  }

  const shouldShow = isVisible || hasScrolledIntoView;

  return <div ref={ref}>{shouldShow ? children : placeholder}</div>;
}
