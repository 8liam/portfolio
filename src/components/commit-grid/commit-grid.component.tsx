"use client";

import { useEffect, useMemo, useRef } from "react";

import { COMMIT_GRID_CONFIG as config } from "./commit-grid.config";
import { drawGrid, rippleDurationMs, type DrawCell } from "./commit-grid.draw";
import { levelCuts, levelFor } from "./commit-grid.levels";
import type { CommitGridProps, GridLayout } from "./commit-grid.types";

export function CommitGrid({ calendar }: CommitGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { cells, weekCount, totalMs } = useMemo(() => {
    const cuts = levelCuts(calendar.weeks.flatMap((w) => w.map((d) => d.count)));
    const lastWeek = calendar.weeks.length - 1;
    const lastDay = calendar.weeks[lastWeek]?.at(-1)?.weekday ?? 0;
    const built: DrawCell[] = calendar.weeks.flatMap((week, weekIndex) =>
      week.map((day) => ({
        week: weekIndex,
        weekday: day.weekday,
        level: levelFor(day.count, cuts),
        distance: Math.hypot(lastWeek - weekIndex, lastDay - day.weekday),
      })),
    );
    const maxDistance = Math.hypot(lastWeek, config.daysPerWeek - 1);
    return {
      cells: built,
      weekCount: calendar.weeks.length,
      totalMs: rippleDurationMs(maxDistance),
    };
  }, [calendar]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!container || !canvas || !ctx || weekCount === 0) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fitQuery = window.matchMedia(config.fitMediaQuery);
    const startedAt = performance.now();
    let frame = 0;

    const layoutFor = (): GridLayout => {
      const { clientWidth: width, clientHeight: height } = container;
      const transposed = !fitQuery.matches && width < config.narrowMaxWidth;
      const columns = transposed ? config.daysPerWeek : weekCount;
      const rows = transposed ? weekCount : config.daysPerWeek;
      return {
        width,
        height,
        cellWidth: width / columns,
        cellHeight: height / rows,
        transposed,
      };
    };

    const render = (now: number): void => {
      const layout = layoutFor();
      const dpr = Math.min(window.devicePixelRatio || 1, config.maxDevicePixelRatio);
      canvas.width = Math.round(layout.width * dpr);
      canvas.height = Math.round(layout.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const elapsed = reduceMotion.matches ? totalMs : now - startedAt;
      drawGrid(ctx, layout, cells, elapsed);
      if (elapsed < totalMs) frame = requestAnimationFrame(render);
    };

    const rerender = (): void => {
      cancelAnimationFrame(frame);
      render(performance.now());
    };

    const observer = new ResizeObserver(rerender);
    observer.observe(container);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [cells, weekCount, totalMs]);

  return (
    <div ref={containerRef} className={config.className.container}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={config.label(calendar.total)}
        className={config.className.canvas}
      />
    </div>
  );
}
