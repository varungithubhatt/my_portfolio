"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const labels: Record<string, string> = {
  hero: "Home",
  about: "About",
  skills: "Skills",
  projects: "Projects",
  experience: "Experience",
  contact: "Contact",
};

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-slate-950/60 px-8 py-4 shadow-lg shadow-purple-500/10 backdrop-blur-md">
        <a href="#hero" className="text-base font-semibold text-white">
          &lt;DevPortfolio /&gt;
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {SECTION_IDS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                "relative text-base font-medium text-slate-300 transition hover:text-white",
                active === id && "text-white"
              )}
            >
              {labels[id]}
              <span
                className={cn(
                  "absolute -bottom-2 left-0 h-0.5 w-full origin-left scale-x-0 bg-linear-to-r from-purple-400 to-fuchsia-400 transition-transform",
                  active === id && "scale-x-100"
                )}
              />
            </a>
          ))}
        </div>
        <button
          className="md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {open ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </div>
      {open ? (
        <div className="mx-auto mt-3 w-[92%] rounded-2xl border border-purple-500/20 bg-slate-950/90 p-5 shadow-xl backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-3">
            {SECTION_IDS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-xl px-4 py-3 text-base text-slate-200 hover:bg-slate-900/60"
                onClick={() => setOpen(false)}
              >
                {labels[id]}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
