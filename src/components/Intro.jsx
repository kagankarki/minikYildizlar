const PILLARS = [
  {
    title: "Özgün konsept",
    body: "Hazır paket yok. Her organizasyon, sizin hikâyeniz üzerine sıfırdan tasarlanır.",
  },
  {
    title: "Tek elden üretim",
    body: "Dekor, çiçek, ışık, ses ve pasta — tüm tedarik kendi ekibimizde. Sürpriz maliyet çıkmaz.",
  },
  {
    title: "Gün boyu yanınızda",
    body: "Kurulumdan toplanmaya kadar sahada bir organizasyon sorumlunuz olur.",
  },
];

export default function Intro() {
  return (
    <section id="hakkimizda" className="relative bg-ink py-24 md:py-36">
      {/* soft gold glow bleeding up from the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-[radial-gradient(60%_100%_at_50%_100%,rgba(207,161,77,0.13),transparent_70%)]"
      />

      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <span className="eyebrow reveal">Biz kimiz</span>
            <h2
              className="display reveal mt-7 text-balance text-[clamp(2rem,4.6vw,3.4rem)] text-cream"
              style={{ "--d": "80ms" }}
            >
              Hayalleri gerçeğe dönüştüren <em className="gilt not-italic">anılar</em> tasarlıyoruz.
            </h2>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p
              className="reveal text-pretty text-[0.95rem] font-light leading-[1.85] text-cream/65 md:text-[1.05rem]"
              style={{ "--d": "140ms" }}
            >
              Merhaba, ben Ceren. Turizm ve Otelcilik Konaklama İşletmeciliği mezunuyum.
              Meslek hayatım boyunca resepsiyonistlik ve otel yöneticiliği görevlerinde
              bulunarak misafir memnuniyeti ve organizasyon yönetimi konusunda deneyim kazandım.
            </p>
            <p
              className="reveal mt-6 text-pretty text-[0.95rem] font-light leading-[1.85] text-cream/65 md:text-[1.05rem]"
              style={{ "--d": "200ms" }}
            >
              Profesyonel balon süsleme eğitimi aldım ve kendimi bu alanda geliştirmeye devam ediyorum.
              Aynı zamanda iki çocuk annesiyim; çocukların mutluluğuna, ailelerin biriktirdiği anılara
              ve özel günlerin değerine çok inanıyorum.
            </p>
            <p
              className="reveal mt-6 text-pretty text-[0.95rem] font-light leading-[1.85] text-cream/65 md:text-[1.05rem]"
              style={{ "--d": "260ms" }}
            >
              Bugün Minik Yıldızlar Parti ile doğum günlerinden hastane odası süslemelerine,
              mezuniyetlerden özel kutlamalara kadar her detayı özenle planlıyor,
              çünkü benim için organizasyon sadece süsleme değil, yıllar sonra bile
              gülümseten anılar bırakmaktır.
            </p>

            <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-3">
              {PILLARS.map((p, i) => (
                <div
                  key={p.title}
                  className="reveal bg-ink p-6"
                  style={{ "--d": `${320 + i * 90}ms` }}
                >
                  <dt className="display text-lg text-gold-200">{p.title}</dt>
                  <dd className="mt-3 text-[0.82rem] font-light leading-relaxed text-cream/55">
                    {p.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
