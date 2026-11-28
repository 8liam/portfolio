import { COMMIT_GRID_CONFIG as config } from "./commit-grid.config";
import { cellKey } from "./commit-grid.hit";
import type { CellNumber, HoverFade, HoverTarget } from "./commit-grid.types";

const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function valueAt(fade: HoverFade, now: number, durationMs: number): number {
  const t =
    durationMs <= 0
      ? 1
      : Math.min(1, Math.max(0, (now - fade.startedAt) / durationMs));
  return fade.from + (fade.to - fade.from) * easeInOutCubic(t);
}

/** point every fade at the new hover target, continuing from where each one is */
export function retargetFades(
  fades: Map<string, HoverFade>,
  next: HoverTarget | null,
  now: number,
  durationMs: number,
): void {
  const nextKey = next ? cellKey(next.week, next.weekday) : null;
  for (const [key, fade] of fades) {
    const to = key === nextKey ? 1 : 0;
    if (fade.to === to) continue;
    fades.set(key, {
      ...fade,
      from: valueAt(fade, now, durationMs),
      to,
      startedAt: now,
    });
  }
  if (next && nextKey && !fades.has(nextKey)) {
    fades.set(nextKey, {
      week: next.week,
      weekday: next.weekday,
      from: 0,
      to: 1,
      startedAt: now,
    });
  }
}

/** current visibility of every live fade; drops finished fade-outs */
export function sampleFades(
  fades: Map<string, HoverFade>,
  now: number,
  durationMs: number,
): { numbers: CellNumber[]; animating: boolean } {
  const numbers: CellNumber[] = [];
  let animating = false;
  for (const [key, fade] of fades) {
    const progress = valueAt(fade, now, durationMs);
    const settled = durationMs <= 0 || now - fade.startedAt >= durationMs;
    if (!settled) animating = true;
    if (settled && fade.to === 0) {
      fades.delete(key);
      continue;
    }
    numbers.push({ week: fade.week, weekday: fade.weekday, progress });
  }
  return { numbers, animating };
}

export const hoverFadeMs = (reduceMotion: boolean): number =>
  reduceMotion ? 0 : config.hover.fadeMs;
