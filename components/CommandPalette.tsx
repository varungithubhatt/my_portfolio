"use client";

import { useEffect, useMemo, useState } from "react";
import { Command, Download, Github, Linkedin, ListChecks, Mail, Star } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

const paletteItems = [
  { label: "Go to Projects", action: "projects", icon: ListChecks },
  { label: "Go to Skills", action: "skills", icon: Star },
  { label: "Go to Contact", action: "contact", icon: Mail },
  { label: "Open GitHub", action: "github", icon: Github },
  { label: "Open LinkedIn", action: "linkedin", icon: Linkedin },
  { label: "Download Resume", action: "resume", icon: Download },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    if (!query) return paletteItems;
    return paletteItems.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleAction = (action: string) => {
    if (action === "projects" || action === "skills" || action === "contact") {
      document
        .getElementById(action)
        ?.scrollIntoView({ behavior: "smooth" });
    }

    if (action === "github") window.open(portfolioData.socials.github, "_blank");
    if (action === "linkedin")
      window.open(portfolioData.socials.linkedin, "_blank");
    if (action === "resume") window.open(portfolioData.resumeUrl, "_blank");

    setOpen(false);
    setQuery("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm">
      <div className="w-[90vw] max-w-lg rounded-2xl border border-purple-500/30 bg-slate-950/90 p-4 shadow-2xl shadow-purple-500/30">
        <div className="flex items-center gap-3 border-b border-slate-800/80 pb-3">
          <Command className="h-5 w-5 text-purple-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Type a command..."
            className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500"
          />
        </div>
        <div className="mt-4 space-y-2">
          {items.map((item) => (
            <button
              key={item.action}
              onClick={() => handleAction(item.action)}
              className="flex w-full items-center justify-between rounded-xl border border-transparent bg-slate-900/60 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-purple-500/40"
            >
              <span className="flex items-center gap-3">
                <item.icon className="h-4 w-4 text-purple-400" />
                {item.label}
              </span>
              <span className="text-xs text-slate-500">Enter</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
