"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowCounterClockwise,
  Printer,
  FloppyDisk,
  LinkSimple,
} from "@phosphor-icons/react";
import {
  defaults,
  fields,
  income,
  parseScenario,
  savings,
  serializeScenario,
  social,
  validate,
  VERSION,
  type Inputs,
  type Tool,
} from "@/lib/retirement/model";

const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
// Explicit formatting avoids differences between server and browser ICU versions.
const compact = (n: number) => {
  const scale = n >= 1_000_000 ? 1_000_000 : n >= 1_000 ? 1_000 : 1;
  const suffix = scale === 1_000_000 ? "M" : scale === 1_000 ? "K" : "";
  return `$${(n / scale).toFixed(scale === 1 ? 0 : 1)}${suffix}`;
};
const titles: Record<Tool, string> = {
  "savings-growth": "Give your savings time.",
  "social-security": "Explore when to claim.",
  "income-sequencer": "Make the years add up.",
};
const descriptions: Record<Tool, string> = {
  "savings-growth":
    "See how contributions, time, and inflation shape the money you could build.",
  "social-security":
    "Compare claiming ages under your assumptions, including the effect on a spouse.",
  "income-sequencer":
    "Compare withdrawals with and without Roth conversions. Follow the cash, the taxes, and the tradeoffs.",
};

