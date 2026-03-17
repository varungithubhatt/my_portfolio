

import About from "@/components/About";
import AnimatedBackground from "@/components/AnimatedBackground";
import CommandPalette from "@/components/CommandPalette";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import ScrollProgress from "@/components/ScrollProgress";
import TechStackBalloon from "@/components/TechStackBalloon";

export default function Home() {
  return (
    <div className="relative">
      <AnimatedBackground />
      <ScrollProgress />
      <Navbar />
      <CustomCursor />
      <CommandPalette />
      <main className="relative">
        <Hero />
        <About />
        <TechStackBalloon />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
