import { COMMIT_GRID_CONFIG as config } from "./commit-grid.config";

/** Count thresholds for levels 1..4, taken from the user's own non-zero days. */
export function levelCuts(counts: readonly number[]): readonly number[] {
  const sorted = counts.filter((n) => n > 0).sort((a, b) => a - b);
  if (sorted.length === 0) return config.levelQuantiles.map(() => 0);
  return config.levelQuantiles.map((q) => {
    const index = Math.min(sorted.length - 1, Math.floor(q * sorted.length));
    return sorted[index] ?? 0;
  });
}

export function levelFor(count: number, cuts: readonly number[]): number {
  if (count <= 0) return 0;
  const below = cuts.findIndex((cut) => count <= cut);
  return below === -1 ? cuts.length + 1 : below + 1;
}
