"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";

export default function About() {
  return (
    <section id="about" className="relative pb-24 pt-14">
      <div className="pointer-events-none absolute -top-10 right-8 h-32 w-32 rounded-full bg-purple-500/20 blur-[80px]" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
      >
        <motion.div variants={fadeUp} className="space-y-6">
          <Badge>About</Badge>

          <h3 className="text-5xl font-semibold text-white leading-tight">
            Building real-world AI powered web apps with modern technologies.
          </h3>

          <p className="text-lg text-slate-300 leading-relaxed">{portfolioData.bio}</p>

          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-200">
            <span className="uppercase tracking-[0.2em]">Objective</span>
            <span className="h-1 w-1 rounded-full bg-purple-400" />
            <span>{portfolioData.objective}</span>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="space-y-4"
        >
          {portfolioData.aboutTimeline.map((item) => (
            <div
              key={item.title}
              className="relative rounded-2xl border border-slate-800/80 bg-slate-950/60 p-5 transition hover:border-purple-500/40"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                <span className="text-sm text-purple-300">{item.year}</span>
              </div>

              <p className="mt-2 text-base text-slate-400">{item.description}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}