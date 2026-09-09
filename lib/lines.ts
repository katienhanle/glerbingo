import { GRID_SIZE } from "./squares";

// Indices for every row and every column on the 4x4 grid.
export const LINES: number[][] = [
  ...Array.from({ length: GRID_SIZE }, (_, row) =>
    Array.from({ length: GRID_SIZE }, (_, col) => row * GRID_SIZE + col)
  ),
  ...Array.from({ length: GRID_SIZE }, (_, col) =>
    Array.from({ length: GRID_SIZE }, (_, row) => row * GRID_SIZE + col)
  ),
];

export function countCompletedLines(filledIds: Set<number>): number {
  return LINES.filter((line) => line.every((id) => filledIds.has(id))).length;
}

export type PrizeTier = "candy1" | "candy2" | "sticker";

export function prizesForState(
  filledIds: Set<number>
): Record<PrizeTier, boolean> {
  const completedLines = countCompletedLines(filledIds);
  return {
    candy1: completedLines >= 1,
    candy2: completedLines >= 2,
    sticker: filledIds.size >= SQUARE_COUNT,
  };
}

const SQUARE_COUNT = GRID_SIZE * GRID_SIZE;
