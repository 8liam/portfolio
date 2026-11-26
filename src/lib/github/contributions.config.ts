export const CONTRIBUTIONS_CONFIG = {
  endpoint: "https://api.github.com/graphql",
  windowDays: 91,
  revalidateSeconds: 3600,
  tokenEnvVar: "GITHUB_TOKEN",
  daysPerWeek: 7,
  query: `
    query ($from: DateTime!, $to: DateTime!) {
      viewer {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                weekday
              }
            }
          }
        }
      }
    }
  `,
  logPrefix: "[github contributions]",
} as const;
