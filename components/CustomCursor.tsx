"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    const onMove = (event: MouseEvent) => {
      pos.current.x = event.clientX;
      pos.current.y = event.clientY;
      cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    };

    const onDown = () => {
      ring.classList.add("scale-75");
    };

    const onUp = () => {
      ring.classList.remove("scale-75");
    };

    const onHover = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("button, a")) {
        ring.classList.add("ring-bright");
      } else {
        ring.classList.remove("ring-bright");
      }
    };

    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onHover);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onHover);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-80 hidden lg:block">
      <div
        ref={cursorRef}
        className="pointer-events-none absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-400"
      />
      <div
        ref={ringRef}
        className="pointer-events-none absolute left-0 top-0 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/50 transition-transform duration-150"
      />
    </div>
  );
}
