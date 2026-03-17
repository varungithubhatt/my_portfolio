"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SkillBubble from "@/components/SkillBubble";
import { skills } from "@/data/skills";
import { fadeUp, staggerContainer } from "@/lib/animations";

type BubbleLayout = {
  skill: string;
  position: { x: number; y: number };
  size: number;
  depth: number;
};

function seededRandom(seed: number) {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function generateLayout(list: string[]): BubbleLayout[] {
  const rand = seededRandom(42);
  const layouts: BubbleLayout[] = [];
  const radius = 47;
  const clusterPadding = 3;
  const bubbleMargin = 1.4;
  list.forEach((skill) => {
    const size = 12 + rand() * 4;
    const maxTries = 500;
    let placed = false;

    for (let attempt = 0; attempt < maxTries; attempt += 1) {
      const angle = rand() * Math.PI * 2;
      const dist =
        Math.sqrt(rand()) * (radius - clusterPadding - size / 2);
      const x = 50 + Math.cos(angle) * dist;
      const y = 50 + Math.sin(angle) * dist;

      const overlaps = layouts.some((other) => {
        const dx = x - other.position.x;
        const dy = y - other.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = (size + other.size) / 2 + bubbleMargin;
        return distance < minDistance;
      });
      if (!overlaps) {
        layouts.push({
          skill,
          position: { x, y },
          size,
          depth: -60 + rand() * 120,
        });
        placed = true;
        break;
      }
    }

    if (!placed) {
      layouts.push({
        skill,
        position: { x: 50, y: 50 },
        size,
        depth: -60 + rand() * 120,
      });
    }
  });

  return layouts;
}

export default function TechStackBalloon() {
  const [layout, setLayout] = useState<BubbleLayout[]>([]);
  const [isClusterHovered, setIsClusterHovered] = useState(false);

  useEffect(() => {
    setLayout(generateLayout(skills));
  }, []);

  return (
    <section id="skills" className="relative overflow-hidden py-28 px-5">
      <div className="absolute inset-0 bg-linear-to-b from-black via-slate-950 to-purple-950/40" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative mx-auto flex max-w-4xl flex-col gap-10 px-6"
      >
        <motion.div variants={fadeUp} className="max-w-2xl space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-purple-300">
            Tech Stack
          </p>
          <h3 className="text-5xl font-semibold text-white">Tech Stack</h3>
          <p className="text-lg text-slate-300">
            A toolkit I use to build scalable full stack and AI-powered applications.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="relative flex items-center justify-center"
          style={{ perspective: "1000px" }}
        >
          <div
            className="relative overflow-hidden rounded-full bg-white/5 shadow-[0_0_100px_rgba(168,85,247,0.3)] backdrop-blur-2xl"
            style={{
              width: "min(70vw, 560px)",
              height: "min(70vw, 560px)",
            }}
            onPointerEnter={() => setIsClusterHovered(true)}
            onPointerLeave={() => setIsClusterHovered(false)}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-24 top-6 h-64 w-64 rounded-full bg-purple-500/25 blur-[130px]" />
              <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-fuchsia-500/25 blur-[150px]" />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.18),transparent_45%)]" />
              {layout.slice(0, 8).map((item, index) => (
                <motion.span
                  key={`${item.skill}-particle-${index}`}
                  className="absolute rounded-full bg-purple-400/40 blur-sm"
                  style={{
                    width: 6 + index * 2,
                    height: 6 + index * 2,
                    left: `${12 + index * 8}%`,
                    top: `${18 + (index % 4) * 16}%`,
                  }}
                  animate={{ y: [0, -12, 0], opacity: [0.3, 0.8, 0.3] }}
                  transition={{
                    duration: 8 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            <div
              className="absolute inset-0 z-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              {layout.map((item) => (
                <SkillBubble
                  key={item.skill}
                  skill={item.skill}
                  size={item.size}
                  position={item.position}
                  depth={item.depth}
                  clusterHovered={isClusterHovered}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
