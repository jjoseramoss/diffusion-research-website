import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type NavLink = { label: string; href: string };

export default function MobileNav({
  isScrolled,
  links,
}: {
  isScrolled: boolean;
  links: NavLink[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const handleBreakpoint = () => {
      if (desktop.matches) setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    desktop.addEventListener("change", handleBreakpoint);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      desktop.removeEventListener("change", handleBreakpoint);
    };
  }, [isOpen]);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-20 transition-colors duration-200 motion-reduce:transition-none lg:hidden ${isScrolled || isOpen ? "bg-ink text-canvas" : "bg-transparent text-ink"}`}
    >
      <nav
        aria-label="Primary navigation"
        className="relative flex items-center justify-between px-6 py-3"
      >
        <div className="flex items-center gap-3">
          <span>
            <img src="/machine-ai-icon.svg" alt="" width="25" />
          </span>
          <span className="text-base font-semibold font-stretch-110%">
            MI@UTRGV
          </span>
        </div>

        <button
          ref={buttonRef}
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-menu"
          onClick={() => setIsOpen((open) => !open)}
          className="flex size-11 items-center justify-center rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="size-6"
          >
            {isOpen ? (
              <path d="M5 5 19 19M19 5 5 19" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>

        <div id="mobile-nav-menu" className="absolute inset-x-6 top-full z-30">
          {isOpen && (
            <motion.ul
              initial={reduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="mt-2 space-y-1 rounded-2xl bg-canvas p-2 text-ink shadow-[0_12px_30px_rgba(0,0,0,0.14)]"
            >
              {links.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="flex min-h-11 items-center rounded-xl px-4 py-2 text-base font-medium hover:bg-line/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </div>
      </nav>
    </header>
  );
}
