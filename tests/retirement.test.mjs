import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
const compiled = ts.transpileModule(
  readFileSync(new URL("../lib/retirement/model.ts", import.meta.url), "utf8"),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  },
).outputText;
const mod = { exports: {} };
new Function("module", "exports", compiled)(mod, mod.exports);
const m = mod.exports;
const near = (a, b, tolerance = 0.01) =>
  assert.ok(Math.abs(a - b) < tolerance, `${a} != ${b}`);
test("zero return savings equal contributions; delay excludes only future deposits", () => {
  const p = {
    ...m.defaults["savings-growth"],
    balance: 1000,
    monthly: 100,
    return: 0,
    years: 10,
  };
  near(m.savings(p).final.balance, 13000);
  near(m.savings(p, 5).final.balance, 7000);
  near(m.savings(p, 10).final.balance, 1000);
});
test("effective annual compounding and inflation reconcile analytically", () => {
  const p = {
    ...m.defaults["savings-growth"],
    balance: 1000,
    monthly: 0,
    return: 10,
    inflation: 10,
    years: 2,
  };
  near(m.savings(p).final.balance, 1210);
  near(m.savings(p).final.real, 1000);
});
test("SSA published worker factors at FRA 67: 62 = 70%, 67 = 100%, 70 = 124%", () => {
  near(m.claimFactor(62, 67), 0.7);
  near(m.claimFactor(67, 67), 1);
  near(m.claimFactor(70, 67), 1.24);
  near(m.claimFactor(75, 67), 1.24);
});
test("unclaimed spouse supplement waits for worker and does not replace a reduced own benefit", () => {
  const p = {
    ...m.defaults["social-security"],
    spouse: 1,
    pia: 3000,
    spousePia: 1000,
    cola: 0,
  };
  const r = m.socialScenario(p, 70, 62);
  near(r.rows[0].annual, 700 * 12);
  near(r.rows[8].annual, (3720 + 700 + 500) * 12);
});
test("survivor receives one higher benefit, not both retired-worker checks", () => {
  const p = {
    ...m.defaults["social-security"],
    spouse: 1,
    pia: 3000,
    spousePia: 1000,
    life: 75,
    spouseLife: 85,
    cola: 0,
  };
  near(m.socialScenario(p, 70, 67).rows[13].annual, 3720 * 12);
});
test("no retroactive claim ages and all whole-year combinations considered", () => {
  const p = {
    ...m.defaults["social-security"],
    age: 66,
    spouse: 1,
    spouseAge: 67,
  };
  const r = m.social(p);
  assert.equal(r.ranked.length, 20);
  assert.ok(r.ranked.every((x) => x.claim >= 66 && x.spouseClaim >= 67));
});
test("2026 ordinary bracket calculations match IRS examples", () => {
  near(m.ordinaryTax(12400), 1240);
  near(m.ordinaryTax(50400), 5800);
  near(m.ordinaryTax(105700), 17966);
  near(m.ordinaryTax(100800, true), 11600);
  near(m.ordinaryTax(211400, true), 35932);
});
test("capital gains stack above ordinary income with unused deduction applied", () => {
  const p = { ...m.defaults["income-sequencer"], age: 60, state: 0, joint: 0 };
  near(m.taxEstimate(16100, 49450, 0, p, 0), 0);
  near(m.taxEstimate(16100, 59450, 0, p, 0), 1500);
  near(m.taxEstimate(0, 65550, 0, p, 0), 0);
});
test("RMD ages and prior-year divisor are respected", () => {
  assert.equal(m.rmdAge(1960), 75);
  assert.equal(m.rmdAge(1959), 73);
  const p = {
    ...m.defaults["income-sequencer"],
    age: 73,
    endAge: 74,
    traditional: 265000,
    roth: 0,
    taxable: 0,
    basis: 0,
    hsa: 0,
    spend: 0,
    medical: 0,
    ss: 0,
    pension: 0,
    return: 0,
  };
  near(m.income(p).rows[0].rmd, 10000);
});
test("tax gross-up pays after-tax spending and annual balance conservation holds", () => {
  for (const returnRate of [-10, 0, 5])
    for (const joint of [0, 1])
      for (const conversions of [false, true]) {
        const r = m.income(
          { ...m.defaults["income-sequencer"], return: returnRate, joint },
          conversions,
        );
        for (const row of r.rows) {
          const withdrawals = row.trad + row.roth + row.taxable + row.medical;
          near(
            row.opening - withdrawals + row.surplus + row.growth,
            row.balance,
          );
          near(
            withdrawals + row.ss + row.pension + row.shortfall,
            row.need + row.tax + row.surplus,
          );
          assert.ok(
            row.traditionalBalance >= 0 &&
              row.rothBalance >= 0 &&
              row.taxableBalance >= 0 &&
              row.hsaBalance >= 0,
          );
          assert.ok(row.conversion === 0 || row.age < r.rmdStart);
        }
      }
});
test("insufficient funds generate a shortfall and HSA is reserved for medical spending", () => {
  const p = {
    ...m.defaults["income-sequencer"],
    traditional: 0,
    roth: 0,
    taxable: 0,
    basis: 0,
    hsa: 100000,
    medical: 0,
    ss: 0,
    spend: 50000,
  };
  const r = m.income(p);
  assert.equal(r.firstShortfall, p.age);
  near(r.rows[0].shortfall, 50000);
  assert.ok(r.final > 0);
});
test("tax increases from conversions are not clamped to zero", () => {
  const p = {
    ...m.defaults["income-sequencer"],
    age: 65,
    endAge: 66,
    spend: 0,
    medical: 0,
    ss: 0,
    pension: 0,
    conversion: 100000,
  };
  assert.ok(m.income(p).totalTax - m.income(p, true).totalTax < 0);
});
test("invalid and non-finite inputs are rejected before simulation", () => {
  assert.throws(() =>
    m.savings({ ...m.defaults["savings-growth"], monthly: NaN }),
  );
  assert.throws(() =>
    m.income({ ...m.defaults["income-sequencer"], basis: 900000 }),
  );
  assert.throws(() =>
    m.income({ ...m.defaults["income-sequencer"], endAge: 60 }),
  );
  assert.throws(() =>
    m.social({ ...m.defaults["social-security"], spouse: 2 }),
  );
});
test("versioned scenarios round-trip; malformed or wrong-tool links fail", () => {
  const p = m.defaults["savings-growth"];
  near(
    m.parseScenario("savings-growth", m.serializeScenario("savings-growth", p))
      .monthly,
    p.monthly,
  );
  assert.throws(() =>
    m.parseScenario(
      "social-security",
      m.serializeScenario("savings-growth", p),
    ),
  );
  assert.throws(() => m.parseScenario("savings-growth", "{}"));
  assert.throws(() =>
    m.parseScenario(
      "savings-growth",
      JSON.stringify({
        version: m.VERSION,
        tool: "savings-growth",
        inputs: { ...p, years: 10000000 },
      }),
    ),
  );
});
