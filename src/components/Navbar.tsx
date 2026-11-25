import { useState, useEffect } from "react";
import MobileNav from "./MobileNav";

const navLink =
  "inline-flex min-h-8 items-center whitespace-nowrap px-1 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const links = [
  { label: "Introduction", href: "#introduction" },
  { label: "Method", href: "#method" },
  { label: "Results", href: "#results" },
  { label: "Motion Examples", href: "#motion-examples" },
  { label: "Acknowledgements", href: "#acknowledgements" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <MobileNav isScrolled={isScrolled} links={links} />
      <header
        className={`sticky top-0 z-10 hidden lg:block transition-colors duration-200 motion-reduce:transition-none ${isScrolled ? "bg-ink text-white" : "bg-transparent text-ink"}`}
      >
        <nav
          aria-label="Primary navigation"
          className="flex w-full items-center justify-between gap-6 px-6 py-3 lg:px-12 xl:px-20"
        >
          <div className="flex shrink-0 items-center gap-3">
            <span>
              <img src="/machine-ai-icon.svg" alt="" width="25" />
            </span>
            <span className="text-lg font-semibold font-stretch-110%">
              MI@UTRGV
            </span>
          </div>

          <ul className="flex items-center gap-1.5 text-sm font-medium">
            {links.map(({ label, href }) => (
              <li key={href}>
                <a className={navLink} href={href}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
