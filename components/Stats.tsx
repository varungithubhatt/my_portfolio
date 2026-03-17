"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { Badge } from "@/components/ui/badge";
import { fadeUp, staggerContainer } from "@/lib/animations";

function useCountUp(value: number) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const duration = 1200;
    const start = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = Math.floor(eased * value).toString();
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [value]);

  return ref;
}

export default function Stats() {
  return (
    <section id="stats" className="py-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-6xl px-6"
      >
        <motion.div variants={fadeUp}>
          <Badge>Stats</Badge>
          <h3 className="mt-4 text-5xl font-semibold text-white">Real-time coding stats.</h3>
        </motion.div>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {portfolioData.stats.map((stat) => {
            const countRef = useCountUp(stat.value);
            return (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="rounded-3xl border border-slate-800/80 bg-slate-950/60 p-6 text-center transition hover:border-purple-500/40"
              >
                <p className="text-4xl font-semibold text-white">
                  <span ref={countRef} />+
                </p>
                <p className="mt-3 text-sm uppercase tracking-[0.3em] text-slate-500">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
