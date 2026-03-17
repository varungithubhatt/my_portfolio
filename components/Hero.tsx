"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerContainer } from "@/lib/animations";

const typingWords = [
  "Developer",
  "Designer",
  "Builder",
  "Problem Solver",
];

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-20 h-64 w-64 rounded-full bg-purple-500/20 blur-[100px]" />
        <div className="absolute right-1/4 top-40 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-[120px]" />
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 pb-12 pt-32 text-center"
      >
        {/* <motion.p
          variants={fadeUp}
          className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-purple-200"
        >
          Premium Developer Portfolio
        </motion.p> */}
        <motion.h1
          variants={fadeUp}
          className="mt-6 text-6xl font-semibold tracking-tight text-white md:text-8xl"
        >
          {portfolioData.name}
        </motion.h1>
        <motion.h2
          variants={fadeUp}
          className="mt-4 text-2xl text-slate-300 md:text-4xl"
        >
          {portfolioData.role}
        </motion.h2>
        <motion.div variants={fadeUp} className="mt-4 text-lg text-slate-400">
          <TypingText words={typingWords} />
        </motion.div>
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-3xl text-xl text-slate-300"
        >
          {portfolioData.bio}
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Button asChild>
            <a href="#projects">View Projects</a>
          </Button>
          <Button variant="secondary" asChild>
            <a href={portfolioData.resumeUrl}>Download Resume</a>
          </Button>
          <Button variant="ghost" asChild>
            <a href="#contact">Contact Me</a>
          </Button>
        </motion.div>
        <motion.div
          variants={fadeUp}
          className="mt-10 flex items-center gap-6 text-slate-400"
        >
          <a
            href={portfolioData.socials.github}
            className="transition hover:text-white"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={portfolioData.socials.linkedin}
            className="transition hover:text-white"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={portfolioData.socials.twitter}
            className="transition hover:text-white"
            aria-label="Twitter"
          >
            <Twitter className="h-5 w-5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function TypingText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  useEffect(() => {
    const current = words[index];
    const timeout = setTimeout(() => {
      if (direction === "forward") {
        const next = current.slice(0, display.length + 1);
        setDisplay(next);
        if (next === current) {
          setDirection("back");
        }
      } else {
        const next = current.slice(0, display.length - 1);
        setDisplay(next);
        if (next.length === 0) {
          setDirection("forward");
          setIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, direction === "forward" ? 120 : 60);

    return () => clearTimeout(timeout);
  }, [display, direction, index, words]);

  return (
    <span className="font-mono text-purple-300">
      {display}
      <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-purple-400 align-middle" />
    </span>
  );
}
