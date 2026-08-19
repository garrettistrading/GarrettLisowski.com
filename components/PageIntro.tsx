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
    }, 2100);

    return () => {
      window.clearTimeout(timer);
      document.documentElement.classList.remove("portfolio-intro-active");
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="portfolio-intro" aria-hidden="true">
      <div className="portfolio-intro-flight">
        <div className="portfolio-intro-monogram">
          <span className="portfolio-intro-letter is-g">G</span>
          <span className="portfolio-intro-letter is-j">J</span>
          <span className="portfolio-intro-letter is-l">L</span>
        </div>
        <p><span>Garrett Lisowski</span><i /><span>Portfolio</span></p>
      </div>
      <div className="portfolio-intro-progress"><span /></div>
    </div>
  );
}
