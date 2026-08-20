"use client";

import { useEffect } from "react";

export function ScrollReveals() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const focusElements = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".profile-home .hero-portrait, .profile-home .hero-statement, .profile-home .experience-evidence, .profile-home .career-timeline, .profile-home .project-feature, .profile-home .credential-grid, .profile-home .skills-story, .profile-home .contact-section",
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
      const maxDistance = viewportHeight * 0.58;
      const isCompact = window.innerWidth <= 820;
      const minimumScale = isCompact ? 1 : 0.95;
      const maximumScale = isCompact ? 1 : 1.025;
      const minimumOpacity = isCompact ? 1 : 0.72;
      const maximumTranslate = isCompact ? 0 : 14;
      const maximumBlur = isCompact ? 0 : 0.35;
      let focusedElement: HTMLElement | null = null;
      let strongestFocus = -1;

      const focusStates = focusElements.map((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.bottom > 0 && rect.top < viewportHeight;
        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, viewportHeight);
        const visibleCenter = isVisible ? (visibleTop + visibleBottom) / 2 : rect.top + rect.height / 2;
        const distance = Math.abs(visibleCenter - viewportCenter);
        const proximity = isVisible ? 1 - Math.min(distance / maxDistance, 1) : 0;
        const easedFocus = proximity * proximity * (3 - 2 * proximity);

        if (easedFocus > strongestFocus) {
          strongestFocus = easedFocus;
          focusedElement = element;
        }

        return { element, rect, easedFocus };
      });

      if (window.scrollY < 48 && focusElements[0]) {
        focusedElement = focusElements[0];
      }

      focusStates.forEach(({ element, rect, easedFocus }) => {
        let adjustedFocus = element === focusedElement
          ? Math.max(easedFocus, 0.9)
          : Math.min(easedFocus, 0.58);
        if (window.scrollY < 48) {
          adjustedFocus = element === focusedElement ? 1 : Math.min(easedFocus, 0.38);
        }
        const scale = minimumScale + adjustedFocus * (maximumScale - minimumScale);
        const opacity = minimumOpacity + adjustedFocus * (1 - minimumOpacity);
        const direction = rect.top + rect.height / 2 < viewportCenter ? -1 : 1;
        const translate = direction * (1 - adjustedFocus) * maximumTranslate;
        const blur = (1 - adjustedFocus) * maximumBlur;
        const brightness = isCompact ? 1 : 0.86 + adjustedFocus * 0.14;

        element.style.setProperty("--focus-scale", scale.toFixed(4));
        element.style.setProperty("--focus-opacity", opacity.toFixed(4));
        element.style.setProperty("--focus-translate", `${translate.toFixed(2)}px`);
        element.style.setProperty("--focus-blur", `${blur.toFixed(2)}px`);
        element.style.setProperty("--focus-brightness", brightness.toFixed(4));
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
        element.style.removeProperty("--focus-scale");
        element.style.removeProperty("--focus-opacity");
        element.style.removeProperty("--focus-translate");
        element.style.removeProperty("--focus-blur");
        element.style.removeProperty("--focus-brightness");
      });
    };
  }, []);

  return null;
}
