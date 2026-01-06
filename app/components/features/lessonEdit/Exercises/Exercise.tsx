"use client";

interface Props {
  children: React.ReactNode;
}

export function Exercise({ children }: Props) {
  return <div className="exercise-item">{children}</div>;
}
