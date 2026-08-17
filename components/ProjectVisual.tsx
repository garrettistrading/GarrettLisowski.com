import type { VisualType } from "@/lib/portfolio";

type ProjectVisualProps = { type: VisualType; detail?: boolean };

const mtpiSeries = [0.15, 0.59, 0.37, -0.36, 0.07, 0.2, 0.69, 0.69, 0.69, 0.69, 0.69, 0.82, 0.82, 0.82, 0.82, 0.82, 0.82, 0.72, 0.5, 0.12, -0.78, -0.91, -0.91, -0.91];

function mtpiPath(width = 600, height = 188) {
  return mtpiSeries.map((score, index) => {
    const x = 34 + (index / (mtpiSeries.length - 1)) * (width - 52);
    const y = 12 + ((1 - score) / 2) * (height - 28);
    return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
}

const mtpiGroups = [
  ["Perpetual", "Bearish", "−1.00"],
  ["Oscillators", "Bearish", "−1.00"],
  ["Bitcoin", "Bearish", "−1.00"],
  ["Ethereum", "Bearish", "−1.00"],
  ["Correlations", "Slight bull", "0.28"],
];

function TrendVisual({ detail }: { detail: boolean }) {
  return (
    <div className={`research-visual analyst-workspace trend-workspace ${detail ? "is-detail" : ""}`}>
      <header className="workspace-header">
        <div><strong>MTPI</strong><span>Total market cap</span></div>
        <dl><dt>Snapshot</dt><dd>Jan 17, 2025</dd><dt>Composite</dt><dd className="state-short">−0.91 · Short</dd></dl>
      </header>

      <div className="workspace-chart">
        <div className="workspace-chart-title"><strong>Forward-test score</strong><span>Jan 05 — Feb 05, 2025</span></div>
        <svg viewBox="0 0 600 188" role="img" aria-label="MTPI historical forward-test score from January 5 to February 5, 2025">
          {[12, 52, 92, 132, 172].map((y, index) => <g key={y}><line x1="34" x2="582" y1={y} y2={y} /><text x="0" y={y + 3}>{["1.0", "0.5", "0", "−0.5", "−1.0"][index]}</text></g>)}
          <path d={mtpiPath()} />
          {mtpiSeries.map((score, index) => {
            if (![0, 11, 17, 20, 23].includes(index)) return null;
            const x = 34 + (index / (mtpiSeries.length - 1)) * 548;
            const y = 12 + ((1 - score) / 2) * 160;
            return <circle cx={x} cy={y} r="3.4" key={index}><title>{score.toFixed(2)}</title></circle>;
          })}
        </svg>
        <div className="workspace-x-axis"><span>Jan 05</span><span>Jan 24 · 0.82</span><span>Feb 05 · −0.91</span></div>
      </div>

      <div className="workspace-state-strip" aria-label="MTPI category states on January 17, 2025">
        {mtpiGroups.map(([group, state, score]) => <div key={group}><span>{group}</span><strong className={state === "Bearish" ? "state-short" : "state-long"}>{state}</strong><small>{score}</small></div>)}
      </div>
    </div>
  );
}

const pairwiseSnapshot = [
  ["ETH / BTC", "9", "2D", "−1.00", "Short"],
  ["SOL / ETH", "8", "2D", "1.00", "Long"],
  ["SOL / BTC", "8", "2D", "1.00", "Long"],
];

function RelativeStrengthVisual({ detail }: { detail: boolean }) {
  return (
    <div className={`research-visual analyst-workspace rsps-workspace ${detail ? "is-detail" : ""}`}>
      <header className="workspace-header">
        <div><strong>RSPS</strong><span>Relative-strength research</span></div>
        <dl><dt>Snapshot</dt><dd>Oct 02, 2024</dd><dt>Horizon</dt><dd>2D</dd></dl>
      </header>

      <div className="pairwise-snapshot">
        <div className="pairwise-snapshot-head"><span>Pair</span><span>Inputs</span><span>Frame</span><span>Average</span><span>State</span></div>
        {pairwiseSnapshot.map(([pair, inputs, frame, average, state]) => (
          <div key={pair}><strong>{pair}</strong><span>{inputs}</span><span>{frame}</span><span>{average}</span><i className={state === "Long" ? "state-long" : "state-short"}>{state}</i></div>
        ))}
      </div>

      <div className="allocation-workflow" aria-label="Five-stage RSPS decision workflow">
        {[
          ["01", "Market regime", "TOTAL trend"],
          ["02", "Major allocation", "ETH / BTC"],
          ["03", "Speculative strength", "SOL pairs"],
          ["04", "Small-cap budget", "OTHERS.D"],
          ["05", "Candidate screen", "Cap · trend · beta"],
        ].map(([number, title, detailText]) => <div key={number}><small>{number}</small><strong>{title}</strong><span>{detailText}</span></div>)}
      </div>
    </div>
  );
}

function ModelingVisual({ detail }: { detail: boolean }) {
  const rows = ["Procurement pricing", "Capital variance", "Scenario forecast", "Valuation review"];
  return (
    <div className={`research-visual model-visual ${detail ? "is-detail" : ""}`}>
      <div className="visual-masthead"><span>Decision model</span><span>Illustrative structure</span></div>
      <div className="model-sheet" role="img" aria-label="Illustrative financial model structure connecting operating inputs, analytical review, and decision reporting">
        <div className="model-sheet-head"><span>Analysis</span><span>Input</span><span>Review</span><span>Decision</span></div>
        {rows.map((row, rowIndex) => <div className="model-sheet-row" key={row}><strong>{row}</strong>{[0, 1, 2].map((cell) => <span key={cell}><i style={{ width: `${52 + ((rowIndex * 17 + cell * 13) % 35)}%` }} /></span>)}</div>)}
      </div>
      <div className="model-flow" aria-hidden="true"><span>Assumptions</span><i>→</i><span>Analysis</span><i>→</i><span>Reporting</span></div>
    </div>
  );
}

export function ProjectVisual({ type, detail = false }: ProjectVisualProps) {
  if (type === "trend") return <TrendVisual detail={detail} />;
  if (type === "relative-strength") return <RelativeStrengthVisual detail={detail} />;
  return <ModelingVisual detail={detail} />;
}
