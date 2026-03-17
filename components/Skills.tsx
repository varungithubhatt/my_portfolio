"use client";

import { motion } from "framer-motion";
import { Code, Cloud, Database, Layers, Sparkles } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";

const iconMap = [Layers, Database, Cloud, Sparkles, Code];

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-6xl px-6"
      >
        <motion.div variants={fadeUp} className="flex items-center justify-between">
          <div>
            <Badge>Skills</Badge>
            <h3 className="mt-4 text-5xl font-semibold text-white">Toolkit built for scale.</h3>
          </div>
          <p className="hidden max-w-md text-sm text-slate-400 md:block">
            Balanced across product engineering, infrastructure, and intelligent systems.
          </p>
        </motion.div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {portfolioData.skills.map((group, index) => {
            const Icon = iconMap[index % iconMap.length];
            return (
              <motion.div
                key={group.category}
                variants={fadeUp}
                className="rounded-3xl border border-slate-800/80 bg-slate-950/60 p-6 transition hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-purple-500/15 p-4">
                    <Icon className="h-6 w-6 text-purple-300" />
                  </div>
                  <h4 className="text-xl font-semibold text-white">{group.category}</h4>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-purple-500/30 bg-slate-900/60 px-3 py-1.5 text-sm text-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
