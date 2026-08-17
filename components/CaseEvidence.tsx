import type { CSSProperties } from "react";
import type { VisualType } from "@/lib/portfolio";

type CaseEvidenceProps = { type: VisualType };

const forwardTest = [
  ["Jan 05", 0.15], ["Jan 06", 0.59], ["Jan 07", 0.37], ["Jan 14", -0.36],
  ["Jan 15", 0.07], ["Jan 16", 0.20], ["Jan 17", 0.69], ["Jan 20", 0.69],
  ["Jan 21", 0.69], ["Jan 22", 0.69], ["Jan 23", 0.69], ["Jan 24", 0.82],
  ["Jan 25", 0.82], ["Jan 26", 0.82], ["Jan 27", 0.82], ["Jan 28", 0.82],
  ["Jan 29", 0.82], ["Jan 30", 0.72], ["Jan 31", 0.50], ["Feb 01", 0.12],
  ["Feb 02", -0.78], ["Feb 03", -0.91], ["Feb 04", -0.91], ["Feb 05", -0.91],
] as const;

function scorePath() {
  return forwardTest.map(([, score], index) => {
    const x = 54 + (index / (forwardTest.length - 1)) * 806;
    const y = 24 + ((1 - score) / 2) * 260;
    return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
}

const signalRows = [
  ["Perpetual", "EWMA", "3D", "Bearish", "−1.00"],
  ["Perpetual", "SALMA RED K", "3D", "Bearish", "−1.00"],
  ["Oscillators", "Regularized MA oscillator suite", "2D", "Bearish", "−1.00"],
  ["Oscillators", "Normalized KAMA oscillator", "4D", "Bearish", "−1.00"],
  ["Bitcoin", "T3S", "5D", "Bearish", "−1.00"],
  ["Ethereum", "EWMA", "4D", "Bearish", "−1.00"],
  ["Correlations", "Macro correlations", "15–120D", "Slight bull", "0.28"],
];

const correlationRows = [
  ["SPX", -0.18, 0.33, 0.87, 0.81], ["NDX", 0.10, 0.66, 0.89, 0.81],
  ["DXY", -0.22, 0.14, 0.92, 0.87], ["Gold", -0.10, 0.28, 0.26, 0.43],
  ["Fed liquidity", 0.76, 0.71, 0.60, 0.62],
] as const;

function heatAlpha(value: number) { return 0.07 + Math.abs(value) * 0.34; }

function MtpiEvidence() {
  return (
    <section className="case-evidence research-evidence" aria-labelledby="evidence-title">
      <header className="case-evidence-heading" data-reveal>
        <p>Research workspace</p>
        <h2 id="evidence-title">A transparent view of the signal.</h2>
        <span>The interface keeps the original category structure, conditional states, timeframes, and historical values while making the analysis easier to scan on the web.</span>
      </header>

      <div className="evidence-stat-row" data-reveal>
        <div><strong>15</strong><span>signal inputs</span></div><div><strong>5</strong><span>research categories</span></div>
        <div><strong>24</strong><span>dated observations</span></div><div><strong>4</strong><span>correlation horizons</span></div>
      </div>

      <article className="research-chart-section" data-reveal>
        <header><div><p>MTPI · Total market cap</p><h3>Forward-test score</h3></div><dl><dt>Range</dt><dd>−0.91 to 0.82</dd><dt>Period</dt><dd>Jan 05 — Feb 05, 2025</dd></dl></header>
        <div className="platform-chart">
          <svg viewBox="0 0 900 320" role="img" aria-label="Historical MTPI score from January 5 through February 5, 2025">
            {[24, 89, 154, 219, 284].map((y, index) => <g key={y}><line x1="54" x2="860" y1={y} y2={y} /><text x="8" y={y + 4}>{["1.0", "0.5", "0.0", "−0.5", "−1.0"][index]}</text></g>)}
            {[54, 255, 457, 658, 860].map((x) => <line className="vertical-grid" x1={x} x2={x} y1="24" y2="284" key={x} />)}
            <path d={scorePath()} />
            {forwardTest.map(([date, score], index) => {
              const x = 54 + (index / (forwardTest.length - 1)) * 806;
              const y = 24 + ((1 - score) / 2) * 260;
              return <circle cx={x} cy={y} r="3" key={date}><title>{date}, 2025: {score.toFixed(2)}</title></circle>;
            })}
          </svg>
          <div className="platform-x-axis"><span>Jan 05</span><span>Jan 14</span><span>Jan 22</span><span>Jan 30</span><span>Feb 05</span></div>
        </div>
        <footer><span><i className="legend-line" />TPI score</span><span><i className="legend-zero" />Zero line</span><p>Hover a plotted point for its dated score.</p></footer>
      </article>

      <section className="research-table-section" data-reveal aria-labelledby="signal-table-title">
        <header><div><p>Jan 17, 2025 snapshot</p><h3 id="signal-table-title">Selected signal matrix</h3></div><span>Conditional color indicates the recorded state, not a current recommendation.</span></header>
        <div className="research-table-scroll">
          <div className="signal-data-table" role="table" aria-label="Selected MTPI signal rows">
            <div role="row"><span>Category</span><span>Indicator</span><span>Frame</span><span>Result</span><span>Score</span></div>
            {signalRows.map(([category, indicator, frame, result, score]) => <div role="row" key={`${category}-${indicator}`}><strong>{category}</strong><span>{indicator}</span><span>{frame}</span><i className={result === "Bearish" ? "cell-bearish" : "cell-bullish"}>{result}</i><b>{score}</b></div>)}
          </div>
        </div>
      </section>

      <section className="research-table-section correlation-section" data-reveal aria-labelledby="correlation-title">
        <header><div><p>BTC macro context</p><h3 id="correlation-title">Correlation changes with the window.</h3></div><span>Stronger tint indicates a larger absolute historical relationship.</span></header>
        <div className="correlation-heatmap" role="table" aria-label="Selected historical BTC macro correlations">
          <div><strong>Series</strong><span>15D</span><span>30D</span><span>90D</span><span>120D</span></div>
          {correlationRows.map(([name, ...values]) => <div key={name}><strong>{name}</strong>{values.map((value, index) => <span key={`${name}-${index}`} data-negative={value < 0 ? "" : undefined} style={{ "--heat": heatAlpha(value) } as CSSProperties}>{value.toFixed(2)}</span>)}</div>)}
        </div>
      </section>
    </section>
  );
}

const rspsStages = [
  ["01", "Market regime", "TOTAL trend gate"], ["02", "Major allocation", "ETH / BTC"],
  ["03", "Speculative strength", "SOL / ETH · SOL / BTC"], ["04", "Small-cap budget", "OTHERS.D"],
  ["05", "Candidate selection", "Market cap · trend · beta · score"],
];

const pairwiseRows = [
  ["ETH / BTC", "9", "2D", "−1.00", "Short", "ETH 20% / BTC 80%"],
  ["SOL / ETH", "8", "2D", "1.00", "Long", "SOL 80% / ETH 20%"],
  ["SOL / BTC", "8", "2D", "1.00", "Long", "SOL 80% / BTC 20%"],
];

const candidateRows = [
  ["XRP", "$179,543,392,162", "1", "1", "0.72", "0.40", "0.56", "2"],
  ["SUI", "$12,505,026,341", "—", "—", "1.04", "0.72", "0.88", "1"],
  ["DOGE", "$49,391,582,499", "—", "—", "1.57", "0.78", "1.18", "2"],
  ["SHIB", "$11,097,647,584", "—", "—", "1.43", "0.73", "1.08", "2"],
  ["LINK", "$15,906,687,579", "1", "—", "1.02", "0.62", "0.82", "1"],
];

function RspsEvidence() {
  return (
    <section className="case-evidence research-evidence" aria-labelledby="evidence-title">
      <header className="case-evidence-heading" data-reveal>
        <p>Research workspace</p>
        <h2 id="evidence-title">From market regime to candidate screen.</h2>
        <span>The system separates broad trend, pairwise relative strength, portfolio budget, and security-level filters so each decision can be reviewed independently.</span>
      </header>

      <div className="evidence-stat-row" data-reveal>
        <div><strong>9</strong><span>connected research views</span></div><div><strong>5</strong><span>decision stages</span></div>
        <div><strong>3</strong><span>pairwise models</span></div><div><strong>2D</strong><span>pairwise horizon</span></div>
      </div>

      <section className="workflow-section" data-reveal aria-labelledby="workflow-title">
        <header><p>System logic</p><h3 id="workflow-title">Five questions, answered in sequence.</h3></header>
        <div className="workflow-table" role="list">
          {rspsStages.map(([number, title, detail]) => <div role="listitem" key={number}><span>{number}</span><strong>{title}</strong><p>{detail}</p><i>→</i></div>)}
        </div>
      </section>

      <section className="research-table-section" data-reveal aria-labelledby="pairwise-title">
        <header><div><p>Oct 02, 2024 snapshot</p><h3 id="pairwise-title">Pairwise trend models</h3></div><span>Recorded model states and allocation logic from the historical research snapshot.</span></header>
        <div className="research-table-scroll">
          <div className="pairwise-data-table" role="table" aria-label="Historical RSPS pairwise model states">
            <div role="row"><span>Model</span><span>Inputs</span><span>Frame</span><span>Average</span><span>State</span><span>Allocation logic</span></div>
            {pairwiseRows.map(([model, inputs, frame, average, state, allocation]) => <div role="row" key={model}><strong>{model}</strong><span>{inputs}</span><span>{frame}</span><b>{average}</b><i className={state === "Long" ? "cell-bullish" : "cell-bearish"}>{state}</i><span>{allocation}</span></div>)}
          </div>
        </div>
      </section>

      <section className="research-table-section candidate-section" data-reveal aria-labelledby="candidate-title">
        <header><div><p>Historical candidate screen</p><h3 id="candidate-title">Multi-factor selection table</h3></div><span>Selected ultra-large-cap rows show how market cap, trend checks, beta, and score were organized.</span></header>
        <div className="research-table-scroll">
          <div className="candidate-data-table" role="table" aria-label="Selected historical candidate screening rows">
            <div role="row"><span>Ticker</span><span>Market cap</span><span>Bull USD</span><span>Bull SOL</span><span>BTC beta</span><span>SOL beta</span><span>Avg beta</span><span>Score</span></div>
            {candidateRows.map(([ticker, marketCap, usd, sol, btcBeta, solBeta, avgBeta, score]) => <div role="row" key={ticker}><strong>{ticker}</strong><span>{marketCap}</span><span>{usd}</span><span>{sol}</span><span>{btcBeta}</span><span>{solBeta}</span><span>{avgBeta}</span><b>{score}</b></div>)}
          </div>
        </div>
        <p className="table-disclosure">Static historical research snapshot. Values are not current holdings, prices, or recommendations.</p>
      </section>
    </section>
  );
}

export function CaseEvidence({ type }: CaseEvidenceProps) {
  if (type === "trend") return <MtpiEvidence />;
  if (type === "relative-strength") return <RspsEvidence />;
  return null;
}
