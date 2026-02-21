import { NextResponse } from "next/server";

const CACHE_MAX_AGE = 3600;

export async function GET(request) {
  const token = process.env.GITHUB_TOKEN?.trim();

  if (!token) {
    console.error("GITHUB_TOKEN is not set in environment variables");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 },
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const weeksParam = parseInt(searchParams.get("weeks"), 10);
    const numWeeks = weeksParam > 0 && weeksParam <= 53 ? weeksParam : 53;

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - numWeeks * 7);

    const query = `
      query($from: DateTime!, $to: DateTime!) {
        viewer {
          login
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                  color
                }
              }
              totalContributions
            }
          }
        }
      }
    `;

    const graphqlResponse = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          from: startDate.toISOString(),
          to: endDate.toISOString(),
        },
      }),
    });

    if (!graphqlResponse.ok) {
      console.error("GitHub API error:", graphqlResponse.status);
      return NextResponse.json(
        { error: "Failed to fetch contributions" },
        { status: 502 },
      );
    }

    const graphqlData = await graphqlResponse.json();

    if (graphqlData.errors) {
      console.error("GraphQL error:", graphqlData.errors[0]?.message);
      return NextResponse.json(
        { error: "Failed to fetch contributions" },
        { status: 502 },
      );
    }

    const viewer = graphqlData.data?.viewer;
    if (!viewer) {
      return NextResponse.json(
        { error: "Failed to fetch contributions" },
        { status: 502 },
      );
    }

    const weeks = viewer.contributionsCollection.contributionCalendar.weeks;

    const contributions = weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        color: day.color,
      })),
    );

    const calendarStart = new Date(
      weeks[0]?.contributionDays[0]?.date || startDate,
    );

    return NextResponse.json(
      {
        username: viewer.login,
        contributions,
        totalContributions:
          viewer.contributionsCollection.contributionCalendar
            .totalContributions,
        calendarStart: calendarStart.toISOString(),
      },
      {
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate=${CACHE_MAX_AGE * 2}`,
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
