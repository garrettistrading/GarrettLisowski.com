"use client";

import { useRef, useState } from "react";
import { experience } from "@/lib/portfolio";

export function CareerTimeline() {
  const [active, setActive] = useState(0);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const selected = experience[active];

  const moveFocus = (next: number) => {
    const index = (next + experience.length) % experience.length;
    setActive(index);
    buttons.current[index]?.focus();
  };

  return (
    <div className="career-timeline" data-reveal>
      <div className="timeline-index" role="tablist" aria-label="Professional experience">
        {experience.map((item, index) => (
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
    </div>
  );
}
