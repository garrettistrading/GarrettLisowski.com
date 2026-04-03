"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

function Counter({ value, inView }: { value: number; inView: boolean }) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    let start: number | null = null;
    const dur = 2200;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * e));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return <>{display}</>;
}

const big = [
  { value: 500, prefix: "$", suffix: "K+", l: "Revenue in 12 months" },
  { value: 240, prefix: "$", suffix: "K", l: "Pipeline generated" },
  { value: 150, prefix: "", suffix: "+", l: "Accounts managed" },
  { value: 97, prefix: "", suffix: "%", l: "A/R efficiency gain" },
];

const sm = [
  { m: "90%", l: "Client satisfaction" },
  { m: "80%", l: "YoY strategy gains" },
  { m: "35%", l: "CAC reduction" },
  { m: "25%", l: "Revenue/account growth" },
  { m: "15%", l: "Faster time-to-value" },
  { m: "24h\u21925m", l: "Lead response time" },
];

export function Wins() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="impact"
      ref={ref}
      className="relative min-h-screen flex items-center py-24 lg:py-0 bg-[#14141C]"
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" />

      <div className="mx-auto max-w-[1400px] px-7 sm:px-10 lg:px-14 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
        >
          <p className="text-[9px] tracking-[0.6em] uppercase text-[#7B6BFF]/50 font-mono">
            03 / Impact
          </p>
          <h2 className="mt-8 lg:mt-10 mb-16 lg:mb-20 text-[clamp(2rem,5vw,3.8rem)] font-bold tracking-[-0.04em] text-[#F0EEE8] leading-[1.05]">
            Selected{" "}
            <span className="text-[#5A5A68]">wins</span>
            <span className="text-[#7B6BFF]">.</span>
          </h2>
        </motion.div>

        {/* Hero metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-14">
          {big.map((w, i) => (
            <motion.div
              key={w.l}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease }}
              className="group"
            >
              <p className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-[-0.05em] text-[#F0EEE8] leading-none font-mono group-hover:text-[#7B6BFF] transition-colors duration-200">
                {w.prefix}
                <Counter value={w.value} inView={inView} />
                {w.suffix}
              </p>
              <p className="mt-4 text-[11px] text-[#4A4A56] tracking-wide group-hover:text-[#6A6A78] transition-colors duration-200">
                {w.l}
              </p>
              <div className="mt-3 h-px w-0 group-hover:w-12 bg-[#7B6BFF]/25 transition-all duration-200" />
            </motion.div>
          ))}
        </div>

        {/* Secondary metrics */}
        <div className="border-t border-white/[0.05] pt-12 mt-16 lg:mt-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-12 gap-y-8">
            {sm.map((w, i) => (
              <motion.div
                key={w.l}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.06, ease }}
                className="group"
              >
                <p className="text-[18px] font-semibold tracking-[-0.03em] text-[#7B6BFF]/40 font-mono group-hover:text-[#7B6BFF]/70 transition-colors duration-200">
                  {w.m}
                </p>
                <p className="mt-1 text-[10px] text-[#3A3A46] group-hover:text-[#5A5A68] transition-colors duration-200">
                  {w.l}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />
    </section>
  );
}
