import type { VisualType } from "@/lib/portfolio";
import { ResearchGauge } from "@/components/ResearchGauge";

type ProjectVisualProps = { type: VisualType; detail?: boolean };

const mtpiPreviewRows = [
  ["Perpetual", "EWMA", "3D", "−1.00", "Bearish"],
  ["Perpetual", "SALMA RED K", "3D", "−1.00", "Bearish"],
  ["Perpetual", "Michaels EMA", "2D", "−1.00", "Bearish"],
  ["Oscillators", "Regularized MA suite", "2D", "−1.00", "Bearish"],
  ["Oscillators", "Normalized KAMA", "4D", "−1.00", "Bearish"],
  ["Bitcoin", "T3S", "5D", "−1.00", "Bearish"],
  ["Ethereum", "EWMA", "4D", "−1.00", "Bearish"],
  ["Macro", "Correlation coefficient", "15–120D", "0.28", "Slight bull"],
];

const mtpiDetailRows = [
  ["Perpetual", "EWMA", "3D", "−1.00", "Bearish"],
  ["Perpetual", "SALMA RED K", "3D", "−1.00", "Bearish"],
  ["Perpetual", "Michaels EMA", "2D", "−1.00", "Bearish"],
  ["Perpetual", "HSMA", "4D", "−1.00", "Bearish"],
  ["Perpetual", "T3 Striped [Loxx]", "4D", "−1.00", "Bearish"],
  ["Oscillators", "Regularized MA suite", "2D", "−1.00", "Bearish"],
  ["Oscillators", "Normalized KAMA", "4D", "−1.00", "Bearish"],
  ["Oscillators", "Sebastine Trend Catcher", "2D", "−1.00", "Bearish"],
  ["Oscillators", "Kalman Hull RSI", "3D", "−1.00", "Bearish"],
  ["Oscillators", "Trend Following MA’s", "3D", "−1.00", "Bearish"],
  ["Bitcoin", "T3S", "5D", "−1.00", "Bearish"],
  ["Bitcoin", "Michaels EMA", "4D", "−1.00", "Bearish"],
  ["Ethereum", "Michaels EMA", "2D", "−1.00", "Bearish"],
  ["Ethereum", "EWMA", "4D", "−1.00", "Bearish"],
  ["Macro", "Correlation coefficient", "15–120D", "0.28", "Slight bull"],
];

function TrendVisual({ detail }: { detail: boolean }) {
  const visibleRows = detail ? mtpiDetailRows : mtpiPreviewRows;
  return (
    <div className={`research-visual analyst-workspace trend-workspace ${detail ? "is-detail" : ""}`}>
      <header className="workspace-header">
        <div><strong>MTPI</strong><span>Total market cap</span></div>
        <dl><dt>Snapshot</dt><dd>Jan 17, 2025</dd><dt>Composite</dt><dd className="state-short">−0.91 · Short</dd></dl>
      </header>

      <div className="mtpi-preview-body">
        <div className="mtpi-preview-matrix" role="table" aria-label="Selected MTPI indicator matrix rows">
          <div><span>Category</span><span>Indicator</span><span>Frame</span><span>Score</span><span>Result</span></div>
          {visibleRows.map(([category, indicator, frame, score, result]) => <div key={`${category}-${indicator}`}><strong className={`preview-category preview-${category.toLowerCase()}`}>{category}</strong><span>{indicator}</span><span>{frame}</span><b>{score}</b><i className={result === "Bearish" ? "state-short" : "state-long"}>{result}</i></div>)}
        </div>
        <ResearchGauge compact label="Medium-term trend" score="−0.91" state="Short" />
      </div>
      <footer className="workspace-summary"><span>15 inputs</span><span>5 categories</span><strong>Average −0.91 · Short</strong></footer>
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

      <div className="rsps-preview-body">
        <div className="pairwise-snapshot">
        <div className="pairwise-snapshot-head"><span>Pair</span><span>Inputs</span><span>Frame</span><span>Average</span><span>State</span></div>
        {pairwiseSnapshot.map(([pair, inputs, frame, average, state]) => (
          <div key={pair}><strong>{pair}</strong><span>{inputs}</span><span>{frame}</span><span>{average}</span><i className={state === "Long" ? "state-long" : "state-short"}>{state}</i></div>
        ))}
        </div>
        <div className="mini-workstation-chart">
          <header><strong>ETH/BTC normalized view</strong><span>2017 — 2024</span></header>
          <svg viewBox="0 0 420 150" role="img" aria-label="Normalized historical ETH/BTC research trace with model-state markers">
            {[22, 62, 102, 142].map((y) => <line x1="20" x2="410" y1={y} y2={y} key={y} />)}
            <path d="M20 38 L33 70 L48 50 L63 75 L79 68 L95 89 L112 103 L130 116 L148 125 L168 113 L188 98 L207 76 L226 88 L245 70 L264 50 L282 67 L300 64 L320 76 L340 69 L361 78 L383 82 L410 91" />
            {[54, 92, 138, 184, 233, 278, 326, 371].map((x, index) => <line className={index % 3 === 0 ? "marker-positive" : "marker-negative"} x1={x} x2={x} y1="22" y2="142" key={x} />)}
          </svg>
          <footer><span>2017</span><span>2020</span><span>2022</span><span>2024</span></footer>
        </div>
      </div>
      <footer className="workspace-summary"><span>3 pairwise models</span><span>2D horizon</span><strong>5-stage decision path</strong></footer>
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
