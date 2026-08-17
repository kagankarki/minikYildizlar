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
              icon="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
              label="WhatsApp"
              value={SITE.whatsappLabel}
              href={SITE.whatsappHref}
              external
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
