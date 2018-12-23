export interface Point {
  x: number
  y: number
}

export interface Demo {
  next(): void
  mouseClick(p: Point): void
  mouseMove(p: Point): void
}

export function randomPop<T>(items: T[]): T {
  if (!items) return null
  const idx = Math.floor(Math.random() * items.length)
  const tmp = items[items.length - 1]
  items[items.length - 1] = items[idx]
  items[idx] = tmp
  return items.pop()
}

export function sample<T>(items: T[]): T {
  if (!items) return null
  return items[Math.floor(Math.random() * items.length)]
}