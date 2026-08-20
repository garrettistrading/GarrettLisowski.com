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
  ["Perpetual", "Michaels EMA", "2D", "8 - 13", "−1.00", "Bearish"],
  ["Perpetual", "HSMA", "4D", "8", "−1.00", "Bearish"],
  ["Perpetual", "T3 Striped [Loxx]", "4D", "Period 5", "−1.00", "Bearish"],
  ["Oscillators", "Regularized-moving-average oscillator suite", "2D", "Length 3 / Reg. length 21", "−1.00", "Bearish"],
  ["Oscillators", "Normalized KAMA oscillator", "4D", "6 / 19 / 5 / 8", "−1.00", "Bearish"],
  ["Oscillators", "Sebastine Trend Catcher", "2D", "5 / 4", "−1.00", "Bearish"],
  ["Oscillators", "Kalman Hull RSI", "3D", "4 / 0.13 / 4", "−1.00", "Bearish"],
  ["Oscillators", "Trend Following MA’s", "3D", "EMA 2", "−1.00", "Bearish"],
  ["Bitcoin", "T3S", "5D", "4", "−1.00", "Bearish"],
  ["Bitcoin", "Michaels EMA", "4D", "4 / 6", "−1.00", "Bearish"],
  ["Ethereum", "Michaels EMA", "2D", "5 / 12", "−1.00", "Bearish"],
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
      <header><div><p>Score history</p><h3>Total score</h3></div><span>Jan 05 - Feb 05, 2025</span></header>
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
      <p className="panel-method-note">The line continues past the January 17 matrix. It tracks the model score, not investment performance.</p>
    </article>
  );
}

