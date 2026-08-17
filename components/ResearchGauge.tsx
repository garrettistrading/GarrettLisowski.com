type ResearchGaugeProps = {
  compact?: boolean;
  label: string;
  score: string;
  state: string;
};

export function ResearchGauge({ compact = false, label, score, state }: ResearchGaugeProps) {
  return (
    <figure className={`research-gauge ${compact ? "is-compact" : ""}`} aria-label={`${label}: ${state}, score ${score}`}>
      <figcaption>{label}</figcaption>
      <svg viewBox="0 0 220 205" role="img" aria-hidden="true">
        <circle className="gauge-face" cx="110" cy="105" r="74" />
        <circle className="gauge-track" cx="110" cy="105" r="66" />
        <circle className="gauge-range gauge-range-short" cx="110" cy="105" r="66" />
        <circle className="gauge-range gauge-range-neutral" cx="110" cy="105" r="66" />
        <circle className="gauge-range gauge-range-long" cx="110" cy="105" r="66" />
        <line className="gauge-tick" x1="110" x2="110" y1="34" y2="45" />
        <line className="gauge-tick" x1="45" x2="55" y1="137" y2="132" />
        <line className="gauge-tick" x1="175" x2="165" y1="137" y2="132" />
        <text className="gauge-state" x="110" y="83">{state}</text>
        <text className="gauge-min" x="48" y="159">−1.00</text>
        <text className="gauge-max" x="172" y="159">1.00</text>
        <line className="gauge-needle" x1="110" y1="112" x2="54" y2="151" />
        <circle className="gauge-hub" cx="110" cy="112" r="9" />
        <text className="gauge-score" x="110" y="193">{score}</text>
      </svg>
    </figure>
  );
}
