"use client";

import { useEffect } from "react";

export function ScrollReveals() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const focusElements = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".profile-home .hero-portrait, .profile-home .hero-statement, .profile-home .portfolio-section-heading, .profile-home .experience-evidence, .profile-home .career-timeline, .profile-home .project-feature, .profile-home .credential-grid, .profile-home .skills-story, .profile-home .contact-section",
      ),
    );
    elements.forEach((element) => element.classList.add("reveal-pending"));
    focusElements.forEach((element) => element.classList.add("focus-scale-target"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.05 },
    );

    elements.forEach((element) => observer.observe(element));

    let frame = 0;
    const updateFocus = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      let focusedElement: HTMLElement | null = null;
      let closestDistance = Number.POSITIVE_INFINITY;

      focusElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= viewportHeight) return;

        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, viewportHeight);
        const visibleCenter = (visibleTop + visibleBottom) / 2;
        const distance = Math.abs(visibleCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          focusedElement = element;
        }
      });

      if (window.scrollY < 48 && focusElements[0]) {
        focusedElement = focusElements[0];
      }

      focusElements.forEach((element) => {
        element.classList.toggle("is-scroll-focus", element === focusedElement);
      });
    };

    const requestFocusUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateFocus);
    };

    updateFocus();
    window.addEventListener("scroll", requestFocusUpdate, { passive: true });
    window.addEventListener("resize", requestFocusUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestFocusUpdate);
      window.removeEventListener("resize", requestFocusUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      focusElements.forEach((element) => {
        element.classList.remove("focus-scale-target", "is-scroll-focus");
      });
    };
  }, []);

  return null;
}
