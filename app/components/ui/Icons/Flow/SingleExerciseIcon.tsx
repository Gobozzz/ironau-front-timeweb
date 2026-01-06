interface Props {
  color?: string;
}

export function SingleExerciseIcon({ color = "var(--black)" }: Props) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="7.25" stroke={color} strokeWidth="1.5" />
      <circle cx="8" cy="8" r="7.25" stroke={color} strokeWidth="1.5" />
      <circle cx="8" cy="8" r="7.25" stroke={color} strokeWidth="1.5" />
      <circle cx="8" cy="8" r="7.25" stroke={color} strokeWidth="1.5" />
      <circle cx="8" cy="8" r="3" fill="#131313" />
      <circle cx="8" cy="8" r="3" fill={color} />
      <circle cx="8" cy="8" r="3" fill={color} />
      <circle cx="8" cy="8" r="3" fill={color} />
    </svg>
  );
}
