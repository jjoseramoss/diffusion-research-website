export const Footer = () => {
  return (
    <footer className="bg-ink px-6 py-12 text-canvas lg:px-12 xl:px-20">
      <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-end md:justify-between md:text-left">
        <div>
          <p className="max-w-xl text-lg font-semibold leading-7">
            Ordering and Timing in Language-Conditioned Diffusion Motion
            Planning
          </p>
          <p className="mt-2 text-sm text-line">
            Senior project research website
          </p>
          <p className="mt-2 text-sm text-line">
            Machine Intelligence Lab · UTRGV
          </p>
        </div>
        <a
          href="#top"
          className="text-sm font-medium underline underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Back to top
        </a>
      </div>
    </footer>
  );
};
