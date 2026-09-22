"use client";

import { useEffect } from "react";

export function ScrollReveals() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    // Keep the initial viewport and hash target readable without waiting for motion.
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top >= window.innerHeight) element.classList.add("reveal-pending");
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.05 });
    elements.forEach((element) => observer.observe(element));
    const revealAll = () => {
      if (!media.matches) return;
      elements.forEach((element) => element.classList.remove("reveal-pending"));
      observer.disconnect();
    };
    media.addEventListener("change", revealAll);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", revealAll);
      elements.forEach((element) => element.classList.remove("reveal-pending", "reveal-visible"));
    };
  }, []);
  return null;
}
