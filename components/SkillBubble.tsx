"use client";

import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function hashString(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

type SkillBubbleProps = {
  skill: string;
  size: number;
  position: { x: number; y: number };
  depth: number;
  clusterHovered?: boolean;
};

export default function SkillBubble({
  skill,
  size,
  position,
  depth,
  clusterHovered = false,
}: SkillBubbleProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isArmed, setIsArmed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const originRef = useRef({ x: 0, y: 0 });
  const armTimeoutRef = useRef<number | null>(null);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const motionConfig = useMemo(() => {
    const seed = hashString(skill);
    const floatY = 10 + (seed % 6);
    const floatX = 8 + (seed % 5);
    const duration = 6 + (seed % 4);
    const hoverRotate = (seed % 24) - 12;
    const hoverX = (seed % 9) - 4;
    const delay = (seed % 10) * 0.1;

    return { floatY, floatX, duration, hoverRotate, hoverX, delay };
  }, [skill]);

  const hoverBoost = clusterHovered ? 2.6 : 1;

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (event: PointerEvent) => {
      dragX.set(event.clientX - originRef.current.x);
      dragY.set(event.clientY - originRef.current.y);
    };

    const handleUp = () => {
      const xAnim = animate(dragX, 0, {
        type: "spring",
        stiffness: 120,
        damping: 12,
      });
      const yAnim = animate(dragY, 0, {
        type: "spring",
        stiffness: 120,
        damping: 12,
      });

      Promise.all([xAnim.finished, yAnim.finished]).finally(() => {
        setIsDragging(false);
      });
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [isDragging, dragX, dragY]);

  useEffect(() => {
    return () => {
      if (armTimeoutRef.current) {
        window.clearTimeout(armTimeoutRef.current);
      }
    };
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || !isArmed) return;
    event.preventDefault();
    setIsArmed(false);
    const rect = event.currentTarget.getBoundingClientRect();
    originRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    dragX.set(0);
    dragY.set(0);
    setIsDragging(true);
  };

  const handleDoubleClick = () => {
    setIsArmed(true);
    if (armTimeoutRef.current) {
      window.clearTimeout(armTimeoutRef.current);
    }
    armTimeoutRef.current = window.setTimeout(() => {
      setIsArmed(false);
    }, 600);
  };

  return (
    <motion.div
      animate={
        isDragging
          ? {}
          : {
              y: [
                0,
                -motionConfig.floatY * hoverBoost,
                0,
                motionConfig.floatY * hoverBoost,
                0,
              ],
              x: [
                0,
                motionConfig.floatX * hoverBoost,
                0,
                -motionConfig.floatX * hoverBoost,
                0,
              ],
              rotate: [0, motionConfig.hoverRotate / 2, 0],
            }
      }
      transition={{
        duration: motionConfig.duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: motionConfig.delay,
      }}
      whileHover={
        isDragging
          ? undefined
          : {
              scale: 1.32,
              rotate: motionConfig.hoverRotate,
              x: motionConfig.hoverX,
              y: -12,
              z: 160,
              transition: { type: "spring", stiffness: 320, damping: 12 },
            }
      }
      className={cn(
        "group absolute flex items-center justify-center rounded-full border border-purple-300/30",
        "bg-white/6 text-center text-base font-semibold text-slate-100",
        "backdrop-blur-xl shadow-[0_0_28px_rgba(168,85,247,0.45)]",
        "transition-shadow",
        isDragging
          ? "cursor-grabbing"
          : isHovered
            ? "cursor-grab"
            : "cursor-default"
      )}
      style={{
        width: 90,
        height: 90,
        left: isDragging ? originRef.current.x : `${position.x}%`,
        top: isDragging ? originRef.current.y : `${position.y}%`,
        position: isDragging ? "fixed" : "absolute",
        x: dragX,
        y: dragY,
        z: isDragging ? 200 : depth,
        zIndex: isDragging ? 999 : undefined,
        transformStyle: "preserve-3d",
      }}
      onPointerDown={handlePointerDown}
      onDoubleClick={handleDoubleClick}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onContextMenu={(event: React.MouseEvent<HTMLDivElement>) =>
        event.preventDefault()
      }
    >
      <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.32),transparent_55%)] opacity-80" />
      <span className="absolute inset-0 rounded-full border border-white/10 opacity-50" />
      <span className="absolute -inset-3 rounded-full bg-purple-500/25 opacity-0 blur-2xl transition-opacity duration-200 group-hover:opacity-100" />
      <span className="relative z-10 px-2 text-2xl sm:text-lg">
        {skill}
      </span>
    </motion.div>
  );
}
