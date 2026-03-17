import { Github, Linkedin, Twitter } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

export default function Footer() {
  return (
    <footer className="border-t border-purple-500/20 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-slate-400">
          <a href={portfolioData.socials.github} className="transition hover:text-white">
            <Github className="h-4 w-4" />
          </a>
          <a href={portfolioData.socials.linkedin} className="transition hover:text-white">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href={portfolioData.socials.twitter} className="transition hover:text-white">
            <Twitter className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
