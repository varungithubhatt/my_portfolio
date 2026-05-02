"use client";

import { motion } from "framer-motion";
import { Link as LinkIcon } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { Badge } from "@/components/ui/badge";
import { fadeUp, staggerContainer } from "@/lib/animations";

type ExperienceItem = {
  title: string;
  org: string;
  description?: string;
  link?: string;
  period?: string;
  image?: string;
  imageLink?: string;
  highlights?: string[];
};

export default function Experience() {
  const experienceItems = (portfolioData.experience as ExperienceItem[]).filter(
    (item) => item.image || item.highlights || item.period
  );
  const milestoneItems = (portfolioData.experience as ExperienceItem[]).filter(
    (item) => !item.image && !item.highlights && !item.period
  );

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
          <h3 className="mt-4 text-5xl font-semibold text-white">Experience.</h3>
        </motion.div>
        <div className="mt-10 space-y-6">
          {experienceItems.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/60 transition hover:border-purple-500/40"
            >
              {item.image ? (
                <a
                  href={item.imageLink ?? item.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${item.org} updates`}
                  className="block"
                >
                  <img
                    src={item.image}
                    alt={`${item.org} showcase`}
                    className="h-60 w-full object-cover"
                  />
                </a>
              ) : null}
              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xl font-semibold text-white">{item.title}</h4>
                    <p className="text-base text-slate-400">{item.org}</p>
                  </div>
                  {item.period ? <p className="text-sm text-slate-500">{item.period}</p> : null}
                </div>
                {item.highlights ? (
                  <ul className="mt-4 space-y-2 text-base text-slate-400">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-purple-400/70" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                ) : item.description ? (
                  <p className="mt-4 text-base text-slate-400">{item.description}</p>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-16">
          <motion.div variants={fadeUp}>
            <h3 className="text-3xl font-semibold text-white">Milestones and highlights.</h3>
          </motion.div>
          <div className="mt-8 space-y-6">
            {milestoneItems.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="rounded-3xl border border-slate-800/80 bg-slate-950/60 p-6 transition hover:border-purple-500/40"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
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
        </div>
      </motion.div>
    </section>
  );
}
