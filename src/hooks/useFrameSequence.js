import { useEffect, useRef, useState } from "react";
import {
  FRAME_COUNT,
  frameSrc,
  loadImage,
  pickTier,
  pooled,
  priorityOrder,
} from "../lib/frames";

/**
 * Loads the frame sequence in two passes: a strided "priority" pass that gates
 * the preloader, then the remaining frames in the background. The renderer
 * reads `store` synchronously and falls back to the nearest decoded frame, so
 * scrolling stays smooth while the tail is still downloading.
 */
export function useFrameSequence() {
  const store = useRef({
    images: new Array(FRAME_COUNT).fill(null),
    ready: new Uint8Array(FRAME_COUNT),
    count: 0,
  });
  const [progress, setProgress] = useState(0);
  const [primed, setPrimed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const tier = pickTier();
    const { first, rest } = priorityOrder();
    const s = store.current;

    const put = (i, img) => {
      if (!img || s.ready[i]) return;
      s.images[i] = img;
      s.ready[i] = 1;
      s.count += 1;
    };

    (async () => {
      let done = 0;
      await pooled(first, 6, async (i) => {
        const img = await loadImage(frameSrc(tier, i));
        if (cancelled) return;
        put(i, img);
        done += 1;
        setProgress(done / first.length);
      });

      if (cancelled) return;
      setPrimed(true);

      // Tail pass — lower concurrency so it never competes with rendering.
      await pooled(rest, 4, async (i) => {
        const img = await loadImage(frameSrc(tier, i));
        if (!cancelled) put(i, img);
      });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { store, progress, primed };
}
