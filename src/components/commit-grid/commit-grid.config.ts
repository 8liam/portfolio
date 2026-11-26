export const COMMIT_GRID_CONFIG = {
  palette: {
    ground: "#0d0d0d",
    /** index 0 = empty day, 1..4 = quartile levels */
    levels: ["#1a1a1a", "#3a3a3a", "#666666", "#9c9c9c", "#f0f0f0"],
  },
  levelQuantiles: [0.25, 0.5, 0.75],
  daysPerWeek: 7,
  /** desktop shows the grid filling its box, everything else keeps square cells */
  fitMediaQuery: "(min-width: 761px) and (min-height: 520px)",
  narrowMaxWidth: 700,
  gapRatio: 0.045,
  minGapPx: 2,
  radiusRatio: 0.05,
  minRadiusPx: 2,
  maxDevicePixelRatio: 2,
  ripple: {
    msPerCell: 62,
    cellDurationMs: 520,
    glow: 0.35,
  },
  label: (total: number): string =>
    `Liam Grant's GitHub contribution graph for the last three months: ${total.toLocaleString("en-AU")} contributions`,
  className: {
    container:
      "relative w-full overflow-hidden bg-[var(--home-ground)] aspect-[2/1] max-[699px]:aspect-[1/2] desktop-fit:aspect-auto desktop-fit:h-full",
    canvas: "absolute inset-0 block h-full w-full",
  },
} as const;
