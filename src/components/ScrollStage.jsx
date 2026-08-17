import { useEffect, useRef } from "react";
import { FRAME_COUNT } from "../lib/frames";

/**
 * Overlay beats, keyed to scroll progress through the film.
 * [fadeInStart, fullyIn, startFadeOut, fullyOut]
 */
const BEATS = [
  [0.0, 0.0, 0.13, 0.22],
  [0.26, 0.33, 0.42, 0.49],
  [0.53, 0.6, 0.68, 0.75],
  [0.8, 0.88, 1.01, 1.02],
];

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

function beatOpacity(p, [a, b, c, d]) {
  // Inclusive at both ends so the first beat is fully visible at p === 0.
  if (p < a || p > d) return 0;
  if (p < b) return clamp01((p - a) / (b - a || 1));
  if (p <= c) return 1;
  return clamp01(1 - (p - c) / (d - c || 1));
}

export default function ScrollStage({ store }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const beatRefs = useRef([]);
  const hintRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    let lastW = 0;
    let lastH = 0;

    /* Resize the backing store only on real layout changes. Mobile browsers
       fire resize constantly as the URL bar collapses; reallocating the canvas
       on each of those is what makes these scroll sites stutter. */
    const resize = (force = false) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = section.clientWidth;
      const h = window.innerHeight;
      if (!force && w === lastW && Math.abs(h - lastH) < 140) return false;
      lastW = w;
      lastH = h;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      return true;
    };

    const draw = (img) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    /* While the tail of the sequence is still downloading, show the closest
       frame we already have rather than holding a stale one. */
    const nearestReady = (i) => {
      const { ready } = store.current;
      if (ready[i]) return i;
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (i - d >= 0 && ready[i - d]) return i - d;
        if (i + d < FRAME_COUNT && ready[i + d]) return i + d;
      }
      return -1;
    };

    const readProgress = () => {
      const rect = section.getBoundingClientRect();
      const span = section.offsetHeight - window.innerHeight;
      return span <= 0 ? 0 : clamp01(-rect.top / span);
    };

    const paintOverlays = (p) => {
      beatRefs.current.forEach((el, i) => {
        if (!el) return;
        const o = beatOpacity(p, BEATS[i]);
        el.style.opacity = o;
        el.style.transform = `translate3d(0, ${(1 - o) * 26}px, 0)`;
        el.style.visibility = o < 0.01 ? "hidden" : "visible";
      });
      if (hintRef.current) {
        hintRef.current.style.opacity = clamp01(1 - p / 0.06);
      }
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${p})`;
      }
    };

    // Reduced motion: track the scrollbar exactly instead of easing toward it.
    const ease = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 0.16;

    let target = readProgress();
    let current = target;
    let lastDrawn = -1;
    let raf = 0;
    let settled = 0;

    const tick = () => {
      current += (target - current) * ease;
      if (Math.abs(target - current) < 0.0004) current = target;

      const idx = Math.round(current * (FRAME_COUNT - 1));
      const src = nearestReady(idx);
      if (src !== -1 && src !== lastDrawn) {
        draw(store.current.images[src]);
        lastDrawn = src;
      }
      paintOverlays(current);

      // Keep the loop alive while frames are still arriving, so a fallback
      // frame gets replaced by the exact one as soon as it decodes.
      const loading = store.current.count < FRAME_COUNT;
      settled = current === target && !loading ? settled + 1 : 0;
      raf = settled > 3 ? 0 : requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      kick();
    };

    const onResize = () => {
      if (resize()) lastDrawn = -1;
      target = readProgress();
      kick();
    };

    /* A tab that loads in the background never runs rAF, and returning from
       bfcache can restore a blank backing store. Repaint on the way back in. */
    const onShow = () => {
      if (document.visibilityState !== "visible") return;
      resize(true);
      lastDrawn = -1;
      target = readProgress();
      kick();
    };

    resize(true);
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    document.addEventListener("visibilitychange", onShow);
    window.addEventListener("pageshow", onShow);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      document.removeEventListener("visibilitychange", onShow);
      window.removeEventListener("pageshow", onShow);
    };
  }, [store]);

  const setBeat = (i) => (el) => {
    beatRefs.current[i] = el;
  };

  return (
    <section id="giris" ref={sectionRef} className="relative h-[440vh] md:h-[560vh]">
      <div className="sticky top-0 h-dvh w-full overflow-hidden bg-ink">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />
        <div className="vignette grain pointer-events-none absolute inset-0" />

        {/* Beat 1 — brand statement */}
        <div
          ref={setBeat(0)}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center will-change-transform"
        >
          <span className="mb-6 text-[0.62rem] uppercase tracking-widest2 text-gold-200/80 sm:text-[0.7rem]">
            Ankara · Minik Yıldızlar Parti
          </span>
          <h1 className="display gilt text-[clamp(2.6rem,9.5vw,7.5rem)]">
            Minik Yıldızlar
          </h1>
          <div className="mt-6 flex items-center gap-4">
            <span className="h-px w-10 bg-gold-500/50 sm:w-16" />
            <span className="text-[0.6rem] uppercase tracking-widest2 text-cream/60 sm:text-[0.68rem]">
              Organizasyon
            </span>
            <span className="h-px w-10 bg-gold-500/50 sm:w-16" />
          </div>
          <p className="mt-8 max-w-md text-pretty text-[0.9rem] font-light leading-relaxed text-cream/65 sm:text-base">
            Hayalinizdeki anı sahneye taşıyoruz. Işık, dekor ve her ince
            detay — tek bir imza altında.
          </p>
        </div>

        {/* Beat 2 */}
        <div
          ref={setBeat(1)}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center will-change-transform"
        >
          <h2 className="display max-w-3xl text-balance text-[clamp(1.9rem,5.6vw,4.2rem)] text-cream">
            Her davetin bir <em className="gilt not-italic">sahnesi</em> vardır
          </h2>
          <p className="mt-7 max-w-lg text-pretty text-sm font-light leading-relaxed text-cream/60 sm:text-base">
            Biz o sahneyi kurar, ışığı ayarlar ve sizi merkeze alırız.
          </p>
        </div>

        {/* Beat 3 */}
        <div
          ref={setBeat(2)}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center will-change-transform"
        >
          <span className="eyebrow mb-7">Konseptten sahneye</span>
          <ul className="flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-9">
            {["Doğum Günü", "Baby Shower", "Nişan", "Düğün", "Kurumsal"].map((t) => (
              <li
                key={t}
                className="display text-[clamp(1.25rem,3.6vw,2.6rem)] text-cream/85"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Beat 4 — call to action */}
        <div
          ref={setBeat(3)}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center will-change-transform"
        >
          <h2 className="display text-[clamp(2.1rem,6.4vw,5rem)]">
            <span className="gilt">Sahne sizin.</span>
          </h2>
          <p className="mt-6 max-w-md text-pretty text-sm font-light leading-relaxed text-cream/70 sm:text-base">
            Tarihinizi paylaşın, konsept önerimizi 24 saat içinde hazırlayalım.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a href="#iletisim" className="btn-gold">
              Teklif Alın
            </a>
            <a href="#hizmetler" className="btn-ghost">
              Hizmetleri Keşfedin
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={hintRef}
          className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        >
          <span className="text-[0.58rem] uppercase tracking-widest2 text-cream/45">
            Kaydırın
          </span>
          <span className="relative block h-11 w-px overflow-hidden bg-white/15">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-hint bg-gradient-to-b from-transparent to-gold-300" />
          </span>
        </div>

        {/* Film progress bar */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10">
          <div
            ref={barRef}
            className="h-full origin-left bg-gradient-to-r from-gold-500 to-gold-200"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
