import { NAV_LINKS, SITE } from "../lib/site";

const SERVICES = [
  "Doğum Günü",
  "Baby Shower",
  "Nişan & Söz",
  "Düğün & After Party",
  "Mezuniyet",
  "Kurumsal",
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] bg-ink">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-gold-300" aria-hidden="true">
                <path d="M12 1.6l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 16.8 5.9 20.2l1.4-6.8L2.2 8.7l6.9-.8L12 1.6z" />
              </svg>
              <span className="display text-base tracking-[0.2em] text-cream">
                MİNİK YILDIZLAR
              </span>
            </div>
            <p className="mt-5 max-w-sm text-[0.86rem] font-light leading-relaxed text-cream/50">
              Ankara'da doğum günü, baby shower, nişan, düğün ve kurumsal
              organizasyonlar. Konseptten uygulamaya tek elden.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="btn-gold !bg-[#25D366] !border-[#25D366] hover:!bg-[#20bd5a] !text-white !px-6 !py-2.5 !text-[0.68rem]">
                WhatsApp
              </a>
              <a href={SITE.instagram} target="_blank" rel="noreferrer" className="btn-gold !px-6 !py-2.5 !text-[0.68rem]">
                Instagram
              </a>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="text-[0.63rem] uppercase tracking-[0.16em] text-cream/35">
              Menü
            </p>
            {/* Block links with padding — 17px text rows were too small to tap. */}
            <ul className="mt-3 space-y-0.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="-mx-2 block rounded-lg px-2 py-3 text-[0.86rem] font-light text-cream/60 transition-colors hover:text-gold-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[0.63rem] uppercase tracking-[0.16em] text-cream/35">
              Hizmetler
            </p>
            <ul className="mt-3 space-y-0.5">
              {SERVICES.map((s) => (
                <li key={s}>
                  <a
                    href="#hizmetler"
                    className="-mx-2 block rounded-lg px-2 py-3 text-[0.86rem] font-light text-cream/60 transition-colors hover:text-gold-200"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/[0.07] pt-8 sm:flex-row">
          <p className="text-[0.72rem] font-light text-cream/35">
            © {new Date().getFullYear()} {SITE.name} {SITE.city}. Tüm hakları saklıdır.
          </p>
          <a
            href="#giris"
            className="group inline-flex items-center gap-2 text-[0.72rem] font-light text-cream/45 transition-colors hover:text-gold-200"
          >
            Başa dön
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
