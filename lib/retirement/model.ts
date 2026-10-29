/** Educational, deterministic models. Sources and exclusions: /retirement-lab/methodology. */
export const VERSION = "1.0-preview";
export const TAX_YEAR = 2026;
export type Inputs = Record<string, number>;
export type Tool = "savings-growth" | "social-security" | "income-sequencer";
export type Field = {
  key: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  hint?: string;
  advanced?: boolean;
};
export const defaults: Record<Tool, Inputs> = {
  "savings-growth": {
    age: 25,
    years: 40,
    balance: 1000,
    monthly: 500,
    return: 7,
    inflation: 2.5,
  },
  "social-security": {
    age: 62,
    pia: 3000,
    life: 90,
    fra: 67,
    cola: 2.5,
    discount: 4,
    spouse: 0,
    spouseAge: 62,
    spousePia: 1400,
    spouseLife: 90,
    spouseFra: 67,
  },
  "income-sequencer": {
    age: 65,
    endAge: 95,
    traditional: 800000,
    roth: 300000,
    taxable: 400000,
    basis: 250000,
    hsa: 50000,
    spend: 80000,
    medical: 6000,
    return: 5,
    inflation: 2.5,
    state: 0,
    joint: 0,
    spouseAge: 65,
    ss: 3000,
    claim: 67,
    cola: 2.5,
    pension: 0,
    conversion: 25000,
    taxGrowth: 2.5,
  },
};
export const fields: Record<Tool, Field[]> = {
  "savings-growth": [
    { key: "age", label: "Starting age", min: 18, max: 80 },
    { key: "years", label: "Years to invest", min: 1, max: 60 },
    {
      key: "balance",
      label: "Starting balance ($)",
      min: 0,
      max: 10000000,
      step: 1000,
    },
    {
      key: "monthly",
      label: "Monthly contribution ($)",
      min: 0,
      max: 100000,
      step: 100,
    },
    {
      key: "return",
      label: "Annual return (%)",
      min: -20,
      max: 20,
      step: 0.1,
      hint: "Nominal effective annual return; a scenario, not a forecast.",
    },
    { key: "inflation", label: "Inflation (%)", min: 0, max: 15, step: 0.1 },
  ],
  "social-security": [
    { key: "age", label: "Your age now", min: 62, max: 70 },
    {
      key: "pia",
      label: "Your benefit at FRA ($/month)",
      min: 0,
      max: 10000,
      step: 100,
      hint: "Use your SSA estimate in today's dollars.",
    },
    { key: "life", label: "Your assumed lifespan", min: 71, max: 110 },
    {
      key: "fra",
      label: "Your full retirement age",
      min: 66,
      max: 67,
      step: 1 / 6,
      hint: "Use the age on your SSA statement; decimals represent months.",
      advanced: true,
    },
    {
      key: "cola",
      label: "Annual COLA (%)",
      min: 0,
      max: 10,
      step: 0.1,
      advanced: true,
    },
    {
      key: "discount",
      label: "Discount rate (%)",
      min: 0,
      max: 15,
      step: 0.1,
      advanced: true,
    },
    { key: "spouseAge", label: "Spouse's age now", min: 62, max: 70 },
    {
      key: "spousePia",
      label: "Spouse's benefit at FRA ($/month)",
      min: 0,
      max: 10000,
      step: 100,
    },
    {
      key: "spouseLife",
      label: "Spouse's assumed lifespan",
      min: 71,
      max: 110,
    },
    {
      key: "spouseFra",
      label: "Spouse's full retirement age",
      min: 66,
      max: 67,
      step: 1 / 6,
      advanced: true,
    },
  ],
  "income-sequencer": [
    {
      key: "age",
      label: "Age at start of retirement",
      min: 60,
      max: 80,
      hint: "Balances and spending below are at the start of retirement in 2026.",
    },
    { key: "endAge", label: "Plan through age", min: 61, max: 105 },
    {
      key: "spend",
      label: "Annual after-tax spending ($)",
      min: 0,
      max: 1000000,
      step: 1000,
      hint: "Includes the medical spending entered below.",
    },
    {
      key: "traditional",
      label: "Traditional accounts ($)",
      min: 0,
      max: 20000000,
      step: 10000,
    },
    {
      key: "roth",
      label: "Roth accounts ($)",
      min: 0,
      max: 20000000,
      step: 10000,
    },
    {
      key: "taxable",
      label: "Brokerage balance ($)",
      min: 0,
      max: 20000000,
      step: 10000,
    },
    {
      key: "basis",
      label: "Brokerage cost basis ($)",
      min: 0,
      max: 20000000,
      step: 10000,
    },
    {
      key: "hsa",
      label: "HSA balance ($)",
      min: 0,
      max: 1000000,
      step: 1000,
      advanced: true,
    },
    {
      key: "medical",
      label: "Qualified medical spending ($/year)",
      min: 0,
      max: 100000,
      step: 500,
      advanced: true,
    },
    {
      key: "ss",
      label: "Social Security at claim ($/month)",
      min: 0,
      max: 20000,
      step: 100,
      hint: "Combined household amount in 2026 dollars; assumed constant household composition.",
    },
    {
      key: "claim",
      label: "Social Security start age",
      min: 60,
      max: 80,
      hint: "Use current age if benefits have already begun.",
    },
    {
      key: "pension",
      label: "Annual taxable pension ($)",
      min: 0,
      max: 500000,
      step: 1000,
      advanced: true,
      hint: "Fixed nominal amount; begins in the first year.",
    },
    {
      key: "conversion",
      label: "Annual conversion target ($)",
      min: 0,
      max: 500000,
      step: 1000,
      hint: "Compared with no conversions. Stops at RMD age.",
    },
    {
      key: "return",
      label: "Annual nominal return (%)",
      min: -20,
      max: 20,
      step: 0.1,
      advanced: true,
    },
    {
      key: "inflation",
      label: "Spending inflation (%)",
      min: 0,
      max: 15,
      step: 0.1,
      advanced: true,
    },
    {
      key: "cola",
      label: "Social Security COLA (%)",
      min: 0,
      max: 10,
      step: 0.1,
      advanced: true,
    },
    {
      key: "state",
      label: "Flat state tax assumption (%)",
      min: 0,
      max: 15,
      step: 0.1,
      advanced: true,
      hint: "Applied to ordinary income excluding Social Security, plus realized gains; no state deductions.",
    },
    {
      key: "taxGrowth",
      label: "Future tax bracket growth (%)",
      min: 0,
      max: 10,
      step: 0.1,
      advanced: true,
      hint: "Indexes 2026 brackets and standard deduction. Not a forecast of future law.",
    },
    {
      key: "spouseAge",
      label: "Spouse's age at start",
      min: 50,
      max: 90,
      advanced: true,
    },
  ],
};
export function validate(tool: Tool, p: Inputs): string[] {
  const errors: string[] = [];
  for (const f of fields[tool]) {
    if (tool === "social-security" && !p.spouse && f.key.startsWith("spouse"))
      continue;
    if (tool === "income-sequencer" && !p.joint && f.key === "spouseAge")
      continue;
    const value = p[f.key];
    if (!Number.isFinite(value) || value < f.min || value > f.max)
      errors.push(`${f.label} must be between ${f.min} and ${f.max}.`);
    else if (f.step === undefined && !Number.isInteger(value))
      errors.push(`${f.label} must be a whole number.`);
  }
  if (tool === "savings-growth" && p.age + p.years > 110)
    errors.push("Choose an ending age of 110 or younger.");
  if (tool === "social-security") {
    if (![0, 1].includes(p.spouse))
      errors.push("Choose a valid household type.");
    if (p.life <= p.age || (p.spouse && p.spouseLife <= p.spouseAge))
      errors.push("Lifespan must be later than current age.");
    if (
      p.spouse &&
      (p.spouseAge + p.life - p.age < p.spouseFra ||
        p.age + p.spouseLife - p.spouseAge < p.fra)
    )
      errors.push(
        "This model supports survivor scenarios only when the surviving spouse has reached full retirement age at the first death.",
      );
  }
  if (tool === "income-sequencer") {
    if (![0, 1].includes(p.joint)) errors.push("Choose a valid filing status.");
    if (p.endAge <= p.age)
      errors.push("The plan must end after retirement begins.");
    if (p.basis > p.taxable)
      errors.push(
        "This simplified model requires cost basis at or below the brokerage balance.",
      );
    if (p.medical > p.spend)
      errors.push("Medical spending must fit within total spending.");
    if (p.joint && p.spouseAge < p.age - 10)
      errors.push(
        "This model does not support spouses more than 10 years younger (a different RMD table may apply).",
      );
  }
  return errors;
}
export function requireValid(tool: Tool, p: Inputs) {
  const errors = validate(tool, p);
  if (errors.length) throw new Error(errors.join(" "));
}
export function parseScenario(tool: Tool, raw: string): Inputs {
  if (raw.length > 10000) throw new Error("Scenario is too large.");
  const data = JSON.parse(raw);
  if (
    data.version !== VERSION ||
    data.tool !== tool ||
    !data.inputs ||
    typeof data.inputs !== "object"
  )
    throw new Error("This scenario is for a different tool or model version.");
  const p = { ...defaults[tool] };
  for (const key of Object.keys(p)) {
    if (typeof data.inputs[key] !== "number")
      throw new Error("Scenario has missing or invalid inputs.");
    p[key] = data.inputs[key];
  }
  requireValid(tool, p);
  return p;
}
export function serializeScenario(tool: Tool, inputs: Inputs) {
  requireValid(tool, inputs);
  return JSON.stringify({ version: VERSION, tool, inputs });
}
export function savings(p: Inputs, delay = 0) {
  requireValid("savings-growth", p);
  const rate = Math.pow(1 + p.return / 100, 1 / 12) - 1;
  let balance = p.balance,
    contributions = p.balance;
  const rows = [{ age: p.age, balance, real: balance, contributions }];
  // Starting assets stay invested; only new contributions are delayed.
  for (let month = 1; month <= p.years * 12; month++) {
    const payment = month > delay * 12 ? p.monthly : 0;
    balance = balance * (1 + rate) + payment;
    contributions += payment;
    if (month % 12 === 0)
      rows.push({
        age: p.age + month / 12,
        balance,
        real: balance / Math.pow(1 + p.inflation / 100, month / 12),
        contributions,
      });
  }
  return { rows, final: rows[rows.length - 1] };
}
export function claimFactor(claim: number, fra: number) {
  const early = Math.max(0, Math.round((fra - claim) * 12));
  return early
    ? 1 - (Math.min(36, early) * 5) / 900 - (Math.max(0, early - 36) * 5) / 1200
    : 1 + Math.max(0, Math.min(70, claim) - fra) * 0.08;
}
function spouseFactor(claim: number, fra: number) {
  const early = Math.max(0, Math.round((fra - claim) * 12));
  return (
    1 - (Math.min(36, early) * 25) / 3600 - (Math.max(0, early - 36) * 5) / 1200
  );
}
export function socialScenario(p: Inputs, claim: number, spouseClaim: number) {
  const years = Math.max(
    p.life - p.age,
    p.spouse ? p.spouseLife - p.spouseAge : 0,
  );
  const own = p.pia * claimFactor(claim, p.fra);
  const partner = p.spousePia * claimFactor(spouseClaim, p.spouseFra);
  const ownSpousalStart = Math.max(claim, p.age + spouseClaim - p.spouseAge);
  const partnerSpousalStart = Math.max(
    spouseClaim,
    p.spouseAge + claim - p.age,
  );
  let lifetime = 0,
    npv = 0;
  const rows = [];
  for (let y = 0; y < years; y++) {
    const a = p.age + y,
      b = p.spouseAge + y,
      alive = a < p.life,
      partnerAlive = !!p.spouse && b < p.spouseLife;
    let benefitA = alive && a >= claim ? own : 0;
    let benefitB = partnerAlive && b >= spouseClaim ? partner : 0;
    if (alive && partnerAlive) {
      if (a >= ownSpousalStart)
        benefitA +=
          Math.max(0, p.spousePia / 2 - p.pia) *
          spouseFactor(ownSpousalStart, p.fra);
      if (b >= partnerSpousalStart)
        benefitB +=
          Math.max(0, p.pia / 2 - p.spousePia) *
          spouseFactor(partnerSpousalStart, p.spouseFra);
    } else if (p.spouse) {
      // Survivor assumed at FRA or later; early-worker survivor floor is 82.5% of PIA.
      if (alive) benefitA = Math.max(benefitA, partner, p.spousePia * 0.825);
      if (partnerAlive) benefitB = Math.max(benefitB, own, p.pia * 0.825);
    }
    const annual = (benefitA + benefitB) * 12 * Math.pow(1 + p.cola / 100, y);
    lifetime += annual;
    npv += annual / Math.pow(1 + p.discount / 100, y + 1);
    rows.push({ age: a, annual, cumulative: lifetime, npv });
  }
  return { claim, spouseClaim, lifetime, npv, monthly: own, rows };
}
export function social(p: Inputs) {
  requireValid("social-security", p);
  const candidates = [];
  for (let a = p.age; a <= 70; a++)
    for (let b = p.spouse ? p.spouseAge : 70; b <= 70; b++)
      candidates.push(socialScenario(p, a, b));
  const ranked = [...candidates].sort((a, b) => b.npv - a.npv);
  const best = ranked[0];
  const byAge = candidates.filter((c) => c.spouseClaim === best.spouseClaim);
  const early = byAge[0],
    late = byAge[byAge.length - 1];
  const cross = late.rows.find(
    (r, i) => r.cumulative > early.rows[i].cumulative + 0.01,
  );
  return { best, byAge, ranked, breakEven: cross?.age ?? null };
}
const brackets = {
  single: [12400, 50400, 105700, 201775, 256225, 640600, Infinity],
  joint: [24800, 100800, 211400, 403550, 512450, 768700, Infinity],
};
const rates = [0.1, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37];
export function ordinaryTax(taxable: number, joint = false, index = 1) {
  let tax = 0,
    lower = 0;
  brackets[joint ? "joint" : "single"].forEach((top, i) => {
    tax += Math.max(0, Math.min(taxable, top * index) - lower) * rates[i];
    lower = top * index;
  });
  return tax;
}
export function taxEstimate(
  ordinary: number,
  gains: number,
  ss: number,
  p: Inputs,
  year: number,
) {
  const joint = !!p.joint,
    index = Math.pow(1 + p.taxGrowth / 100, year),
    age = p.age + year;
  const provisional = ordinary + gains + ss / 2,
    low = joint ? 32000 : 25000,
    high = joint ? 44000 : 34000;
  const ssTaxable =
    provisional <= low
      ? 0
      : provisional <= high
        ? Math.min(ss / 2, (provisional - low) / 2)
        : Math.min(
            ss * 0.85,
            0.85 * (provisional - high) + Math.min(ss / 2, (high - low) / 2),
          );
  // Base + age-related standard deduction. Temporary senior deduction is excluded, disclosed in UI.
  const aged =
    Number(age >= 65) + (joint ? Number(p.spouseAge + year >= 65) : 0);
  const deduction =
    ((joint ? 32200 : 16100) + aged * (joint ? 1650 : 2050)) * index;
  const taxableOrd = Math.max(0, ordinary + ssTaxable - deduction);
  const taxableGains = Math.max(
    0,
    gains - Math.max(0, deduction - ordinary - ssTaxable),
  );
  const zero = (joint ? 98900 : 49450) * index,
    fifteen = (joint ? 613700 : 545500) * index;
  const atZero = Math.min(taxableGains, Math.max(0, zero - taxableOrd));
  const at15 = Math.min(
    taxableGains - atZero,
    Math.max(0, fifteen - Math.max(zero, taxableOrd)),
  );
  return (
    ordinaryTax(taxableOrd, joint, index) +
    at15 * 0.15 +
    (taxableGains - atZero - at15) * 0.2 +
    ((ordinary + gains) * p.state) / 100
  );
}
const divisors = [
  27.4, 26.5, 25.5, 24.6, 23.7, 22.9, 22, 21.1, 20.2, 19.4, 18.5, 17.7, 16.8,
  16, 15.2, 14.4, 13.7, 12.9, 12.2, 11.5, 10.8, 10.1, 9.5, 8.9, 8.4, 7.8, 7.3,
  6.8, 6.4, 6, 5.6, 5.2, 4.9, 4.6,
];
export function rmdAge(birthYear: number) {
  return birthYear >= 1960 ? 75 : birthYear >= 1951 ? 73 : 72;
}
export function income(p: Inputs, conversions = false) {
  requireValid("income-sequencer", p);
  let trad = p.traditional,
    roth = p.roth,
    taxable = p.taxable,
    basis = p.basis,
    hsa = p.hsa;
  let totalTax = 0,
    totalShortfall = 0,
    firstShortfall: number | null = null;
  const rmdStart = rmdAge(TAX_YEAR - p.age),
    rows = [];
  for (let y = 0; y <= p.endAge - p.age; y++) {
    const age = p.age + y,
      index = Math.pow(1 + p.inflation / 100, y),
      need = p.spend * index;
    const opening = trad + roth + taxable + hsa;
    const ss = age >= p.claim ? p.ss * 12 * Math.pow(1 + p.cola / 100, y) : 0;
    const medical = Math.min(hsa, p.medical * index);
    hsa -= medical;
    const rmd = age >= rmdStart ? trad / divisors[age - 72] : 0;
    trad -= rmd;
    const conversion =
      conversions && age < rmdStart ? Math.min(trad, p.conversion) : 0;
    trad -= conversion;
    roth += conversion;
    let tradW = rmd,
      rothW = 0,
      taxableW = 0,
      gains = 0;
    const tax = () =>
      taxEstimate(p.pension + tradW + conversion, gains, ss, p, y);
    const cash = () => ss + p.pension + medical + tradW + rothW + taxableW;
    // Fund both spending and the tax on withdrawals, including conversions.
    for (let pass = 0; pass < 120; pass++) {
      const gap = need + tax() - cash();
      if (gap < 0.00001) break;
      if (taxable > 0.000001) {
        const draw = Math.min(taxable, gap),
          cost = draw * Math.min(1, basis / taxable);
        taxable -= draw;
        basis -= cost;
        gains += draw - cost;
        taxableW += draw;
      } else if (trad > 0.000001) {
        const draw = Math.min(trad, gap);
        trad -= draw;
        tradW += draw;
      } else if (roth > 0.000001) {
        const draw = Math.min(roth, gap);
        roth -= draw;
        rothW += draw;
      } else break;
    }
    const taxes = tax(),
      surplus = Math.max(0, cash() - taxes - need),
      shortfall = Math.max(0, need + taxes - cash());
    taxable += surplus;
    basis += surplus;
    if (shortfall > 0.01 && firstShortfall === null) firstShortfall = age;
    totalTax += taxes;
    totalShortfall += shortfall;
    const beforeGrowth = trad + roth + taxable + hsa,
      growth = (beforeGrowth * p.return) / 100;
    trad *= 1 + p.return / 100;
    roth *= 1 + p.return / 100;
    taxable *= 1 + p.return / 100;
    hsa *= 1 + p.return / 100;
    rows.push({
      age,
      year: TAX_YEAR + y,
      opening,
      need,
      ss,
      pension: p.pension,
      medical,
      trad: tradW,
      roth: rothW,
      taxable: taxableW,
      conversion,
      rmd,
      tax: taxes,
      shortfall,
      surplus,
      growth,
      balance: trad + roth + taxable + hsa,
      traditionalBalance: trad,
      rothBalance: roth,
      taxableBalance: taxable,
      hsaBalance: hsa,
    });
  }
  return {
    rows,
    totalTax,
    totalShortfall,
    firstShortfall,
    final: rows[rows.length - 1].balance,
    rmdStart,
  };
}
