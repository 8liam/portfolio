import type { ContributionCalendar } from "@/src/lib/github/contributions.types";

export type CommitGridProps = {
  calendar: ContributionCalendar;
};

export type Rgb = readonly [number, number, number];

export type GridLayout = {
  width: number;
  height: number;
  cellWidth: number;
  cellHeight: number;
  /** weeks run down the screen instead of across it */
  transposed: boolean;
};

export type HoverTarget = {
  week: number;
  weekday: number;
};

export type HoverFade = {
  week: number;
  weekday: number;
  from: number;
  to: 0 | 1;
  startedAt: number;
};

/** a count to draw, with its eased 0..1 visibility */
export type CellNumber = {
  week: number;
  weekday: number;
  progress: number;
};
