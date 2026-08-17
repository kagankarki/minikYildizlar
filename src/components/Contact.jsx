import { useState } from "react";
import { SITE } from "../lib/site";

const TYPES = [
  "Doğum Günü",
  "Baby Shower / Cinsiyet Partisi",
  "Nişan & Söz",
  "Düğün & After Party",
  "Mezuniyet & Okul",
  "Kurumsal & Lansman",
  "Diğer",
];

const EMPTY = { name: "", phone: "", type: TYPES[0], date: "", guests: "", note: "" };

function Row({ icon, label, value, href, external }) {
  const Tag = href ? "a" : "div";
  return (
    <Tag
      {...(href ? { href, ...(external ? { target: "_blank", rel: "noreferrer" } : {}) } : {})}
      className="group flex items-start gap-4 border-b border-white/[0.07] py-5 last:border-0"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mt-0.5 h-4 w-4 shrink-0 stroke-gold-300"
        aria-hidden="true"
      >
        <path d={icon} />
      </svg>
      <span className="min-w-0">
        <span className="block text-[0.63rem] uppercase tracking-[0.16em] text-cream/35">
          {label}
        </span>
        <span
          className={`mt-1 block break-words text-[0.9rem] font-light text-cream/85 ${
            href ? "transition-colors group-hover:text-gold-200" : ""
          }`}
        >
          {value}
        </span>
      </span>
    </Tag>
  );
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  /* No backend here — the form composes an email and hands it to the
     user to send. Swap for a real endpoint when one exists. */
  const submit = (e) => {
    e.preventDefault();
    const lines = [
      "Merhaba, web sitenizden yazıyorum.",
      "",
      `Ad Soyad: ${form.name}`,
      `Telefon: ${form.phone}`,
      `Organizasyon: ${form.type}`,
      form.date && `Tarih: ${form.date}`,
      form.guests && `Kişi sayısı: ${form.guests}`,
      form.note && `Not: ${form.note}`,
    ].filter(Boolean);

    window.open(
      `mailto:${SITE.email}?subject=Teklif İsteği&body=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener",
    );
  };

  return (
    <section id="iletisim" className="relative overflow-hidden border-t border-white/[0.06] bg-ink-soft py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(207,161,77,0.10),transparent_65%)]"
      />

      <div className="shell relative grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Left — pitch + details */}
        <div className="lg:col-span-5">
          <span className="eyebrow reveal">İletişim</span>
          <h2 className="display reveal mt-6 text-balance text-[clamp(2rem,4.6vw,3.4rem)] text-cream" style={{ "--d": "80ms" }}>
            Tarihinizi söyleyin, <em className="gilt not-italic">gerisini</em> konuşalım
          </h2>
          <p className="reveal mt-6 max-w-md text-[0.92rem] font-light leading-relaxed text-cream/55" style={{ "--d": "150ms" }}>
            Formu doldurun ya da doğrudan arayın. Aynı gün içinde size dönüş
            yapıp ücretsiz konsept önerimizi hazırlayalım.
          </p>

          <div className="reveal mt-12" style={{ "--d": "220ms" }}>
            <Row
              icon="M4.5 5.5c0-.8.7-1.5 1.5-1.5h2c.6 0 1.2.4 1.4 1l.9 2.6c.2.5 0 1.1-.4 1.4l-1.3 1a12 12 0 005.4 5.4l1-1.3c.3-.4.9-.6 1.4-.4l2.6.9c.6.2 1 .8 1 1.4v2c0 .8-.7 1.5-1.5 1.5A15.5 15.5 0 014.5 5.5z"
              label="Telefon"
              value={SITE.phoneLabel}
              href={SITE.phoneHref}
            />
            <Row
              icon="M3.5 6.5h17v11h-17zM3.5 7l8.5 6 8.5-6"
              label="E-posta"
              value={SITE.email}
              href={`mailto:${SITE.email}`}
            />
            <Row
              icon="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
              label="Ofis"
              value={SITE.address}
            />
            <Row
              icon="M7.5 3.5h9a4 4 0 014 4v9a4 4 0 01-4 4h-9a4 4 0 01-4-4v-9a4 4 0 014-4zM12 8.4a3.6 3.6 0 100 7.2 3.6 3.6 0 000-7.2zM17.2 6.9v.01"
              label="Instagram"
              value={SITE.instagramLabel}
              href={SITE.instagram}
              external
            />
            <Row
              icon="M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3.2 1.9"
              label="Çalışma saatleri"
              value={SITE.hours}
            />
          </div>
        </div>

        {/* Right — form */}
        <div className="lg:col-span-6 lg:col-start-8">
          <form
            onSubmit={submit}
            className="reveal rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-7 sm:p-9"
            style={{ "--d": "120ms" }}
          >
            <p className="display text-xl text-cream">Teklif formu</p>
            <p className="mt-2 text-[0.78rem] font-light text-cream/45">
              Bilgileri doldurun — mesajınız e-posta uygulamanızda hazır olarak açılsın.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-1">
                <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.14em] text-cream/45">
                  Ad Soyad *
                </span>
                <input
                  required
                  className="field"
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Adınız"
                  autoComplete="name"
                />
              </label>

              <label className="block sm:col-span-1">
                <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.14em] text-cream/45">
                  Telefon *
                </span>
                <input
                  required
                  type="tel"
                  className="field"
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="05__ ___ __ __"
                  autoComplete="tel"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.14em] text-cream/45">
                  Organizasyon türü
                </span>
                <select className="field appearance-none" value={form.type} onChange={set("type")}>
                  {TYPES.map((t) => (
                    <option key={t} value={t} className="bg-ink-raised text-cream">
                      {t}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.14em] text-cream/45">
                  Tarih
                </span>
                <input
                  type="date"
                  className="field [color-scheme:dark]"
                  value={form.date}
                  onChange={set("date")}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.14em] text-cream/45">
                  Kişi sayısı
                </span>
                <input
                  type="number"
                  min="1"
                  className="field"
                  value={form.guests}
                  onChange={set("guests")}
                  placeholder="Örn. 80"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.14em] text-cream/45">
                  Aklınızdaki konsept
                </span>
                <textarea
                  rows="4"
                  className="field resize-none"
                  value={form.note}
                  onChange={set("note")}
                  placeholder="Mekân, tema, renkler, bütçe aralığı…"
                />
              </label>
            </div>

            <button type="submit" className="btn-gold mt-8 w-full">
              E-posta ile Gönder
            </button>
            <p className="mt-4 text-center text-[0.68rem] font-light text-cream/35">
              Formu göndermek sizi hiçbir şeye bağlamaz.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