type Series = { name: string; values: number[] };
function Chart({
  ages,
  series,
  title,
}: {
  ages: number[];
  series: Series[];
  title: string;
}) {
  const id = useId(),
    max = Math.max(1, ...series.flatMap((s) => s.values));
  const w = 760,
    h = 280,
    left = 75,
    right = 20,
    top = 20,
    bottom = 40;
  const x = (i: number) =>
    left + (i / Math.max(1, ages.length - 1)) * (w - left - right);
  const y = (n: number) => h - bottom - (n / max) * (h - top - bottom);
  const colors = ["#126653", "#a64b24", "#666d83"];
  return (
    <figure className="rl-chart">
      <figcaption>{title}</figcaption>
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby={id}>
        <title
          id={id}
        >{`${title}. Exact values are available in the table below.`}</title>
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <g key={t}>
            <line
              x1={left}
              x2={w - right}
              y1={y(max * t)}
              y2={y(max * t)}
              stroke="#dedfd7"
            />
            <text x={left - 12} y={y(max * t) + 4} textAnchor="end">
              {compact(max * t)}
            </text>
          </g>
        ))}
        {series.map((s, j) => (
          <polyline
            key={s.name}
            points={s.values
              .map((v, i) => `${x(i).toFixed(3)},${y(v).toFixed(3)}`)
              .join(" ")}
            fill="none"
            stroke={colors[j % colors.length]}
            strokeWidth="3"
            strokeDasharray={j === 1 ? "8 4" : j === 2 ? "3 4" : undefined}
          />
        ))}
        {[0, Math.floor((ages.length - 1) / 2), ages.length - 1]
          .filter((v, i, a) => a.indexOf(v) === i)
          .map((i) => (
            <text key={i} x={x(i)} y={h - 12} textAnchor="middle">
              Age {ages[i]}
            </text>
          ))}
      </svg>
      <div className="rl-legend">
        {series.map((s, i) => (
          <span key={s.name}>
            <i
              style={{
                borderColor: colors[i % colors.length],
                borderTopStyle: i === 0 ? "solid" : "dashed",
              }}
            />
            {s.name}
          </span>
        ))}
      </div>
    </figure>
  );
}
function Metric({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="rl-metric">
      <span>{label}</span>
      <strong>{value}</strong>
      {note && <small>{note}</small>}
    </div>
  );
}
function DataTable({
  headers,
  rows,
  caption,
}: {
  headers: string[];
  rows: (string | number)[][];
  caption: string;
}) {
  return (
    <div className="rl-table" tabIndex={0} role="region" aria-label={caption}>
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {headers.map((h) => (
              <th scope="col" key={h}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((v, j) =>
                j === 0 ? (
                  <th scope="row" key={j}>
                    {v}
                  </th>
                ) : (
                  <td key={j}>{v}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function SavingsResults({ p }: { p: Inputs }) {
  const now = savings(p),
    later = savings(p, 5),
    late = savings(p, 10);
  return (
    <>
      <div className="rl-metrics">
        <Metric
          label={`Projected balance at ${p.age + p.years}`}
          value={money(now.final.balance)}
          note={`${money(now.final.real)} in today's dollars`}
        />
        <Metric
          label="Your total contributions"
          value={money(now.final.contributions)}
        />
        <Metric
          label="Investment growth"
          value={money(now.final.balance - now.final.contributions)}
        />
      </div>
      <Chart
        title="Small contributions. A longer horizon."
        ages={now.rows.map((r) => r.age)}
        series={[
          { name: "Start now", values: now.rows.map((r) => r.balance) },
          { name: "Wait 5 years", values: later.rows.map((r) => r.balance) },
          {
            name: "Today's dollars · start now",
            values: now.rows.map((r) => r.real),
          },
        ]}
      />
      <div className="rl-insight">
        <h2>The cost of postponing contributions</h2>
        <p>
          Wait five years:{" "}
          <strong>{money(now.final.balance - later.final.balance)}</strong> less
          at the end. Wait ten:{" "}
          <strong>{money(now.final.balance - late.final.balance)}</strong> less.
        </p>
        <p>
          Starting assets stay invested in every scenario. Only new
          contributions are delayed; that means the delayed scenarios also
          contribute less.
        </p>
      </div>
      <details className="rl-details rl-data">
        <summary>Explore the annual numbers</summary>
        <DataTable
          caption="Savings projection · year-end values"
          headers={[
            "Age",
            "Start now",
            "Wait 5 years",
            "Wait 10 years",
            "Today's dollars",
            "Contributed",
          ]}
          rows={now.rows.map((r, i) => [
            r.age,
            money(r.balance),
            money(later.rows[i].balance),
            money(late.rows[i].balance),
            money(r.real),
            money(r.contributions),
          ])}
        />
      </details>
      <p className="rl-note">
        Monthly contributions happen at month-end. Annual return is converted to
        an effective monthly rate. Constant returns, no fees or taxes; losses
        are possible. Dollar amounts are nominal unless labeled otherwise.
      </p>
    </>
  );
}
function SocialResults({ p }: { p: Inputs }) {
  const result = social(p),
    early = result.byAge[0],
    late = result.byAge[result.byAge.length - 1],
    best = result.best;
  const incomeInputs = {
    ...defaults["income-sequencer"],
    age: p.age,
    ss: best.monthly,
    claim: best.claim,
    cola: p.cola,
  };
  return (
    <>
      <div className="rl-metrics">
        <Metric
          label="Highest modeled present value"
          value={`Claim at ${best.claim}`}
          note={
            p.spouse
              ? `Spouse claims at ${best.spouseClaim}`
              : "Among whole-year claiming ages"
          }
        />
        <Metric
          label="Lifetime household benefits"
          value={money(best.lifetime)}
        />
        <Metric
          label="Present value"
          value={money(best.npv)}
          note={`Discounted at ${p.discount}% annually`}
        />
      </div>
      <div className="rl-insight">
        <h2>A comparison, with assumptions attached.</h2>
        <p>
          {result.breakEven
            ? `Claiming at 70 overtakes claiming at ${early.claim} in cumulative, undiscounted benefits at your age ${result.breakEven}.`
            : `Delaying to 70 does not overtake claiming at ${early.claim} within this horizon.`}{" "}
          {p.spouse
            ? `This comparison holds your spouse's claim age at ${best.spouseClaim}.`
            : ""}
        </p>
        <p>
          The highest present value depends on the lifespans and discount rate
          you enter. It does not account for the value of income you may need
          sooner.
        </p>
      </div>
      <Chart
        title="Cumulative household benefits"
        ages={best.rows.map((r) => r.age)}
        series={[
          {
            name: `Claim at ${early.claim}`,
            values: early.rows.map((r) => r.cumulative),
          },
          { name: "Claim at 70", values: late.rows.map((r) => r.cumulative) },
        ]}
      />
      <DataTable
        caption={
          p.spouse
            ? `Your claim ages · spouse fixed at ${best.spouseClaim}`
            : "Compare every modeled claim age"
        }
        headers={[
          "Claim age",
          "Your monthly benefit*",
          "Lifetime household",
          "Present value",
        ]}
        rows={result.byAge.map((r) => [
          `${r.claim}${r.claim === best.claim ? " · highest NPV" : ""}`,
          money(r.monthly),
          money(r.lifetime),
          money(r.npv),
        ])}
      />
      <p className="rl-note">
        *Your own benefit in today’s dollars, before spousal supplements. Annual
        time steps; benefits end at the assumed birthday of death. No earnings
        test or benefit taxation here. Survivor modeling is limited to survivors
        at full retirement age or older.{" "}
        <Link href="/retirement-lab/methodology#social-security">
          Read the assumptions
        </Link>
        .
      </p>
      {!p.spouse && (
        <p className="rl-note">
          <Link
            href={`/retirement-lab/income-sequencer#scenario=${encodeURIComponent(serializeScenario("income-sequencer", incomeInputs))}`}
          >
            Use this benefit in the income sequencer →
          </Link>
          <br />
          Transfers your age, claim age, benefit, and COLA. Other inputs begin
          as demo assumptions; update them before using the result.
        </p>
      )}
      {p.spouse > 0 && (
        <details className="rl-details">
          <summary>Top household claim combinations</summary>
          <DataTable
            caption="Top five combinations by present value"
            headers={["Your age", "Spouse age", "Present value", "Lifetime"]}
            rows={result.ranked
              .slice(0, 5)
              .map((r) => [
                r.claim,
                r.spouseClaim,
                money(r.npv),
                money(r.lifetime),
              ])}
          />
        </details>
      )}
      <details className="rl-details rl-data">
        <summary>Annual benefits for the leading scenario</summary>
        <DataTable
          caption="Leading claim scenario · annual household benefits"
          headers={[
            "Your age",
            "Annual benefit",
            "Cumulative",
            "Present value to date",
          ]}
          rows={best.rows.map((r) => [
            r.age,
            money(r.annual),
            money(r.cumulative),
            money(r.npv),
          ])}
        />
      </details>
    </>
  );
}
function IncomeResults({ p }: { p: Inputs }) {
  const baseline = income(p),
    conversion = income(p, true),
    delta = baseline.totalTax - conversion.totalTax;
  return (
    <>
      <div className="rl-metrics">
        <Metric
          label="Tax savings from conversions"
          value={money(delta)}
          note={
            delta < 0
              ? "Negative means conversions increase taxes"
              : "Baseline tax minus conversion tax"
          }
        />
        <Metric
          label="Ending wealth difference"
          value={money(conversion.final - baseline.final)}
          note="Conversion strategy minus baseline"
        />
        <Metric
          label="First spending shortfall"
          value={
            conversion.firstShortfall
              ? `Age ${conversion.firstShortfall}`
              : "None modeled"
          }
          note="Conversion strategy"
        />
      </div>
      <div className="rl-insight">
        <h2>Two strategies. The same spending goal.</h2>
        <p>
          Both take required distributions, use the HSA for qualified medical
          costs, then draw from brokerage, Traditional, and Roth accounts. The
          second also attempts {money(p.conversion)} in annual Roth conversions
          before RMDs begin at age {conversion.rmdStart}.
        </p>
        <p>
          Conversions are a policy to test, not an optimized recommendation.
          More tax paid now may or may not leave more wealth later.
        </p>
      </div>
      <DataTable
        caption="Strategy comparison"
        headers={["Measure", "No conversions", "With conversions"]}
        rows={[
          [
            "Lifetime estimated taxes",
            money(baseline.totalTax),
            money(conversion.totalTax),
          ],
          ["Ending portfolio", money(baseline.final), money(conversion.final)],
          [
            "Unfunded spending / taxes",
            money(baseline.totalShortfall),
            money(conversion.totalShortfall),
          ],
          [
            "First shortfall age",
            baseline.firstShortfall ?? "None",
            conversion.firstShortfall ?? "None",
          ],
        ]}
      />
      <Chart
        title="Portfolio remaining, year by year"
        ages={baseline.rows.map((r) => r.age)}
        series={[
          {
            name: "No conversions",
            values: baseline.rows.map((r) => r.balance),
          },
          {
            name: "With conversions",
            values: conversion.rows.map((r) => r.balance),
          },
        ]}
      />
      <p className="rl-note">
        2026 federal brackets and age-related standard deductions, indexed by
        your future bracket-growth assumption. Excludes temporary senior
        deductions, Medicare premiums/IRMAA, NIIT, credits, and state-specific
        rules. HSA funds are reserved for medical costs. Balances are not
        adjusted for future liquidation taxes.{" "}
        <Link href="/retirement-lab/methodology#income">Model details</Link>.
      </p>
      <details className="rl-details rl-data">
        <summary>Follow the conversion strategy, year by year</summary>
        <DataTable
          caption="Conversion strategy · dollars rounded for display"
          headers={[
            "Age",
            "Year",
            "Spending",
            "Social Security",
            "Traditional",
            "Roth",
            "Brokerage",
            "HSA",
            "Conversion",
            "Tax",
            "Shortfall",
            "Ending balance",
          ]}
          rows={conversion.rows.map((r) => [
            r.age,
            r.year,
            money(r.need),
            money(r.ss),
            money(r.trad),
            money(r.roth),
            money(r.taxable),
            money(r.medical),
            money(r.conversion),
            money(r.tax),
            money(r.shortfall),
            money(r.balance),
          ])}
        />
      </details>
      <details className="rl-details rl-data">
        <summary>Baseline annual numbers</summary>
        <DataTable
          caption="No-conversion strategy"
          headers={[
            "Age",
            "Spending",
            "Withdrawals + pension + SS",
            "Taxes",
            "Shortfall",
            "Ending balance",
          ]}
          rows={baseline.rows.map((r) => [
            r.age,
            money(r.need),
            money(r.trad + r.roth + r.taxable + r.medical + r.pension + r.ss),
            money(r.tax),
            money(r.shortfall),
            money(r.balance),
          ])}
        />
      </details>
    </>
  );
}
function snapshot(tool: Tool, p: Inputs) {
  if (tool === "savings-growth") {
    const s = savings(p);
    return { label: "Ending savings", value: s.final.balance };
  }
  if (tool === "social-security")
    return { label: "Highest present value", value: social(p).best.npv };
  return {
    label: "Ending portfolio · conversions",
    value: income(p, true).final,
  };
}
export function Workbench({ tool }: { tool: Tool }) {
  const [p, setP] = useState<Inputs>({ ...defaults[tool] });
  const [status, setStatus] = useState("");
  const [saved, setSaved] = useState<Inputs | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [printDate, setPrintDate] = useState("");
  const errors = validate(tool, p),
    valid = errors.length === 0;
  // Hydrate URL and browser storage after SSR; a single initial state update is intentional.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const raw = window.location.hash.startsWith("#scenario=")
      ? window.location.hash.slice(10)
      : null;
    if (raw) {
      try {
        const parsed = parseScenario(tool, decodeURIComponent(raw));
        setP(parsed);
        setStatus(
          "Shared scenario loaded. These inputs were included in the link.",
        );
      } catch {
        setStatus(
          "This shared scenario could not be loaded. Demo inputs are shown.",
        );
      }
    }
    try {
      const rawSaved = localStorage.getItem(`retirement-lab:${tool}`);
      if (rawSaved) setSaved(parseScenario(tool, rawSaved));
    } catch {
      setStatus("Saved scenario unavailable. Demo inputs are shown.");
    }
  }, [tool]);
  /* eslint-enable react-hooks/set-state-in-effect */
  function change(key: string, value: number) {
    setP((prev) => {
      const next = { ...prev, [key]: value };
      if ((key === "spouse" || key === "joint") && value === 0) {
        for (const name of Object.keys(next))
          if (name.startsWith("spouse") && name !== "spouse")
            next[name] = defaults[tool][name];
      }
      return next;
    });
    setShareUrl("");
  }
  function save() {
    try {
      localStorage.setItem(
        `retirement-lab:${tool}`,
        serializeScenario(tool, p),
      );
      setSaved({ ...p });
      setStatus("Saved on this browser. Existing saved scenario replaced.");
    } catch {
      setStatus("Could not save. Browser storage may be unavailable.");
    }
  }
  function remove() {
    try {
      localStorage.removeItem(`retirement-lab:${tool}`);
      setSaved(null);
      setStatus("Saved scenario deleted from this browser.");
    } catch {
      setStatus("Could not delete the saved scenario.");
    }
  }
  function reset() {
    setP({ ...defaults[tool] });
    window.history.replaceState(null, "", window.location.pathname);
    setShareUrl("");
    setStatus("Demo restored. Your saved comparison is still available.");
  }
  async function share() {
    const url = `${window.location.origin}${window.location.pathname}#scenario=${encodeURIComponent(serializeScenario(tool, p))}`;
    setShareUrl(url);
    try {
      await navigator.clipboard.writeText(url);
      setStatus(
        "Scenario link copied. Anyone with the link can read every input.",
      );
    } catch {
      setStatus("Copy the scenario link from the field below.");
    }
  }
  function print() {
    setPrintDate(new Date().toLocaleDateString("en-US"));
    document
      .querySelectorAll("details.rl-data")
      .forEach((d) => d.setAttribute("open", ""));
    requestAnimationFrame(() => window.print());
  }
  const visible = fields[tool].filter(
    (f) =>
      !(
        tool === "social-security" &&
        f.key.startsWith("spouse") &&
        !p.spouse
      ) && !(tool === "income-sequencer" && f.key === "spouseAge" && !p.joint),
  );
  const renderField = (f: (typeof visible)[number]) => (
    <label className="rl-field" key={f.key} htmlFor={f.key}>
      <span>{f.label}</span>
      <input
        id={f.key}
        type="number"
        min={f.min}
        max={f.max}
        step={f.step ?? 1}
        value={Number.isFinite(p[f.key]) ? p[f.key] : ""}
        onChange={(e) =>
          change(f.key, e.target.value === "" ? NaN : Number(e.target.value))
        }
        aria-describedby={f.hint ? `${f.key}-hint` : undefined}
      />
      {f.hint && <small id={`${f.key}-hint`}>{f.hint}</small>}
    </label>
  );
  return (
    <>
      <header className="rl-hero">
        <p className="rl-eyebrow">
          Retirement Lab /{" "}
          {tool === "savings-growth"
            ? "Savings growth"
            : tool === "social-security"
              ? "Social Security"
              : "Income sequencing"}
        </p>
        <h1>{titles[tool]}</h1>
        <p>{descriptions[tool]}</p>
      </header>
      <div className="rl-toolbar">
        <button onClick={reset}>
          <ArrowCounterClockwise aria-hidden="true" />
          Reset demo
        </button>
        <button onClick={save} disabled={!valid}>
          <FloppyDisk aria-hidden="true" />
          Save on this device
        </button>
        <button
          onClick={() => setShareOpen(!shareOpen)}
          disabled={!valid}
          aria-expanded={shareOpen}
        >
          <LinkSimple aria-hidden="true" />
          Share inputs
        </button>
        <button onClick={print} disabled={!valid}>
          <Printer aria-hidden="true" />
          Print report
        </button>
      </div>
      {shareOpen && (
        <section className="rl-share">
          <h2>Share this scenario</h2>
          <p>
            The link includes every input above, including balances, ages, and
            benefit estimates. Anyone you send it to can read those values. No
            names or account identifiers are requested.
          </p>
          <button className="rl-primary" onClick={share} disabled={!valid}>
            Copy link with these inputs
          </button>
          {shareUrl && (
            <label>
              Scenario link
              <input
                readOnly
                value={shareUrl}
                onFocus={(e) => e.target.select()}
              />
            </label>
          )}
        </section>
      )}
      <p role="status" className="rl-status">
        {status}
      </p>
      <div className="rl-workspace">
        <aside className="rl-inputs">
          <h2>Your assumptions</h2>
          {tool === "social-security" && (
            <label className="rl-check">
              <input
                type="checkbox"
                checked={!!p.spouse}
                onChange={(e) => change("spouse", Number(e.target.checked))}
              />
              Include spouse
            </label>
          )}
          {tool === "income-sequencer" && (
            <label className="rl-check">
              <input
                type="checkbox"
                checked={!!p.joint}
                onChange={(e) => change("joint", Number(e.target.checked))}
              />
              Married filing jointly
            </label>
          )}
          {visible.filter((f) => !f.advanced).map(renderField)}
          <details className="rl-details">
            <summary>Advanced assumptions</summary>
            {visible.filter((f) => f.advanced).map(renderField)}
            {tool === "savings-growth" && (
              <p>
                No additional settings. See the methodology for timing and
                inflation assumptions.
              </p>
            )}
          </details>
          <p className="rl-note">
            Calculations run in your browser. Saving is optional and stays on
            this device.
          </p>
        </aside>
        <section className="rl-results" aria-label="Scenario results">
          {!valid ? (
            <div role="alert" className="rl-errors">
              <h2>Check your assumptions</h2>
              <ul>
                {errors.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          ) : (
            <>
              {saved && (
                <div className="rl-saved">
                  <h2>Your saved comparison</h2>
                  <p>
                    {snapshot(tool, p).label}:{" "}
                    <strong>{money(snapshot(tool, p).value)}</strong> now /{" "}
                    <strong>{money(snapshot(tool, saved).value)}</strong> saved.
                  </p>
                  <details>
                    <summary>View saved inputs</summary>
                    <dl>
                      {Object.entries(saved).map(([k, v]) => (
                        <div key={k}>
                          <dt>
                            {fields[tool].find((f) => f.key === k)?.label ?? k}
                          </dt>
                          <dd>{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </details>
                  <div className="rl-toolbar">
                    <button
                      onClick={() => {
                        setP({ ...saved });
                        setShareUrl("");
                        setStatus("Saved scenario loaded.");
                      }}
                    >
                      Load saved
                    </button>
                    <button onClick={remove}>Delete saved</button>
                  </div>
                </div>
              )}
              {tool === "savings-growth" ? (
                <SavingsResults p={p} />
              ) : tool === "social-security" ? (
                <SocialResults p={p} />
              ) : (
                <IncomeResults p={p} />
              )}
            </>
          )}
        </section>
      </div>
      <section className="rl-print-assumptions">
        <h2>Report assumptions</h2>
        <p>
          Calculated {printDate} · Model {VERSION} · 2026 tax framework where
          applicable.
        </p>
        <dl>
          {visible.map((f) => (
            <div key={f.key}>
              <dt>{f.label}</dt>
              <dd>{p[f.key]}</dd>
            </div>
          ))}
          {tool === "social-security" && (
            <div>
              <dt>Include spouse</dt>
              <dd>{p.spouse ? "Yes" : "No"}</dd>
            </div>
          )}
          {tool === "income-sequencer" && (
            <div>
              <dt>Filing status</dt>
              <dd>{p.joint ? "Married jointly" : "Single"}</dd>
            </div>
          )}
        </dl>
      </section>
      <div className="rl-bottom">
        <p>Understand the assumptions before using the result.</p>
        <Link href="/retirement-lab/methodology">
          Read the methodology <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </>
  );
}
