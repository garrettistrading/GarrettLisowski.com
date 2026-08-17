"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const inputs = ["Research", "Model", "Interpret", "Communicate"];

export function HeroSystem() {
  const visualRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ".hero-signal-path",
        { strokeDashoffset: 620 },
        { strokeDashoffset: 0, duration: 1.6, ease: "power3.out" },
      );
      gsap.from(".hero-signal-point, .hero-input-row", {
        opacity: 0,
        y: 10,
        duration: 0.55,
        stagger: 0.09,
        delay: 0.35,
        ease: "power2.out",
      });
    },
    { scope: visualRef },
  );

  return (
    <div className="hero-analysis" ref={visualRef} aria-label="Illustrative analytical process from research inputs to decision context">
      <div className="hero-analysis-head">
        <span>Analytical framework</span>
        <span>Illustrative view</span>
      </div>
      <svg viewBox="0 0 640 270" role="img" aria-label="A restrained signal line moving across a research grid">
        {[42, 88, 134, 180, 226].map((y) => (
          <line className="hero-grid-line" x1="32" x2="608" y1={y} y2={y} key={y} />
        ))}
        {[96, 192, 288, 384, 480, 576].map((x) => (
          <line className="hero-grid-line" x1={x} x2={x} y1="26" y2="244" key={x} />
        ))}
        <path
          className="hero-signal-path"
          pathLength="620"
          d="M32 201 C84 197 112 175 158 181 S235 218 278 171 S346 105 396 128 S470 172 510 125 S563 74 608 87"
        />
        {[
          [158, 181],
          [278, 171],
          [396, 128],
          [510, 125],
          [608, 87],
        ].map(([cx, cy]) => (
          <circle className="hero-signal-point" cx={cx} cy={cy} r="5" key={`${cx}-${cy}`} />
        ))}
      </svg>
      <div className="hero-inputs">
        {inputs.map((input, index) => (
          <div className="hero-input-row" key={input}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{input}</strong>
            <i aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
