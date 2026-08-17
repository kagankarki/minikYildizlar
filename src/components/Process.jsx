const STEPS = [
  {
    no: "01",
    title: "Tanışma & keşif",
    body: "Telefonda ya da ofiste 30 dakika. Tarih, kişi sayısı, mekân ve bütçe aralığını netleştiriyoruz.",
    note: "Ücretsiz",
  },
  {
    no: "02",
    title: "Konsept & görsel sunum",
    body: "Size özel renk paleti, dekor çizimleri ve mekân yerleşimi. Onaylayana kadar revize ediyoruz.",
    note: "3–5 gün",
  },
  {
    no: "03",
    title: "Üretim & planlama",
    body: "Dekor üretimi, tedarik, ekip görevlendirmesi ve dakika dakika gün akışı hazırlanır.",
    note: "Sözleşme sonrası",
  },
  {
    no: "04",
    title: "Organizasyon günü",
    body: "Kurulum sabah başlar, siz gelmeden her şey yerindedir. Toplanmayı da biz hallederiz.",
    note: "Sahada tam ekip",
  },
];

export default function Process() {
  return (
    <section id="surec" className="relative border-t border-white/[0.06] bg-ink-soft py-24 md:py-32">
      <div className="shell">
        <div className="max-w-2xl">
          <span className="eyebrow reveal">Nasıl çalışıyoruz</span>
          <h2 className="display reveal mt-6 text-balance text-[clamp(2rem,4.6vw,3.4rem)] text-cream" style={{ "--d": "80ms" }}>
            İlk görüşmeden son <em className="gilt not-italic">konfetiye</em> kadar
          </h2>
          <p className="reveal mt-6 text-[0.92rem] font-light leading-relaxed text-cream/55" style={{ "--d": "150ms" }}>
            Dört adım, tek muhatap. Süreç boyunca aynı kişiyle konuşursunuz.
          </p>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] md:grid-cols-2 xl:grid-cols-4">
          {STEPS.map((s, i) => (
            <li
              key={s.no}
              className="group reveal relative bg-ink-soft p-8 transition-colors duration-500 hover:bg-ink-raised md:p-9"
              style={{ "--d": `${i * 90}ms` }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="display text-[2.6rem] leading-none text-white/[0.08] transition-colors duration-500 group-hover:text-gold-400/25">
                  {s.no}
                </span>
                <span className="rounded-full border border-white/10 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.14em] text-cream/40">
                  {s.note}
                </span>
              </div>

              <h3 className="display mt-7 text-[1.3rem] text-cream">{s.title}</h3>
              <p className="mt-3 text-[0.84rem] font-light leading-relaxed text-cream/55">
                {s.body}
              </p>

              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold-400 to-transparent transition-transform duration-700 group-hover:scale-x-100"
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
