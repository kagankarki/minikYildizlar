import { useEffect } from "react";

/** Adds `.is-in` to every `.reveal` element once it scrolls into view. */
export function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    const seen = new WeakSet();
    const scan = () => {
      document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        io.observe(el);
      });
    };

    scan();
    // Sections mount after the preloader finishes, so watch for late additions.
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    /* Everything starts at opacity:0, so a silently broken observer would leave
       the page looking empty. If nothing has revealed by now, just show it. */
    const failsafe = setTimeout(() => {
      if (document.querySelector(".reveal.is-in")) return;
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
    }, 4000);

    return () => {
      clearTimeout(failsafe);
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
