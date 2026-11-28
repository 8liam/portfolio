import { COMMIT_GRID_CONFIG as config } from "./commit-grid.config";
import type { CellNumber, GridLayout, Rgb } from "./commit-grid.types";

const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

export const hexToRgb = (hex: string): Rgb => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
];

const LEVEL_RGB: readonly Rgb[] = config.palette.levels.map(hexToRgb);

export type DrawCell = {
  week: number;
  weekday: number;
  level: number;
  count: number;
  /** distance in cells from the ripple origin */
  distance: number;
};

export function rippleDurationMs(maxDistance: number): number {
  return maxDistance * config.ripple.msPerCell + config.ripple.cellDurationMs;
}

export function drawGrid(
  ctx: CanvasRenderingContext2D,
  layout: GridLayout,
  cells: readonly DrawCell[],
  elapsedMs: number,
  numbers: readonly CellNumber[] = [],
  fontFamily = "monospace",
): void {
  const { width, height, cellWidth, cellHeight, transposed } = layout;
  ctx.fillStyle = config.palette.ground;
  ctx.fillRect(0, 0, width, height);

  const small = Math.min(cellWidth, cellHeight);
  const gap = Math.max(config.minGapPx, small * config.gapRatio);
  const radius = Math.max(config.minRadiusPx, small * config.radiusRatio);
  const empty = LEVEL_RGB[0];
  if (empty === undefined) return;

  for (const cell of cells) {
    const target = LEVEL_RGB[cell.level] ?? empty;
    const progress = Math.min(
      1,
      Math.max(
        0,
        (elapsedMs - cell.distance * config.ripple.msPerCell) /
          config.ripple.cellDurationMs,
      ),
    );
    const eased = easeOutQuart(progress);
    const glow =
      cell.level > 0 ? Math.sin(Math.PI * progress) * config.ripple.glow : 0;
    const channel = (k: 0 | 1 | 2): number => {
      const mixed = empty[k] + (target[k] - empty[k]) * eased;
      return Math.round(mixed + (255 - mixed) * glow);
    };
    const col = transposed ? cell.weekday : cell.week;
    const row = transposed ? cell.week : cell.weekday;
    ctx.fillStyle = `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`;
    ctx.beginPath();
    ctx.roundRect(
      col * cellWidth + gap / 2,
      row * cellHeight + gap / 2,
      cellWidth - gap,
      cellHeight - gap,
      radius,
    );
    ctx.fill();
  }

  if (numbers.length === 0) return;
  const fontPx = Math.round(
    Math.min(
      config.hover.maxFontPx,
      Math.max(config.hover.minFontPx, small * config.hover.fontRatio),
    ),
  );
  ctx.font = `${config.hover.fontWeight} ${fontPx}px ${fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const number of numbers) {
    const cell = cells.find(
      (c) => c.week === number.week && c.weekday === number.weekday,
    );
    if (cell === undefined) continue;
    const col = transposed ? cell.weekday : cell.week;
    const row = transposed ? cell.week : cell.weekday;
    const scale =
      config.hover.scaleFrom + (1 - config.hover.scaleFrom) * number.progress;
    ctx.save();
    ctx.globalAlpha = number.progress;
    ctx.fillStyle =
      cell.level >= config.hover.lightLevelFrom
        ? config.hover.textOnLight
        : config.hover.textOnDark;
    ctx.translate((col + 0.5) * cellWidth, (row + 0.5) * cellHeight);
    ctx.scale(scale, scale);
    ctx.fillText(String(cell.count), 0, 0);
    ctx.restore();
  }
}
