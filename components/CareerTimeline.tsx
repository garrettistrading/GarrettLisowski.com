"use client";

import { useRef, useState } from "react";
import { experience } from "@/lib/portfolio";

export function CareerTimeline() {
  const primaryExperience = experience.slice(0, 4);
  const additionalExperience = experience.slice(4);
  const [active, setActive] = useState(2);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const selected = primaryExperience[active];

  const moveFocus = (next: number) => {
    const index = (next + primaryExperience.length) % primaryExperience.length;
    setActive(index);
    buttons.current[index]?.focus();
  };

  return (
    <div className="career-timeline" data-reveal>
      <div className="timeline-index" role="tablist" aria-label="Professional experience">
        {primaryExperience.map((item, index) => (
          <button
            className={active === index ? "is-active" : ""}
            id={`career-tab-${index}`}
            key={`${item.organization}-${item.period}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls="career-detail"
            tabIndex={active === index ? 0 : -1}
            ref={(element) => { buttons.current[index] = element; }}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                event.preventDefault();
                moveFocus(active + 1);
              }
              if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                event.preventDefault();
                moveFocus(active - 1);
              }
            }}
          >
            <strong>{item.role}</strong>
            <small>{item.organization}</small>
            <span>{item.period}</span>
          </button>
        ))}
      </div>

      <article
        className="timeline-detail"
        id="career-detail"
        role="tabpanel"
        aria-labelledby={`career-tab-${active}`}
        aria-live="polite"
      >
        <div className="timeline-meta">
          <span>{selected.organization}</span>
          <span>{selected.period}</span>
          <span>{selected.location}</span>
        </div>
        <h3>{selected.role}</h3>
        <p className="timeline-summary">{selected.summary}</p>
        <ul>
          {selected.evidence.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <section className="additional-experience" aria-labelledby="additional-experience-title">
        <header>
          <p>Additional experience</p>
          <h3 id="additional-experience-title">Concurrent ventures and applied market work.</h3>
        </header>
        <div>
          {additionalExperience.map((item) => (
            <article key={`${item.organization}-${item.period}`}>
              <div>
                <strong>{item.role}</strong>
                <span>{item.organization}</span>
              </div>
              <time>{item.period}</time>
              <p>{item.evidence[0]}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
