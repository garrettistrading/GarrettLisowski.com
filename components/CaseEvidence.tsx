import type { CSSProperties } from "react";
import { ResearchGauge } from "@/components/ResearchGauge";
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
    const x = 52 + (index / (forwardTest.length - 1)) * 806;
    const y = 20 + ((1 - score) / 2) * 238;
    return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
}

const signalRows = [
  ["Perpetual", "EWMA", "3D", "8", "−1.00", "Bearish"],
  ["Perpetual", "SALMA RED K", "3D", "Length 10", "−1.00", "Bearish"],
  ["Perpetual", "Michaels EMA", "2D", "8 – 13", "−1.00", "Bearish"],
  ["Perpetual", "HSMA", "4D", "8", "−1.00", "Bearish"],
  ["Perpetual", "T3 Striped [Loxx]", "4D", "Period 5", "−1.00", "Bearish"],
  ["Oscillators", "Regularized-moving-average oscillator suite", "2D", "Length 3 · Reg. length 21", "−1.00", "Bearish"],
  ["Oscillators", "Normalized KAMA oscillator", "4D", "6 · 19 · 5 · 8", "−1.00", "Bearish"],
  ["Oscillators", "Sebastine Trend Catcher", "2D", "5 · 4", "−1.00", "Bearish"],
  ["Oscillators", "Kalman Hull RSI", "3D", "4 · 0.13 · 4", "−1.00", "Bearish"],
  ["Oscillators", "Trend Following MA’s", "3D", "EMA 2", "−1.00", "Bearish"],
  ["Bitcoin", "T3S", "5D", "4", "−1.00", "Bearish"],
  ["Bitcoin", "Michaels EMA", "4D", "4 · 6", "−1.00", "Bearish"],
  ["Ethereum", "Michaels EMA", "2D", "5 · 12", "−1.00", "Bearish"],
  ["Ethereum", "EWMA", "4D", "4", "−1.00", "Bearish"],
  ["Macro correlation", "Correlation coefficient", "15D / 30D / 90D / 120D", "N/A", "0.28", "Slight bull"],
];

const correlationRows = [
  ["SPX", -0.18, 0.33, 0.87, 0.81, 0.46], ["NDX", 0.10, 0.66, 0.89, 0.81, 0.62],
  ["DXY", -0.22, 0.14, 0.92, 0.87, 0.43], ["Gold", -0.10, 0.28, 0.26, 0.43, 0.22],
  ["US10Y", -0.01, -0.02, 0.80, 0.70, 0.37], ["VIX", 0.41, 0.30, -0.43, -0.31, -0.01],
  ["MOVE", -0.28, -0.74, -0.49, -0.38, -0.47], ["Fed liquidity", 0.76, 0.71, 0.60, 0.62, 0.67],
  ["PBOC liquidity", 0.75, 0.27, 0.65, 0.65, 0.58], ["Global liquidity", 0.05, -0.53, 0.05, 0.13, -0.08],
] as const;

function heatAlpha(value: number) { return 0.08 + Math.abs(value) * 0.43; }
function categoryClass(category: string) { return `category-cell category-${category.toLowerCase().replaceAll(" ", "-")}`; }

function ForwardChart() {
  return (
    <article className="workstation-panel forward-panel">
      <header><div><p>Forward testing</p><h3>Total score</h3></div><span>Jan 05 — Feb 05, 2025</span></header>
      <div className="platform-chart compact-platform-chart">
        <svg viewBox="0 0 900 285" role="img" aria-label="Historical MTPI score from January 5 through February 5, 2025">
          {[20, 79.5, 139, 198.5, 258].map((y, index) => <g key={y}><line x1="52" x2="858" y1={y} y2={y} /><text x="7" y={y + 4}>{["1.0", "0.5", "0.0", "−0.5", "−1.0"][index]}</text></g>)}
          {[52, 253, 455, 656, 858].map((x) => <line className="vertical-grid" x1={x} x2={x} y1="20" y2="258" key={x} />)}
          <path d={scorePath()} />
          {forwardTest.map(([date, score], index) => {
            const x = 52 + (index / (forwardTest.length - 1)) * 806;
            const y = 20 + ((1 - score) / 2) * 238;
            return <circle cx={x} cy={y} r="3" key={date}><title>{`${date}, 2025: ${score.toFixed(2)}`}</title></circle>;
          })}
        </svg>
        <div className="platform-x-axis"><span>Jan 05</span><span>Jan 14</span><span>Jan 22</span><span>Jan 30</span><span>Feb 05</span></div>
      </div>
      <footer><span>Observed high 0.82</span><span>Observed low −0.91</span></footer>
    </article>
  );
}

