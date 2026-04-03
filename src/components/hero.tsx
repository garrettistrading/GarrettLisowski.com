"use client";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const show = (delay: number, dur = 1.2) => ({
  initial: { opacity: 0, y: 30 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: dur, delay, ease },
});

export function Hero() {
  const scroll = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
    >
      {/* Year mark */}
      <motion.div
        {...show(0.6, 2)}
        className="absolute top-8 right-7 sm:right-10 lg:right-14 z-20 hidden sm:block"
      >
        <p className="text-[9px] tracking-[0.5em] uppercase text-[#3A3A46] font-mono">
          &rsquo;26
        </p>
      </motion.div>

      {/* Content band */}
      <div className="relative z-10 px-7 sm:px-10 lg:px-14 pb-10 sm:pb-14 lg:pb-16">
        <motion.p
          {...show(0.5, 1.5)}
          className="text-[8px] sm:text-[9px] tracking-[0.7em] uppercase text-[#5A5A68] font-mono mb-8 lg:mb-10"
        >
          Sales / Strategy / Analytics
        </motion.p>

        <motion.div {...show(0.8, 1.4)}>
          <h1 className="text-[clamp(3.5rem,12vw,10rem)] font-bold tracking-[-0.05em] leading-[0.88]">
            <span className="text-[#F0EEE8]">Revenue</span>
            <span className="text-[#7B6BFF]">.</span>
          </h1>
          <h1 className="text-[clamp(3.5rem,12vw,10rem)] font-bold tracking-[-0.05em] leading-[0.88]">
            <span className="text-[#3A3A46]">Reimagined</span>
            <span className="text-[#7B6BFF]/25">.</span>
          </h1>
        </motion.div>

        <motion.p
          {...show(1.3)}
          className="mt-8 lg:mt-10 text-[clamp(0.85rem,1.8vw,1.15rem)] text-[#6A6A78] leading-[1.7] max-w-[480px]"
        >
          High-performance sales with analytical depth.
          <br className="hidden sm:block" />
          Building pipeline, closing revenue, and turning complex
          business needs into measurable outcomes.
        </motion.p>

        <motion.div
          {...show(1.8)}
          className="mt-10 lg:mt-12 flex flex-wrap items-center gap-8 lg:gap-12"
        >
          <a
            href="#about"
            onClick={scroll("about")}
            className="group flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-[#7B6BFF]/70 hover:text-[#7B6BFF] transition-colors duration-200"
          >
            Explore
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-[12px]"
            >
              ↓
            </motion.span>
          </a>
          <a
            href="#"
            className="group flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-[#5A5A68] hover:text-[#8A8A9A] transition-colors duration-200"
          >
            View Resume
            <span className="block w-5 h-px bg-[#3A3A46] transition-all duration-200 group-hover:w-10 group-hover:bg-[#5A5A68]" />
          </a>
          <a
            href="https://www.linkedin.com/in/garrettlisowski"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[0.2em] uppercase text-[#3A3A46] hover:text-[#5A5A68] transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a
            href="#contact"
            onClick={scroll("contact")}
            className="text-[10px] tracking-[0.2em] uppercase text-[#3A3A46] hover:text-[#5A5A68] transition-colors duration-200"
          >
            Contact
          </a>
        </motion.div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />

      {/* Location */}
      <motion.div
        {...show(2.5, 2)}
        className="hidden lg:block absolute bottom-16 right-14 z-20"
      >
        <p className="text-[8px] tracking-[0.6em] uppercase text-[#2A2A36] font-mono [writing-mode:vertical-lr]">
          Winter Park, FL
        </p>
      </motion.div>
    </section>
  );
}
