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
