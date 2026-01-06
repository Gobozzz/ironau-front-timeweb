"use client";

interface Props {
  color?: string;
}

export function ReversArrow({ color = "var(--black)" }: Props) {
  return (
    <svg
      width="24"
      height="29"
      viewBox="0 0 24 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.28571 15.04L1 21.52M1 21.52L7.28571 28M1 21.52H23M16.7143 1L23 7.48M23 7.48L16.7143 13.96M23 7.48H1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.28571 15.04L1 21.52M1 21.52L7.28571 28M1 21.52H23M16.7143 1L23 7.48M23 7.48L16.7143 13.96M23 7.48H1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.28571 15.04L1 21.52M1 21.52L7.28571 28M1 21.52H23M16.7143 1L23 7.48M23 7.48L16.7143 13.96M23 7.48H1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.28571 15.04L1 21.52M1 21.52L7.28571 28M1 21.52H23M16.7143 1L23 7.48M23 7.48L16.7143 13.96M23 7.48H1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
