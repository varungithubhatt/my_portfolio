"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-60 h-0.75 w-full origin-left bg-linear-to-r from-purple-500 via-fuchsia-500 to-indigo-500 shadow-[0_0_12px_rgba(168,85,247,0.7)]"
    />
  );
}
