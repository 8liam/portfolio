import { CONTRIBUTIONS_CONFIG as config } from "./contributions.config";
import { contributionsResponseSchema } from "./contributions.schema";
import type {
  ContributionCalendar,
  ContributionDay,
  ContributionWeek,
} from "./contributions.types";

const MS_PER_DAY = 86_400_000;

const toIsoDate = (date: Date): string => date.toISOString().slice(0, 10);

/** Blank calendar so the grid still lays out when GitHub is unreachable. */
export function emptyCalendar(now: Date): ContributionCalendar {
  const days: ContributionDay[] = [];
  for (let i = config.windowDays - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * MS_PER_DAY);
    days.push({ date: toIsoDate(date), count: 0, weekday: date.getUTCDay() });
  }
  const weeks: ContributionDay[][] = [];
  for (const day of days) {
    const current = weeks[weeks.length - 1];
    if (current === undefined || day.weekday === 0) weeks.push([day]);
    else current.push(day);
  }
  return { total: 0, weeks };
}

export async function getContributionCalendar(
  now: Date = new Date(),
): Promise<ContributionCalendar> {
  const token = process.env[config.tokenEnvVar]?.trim();
  if (!token) {
    console.error(config.logPrefix, `${config.tokenEnvVar} is not set`);
    return emptyCalendar(now);
  }

  const from = new Date(now.getTime() - config.windowDays * MS_PER_DAY);

  try {
    const response = await fetch(config.endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: config.query,
        variables: { from: from.toISOString(), to: now.toISOString() },
      }),
      next: { revalidate: config.revalidateSeconds },
    });

    if (!response.ok) {
      console.error(config.logPrefix, `HTTP ${response.status}`);
      return emptyCalendar(now);
    }

    const parsed = contributionsResponseSchema.safeParse(await response.json());
    if (!parsed.success) {
      console.error(config.logPrefix, "unexpected response shape");
      return emptyCalendar(now);
    }

    const calendar =
      parsed.data.data.viewer.contributionsCollection.contributionCalendar;
    const weeks: ContributionWeek[] = calendar.weeks.map((week) =>
      week.contributionDays.map(
        (day): ContributionDay => ({
          date: day.date,
          count: day.contributionCount,
          weekday: day.weekday,
        }),
      ),
    );
    return { total: calendar.totalContributions, weeks };
  } catch (error) {
    console.error(config.logPrefix, error);
    return emptyCalendar(now);
  }
}
