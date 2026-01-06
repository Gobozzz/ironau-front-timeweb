export function getDecadePeriod(year: number): { start: number; end: number } {
  const start = Math.floor(year / 10) * 10;
  let end =
    start + 10 > new Date().getFullYear()
      ? new Date().getFullYear()
      : start + 10;
  return { start, end };
}
