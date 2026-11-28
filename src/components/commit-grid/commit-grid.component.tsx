"use client";

import { GeistPixelSquare } from "geist/font/pixel/square";
import { useEffect, useMemo, useRef } from "react";

import { COMMIT_GRID_CONFIG as config } from "./commit-grid.config";
import { drawGrid, rippleDurationMs, type DrawCell } from "./commit-grid.draw";
import { cellAt, cellKey } from "./commit-grid.hit";
import { hoverFadeMs, retargetFades, sampleFades } from "./commit-grid.hover";
import { levelCuts, levelFor } from "./commit-grid.levels";
import type {
  CommitGridProps,
  GridLayout,
  HoverFade,
  HoverTarget,
} from "./commit-grid.types";

const NUMBER_FONT_FAMILY = GeistPixelSquare.style.fontFamily;

export function CommitGrid({ calendar }: CommitGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverRef = useRef<HoverTarget | null>(null);
  const fadesRef = useRef<Map<string, HoverFade>>(new Map());

  const { cells, cellKeys, weekCount, totalMs } = useMemo(() => {
    const cuts = levelCuts(calendar.weeks.flatMap((w) => w.map((d) => d.count)));
    const lastWeek = calendar.weeks.length - 1;
    const lastDay = calendar.weeks[lastWeek]?.at(-1)?.weekday ?? 0;
    const built: DrawCell[] = calendar.weeks.flatMap((week, weekIndex) =>
      week.map((day) => ({
        week: weekIndex,
        weekday: day.weekday,
        level: levelFor(day.count, cuts),
        count: day.count,
        distance: Math.hypot(lastWeek - weekIndex, lastDay - day.weekday),
      })),
    );
    const maxDistance = Math.hypot(lastWeek, config.daysPerWeek - 1);
    return {
      cells: built,
      cellKeys: new Set(built.map((cell) => cellKey(cell.week, cell.weekday))),
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
    let disposed = false;

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
      const { numbers, animating } = sampleFades(
        fadesRef.current,
        now,
        hoverFadeMs(reduceMotion.matches),
      );
      drawGrid(ctx, layout, cells, elapsed, numbers, NUMBER_FONT_FAMILY);
      if (elapsed < totalMs || animating) frame = requestAnimationFrame(render);
    };

    const rerender = (): void => {
      cancelAnimationFrame(frame);
      render(performance.now());
    };

    const setHover = (target: HoverTarget | null): void => {
      hoverRef.current = target;
      retargetFades(
        fadesRef.current,
        target,
        performance.now(),
        hoverFadeMs(reduceMotion.matches),
      );
      rerender();
    };

    const clearHover = (): void => {
      if (hoverRef.current !== null) setHover(null);
    };

    const onPointerMove = (event: PointerEvent): void => {
      const rect = container.getBoundingClientRect();
      const target = cellAt(
        layoutFor(),
        weekCount,
        event.clientX - rect.left,
        event.clientY - rect.top,
      );
      if (!target || !cellKeys.has(cellKey(target.week, target.weekday))) {
        clearHover();
        return;
      }
      const current = hoverRef.current;
      if (target.week === current?.week && target.weekday === current.weekday) {
        return;
      }
      setHover(target);
    };

    const observer = new ResizeObserver(() => {
      clearHover();
      rerender();
    });
    observer.observe(container);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", clearHover);
    frame = requestAnimationFrame(render);
    void document.fonts
      .load(
        `${config.hover.fontWeight} 16px ${NUMBER_FONT_FAMILY}`,
        config.hover.fontLoadText,
      )
      .then(() => {
        if (!disposed) rerender();
      });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", clearHover);
    };
  }, [cells, cellKeys, weekCount, totalMs]);

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
