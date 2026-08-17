import { useCallback, useEffect, useState } from "react";
import { frameSrc } from "../lib/frames";

/**
 * GERÇEK FOTOĞRAF EKLEMEK İÇİN
 * -----------------------------
 * 1. Fotoğrafı  public/gallery/  klasörüne at.  Örn: public/gallery/dogumgunu.jpg
 * 2. Aşağıdaki satırda  frame: 118  yerine  src: "/gallery/dogumgunu.jpg"  yaz.
 * 3. title ve meta yazılarını değiştir.  span'a dokunma (kutunun boyutu).
 *
 * Karışık kullanabilirsin — bazı kutular fotoğraf, bazıları filmden kare kalabilir.
 */
const SHOTS = [
  { src: "/gallery/WhatsApp Image 2026-08-17 at 17.31.37.jpeg", title: "Gala Gecesi", meta: "Sahne kurulumu · Ankara", span: "lg:col-span-7 lg:row-span-2" },
  { src: "/gallery/WhatsApp Image 2026-08-17 at 17.31.38 (1).jpeg", title: "Doğum Günü Konsepti", meta: "Balon kemeri & neon", span: "lg:col-span-5" },
  { src: "/gallery/WhatsApp Image 2026-08-17 at 17.31.38 (2).jpeg", title: "Balo Salonu", meta: "Nişan · 180 kişi", span: "lg:col-span-5" },
  { src: "/gallery/WhatsApp Image 2026-08-17 at 17.31.38.jpeg", title: "Işık Tasarımı", meta: "Gobo & spot kurulumu", span: "lg:col-span-4" },
  { src: "/gallery/WhatsApp Image 2026-08-17 at 17.31.39 (1).jpeg", title: "Sahne Provası", meta: "Teknik hazırlık", span: "lg:col-span-4" },
  { src: "/gallery/WhatsApp Image 2026-08-17 at 17.31.39 (2).jpeg", title: "Bahçe Düğünü", meta: "Açık hava · yaz sezonu", span: "lg:col-span-4" },
  { src: "/gallery/WhatsApp Image 2026-08-17 at 17.31.39.jpeg", title: "Etkinlik Anı", meta: "Özel anlar", span: "lg:col-span-5 lg:row-span-2" },
  { src: "/gallery/WhatsApp Image 2026-08-17 at 17.31.40 (1).jpeg", title: "Harika Gösteri", meta: "Unutulmaz sahne", span: "lg:col-span-7" },
  { src: "/gallery/WhatsApp Image 2026-08-17 at 17.31.40 (2).jpeg", title: "Muhteşem Gün", meta: "Büyük kutlama", span: "lg:col-span-7" },
  { src: "/gallery/WhatsApp Image 2026-08-17 at 17.31.40 (3).jpeg", title: "Çocukların Neşesi", meta: "Eğlenceli oyunlar", span: "lg:col-span-6" },
  { src: "/gallery/WhatsApp Image 2026-08-17 at 17.31.40 (4).jpeg", title: "Mutluluk", meta: "Gülümseyen yüzler", span: "lg:col-span-6" },
  { src: "/gallery/WhatsApp Image 2026-08-17 at 17.31.40 (5).jpeg", title: "Sahne Işıkları", meta: "Görsel şölen", span: "lg:col-span-8" },
  { src: "/gallery/WhatsApp Image 2026-08-17 at 17.31.40.jpeg", title: "Büyük Kapanış", meta: "Gecenin sonu", span: "lg:col-span-4" },
];

/** A tile is either a real photo (`src`) or a still from the film (`frame`). */
const imgProps = (s) =>
  s.src
    ? { src: s.src }
    : {
        src: frameSrc("sd", s.frame),
        srcSet: `${frameSrc("sd", s.frame)} 1600w, ${frameSrc("hd", s.frame)} 2560w`,
        sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 58vw",
      };

const fullSrc = (s) => s.src ?? frameSrc("hd", s.frame);

export default function Gallery() {
  const [openIdx, setOpenIdx] = useState(null);

  const close = useCallback(() => setOpenIdx(null), []);

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setOpenIdx((i) => (i + 1) % SHOTS.length);
      if (e.key === "ArrowLeft") setOpenIdx((i) => (i - 1 + SHOTS.length) % SHOTS.length);
    };
    document.body.classList.add("is-locked");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("is-locked");
      window.removeEventListener("keydown", onKey);
    };
  }, [openIdx, close]);

  return (
    <section id="galeri" className="bg-ink py-24 md:py-32">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow reveal">Galeri</span>
            <h2 className="display reveal mt-6 text-balance text-[clamp(2rem,4.6vw,3.4rem)] text-cream" style={{ "--d": "80ms" }}>
              Sahneden <em className="gilt not-italic">kareler</em>
            </h2>
          </div>
          <a
            href="#iletisim"
            className="reveal group inline-flex items-center gap-2 text-[0.78rem] font-light text-cream/60 transition-colors hover:text-gold-200"
            style={{ "--d": "160ms" }}
          >
            Kendi konseptinizi konuşalım
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div className="mt-14 grid auto-rows-[190px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[225px] lg:grid-cols-12">
          {SHOTS.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setOpenIdx(i)}
              style={{ "--d": `${i * 70}ms` }}
              className={`reveal group relative overflow-hidden rounded-2xl border border-white/[0.07] text-left ${s.span}`}
            >
              <img
                {...imgProps(s)}
                alt={s.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.07]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-70"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <span className="block">
                  <span className="display block text-lg text-cream">{s.title}</span>
                  <span className="mt-1 block text-[0.68rem] font-light tracking-wide text-cream/50">
                    {s.meta}
                  </span>
                </span>
                <span className="flex h-8 w-8 shrink-0 translate-y-2 items-center justify-center rounded-full border border-gold-300/40 text-gold-200 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 stroke-current" fill="none" strokeWidth="1.6">
                    <path d="M4 4h7M4 4v7M4 4l6.5 6.5M20 20h-7M20 20v-7M20 20l-6.5-6.5" />
                  </svg>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {openIdx !== null && (
        <div
          className="fixed inset-0 z-[90] flex animate-fade-in items-center justify-center bg-ink/95 p-4 backdrop-blur-md sm:p-10"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={SHOTS[openIdx].title}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Kapat"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-cream transition-colors hover:border-gold-300/60 hover:text-gold-200 sm:right-8 sm:top-8"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current" fill="none" strokeWidth="1.5">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>

          <figure className="max-h-full w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={fullSrc(SHOTS[openIdx])}
              alt={SHOTS[openIdx].title}
              className="max-h-[76vh] w-full rounded-xl object-contain"
            />
            <figcaption className="mt-5 flex items-center justify-between gap-4 text-sm">
              <span>
                <span className="display block text-lg text-cream">{SHOTS[openIdx].title}</span>
                <span className="text-[0.72rem] font-light text-cream/45">{SHOTS[openIdx].meta}</span>
              </span>
              <span className="font-mono text-[0.7rem] tabular-nums text-cream/35">
                {String(openIdx + 1).padStart(2, "0")} / {String(SHOTS.length).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
