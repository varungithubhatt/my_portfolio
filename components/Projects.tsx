"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function Projects() {
  return (
    <section id="projects" className="py-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl px-6"
      >
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <Badge>Projects</Badge>
            <h3 className="mt-4 text-5xl font-semibold text-white">Signature builds.</h3>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="mt-10 grid gap-6 md:grid-cols-2"
        >
          {portfolioData.projects.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              className="group overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/60 transition hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={640}
                  height={420}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-2xl font-semibold text-white">{project.title}</h4>
                  <span className="text-sm text-purple-300">{project.category}</span>
                </div>
                <p className="text-base text-slate-400">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-purple-500/20 bg-slate-900/60 px-3 py-1.5 text-sm text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="secondary" asChild>
                    <a href={project.github} className="gap-2">
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button asChild>
                    <a href={project.demo} className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
