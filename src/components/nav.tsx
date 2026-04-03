"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { label: "Approach", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Impact", id: "impact" },
  { label: "Toolkit", id: "toolkit" },
  { label: "Connect", id: "contact" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setScrollProgress(scrollTop / (scrollHeight - clientHeight || 1));

      const mid = clientHeight / 2;
      let current = "";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= mid && rect.bottom > mid) {
            current = s.id;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    if (id === "top") {
      document.getElementById("scroll-container")?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-[1px] bg-[#7B6BFF]/40"
        style={{ width: `${scrollProgress * 100}%`, transition: "width 120ms linear" }}
      />

      {/* Top bar — frosted glass */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-[rgba(13,13,16,0.75)] backdrop-blur-[12px] border-b border-white/[0.05]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <div className="flex items-center justify-between px-7 sm:px-10 lg:px-14 h-16">
          <button
            onClick={() => scrollTo("top")}
            className="text-[10px] tracking-[0.4em] uppercase text-[#5A5A68] hover:text-[#8A8A9A] transition-colors duration-200 font-mono"
          >
            G. Lisowski
          </button>

          {/* Desktop section links */}
          <nav className="hidden md:flex items-center gap-10">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`text-[10px] tracking-[0.15em] uppercase transition-colors duration-200 ${
                  activeSection === s.id
                    ? "text-[#7B6BFF]"
                    : "text-[#3A3A46] hover:text-[#8A8A9A]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-[60] w-6 h-3.5 flex flex-col justify-between md:hidden"
            aria-label="Menu"
          >
            <span
              className={`block h-px w-full bg-[#8A8A9A] transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-[5px]" : ""
              }`}
            />
            <span
              className={`block h-px w-full bg-[#8A8A9A] transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[5px]" : ""
              }`}
            />
          </button>
        </div>
      </motion.header>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[55] bg-[#0D0D10]/97 backdrop-blur-2xl flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-6">
              {sections.map((s, i) => (
                <motion.button
                  key={s.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  onClick={() => scrollTo(s.id)}
                  className="text-[clamp(2rem,7vw,4.5rem)] font-light tracking-[-0.03em] text-[#5A5A68] hover:text-[#7B6BFF] transition-colors duration-200"
                >
                  {s.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side scroll indicator dots */}
      <motion.div
        className="fixed right-7 lg:right-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="group flex items-center justify-end gap-3"
            aria-label={s.label}
          >
            <span
              className={`text-[8px] tracking-[0.2em] uppercase font-mono transition-all duration-200 ${
                activeSection === s.id
                  ? "opacity-100 text-[#7B6BFF]/70 translate-x-0"
                  : "opacity-0 text-[#5A5A68] translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-200 ${
                activeSection === s.id
                  ? "w-2 h-2 bg-[#7B6BFF]"
                  : "w-1.5 h-1.5 bg-white/[0.08] group-hover:bg-white/[0.15]"
              }`}
            />
          </button>
        ))}
      </motion.div>
    </>
  );
}
