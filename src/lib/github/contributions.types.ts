export type ContributionDay = {
  /** ISO date, YYYY-MM-DD */
  date: string;
  count: number;
  /** 0 = Sunday ... 6 = Saturday */
  weekday: number;
};

export type ContributionWeek = readonly ContributionDay[];

export type ContributionCalendar = {
  total: number;
  weeks: readonly ContributionWeek[];
};
