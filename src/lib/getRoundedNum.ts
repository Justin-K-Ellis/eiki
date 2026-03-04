export default function getRoundedNum(n: number, m: number): number {
  if (m === 0) {
    return 0;
  }
  return Math.round((n / m) * 100);
}
