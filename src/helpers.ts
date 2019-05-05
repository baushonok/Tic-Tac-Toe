export function getRandom(from: number, to: number): number {
  return Math.round(Math.random() * (to - from) + from);
}
