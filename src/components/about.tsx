"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex items-center py-24 lg:py-0 bg-[#14141C]"
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" />

      <div className="mx-auto max-w-[1400px] px-7 sm:px-10 lg:px-14 w-full">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left — label + statement */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease }}
            className="lg:col-span-5"
          >
            <p className="text-[9px] tracking-[0.6em] uppercase text-[#7B6BFF]/50 font-mono">
              01 / Approach
            </p>
            <h2 className="mt-8 lg:mt-10 text-[clamp(2.2rem,5vw,4rem)] font-bold tracking-[-0.04em] text-[#F0EEE8] leading-[1.05]">
              Commercial instinct
              <span className="text-[#7B6BFF]">.</span>
              <br />
              <span className="text-[#5A5A68]">Analytical rigor</span>
              <span className="text-[#7B6BFF]/30">.</span>
            </h2>
            <div className="mt-10 lg:mt-14 flex flex-wrap gap-x-6 gap-y-2 text-[9px] tracking-[0.25em] uppercase text-[#3A3A46]">
              {[
                "Full-Cycle Sales",
                "SaaS & Technology",
                "Analytics-Driven",
                "Business Development",
              ].map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </motion.div>

          {/* Right — body */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.15, ease }}
            className="lg:col-span-6 lg:col-start-7 lg:pt-8"
          >
            <div className="space-y-6 text-[14px] text-[#6A6A78] leading-[1.9] max-w-[480px]">
              <p className="text-[#8A8A9A]">
                I operate at the intersection of revenue execution and
                data-driven strategy. I don&rsquo;t just chase targets&nbsp;&mdash;
                I build systematic approaches to pipeline management,
                forecasting, and account growth that produce consistent,
                measurable results.
              </p>
              <p>
                With experience spanning full-cycle SaaS sales, financial
                analysis, and early-stage ventures, I bring a rare blend of
                commercial instinct and quantitative depth. I&rsquo;ve managed
                150+ accounts, driven $500K+ in revenue, and built automation
                systems that compress time-to-value.
              </p>
              <p className="text-[#4A4A56]">
                I&rsquo;m looking for environments where performance is measured
                by outcomes, where ambition is rewarded, and where I can
                compound my impact across sales, strategy, and business
                operations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />
    </section>
  );
}
