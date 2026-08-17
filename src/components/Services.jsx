const I = {
  cake: "M12 3.2c.9.7 1.4 1.4 1.4 2.1a1.4 1.4 0 01-2.8 0c0-.7.5-1.4 1.4-2.1zM6 11.5c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v1.7c-1 0-1.4.9-2.4.9s-1.5-.9-2.5-.9-1.5.9-2.5.9-1.5-.9-2.5-.9-1.1.9-2.1.9v-1.7zM4.5 16.4c1.2 0 1.7 1 3 1s1.8-1 3-1 1.8 1 3 1 1.8-1 3-1 1.3.6 2 .9v2.5a1 1 0 01-1 1H5.5a1 1 0 01-1-1v-3.4zM12 6.5v3",
  balloon:
    "M12 3c3 0 5 2.3 5 5.4 0 3.4-2.6 6.4-5 6.4S7 11.8 7 8.4C7 5.3 9 3 12 3zM12 14.8l-.9 1.7h1.8l-.9-1.7zM12 16.5c0 2 1.8 2.3 1.8 4",
  rings:
    "M9.5 14.6a4.1 4.1 0 100-8.2 4.1 4.1 0 000 8.2zM14.5 14.6a4.1 4.1 0 100-8.2M13 4.4l1.5 1.6L16 4.4l-1.5-1.3L13 4.4z",
  arch: "M5 20V11a7 7 0 0114 0v9M5 20h14M9 20v-8.6a3 3 0 016 0V20",
  cap: "M2.8 8.9L12 4.6l9.2 4.3-9.2 4.3-9.2-4.3zM6.6 11v4.6c0 1.5 2.4 2.7 5.4 2.7s5.4-1.2 5.4-2.7V11M20.4 9.6v4.7",
  spark:
    "M12 2.6l1.9 5 5 1.9-5 1.9-1.9 5-1.9-5-5-1.9 5-1.9L12 2.6zM19.2 15.4l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9zM4.8 3.4l.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5-1.5-.6 1.5-.6.6-1.5z",
};

const SERVICES = [
  {
    icon: I.cake,
    title: "Doğum Günü",
    text: "Minikler için masal dünyaları, yetişkinler için şık ve sofistike geceler. Tema, pasta, animasyon ve dekor bir arada.",
    tags: ["Konsept dekor", "Pasta & sweet table", "Animasyon"],
  },
  {
    icon: I.balloon,
    title: "Baby Shower & Cinsiyet Partisi",
    text: "Balon kemerleri, neon yazılar ve o büyük an için hazırlanan sürpriz reveal kurgusu.",
    tags: ["Balon tasarımı", "Neon yazı", "Reveal efekti"],
  },
  {
    icon: I.rings,
    title: "Nişan & Söz",
    text: "İki ailenin buluştuğu geceyi zamansız bir estetikle kurguluyoruz. Salon, bahçe ya da teras.",
    tags: ["Masa düzeni", "Çiçek tasarımı", "Işık kurulumu"],
  },
  {
    icon: I.arch,
    title: "Düğün & After Party",
    text: "Nikâh alanından after party'ye kadar tek akış. Sahne, ses, DJ ve görsel şovun tamamı bizde.",
    tags: ["Sahne & ışık", "DJ / canlı müzik", "Havai fişek"],
  },
  {
    icon: I.cap,
    title: "Mezuniyet & Okul",
    text: "Anaokulundan üniversiteye mezuniyet törenleri, kep atma anı ve okul özel günleri.",
    tags: ["Tören kurgusu", "Fotoğraf alanı", "Ses sistemi"],
  },
  {
    icon: I.spark,
    title: "Kurumsal & Lansman",
    text: "Marka lansmanları, açılışlar, yılbaşı partileri ve bayi toplantıları — kurumsal kimliğinize sadık.",
    tags: ["Marka uyumu", "LED ekran", "Catering"],
  },
];

export default function Services() {
  return (
    <section id="hizmetler" className="relative border-t border-white/[0.06] bg-ink-soft py-24 md:py-32">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow reveal">Hizmetlerimiz</span>
            <h2 className="display reveal mt-6 text-balance text-[clamp(2rem,4.6vw,3.4rem)] text-cream" style={{ "--d": "80ms" }}>
              Kutlanacak her an için <em className="gilt not-italic">bir sahne</em>
            </h2>
          </div>
          <p className="reveal max-w-sm text-[0.88rem] font-light leading-relaxed text-cream/55" style={{ "--d": "160ms" }}>
            Altı ana başlıkta çalışıyoruz — ama listede olmayan bir fikriniz
            varsa, onu da konuşalım.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <article
              key={s.title}
              className="card group reveal p-7 md:p-8"
              style={{ "--d": `${i * 80}ms` }}
            >
              {/* hover sheen */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100
                           bg-[radial-gradient(70%_60%_at_50%_0%,rgba(207,161,77,0.15),transparent_70%)]"
              />
              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-9 w-9 stroke-gold-300 transition-transform duration-500 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  <path d={s.icon} />
                </svg>

                <h3 className="display mt-6 text-[1.35rem] text-cream">{s.title}</h3>
                <p className="mt-3 text-[0.85rem] font-light leading-relaxed text-cream/55">
                  {s.text}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-white/10 px-3 py-1 text-[0.66rem] font-light tracking-wide text-cream/50
                                 transition-colors duration-500 group-hover:border-gold-400/25 group-hover:text-gold-100/70"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
