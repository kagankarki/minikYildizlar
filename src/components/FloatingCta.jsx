import { useEffect, useState } from "react";
import { SITE } from "../lib/site";

/** Appears once the visitor has scrolled past the opening film. */
export default function FloatingCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={SITE.instagram}
      target="_blank"
      rel="noreferrer"
      aria-label="Instagram'dan yazın"
      className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full
                  bg-gradient-to-br from-gold-300 to-gold-500 text-ink shadow-[0_14px_40px_-10px_rgba(207,161,77,0.8)]
                  transition-all duration-500 hover:scale-105 sm:bottom-8 sm:right-8 ${
                    show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
                  }`}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[1.5]" aria-hidden="true">
        <path d="M7.5 3.5h9a4 4 0 014 4v9a4 4 0 01-4 4h-9a4 4 0 01-4-4v-9a4 4 0 014-4zM12 8.4a3.6 3.6 0 100 7.2 3.6 3.6 0 000-7.2zM17.2 6.9v.01" />
      </svg>
    </a>
  );
}