function MtpiEvidence() {
  return (
    <section className="case-evidence research-evidence" aria-labelledby="evidence-title">
      <header className="case-evidence-heading" data-reveal>
        <p>Research workspace</p>
        <h2 id="evidence-title">The signal, its inputs, and the evidence beside it.</h2>
        <span>A cleaned-up web workspace keeps the indicator matrix central while the gauge, macro context, and historical test remain visible in the same review path.</span>
      </header>

      <div className="evidence-stat-row" data-reveal>
        <div><strong>15</strong><span>signal inputs</span></div><div><strong>5</strong><span>research categories</span></div>
        <div><strong>24</strong><span>dated observations</span></div><div><strong>10</strong><span>macro series reviewed</span></div>
      </div>

      <section className="mtpi-system-canvas" data-reveal aria-labelledby="matrix-title">
        <header className="workspace-titlebar"><div><strong>MTPI</strong><span>Whole market trend · Total market cap</span></div><dl><dt>Updated</dt><dd>Jan 17, 2025</dd><dt>Average</dt><dd>−0.91 · Short</dd></dl></header>
        <div className="mtpi-system-main">
          <div className="research-table-scroll">
            <div className="full-signal-table" role="table" aria-label="MTPI indicator matrix">
              <div role="row"><span>Category</span><span id="matrix-title">Indicator</span><span>Timeframe</span><span>Comments / inputs</span><span>Score</span><span>Result</span></div>
              {signalRows.map(([category, indicator, frame, comments, score, result]) => <div role="row" key={`${category}-${indicator}`}><strong className={categoryClass(category)}>{category}</strong><span>{indicator}</span><span>{frame}</span><span>{comments}</span><b>{score}</b><i className={result === "Bearish" ? "cell-bearish" : "cell-bullish"}>{result}</i></div>)}
              <footer><span>MTPI total average score</span><strong>−0.91</strong><i>Short</i></footer>
            </div>
          </div>
          <ResearchGauge label="Medium-term trend" score="−0.91" state="Short" />
        </div>
      </section>

      <div className="mtpi-analysis-grid" data-reveal>
        <article className="workstation-panel correlation-panel">
          <header><div><p>Macro context</p><h3>BTC correlation table</h3></div><span>15D · 30D · 90D · 120D</span></header>
          <div className="correlation-heatmap full-correlation-table" role="table" aria-label="Historical BTC macro correlations">
            <div><strong>Series</strong><span>15D</span><span>30D</span><span>90D</span><span>120D</span><span>Avg.</span></div>
            {correlationRows.map(([name, ...values]) => <div key={name}><strong>{name}</strong>{values.map((value, index) => <span key={`${name}-${index}`} data-negative={value < 0 ? "" : undefined} style={{ "--heat": heatAlpha(value) } as CSSProperties}>{value.toFixed(2)}</span>)}</div>)}
          </div>
        </article>
        <ForwardChart />
      </div>
      <p className="workspace-disclosure">Historical research snapshot. It is not a live signal or trading recommendation.</p>
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

const tracePanels = [
  { title: "ETH/BTC relative price", label: "Normalized historical view", path: "M20 42 L35 86 L51 57 L67 91 L84 81 L103 108 L122 124 L142 145 L164 157 L187 142 L209 119 L231 88 L253 103 L274 78 L295 57 L315 79 L337 75 L360 91 L383 82 L408 95 L435 99 L463 110 L494 105 L526 119 L560 116 L598 128", markers: [55, 92, 136, 184, 232, 278, 327, 374, 423, 476, 529] },
  { title: "AFR model alignment", label: "State changes through time", path: "M20 68 L38 92 L58 83 L80 109 L101 98 L123 131 L146 146 L169 139 L193 126 L217 91 L241 106 L266 75 L292 94 L320 84 L348 97 L377 90 L407 104 L438 99 L470 110 L502 107 L536 118 L568 115 L598 124", markers: [44, 80, 119, 161, 205, 252, 300, 351, 405, 462, 522] },
  { title: "Indicator time coherence", label: "Positive and negative marker density", path: "M20 53 L42 76 L64 67 L86 101 L109 117 L133 142 L158 151 L183 136 L210 102 L237 87 L265 94 L294 72 L324 84 L355 78 L388 91 L421 87 L455 96 L491 92 L528 100 L565 97 L598 103", markers: [38, 62, 91, 123, 158, 195, 235, 278, 326, 379, 435, 494, 554] },
];

function TracePanel({ panel, wide = false }: { panel: typeof tracePanels[number]; wide?: boolean }) {
  return (
    <article className={`trace-panel ${wide ? "is-wide" : ""}`}>
      <header><strong>{panel.title}</strong><span>{panel.label}</span></header>
      <svg viewBox="0 0 620 190" role="img" aria-label={`${panel.title}, normalized historical research trace`}>
        {[25, 65, 105, 145, 185].map((y) => <line x1="20" x2="600" y1={y} y2={y} key={y} />)}
        {panel.markers.map((x, index) => <line className={index % 3 === 0 || index % 5 === 0 ? "marker-positive" : "marker-negative"} x1={x} x2={x} y1="25" y2="165" key={x} />)}
        <path d={panel.path} />
      </svg>
      <footer><span>2017</span><span>2019</span><span>2021</span><span>2023</span><span>2024</span></footer>
    </article>
  );
}

function RspsEvidence() {
  return (
    <section className="case-evidence research-evidence" aria-labelledby="evidence-title">
      <header className="case-evidence-heading" data-reveal>
        <p>Research workspace</p>
        <h2 id="evidence-title">A live review path from regime to security selection.</h2>
        <span>Pairwise models sit beside normalized historical traces and state markers, then feed the same five-stage research logic and candidate screen.</span>
      </header>

      <div className="evidence-stat-row" data-reveal>
        <div><strong>9</strong><span>connected research views</span></div><div><strong>5</strong><span>decision stages</span></div>
        <div><strong>3</strong><span>pairwise models</span></div><div><strong>2D</strong><span>pairwise horizon</span></div>
      </div>

      <section className="rsps-workstation" data-reveal aria-labelledby="workstation-title">
        <header className="workspace-titlebar"><div><strong>RSPS</strong><span id="workstation-title">Relative-strength workstation</span></div><dl><dt>Snapshot</dt><dd>Oct 02, 2024</dd><dt>Review</dt><dd>Pairwise · regime · selection</dd></dl></header>
        <div className="rsps-chart-grid">
          {tracePanels.map((panel, index) => <TracePanel panel={panel} wide={index === 0} key={panel.title} />)}
        </div>
        <footer className="workstation-legend"><span><i className="marker-positive" />Positive model state</span><span><i className="marker-negative" />Negative model state</span><p>Normalized traces preserve the historical review structure; price levels are intentionally omitted.</p></footer>
      </section>

      <section className="workflow-section" data-reveal aria-labelledby="workflow-title">
        <header><p>System logic</p><h3 id="workflow-title">Five questions, answered in sequence.</h3></header>
        <div className="workflow-table" role="list">{rspsStages.map(([number, title, detail]) => <div role="listitem" key={number}><span>{number}</span><strong>{title}</strong><p>{detail}</p><i>→</i></div>)}</div>
      </section>

      <section className="research-table-section" data-reveal aria-labelledby="pairwise-title">
        <header><div><p>Recorded model states</p><h3 id="pairwise-title">Pairwise trend models</h3></div><span>Exact inputs, horizon, averages, and 80/20 allocation logic from the historical snapshot.</span></header>
        <div className="research-table-scroll"><div className="pairwise-data-table" role="table" aria-label="Historical RSPS pairwise model states">
          <div role="row"><span>Model</span><span>Inputs</span><span>Frame</span><span>Average</span><span>State</span><span>Allocation logic</span></div>
          {pairwiseRows.map(([model, inputs, frame, average, state, allocation]) => <div role="row" key={model}><strong>{model}</strong><span>{inputs}</span><span>{frame}</span><b>{average}</b><i className={state === "Long" ? "cell-bullish" : "cell-bearish"}>{state}</i><span>{allocation}</span></div>)}
        </div></div>
      </section>

      <section className="research-table-section candidate-section" data-reveal aria-labelledby="candidate-title">
        <header><div><p>Historical candidate screen</p><h3 id="candidate-title">Multi-factor selection table</h3></div><span>Selected ultra-large-cap rows show the market-cap, trend, beta, and score organization.</span></header>
        <div className="research-table-scroll"><div className="candidate-data-table" role="table" aria-label="Selected historical candidate screening rows">
          <div role="row"><span>Ticker</span><span>Market cap</span><span>Bull USD</span><span>Bull SOL</span><span>BTC beta</span><span>SOL beta</span><span>Avg beta</span><span>Score</span></div>
          {candidateRows.map(([ticker, marketCap, usd, sol, btcBeta, solBeta, avgBeta, score]) => <div role="row" key={ticker}><strong>{ticker}</strong><span>{marketCap}</span><span>{usd}</span><span>{sol}</span><span>{btcBeta}</span><span>{solBeta}</span><span>{avgBeta}</span><b>{score}</b></div>)}
        </div></div>
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