function MtpiEvidence() {
  return (
    <section className="case-evidence research-evidence" aria-labelledby="evidence-title">
      <header className="case-evidence-heading" data-reveal>
        <p>Inside the model</p>
        <h2 id="evidence-title">A composite score is only useful when I can see what is pulling it.</h2>
        <span>The matrix shows the raw readings. The gauge and charts show how I combined them and checked the result.</span>
      </header>

      <div className="evidence-stat-row" data-reveal>
        <div><strong>15</strong><span>signal inputs</span></div><div><strong>5</strong><span>research categories</span></div>
        <div><strong>24</strong><span>dated observations</span></div><div><strong>10</strong><span>macro series reviewed</span></div>
      </div>

      <section className="mtpi-system-canvas" data-reveal aria-labelledby="matrix-title">
        <header className="workspace-titlebar"><div><strong>MTPI</strong><span>Whole market trend, total market cap</span></div><dl><dt>Updated</dt><dd>Jan 17, 2025</dd><dt>Average</dt><dd>−0.91, Short</dd></dl></header>
        <div className="mtpi-system-main">
          <div className="research-table-scroll" tabIndex={0} aria-label="Scrollable MTPI indicator matrix">
            <table className="full-signal-table">
              <caption id="matrix-title">MTPI indicator matrix</caption>
              <thead><tr><th scope="col">Category</th><th scope="col">Indicator</th><th scope="col">Timeframe</th><th scope="col">Comments / inputs</th><th scope="col">Score</th><th scope="col">Result</th></tr></thead>
              <tbody>
                {signalRows.map(([category, indicator, frame, comments, score, result]) => (
                  <tr key={`${category}-${indicator}`}>
                    <th scope="row" className={categoryClass(category)}>{category}</th><td>{indicator}</td><td>{frame}</td><td>{comments}</td><td><b>{score}</b></td><td><i className={result === "Bearish" ? "cell-bearish" : "cell-bullish"}>{result}</i></td>
                  </tr>
                ))}
              </tbody>
              <tfoot><tr><th scope="row" colSpan={4}>MTPI total average score</th><td><strong>−0.91</strong></td><td><i>Short</i></td></tr></tfoot>
            </table>
          </div>
          <ResearchGauge label="Medium-term trend" score="−0.91" state="Short" />
        </div>
      </section>

      <div className="mtpi-analysis-grid" data-reveal>
        <article className="workstation-panel correlation-panel">
          <header><div><p>Macro check</p><h3>BTC correlation table</h3></div><span>15D / 30D / 90D / 120D</span></header>
          <div className="research-table-scroll" tabIndex={0} aria-label="Scrollable macro-correlation table">
            <table className="correlation-heatmap full-correlation-table">
              <caption>Historical BTC macro correlations</caption>
              <thead><tr><th scope="col">Series</th><th scope="col">15D</th><th scope="col">30D</th><th scope="col">90D</th><th scope="col">120D</th><th scope="col">Avg.</th></tr></thead>
              <tbody>{correlationRows.map(([name, ...values]) => <tr key={name}><th scope="row">{name}</th>{values.map((value, index) => <td key={`${name}-${index}`} data-negative={value < 0 ? "" : undefined} style={{ "--heat": heatAlpha(value) } as CSSProperties}>{value.toFixed(2)}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </article>
        <ForwardChart />
      </div>
      <p className="workspace-disclosure">This is an old research snapshot, not a live signal or a trading recommendation.</p>
    </section>
  );
}

const rspsStages = [
  ["01", "Market regime", "TOTAL trend gate"], ["02", "Major allocation", "ETH / BTC"],
  ["03", "Speculative strength", "SOL / ETH and SOL / BTC"], ["04", "Small-cap budget", "OTHERS.D"],
  ["05", "Candidate selection", "Market cap, trend, beta, score"],
];

const pairwiseRows = [
  ["ETH / BTC", "9", "2D", "−1.00", "Short", "ETH 20% / BTC 80%"],
  ["SOL / ETH", "8", "2D", "1.00", "Long", "SOL 80% / ETH 20%"],
  ["SOL / BTC", "8", "2D", "1.00", "Long", "SOL 80% / BTC 20%"],
];

const candidateRows = [
  ["XRP", "$179,543,392,162", "1", "1", "0.72", "0.40", "0.56", "2"],
  ["SUI", "$12,505,026,341", "N/A", "N/A", "1.04", "0.72", "0.88", "1"],
  ["DOGE", "$49,391,582,499", "N/A", "N/A", "1.57", "0.78", "1.18", "2"],
  ["SHIB", "$11,097,647,584", "N/A", "N/A", "1.43", "0.73", "1.08", "2"],
  ["LINK", "$15,906,687,579", "1", "N/A", "1.02", "0.62", "0.82", "1"],
];

const tracePanels = [
  { title: "ETH/BTC relative-price structure", label: "Source-workbook reconstruction", path: "M20 42 L35 86 L51 57 L67 91 L84 81 L103 108 L122 124 L142 145 L164 157 L187 142 L209 119 L231 88 L253 103 L274 78 L295 57 L315 79 L337 75 L360 91 L383 82 L408 95 L435 99 L463 110 L494 105 L526 119 L560 116 L598 128", markers: [55, 92, 136, 184, 232, 278, 327, 374, 423, 476, 529] },
  { title: "AFR model alignment", label: "Source-workbook reconstruction", path: "M20 68 L38 92 L58 83 L80 109 L101 98 L123 131 L146 146 L169 139 L193 126 L217 91 L241 106 L266 75 L292 94 L320 84 L348 97 L377 90 L407 104 L438 99 L470 110 L502 107 L536 118 L568 115 L598 124", markers: [44, 80, 119, 161, 205, 252, 300, 351, 405, 462, 522] },
  { title: "Indicator time coherence", label: "Source-workbook reconstruction", path: "M20 53 L42 76 L64 67 L86 101 L109 117 L133 142 L158 151 L183 136 L210 102 L237 87 L265 94 L294 72 L324 84 L355 78 L388 91 L421 87 L455 96 L491 92 L528 100 L565 97 L598 103", markers: [38, 62, 91, 123, 158, 195, 235, 278, 326, 379, 435, 494, 554] },
];

function TracePanel({ panel, wide = false }: { panel: typeof tracePanels[number]; wide?: boolean }) {
  return (
    <article className={`trace-panel ${wide ? "is-wide" : ""}`}>
      <header><strong>{panel.title}</strong><span>{panel.label}</span></header>
      <svg viewBox="0 0 620 190" role="img" aria-label={`${panel.title}, schematic reconstruction from the source workbook`}>
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
        <p>Inside the workbook</p>
        <h2 id="evidence-title">The order of questions matters.</h2>
        <span>I started with the market regime, moved through the pairwise readings, and looked at individual assets last.</span>
      </header>

      <div className="evidence-stat-row" data-reveal>
        <div><strong>9</strong><span>connected research views</span></div><div><strong>5</strong><span>decision stages</span></div>
        <div><strong>3</strong><span>pairwise models</span></div><div><strong>2D</strong><span>pairwise horizon</span></div>
      </div>

      <section className="rsps-workstation" data-reveal aria-labelledby="workstation-title">
        <header className="workspace-titlebar"><div><strong>RSPS</strong><span id="workstation-title">Relative-strength workbook</span></div><dl><dt>Snapshot</dt><dd>Oct 02, 2024</dd><dt>Review</dt><dd>Pairwise, regime, selection</dd></dl></header>
        <div className="rsps-chart-grid">
          {tracePanels.map((panel, index) => <TracePanel panel={panel} wide={index === 0} key={panel.title} />)}
        </div>
        <footer className="workstation-legend"><span><i className="marker-positive" />Positive model state</span><span><i className="marker-negative" />Negative model state</span><p>I recreated the workbook&apos;s visual structure here. The traces do not show prices or performance.</p></footer>
      </section>

      <section className="workflow-section" data-reveal aria-labelledby="workflow-title">
        <header><p>Research sequence</p><h3 id="workflow-title">The five questions I worked through.</h3></header>
        <div className="workflow-table" role="list">{rspsStages.map(([number, title, detail]) => <div role="listitem" key={number}><span>{number}</span><strong>{title}</strong><p>{detail}</p><i>→</i></div>)}</div>
      </section>

      <section className="research-table-section" data-reveal aria-labelledby="pairwise-title">
        <header><div><p>Recorded readings</p><h3 id="pairwise-title">Pairwise trend models</h3></div><span>These are the inputs, time horizon, averages, and 80/20 rules from the historical snapshot.</span></header>
        <div className="research-table-scroll" tabIndex={0} aria-label="Scrollable pairwise model table"><table className="pairwise-data-table">
          <caption>Historical RSPS pairwise model states</caption>
          <thead><tr><th scope="col">Model</th><th scope="col">Inputs</th><th scope="col">Frame</th><th scope="col">Average</th><th scope="col">State</th><th scope="col">Allocation logic</th></tr></thead>
          <tbody>{pairwiseRows.map(([model, inputs, frame, average, state, allocation]) => <tr key={model}><th scope="row">{model}</th><td>{inputs}</td><td>{frame}</td><td><b>{average}</b></td><td><i className={state === "Long" ? "cell-bullish" : "cell-bearish"}>{state}</i></td><td>{allocation}</td></tr>)}</tbody>
        </table></div>
        <p className="table-scroll-cue">Swipe or use Shift + scroll to review all columns.</p>
      </section>

      <section className="research-table-section candidate-section" data-reveal aria-labelledby="candidate-title">
        <header><div><p>Candidate screen</p><h3 id="candidate-title">Multi-factor selection table</h3></div><span>This sample shows how I compared market cap, trend, beta, and the final score.</span></header>
        <div className="research-table-scroll" tabIndex={0} aria-label="Scrollable candidate-screening table"><table className="candidate-data-table">
          <caption>Selected historical candidate screening rows</caption>
          <thead><tr><th scope="col">Ticker</th><th scope="col">Market cap</th><th scope="col">Bull USD</th><th scope="col">Bull SOL</th><th scope="col">BTC beta</th><th scope="col">SOL beta</th><th scope="col">Avg beta</th><th scope="col">Score</th></tr></thead>
          <tbody>{candidateRows.map(([ticker, marketCap, usd, sol, btcBeta, solBeta, avgBeta, score]) => <tr key={ticker}><th scope="row">{ticker}</th><td>{marketCap}</td><td>{usd}</td><td>{sol}</td><td>{btcBeta}</td><td>{solBeta}</td><td>{avgBeta}</td><td><b>{score}</b></td></tr>)}</tbody>
        </table></div>
        <p className="table-scroll-cue">Swipe or use Shift + scroll to review all columns.</p>
        <p className="table-disclosure">These values are historical. They are not current holdings, prices, or recommendations.</p>
      </section>
    </section>
  );
}

const hedgeEffectiveness = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  unhedged: [-210, 95, -145, 180, 65, -265, 125, -90, 220, -170, 105, 245],
  hedged: [-74, 28, -52, 62, 22, -91, 43, -31, 78, -59, 36, 84],
};

const proxyRows = [
  ["US large cap", "SPY", "0.99", "0.48%", "0.09%", "High liquidity"],
  ["US small cap", "IWM", "0.97", "1.25%", "0.19%", "Broad small-cap proxy"],
  ["Core bond", "BND", "0.98", "0.62%", "0.03%", "Diversified bond exposure"],
  ["International", "VEA", "0.96", "1.41%", "0.03%", "Developed-market proxy"],
];

const controlRows = [
  ["Balance roll-forward", "Beginning balance + activity = ending balance", "Pass"],
  ["Allocation total", "Participant elections total 100%", "Pass"],
  ["Proxy and price coverage", "No missing mappings or observations", "Pass"],
  ["Settlement tolerance", "Internal estimate within $25k threshold", "Pass"],
];

function hedgePath(values: number[]) {
  return values.map((value, index) => {
    const x = 52 + (index / (values.length - 1)) * 806;
    const y = 28 + ((300 - value) / 600) * 210;
    return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
}

function DeferredCompEvidence() {
  return (
    <section className="case-evidence research-evidence trs-evidence" aria-labelledby="evidence-title">
      <header className="case-evidence-heading" data-reveal>
        <p>Inside the model</p>
        <h2 id="evidence-title">The model only works if the trail is complete.</h2>
        <span>A reviewer should be able to move from exposure to order to settlement without guessing where a number came from.</span>
      </header>

      <div className="evidence-stat-row" data-reveal>
        <div><strong>$12.48m</strong><span>fictional plan exposure</span></div>
        <div><strong>92.0%</strong><span>target hedge ratio</span></div>
        <div><strong>$11.48m</strong><span>target swap notional</span></div>
        <div><strong>4 / 4</strong><span>sample controls passed</span></div>
      </div>

      <section className="trs-model-canvas" data-reveal aria-labelledby="trs-model-title">
        <header className="workspace-titlebar">
          <div><strong>TRS Hedge Model</strong><span id="trs-model-title">Monthly review</span></div>
          <dl><dt>Model date</dt><dd>Illustrative</dd><dt>Data</dt><dd>Fictional</dd></dl>
        </header>

        <div className="trs-model-grid">
          <div className="research-table-scroll" tabIndex={0} aria-label="Scrollable illustrative exposure and reweighting table">
            <table className="trs-exposure-table">
              <caption>Plan exposure and target swap notional</caption>
              <thead><tr><th scope="col">Plan option</th><th scope="col">Exposure</th><th scope="col">Proxy</th><th scope="col">Target</th><th scope="col">Current</th><th scope="col">Order</th></tr></thead>
              <tbody>
                <tr><th scope="row">US large cap</th><td>$5.12m</td><td>SPY</td><td>$4.71m</td><td>$4.54m</td><td><b>+$171k</b></td></tr>
                <tr><th scope="row">US small cap</th><td>$2.08m</td><td>IWM</td><td>$1.91m</td><td>$1.82m</td><td><b>+$94k</b></td></tr>
                <tr><th scope="row">Core bond</th><td>$3.16m</td><td>BND</td><td>$2.91m</td><td>$2.88m</td><td><b>+$27k</b></td></tr>
                <tr><th scope="row">International</th><td>$2.12m</td><td>VEA</td><td>$1.95m</td><td>$1.94m</td><td><b>+$9k</b></td></tr>
              </tbody>
              <tfoot><tr><th scope="row">Total</th><td>$12.48m</td><td>4 proxies</td><td>$11.48m</td><td>$11.18m</td><td><strong>+$301k</strong></td></tr></tfoot>
            </table>
          </div>

          <aside className="trs-formula-review" aria-label="Core model calculations">
            <p>Core calculations</p>
            <dl>
              <div><dt>Target notional</dt><dd>Exposure × hedge ratio</dd></div>
              <div><dt>Trade order</dt><dd>Target - current notional</dd></div>
              <div><dt>Financing expense</dt><dd>Notional × rate × day count</dd></div>
              <div><dt>Net settlement</dt><dd>Return leg - financing - fees</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      <div className="trs-analysis-grid" data-reveal>
        <article className="workstation-panel trs-settlement-panel">
          <header><div><p>Settlement</p><h3>Monthly estimate</h3></div><span>Fictional sample</span></header>
          <dl>
            <div><dt>Total-return leg</dt><dd>$205,712</dd></div>
            <div><dt>Financing expense</dt><dd>($58,247)</dd></div>
            <div><dt>Applicable fees</dt><dd>($3,500)</dd></div>
            <div className="trs-settlement-total"><dt>Estimated net settlement</dt><dd>$143,965</dd></div>
          </dl>
          <footer><span>Direction</span><strong>Company receives</strong></footer>
        </article>

        <article className="workstation-panel trs-effectiveness-panel">
          <header><div><p>Hedge effectiveness</p><h3>Unhedged versus residual P&amp;L</h3></div><span>Illustrative $000s</span></header>
          <div className="trs-effectiveness-chart">
            <svg viewBox="0 0 900 265" role="img" aria-label="Illustrative unhedged and hedged monthly profit and loss comparison">
              {[28, 80.5, 133, 185.5, 238].map((y, index) => <g key={y}><line x1="52" x2="858" y1={y} y2={y} /><text x="4" y={y + 4}>{["300", "150", "0", "-150", "-300"][index]}</text></g>)}
              <path className="unhedged-line" d={hedgePath(hedgeEffectiveness.unhedged)} />
              <path className="hedged-line" d={hedgePath(hedgeEffectiveness.hedged)} />
            </svg>
            <div className="trs-chart-axis">{hedgeEffectiveness.months.map((month) => <span key={month}>{month}</span>)}</div>
          </div>
          <footer className="trs-chart-legend"><span><i className="unhedged-key" />Unhedged liability movement</span><span><i className="hedged-key" />Residual after hedge</span></footer>
        </article>
      </div>

      <section className="research-table-section trs-proxy-section" data-reveal aria-labelledby="proxy-title">
        <header><div><p>Choosing proxies</p><h3 id="proxy-title">ETF mapping review</h3></div><span>I used sample values to show what I would compare. They are not current market statistics or recommendations.</span></header>
        <div className="research-table-scroll" tabIndex={0} aria-label="Scrollable illustrative ETF proxy table">
          <table className="trs-proxy-table">
            <caption>Illustrative proxy-selection review</caption>
            <thead><tr><th scope="col">Plan option</th><th scope="col">ETF</th><th scope="col">Correlation</th><th scope="col">Tracking error</th><th scope="col">Fee</th><th scope="col">Rationale</th></tr></thead>
            <tbody>{proxyRows.map(([option, etf, correlation, tracking, fee, rationale]) => <tr key={option}><th scope="row">{option}</th><td><b>{etf}</b></td><td>{correlation}</td><td>{tracking}</td><td>{fee}</td><td>{rationale}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="research-table-section trs-controls-section" data-reveal aria-labelledby="controls-title">
        <header><div><p>Controls</p><h3 id="controls-title">What I would check before sign-off</h3></div><span>Each test is meant to catch a missing input or an out-of-tolerance result before the review is complete.</span></header>
        <div className="research-table-scroll" tabIndex={0} aria-label="Scrollable illustrative control table">
          <table className="trs-controls-table">
            <caption>Illustrative monthly control results</caption>
            <thead><tr><th scope="col">Control</th><th scope="col">Test</th><th scope="col">Status</th></tr></thead>
            <tbody>{controlRows.map(([control, test, status]) => <tr key={control}><th scope="row">{control}</th><td>{test}</td><td><i className="cell-bullish">{status}</i></td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <p className="workspace-disclosure">I built this as an educational example. It contains no real participant, employer, client, or counterparty data.</p>
    </section>
  );
}

export function CaseEvidence({ type }: CaseEvidenceProps) {
  if (type === "deferred-comp") return <DeferredCompEvidence />;
  if (type === "trend") return <MtpiEvidence />;
  if (type === "relative-strength") return <RspsEvidence />;
  return null;
}
