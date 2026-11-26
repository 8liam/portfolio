import { z } from "zod";

const daySchema = z.object({
  date: z.string(),
  contributionCount: z.number().int().nonnegative(),
  weekday: z.number().int().min(0).max(6),
});

export const contributionsResponseSchema = z.object({
  data: z.object({
    viewer: z.object({
      contributionsCollection: z.object({
        contributionCalendar: z.object({
          totalContributions: z.number().int().nonnegative(),
          weeks: z.array(z.object({ contributionDays: z.array(daySchema) })),
        }),
      }),
    }),
  }),
});
