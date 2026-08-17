const QUOTES = [
  {
    text: "Kızımın 5. yaş doğum gününü hayal ettiğimizden çok daha güzel yaptılar. Sabah geldiğimde salon bambaşka bir yerdi — çocuklar kadar biz de büyülendik.",
    name: "Elif Yıldırım",
    role: "Doğum günü · Çayyolu",
  },
  {
    text: "Nişanımızda 200 kişiydik ve tek bir aksama olmadı. Işık kurulumu ve masa düzeni fotoğraflarda inanılmaz çıktı. Düğün için de onlarla devam ediyoruz.",
    name: "Merve & Can Demir",
    role: "Nişan · Gölbaşı",
  },
  {
    text: "Kurumsal yılbaşı organizasyonumuzu üstlendiler. Marka kimliğimize sadık kaldılar, bütçeyi aşmadılar ve süreç boyunca tek bir kişiyle muhatap olduk.",
    name: "Burak Şen",
    role: "İnsan Kaynakları Müdürü",
  },
];

function Stars() {
  return (
    <div className="flex gap-1" aria-label="5 üzerinden 5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-3 w-3 fill-gold-300" aria-hidden="true">
          <path d="M12 1.6l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 16.8 5.9 20.2l1.4-6.8L2.2 8.7l6.9-.8L12 1.6z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="yorumlar" className="bg-ink py-24 md:py-32">
      <div className="shell">
        <div className="text-center">
          <span className="eyebrow reveal">Yorumlar</span>
          <h2 className="display reveal mx-auto mt-6 max-w-2xl text-balance text-[clamp(2rem,4.6vw,3.4rem)] text-cream" style={{ "--d": "80ms" }}>
            Bizi en iyi <em className="gilt not-italic">misafirlerimiz</em> anlatır
          </h2>
        </div>

        {/* 3-up only from lg — at 768 it squeezed each quote into a 214px column */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {QUOTES.map((q, i) => (
            <figure
              key={q.name}
              className="card reveal flex flex-col p-8"
              style={{ "--d": `${i * 100}ms` }}
            >
              <span
                aria-hidden="true"
                className="display select-none text-5xl leading-none text-gold-400/25"
              >
                &ldquo;
              </span>
              <blockquote className="mt-2 flex-1 text-[0.92rem] font-light leading-[1.8] text-cream/70">
                {q.text}
              </blockquote>
              <figcaption className="mt-8 border-t border-white/[0.07] pt-6">
                <Stars />
                <p className="mt-4 text-sm font-medium text-cream">{q.name}</p>
                <p className="mt-0.5 text-[0.72rem] font-light text-cream/45">{q.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
