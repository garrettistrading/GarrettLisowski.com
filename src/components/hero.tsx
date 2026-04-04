"use client";

import { motion } from "framer-motion";

/* ── Data ─────────────────────────────────────────────────────── */

const trustItems = [
  "$500K+ Revenue Generated",
  "150+ Accounts Managed",
  "SIE Licensed",
  "6x HubSpot Certified",
  "UB Economics, 3.78 GPA",
];

/* ── FloatingPaths background ─────────────────────────────────── */

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="#899da0"
            strokeWidth={path.width}
            strokeOpacity={0.04 + path.id * 0.005}
            initial={{ pathLength: 0.3, opacity: 0.4 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, 0.5, 0.2],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + path.id * 0.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ── Hero section ─────────────────────────────────────────────── */

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Ambient SVG paths — two mirrored instances */}
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Garrett Lisowski
        </motion.h1>

        <motion.p
          className="mt-6 text-xl md:text-2xl font-medium text-[#d8e6e8] tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Commercially built. Analytically wired. Ready to perform.
        </motion.p>

        <motion.p
          className="mt-5 text-base md:text-lg text-[#899da0] max-w-2xl mx-auto font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Account Executive with a track record across SaaS, manufacturing, and
          financial services. I combine full-cycle sales execution with an
          economics-trained, data-driven approach to growth.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="#experience"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#d8e6e8] text-[#0d1e21] font-semibold text-sm rounded-lg hover:bg-white transition-colors duration-300"
          >
            See My Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-[#2d464b] text-[#d8e6e8] font-medium text-sm rounded-lg hover:border-[#899da0]/60 hover:bg-[#2d464b]/20 transition-all duration-300"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          className="mt-20 flex flex-wrap justify-center items-center gap-x-3 gap-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {trustItems.map((item, i) => (
            <span key={i} className="flex items-center gap-3">
              <span className="text-xs text-[#899da0]/50 font-medium tracking-wide whitespace-nowrap">
                {item}
              </span>
              {i < trustItems.length - 1 && (
                <span className="text-[#2d464b] text-[10px]">&#x2022;</span>
              )}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0d1e21] to-transparent pointer-events-none" />
    </section>
  );
}
