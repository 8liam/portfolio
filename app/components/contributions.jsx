"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Contributions({ weeks } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = weeks ? `?weeks=${weeks}` : "";
        const response = await fetch(`/api/github/contributions${params}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch contributions");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const numWeeks = weeks || 53;

  const renderGrid = (weekCount, getCellColor) => (
    <div className="flex w-full flex-1 min-h-0">
      {Array.from({ length: weekCount }).map((_, weekIndex) => (
        <div key={weekIndex} className="flex flex-col flex-1">
          {Array.from({ length: 7 }).map((_, dayIndex) => {
            const isLastWeek = weekIndex === weekCount - 1;
            return (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`flex-1 min-h-[25px] border-b border-[#1C1C21] ${isLastWeek ? "" : "border-r"} hover:!bg-neutral-600 duration-600`}
                style={{ backgroundColor: getCellColor(weekIndex, dayIndex) }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );

  if (loading || error || !data) {
    return (
      <div className="w-full h-full flex flex-col mt-auto">
        {renderGrid(numWeeks, () => "#FFF")}
        <div className="grid grid-cols-2 font-pixel-circle font-bold">
          <div className="p-4 border-[#1C1C21] border-r">
            GITHUB CONTRIBUTIONS
          </div>
          <div className="p-4">&nbsp;</div>
        </div>
      </div>
    );
  }

  const contributionMap = new Map(data.contributions.map((c) => [c.date, c]));

  let currentDate = new Date(data.calendarStart);
  const dow = currentDate.getUTCDay();
  if (dow !== 0) {
    currentDate.setUTCDate(currentDate.getUTCDate() + (7 - dow));
  }

  const grid = [];
  while (grid.length < numWeeks) {
    const week = [];
    for (let day = 0; day < 7; day++) {
      const dateStr = currentDate.toISOString().split("T")[0];
      const contribution = contributionMap.get(dateStr);
      const rawColor = contribution?.color;
      const color = rawColor?.toLowerCase() === "#ebedf0" ? "#FFF" : rawColor;
      week.push(color);
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }
    grid.push(week);
  }

  return (
    <div className="w-full h-full flex flex-col mt-auto">
      {renderGrid(numWeeks, (w, d) => grid[w][d])}
      <div className="grid grid-cols-2 font-pixel-circle font-bold">
        <div className="p-4 border-[#1C1C21] border-r">
          {data.totalContributions} GITHUB CONTRIBUTIONS
        </div>
        <Link className="p-4" href={"https://github.com/8liam"} target="_blank">
          @{data.username}
        </Link>
      </div>
    </div>
  );
}
