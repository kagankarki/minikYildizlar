import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "../lib/site";

function Star({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 1.6l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 16.8 5.9 20.2l1.4-6.8L2.2 8.7l6.9-.8L12 1.6z" />
    </svg>
  );
}

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-locked", open);
    return () => document.body.classList.remove("is-locked");
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? "border-b border-white/[0.07] bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-6 md:h-20">
          <a href="#giris" className="group -my-2 flex items-center gap-2.5 py-2">
            <Star className="h-3.5 w-3.5 fill-gold-300 transition-transform duration-500 group-hover:rotate-[72deg]" />
            <span className="display text-[0.95rem] tracking-[0.2em] text-cream md:text-base">
              MİNİK YILDIZLAR
            </span>
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative text-[0.78rem] font-light text-cream/70 transition-colors hover:text-gold-200
                           after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold-300
                           after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#iletisim" className="btn-gold hidden !px-6 !py-2.5 !text-[0.68rem] sm:inline-flex">
              Teklif Al
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Menüyü aç"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-cream lg:hidden"
            >
              <span className="flex flex-col gap-[5px]">
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] bg-ink transition-all duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between md:h-20">
          <span className="display text-[0.95rem] tracking-[0.2em] text-cream">
            MİNİK YILDIZLAR
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Menüyü kapat"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-cream"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current" fill="none" strokeWidth="1.5">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>

        <nav className="shell mt-10 flex flex-col">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              className={`display border-b border-white/[0.07] py-5 text-3xl text-cream/90 transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="shell mt-10 flex flex-col gap-3">
          <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="btn-whatsapp">
            WhatsApp'tan Ulaşın
          </a>
          <a href={SITE.instagram} target="_blank" rel="noreferrer" className="btn-instagram">
            Instagram'dan Ulaşın
          </a>
          <a href={SITE.phoneHref} className="btn-ghost">
            {SITE.phoneLabel}
          </a>
        </div>
      </div>
    </>
  );
}
