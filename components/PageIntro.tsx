"use client";

import { useEffect, useState } from "react";

export function PageIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = window.requestAnimationFrame(() => setVisible(false));
      return () => window.cancelAnimationFrame(frame);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.classList.add("portfolio-intro-active");
    const timer = window.setTimeout(() => {
      document.documentElement.classList.remove("portfolio-intro-active");
      setVisible(false);
    }, 1760);

    return () => {
      window.clearTimeout(timer);
      document.documentElement.classList.remove("portfolio-intro-active");
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="portfolio-intro" aria-hidden="true">
      <div className="portfolio-intro-lockup">
        <span className="portfolio-intro-mark">GL</span>
        <span className="portfolio-intro-divider" />
        <div>
          <strong>Garrett Lisowski</strong>
          <span>Financial analyst · Investment research</span>
        </div>
      </div>
      <div className="portfolio-intro-progress"><span /></div>
    </div>
  );
}
