import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 1240, suffix: "+", label: "Tamamlanan organizasyon" },
  { value: 9, suffix: " yıl", label: "Ankara'da kesintisiz deneyim" },
  { value: 60, suffix: "+", label: "Özel tasarlanmış konsept" },
  { value: 98, suffix: "%", label: "Yeniden çalışma oranı" },
];

function useCountUp(target, active, duration = 1600) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setN(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);

  return n;
}

function Stat({ value, suffix, label, active }) {
  const n = useCountUp(value, active);
  return (
    <div className="bg-ink px-6 py-10 text-center md:py-14">
      <p className="display text-[clamp(2.4rem,6vw,3.9rem)] tabular-nums">
        <span className="gilt">
          {n.toLocaleString("tr-TR")}
          {suffix}
        </span>
      </p>
      <p className="mx-auto mt-3 max-w-[13rem] text-[0.75rem] font-light leading-relaxed text-cream/50">
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="border-y border-white/[0.06] bg-white/[0.06]">
      <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <Stat key={s.label} {...s} active={active} />
        ))}
      </div>
    </section>
  );
}
