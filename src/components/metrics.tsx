"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ── Data ─────────────────────────────────────────────────────── */

const stats = [
  {
    value: 500,
    prefix: "$",
    suffix: "K+",
    label: "Revenue Closed",
    context: "In 12 months at B&H Polymers",
  },
  {
    value: 240,
    prefix: "$",
    suffix: "K",
    label: "Pipeline Generated",
    context: "SaaS accounts at Odoo",
  },
  {
    value: 150,
    prefix: "",
    suffix: "+",
    label: "Accounts Managed",
    context: "Commercial & enterprise at Ingram Micro",
  },
  {
    value: 97,
    prefix: "",
    suffix: "%",
    label: "AR Efficiency Gain",
    context: "Accounts receivable overhaul at B&H",
  },
  {
    value: 35,
    prefix: "",
    suffix: "%",
    label: "CAC Reduction",
    context: "Client acquisition cost at SFIN Media",
  },
  {
    value: 3.78,
    prefix: "",
    suffix: "",
    label: "GPA",
    context: "University at Buffalo — Economics",
    decimals: 2,
  },
];

/* ── CountUp ──────────────────────────────────────────────────── */

function CountUp({
  value,
  decimals = 0,
  duration = 2000,
}: {
  value: number;
  decimals?: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setDisplay(
        decimals > 0 ? current.toFixed(decimals) : String(Math.floor(current))
      );
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, value, duration, decimals]);

  return <span ref={ref}>{display}</span>;
}

/* ── Metrics section ──────────────────────────────────────────── */

export function Metrics() {
  return (
    <section id="metrics" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-medium text-[#899da0] tracking-[0.2em] uppercase mb-3">
            Results
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#d8e6e8]">
            Numbers that speak.
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8 md:gap-x-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                {stat.prefix}
                <CountUp
                  value={stat.value}
                  decimals={stat.decimals ?? 0}
                />
                {stat.suffix}
              </div>
              <div className="mt-2 text-sm font-medium text-[#d8e6e8]">
                {stat.label}
              </div>
              <div className="mt-1 text-xs text-[#899da0] font-light">
                {stat.context}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
