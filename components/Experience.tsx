"use client";

import { motion } from "framer-motion";
import { Link as LinkIcon } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { Badge } from "@/components/ui/badge";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-6xl px-6"
      >
        <motion.div variants={fadeUp}>
          <Badge>Experience</Badge>
          <h3 className="mt-4 text-5xl font-semibold text-white">Milestones and highlights.</h3>
        </motion.div>
        <div className="mt-10 space-y-6">
          {portfolioData.experience.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="rounded-3xl border border-slate-800/80 bg-slate-950/60 p-6 transition hover:border-purple-500/40"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="text-xl font-semibold text-white">{item.title}</h4>
                  <p className="text-base text-slate-400">{item.org}</p>
                </div>
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-purple-400/30 bg-purple-500/10 p-2 text-purple-200 transition hover:border-purple-400/70 hover:text-white"
                    aria-label={`Open ${item.title}`}
                  >
                    <LinkIcon className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
              <p className="mt-3 text-base text-slate-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
