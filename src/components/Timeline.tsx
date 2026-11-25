import { motion, useReducedMotion, useScroll } from "motion/react";
import { useRef, type ReactNode } from "react";

type TimelineEntry = {
  title: string;
  content: ReactNode;
};

export default function Timeline({ data }: { data: TimelineEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const reducedMotion = useReducedMotion();

  return (
    <div ref={ref} className="relative mt-8">
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-[11px] top-3 w-0.5 bg-line"
      >
        <motion.div
          className="h-full w-full origin-top rounded-full bg-accent shadow-md shadow-accent/40 motion-reduce:shadow-none"
          style={{ scaleY: reducedMotion ? 1 : scrollYProgress }}
        />
      </div>
      <ol role="list" className="space-y-10">
        {data.map((item, index) => (
          <li key={item.title} className="relative pl-10">
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 grid size-6 place-items-center rounded-full border border-ink bg-canvas text-xs font-semibold text-ink"
            >
              {index + 1}
            </span>
            <h3 className="font-semibold text-ink">{item.title}</h3>
            <div className="mt-1">{item.content}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}
