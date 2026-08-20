import type { VisualType } from "@/lib/portfolio";
import { ResearchGauge } from "@/components/ResearchGauge";

type ProjectVisualProps = { type: VisualType; detail?: boolean };

const hedgePreviewRows = [
  ["US large cap", "$5.12m", "$4.71m", "+$171k"],
  ["US small cap", "$2.08m", "$1.91m", "+$94k"],
  ["Core bond", "$3.16m", "$2.91m", "+$27k"],
  ["International", "$2.12m", "$1.95m", "+$9k"],
];

function DeferredCompVisual({ detail }: { detail: boolean }) {
  return (
    <div className={`research-visual analyst-workspace trs-workspace ${detail ? "is-detail" : ""}`}>
      <header className="workspace-header">
        <div><strong>TRS Hedge Model</strong><span>Executive deferred compensation</span></div>
        <dl><dt>Data</dt><dd>Fictional</dd><dt>Review</dt><dd className="state-long">Controls clear</dd></dl>
      </header>

      <div className="trs-preview-metrics" aria-label="Illustrative hedge summary">
        <div><span>Plan exposure</span><strong>$12.48m</strong></div>
        <div><span>Target notional</span><strong>$11.48m</strong></div>
        <div><span>Hedge ratio</span><strong>92.0%</strong></div>
        <div><span>Reweight order</span><strong>+$301k</strong></div>
      </div>

      <div className="trs-preview-body">
        <div className="preview-table-scroll" tabIndex={0} aria-label="Scrollable illustrative reweighting table">
          <table className="trs-reweight-table">
            <caption>Illustrative target notional by plan option</caption>
            <thead><tr><th scope="col">Plan option</th><th scope="col">Exposure</th><th scope="col">Target</th><th scope="col">Order</th></tr></thead>
            <tbody>
              {hedgePreviewRows.map(([option, exposure, target, order]) => (
                <tr key={option}><th scope="row">{option}</th><td>{exposure}</td><td>{target}</td><td><b>{order}</b></td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <figure className="trs-volatility-chart">
          <figcaption><strong>Monthly volatility</strong><span>Illustrative standard deviation</span></figcaption>
          <div className="trs-chart-stage" aria-label="Unhedged volatility 2.4 percent and residual hedged volatility 0.9 percent">
            <div><i style={{ height: "82%" }} /><strong>2.4%</strong><span>Unhedged</span></div>
            <div><i style={{ height: "31%" }} /><strong>0.9%</strong><span>Hedged</span></div>
          </div>
        </figure>
      </div>

      <footer className="workspace-summary"><span>4 plan options</span><span>4 control checks</span><strong>Fictional learning model</strong></footer>
    </div>
  );
}

const mtpiPreviewRows = [
  ["Perpetual", "EWMA", "3D", "−1.00", "Bearish"],
  ["Perpetual", "SALMA RED K", "3D", "−1.00", "Bearish"],
  ["Perpetual", "Michaels EMA", "2D", "−1.00", "Bearish"],
  ["Oscillators", "Regularized MA suite", "2D", "−1.00", "Bearish"],
  ["Oscillators", "Normalized KAMA", "4D", "−1.00", "Bearish"],
  ["Bitcoin", "T3S", "5D", "−1.00", "Bearish"],
  ["Ethereum", "EWMA", "4D", "−1.00", "Bearish"],
  ["Macro", "Correlation coefficient", "15-120D", "0.28", "Slight bull"],
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
  ["Macro", "Correlation coefficient", "15-120D", "0.28", "Slight bull"],
];

function TrendVisual({ detail }: { detail: boolean }) {
  const visibleRows = detail ? mtpiDetailRows : mtpiPreviewRows;
  return (
    <div className={`research-visual analyst-workspace trend-workspace ${detail ? "is-detail" : ""}`}>
      <header className="workspace-header">
        <div><strong>MTPI</strong><span>Total market cap</span></div>
        <dl><dt>Snapshot</dt><dd>Jan 17, 2025</dd><dt>Composite</dt><dd className="state-short">−0.91, Short</dd></dl>
      </header>

      <div className="mtpi-preview-body">
        <div className="preview-table-scroll" tabIndex={0} aria-label="Scrollable indicator table">
          <table className="mtpi-preview-matrix">
            <caption>Selected MTPI indicator matrix rows</caption>
            <thead><tr><th scope="col">Category</th><th scope="col">Indicator</th><th scope="col">Frame</th><th scope="col">Score</th><th scope="col">Result</th></tr></thead>
            <tbody>
              {visibleRows.map(([category, indicator, frame, score, result]) => (
                <tr key={`${category}-${indicator}`}>
                  <th scope="row" className={`preview-category preview-${category.toLowerCase()}`}>{category}</th>
                  <td>{indicator}</td><td>{frame}</td><td><b>{score}</b></td>
                  <td><i className={result === "Bearish" ? "state-short" : "state-long"}>{result}</i></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ResearchGauge compact label="Medium-term trend" score="−0.91" state="Short" />
      </div>
      <footer className="workspace-summary"><span>15 inputs</span><span>5 categories</span><strong>Average −0.91, Short</strong></footer>
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
        <div className="preview-table-scroll" tabIndex={0} aria-label="Scrollable pairwise model table">
          <table className="pairwise-snapshot">
            <caption>Historical pairwise model snapshot</caption>
            <thead><tr><th scope="col">Pair</th><th scope="col">Inputs</th><th scope="col">Frame</th><th scope="col">Average</th><th scope="col">State</th></tr></thead>
            <tbody>
              {pairwiseSnapshot.map(([pair, inputs, frame, average, state]) => (
                <tr key={pair}><th scope="row">{pair}</th><td>{inputs}</td><td>{frame}</td><td>{average}</td><td><i className={state === "Long" ? "state-long" : "state-short"}>{state}</i></td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mini-workstation-chart">
          <header><strong>ETH/BTC workbook trace</strong><span>2017 - 2024</span></header>
          <svg viewBox="0 0 420 150" role="img" aria-label="Schematic reconstruction of the source workbook ETH/BTC trace with model-state markers">
            {[22, 62, 102, 142].map((y) => <line x1="20" x2="410" y1={y} y2={y} key={y} />)}
            <path d="M20 38 L33 70 L48 50 L63 75 L79 68 L95 89 L112 103 L130 116 L148 125 L168 113 L188 98 L207 76 L226 88 L245 70 L264 50 L282 67 L300 64 L320 76 L340 69 L361 78 L383 82 L410 91" />
            {[54, 92, 138, 184, 233, 278, 326, 371].map((x, index) => <line className={index % 3 === 0 ? "marker-positive" : "marker-negative"} x1={x} x2={x} y1="22" y2="142" key={x} />)}
          </svg>
          <footer><span>2017</span><span>2020</span><span>2022</span><span>2024</span></footer>
        </div>
      </div>
      <footer className="workspace-summary"><span>3 pairwise models</span><span>2D horizon</span><strong>Historical snapshot</strong></footer>
    </div>
  );
}

export function ProjectVisual({ type, detail = false }: ProjectVisualProps) {
  if (type === "deferred-comp") return <DeferredCompVisual detail={detail} />;
  if (type === "trend") return <TrendVisual detail={detail} />;
  return <RelativeStrengthVisual detail={detail} />;
}
