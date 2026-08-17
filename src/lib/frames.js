export const FRAME_COUNT = 142;

/** Frames the preloader fetches before the site is revealed. */
const PRIORITY_STRIDE = 8;

export const frameSrc = (tier, i) =>
  `/frames/${tier}/frame_${String(i).padStart(3, "0")}.webp`;

/**
 * hd = 2560x1440, sd = 1600x900. Pick whichever is at least as wide as the
 * device's real pixel width so the browser downsamples rather than upscales.
 */
export function pickTier() {
  const conn = navigator.connection;
  if (conn?.saveData) return "sd";
  if (conn?.effectiveType && /(^|-)(2g|3g)$/.test(conn.effectiveType)) return "sd";

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  return window.innerWidth * dpr > 1700 ? "hd" : "sd";
}

export function priorityOrder() {
  const seen = new Set();
  const first = [];
  for (let i = 0; i < FRAME_COUNT; i += PRIORITY_STRIDE) {
    first.push(i);
    seen.add(i);
  }
  if (!seen.has(FRAME_COUNT - 1)) {
    first.push(FRAME_COUNT - 1);
    seen.add(FRAME_COUNT - 1);
  }
  const rest = [];
  for (let i = 0; i < FRAME_COUNT; i++) if (!seen.has(i)) rest.push(i);
  return { first, rest };
}

/** Runs `task` over `items` with a bounded number of in-flight requests. */
export async function pooled(items, limit, task) {
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const item = items[cursor++];
      await task(item);
    }
  });
  await Promise.all(workers);
}

export function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}
