import { COMMIT_GRID_CONFIG as config } from "./commit-grid.config";
import type { GridLayout, HoverTarget } from "./commit-grid.types";

/** which week/weekday cell sits under a point, or null outside the grid */
export function cellAt(
  layout: GridLayout,
  weekCount: number,
  x: number,
  y: number,
): HoverTarget | null {
  const col = Math.floor(x / layout.cellWidth);
  const row = Math.floor(y / layout.cellHeight);
  const week = layout.transposed ? row : col;
  const weekday = layout.transposed ? col : row;
  if (week < 0 || week >= weekCount) return null;
  if (weekday < 0 || weekday >= config.daysPerWeek) return null;
  return { week, weekday };
}

export const cellKey = (week: number, weekday: number): string =>
  `${week}:${weekday}`;
