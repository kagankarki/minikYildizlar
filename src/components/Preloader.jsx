import { useEffect, useState } from "react";

export default function Preloader({ progress, done }) {
  const [gone, setGone] = useState(false);
  const pct = Math.round(progress * 100);

  useEffect(() => {
    if (!done) {
      document.body.classList.add("is-locked");
      return;
    }
    document.body.classList.remove("is-locked");
    const t = setTimeout(() => setGone(true), 900);
    return () => clearTimeout(t);
  }, [done]);

  useEffect(() => () => document.body.classList.remove("is-locked"), []);

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink transition-opacity duration-700 ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="relative mb-9">
        <span className="absolute -inset-9 animate-spin-slow rounded-full border border-dashed border-gold-500/20" />
        <svg viewBox="0 0 24 24" className="h-7 w-7 animate-pulse-soft fill-gold-300">
          <path d="M12 1.6l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 16.8 5.9 20.2l1.4-6.8L2.2 8.7l6.9-.8L12 1.6z" />
        </svg>
      </div>

      <p className="display gilt text-2xl tracking-[0.14em] sm:text-3xl">
        MİNİK YILDIZLAR
      </p>
      <p className="mt-3 text-[0.6rem] uppercase tracking-widest2 text-cream/40">
        Ankara
      </p>

      <div className="mt-11 h-px w-56 overflow-hidden bg-white/10 sm:w-72">
        <div
          className="h-full bg-gradient-to-r from-gold-500 to-gold-200 transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-4 font-mono text-[0.65rem] tabular-nums text-cream/35">
        {String(pct).padStart(3, "0")}%
      </p>
      <span className="sr-only">Sahne hazırlanıyor</span>
    </div>
  );
}
