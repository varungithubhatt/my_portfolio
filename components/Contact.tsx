"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function Contact() {
  return (
    <section id="contact" className="py-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
      >
        <motion.div variants={fadeUp} className="space-y-4">
          <Badge>Contact</Badge>
          <h3 className="text-5xl font-semibold text-white">Let us build something incredible.</h3>
          <p className="text-lg text-slate-400">
            Looking for a senior engineer who can ship premium experiences? Reach out.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-base text-slate-300">
              <Mail className="h-4 w-4 text-purple-300" />
              {portfolioData.email}
            </div>
            <a
              className="flex items-center gap-3 text-base text-slate-300 transition hover:text-white"
              href={portfolioData.socials.github}
            >
              <Github className="h-4 w-4 text-purple-300" />
              GitHub
            </a>
            <a
              className="flex items-center gap-3 text-base text-slate-300 transition hover:text-white"
              href={portfolioData.socials.linkedin}
            >
              <Linkedin className="h-4 w-4 text-purple-300" />
              LinkedIn
            </a>
          </div>
        </motion.div>
        <motion.form
          variants={fadeUp}
          className="rounded-3xl border border-slate-800/80 bg-slate-950/60 p-6"
        >
          <div className="grid gap-4">
            <Input placeholder="Name" />
            <Input placeholder="Email" type="email" />
            <Textarea placeholder="Message" rows={5} />
            <Button type="submit">Send Message</Button>
          </div>
        </motion.form>
      </motion.div>
    </section>
  );
}
