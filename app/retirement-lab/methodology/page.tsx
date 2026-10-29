import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Methodology | Retirement Lab",
  description:
    "Calculation methods, primary sources, limitations, and privacy for Retirement Lab.",
  alternates: { canonical: "/retirement-lab/methodology" },
};
export default function Page() {
  return (
    <article className="rl-prose">
      <header className="rl-hero">
        <p className="rl-eyebrow">Methods &amp; assumptions</p>
        <h1>
          Know what is inside
          <br />
          the number.
        </h1>
        <p>
          These are deterministic educational models. They help explore
          tradeoffs, not predict a specific outcome.
        </p>
      </header>
      <section>
        <h2>Model scope</h2>
        <p>
          Model 1.0-preview. Sources reviewed October 29, 2026. Dollar values
          are unrounded during calculation and rounded for display. Results are
          estimates; SSA or a tax professional should verify decisions that
          depend on benefits or tax rules.
        </p>
        <p>
          The concept was inspired by{" "}
          <a href="https://retirement-architect.vercel.app/">
            Retirement Architect by Logan Lisowski
          </a>
          . This is an independent implementation with original code and
          presentation.
        </p>
      </section>
      <section id="savings">
        <h2>Savings growth</h2>
        <p>
          The annual return is an effective nominal rate. Monthly rate = (1 +
          annual return)^(1/12) − 1. Contributions arrive at month-end. Each
          year-end balance is divided by (1 + inflation)^years to show today’s
          purchasing power.
        </p>
        <p>
          Delayed scenarios keep the initial balance invested from day one and
          delay only new contributions. Contributions stay constant in nominal
          dollars. No fees, taxes, contribution limits, or volatility are
          modeled. Negative returns are supported; returns are assumptions
          rather than historical forecasts.
        </p>
      </section>
      <section id="social-security">
        <h2>Social Security</h2>
        <p>
          Eligible starting ages are 62–70. The model assumes neither person has
          already claimed. It searches whole-year claiming ages from each
          person’s current age through 70. Full retirement age is entered from
          the SSA statement and can include fractional years. The 8% annual
          delayed-credit rule applies to the supported birth cohorts.
        </p>
        <ul>
          <li>
            Own benefits use SSA’s monthly early-claim reduction and delayed
            credits capped at 70. Spousal supplements are the positive excess of
            half a partner’s PIA over one’s own PIA, reduced for early spousal
            entitlement. A supplement begins only after both partners have
            filed.
          </li>
          <li>
            Survivors receive the higher of their own benefit and the modeled
            survivor benefit. The deceased early claimant’s benefit has an
            82.5%-of-PIA survivor floor. Survivor scenarios before the
            survivor’s full retirement age are rejected; they need a more
            detailed model.
          </li>
          <li>
            Annual COLA compounds from the current year, including before
            claiming. Benefits are aggregated into annual periods. Death occurs
            at the entered lifespan birthday; no payment is made in the year
            starting at that age.
          </li>
          <li>
            NPV discounts each year’s cash flow at year-end to the current year.
            The leading scenario maximizes household NPV among the supported
            claim combinations. Break-even compares undiscounted cumulative
            benefits, holding the spouse’s selected claim age fixed.
          </li>
        </ul>
        <p>
          Excludes earnings tests, disability, divorce, dependent benefits,
          monthly payment timing, benefit taxation, and changes in work records.
          Lifespans are scenario inputs, not life expectancy estimates.
        </p>
        <p>
          Sources:{" "}
          <a href="https://www.ssa.gov/oact/quickcalc/early_late.html">
            SSA early and delayed retirement
          </a>
          ,{" "}
          <a href="https://www.ssa.gov/oact/quickcalc/spouse.html">
            SSA spousal benefits
          </a>
          , and{" "}
          <a href="https://secure.ssa.gov/poms.nsf/lnx/0300615320">
            SSA widow(er)’s benefit limitations
          </a>
          .
        </p>
      </section>
      <section id="income">
        <h2>Retirement income</h2>
        <p>
          The first retirement year is 2026. Enter account balances and
          after-tax annual spending as of its start. Both strategies take RMDs,
          use HSA funds for qualified medical costs, and draw from brokerage,
          Traditional, then Roth accounts. The conversion strategy moves up to
          the selected dollar amount from Traditional to Roth each year before
          RMD age; it does not optimize a tax bracket.
        </p>
        <p>
          Account ownership is simplified: all Traditional assets use the
          primary person’s RMD schedule. RMDs use opening balances and the IRS
          Uniform Lifetime Table. RMD age is derived from 2026 minus starting
          age. A birth-date-specific boundary decision should be checked
          separately. No inherited accounts or joint-life RMD tables are
          modeled.
        </p>
        <ul>
          <li>
            Taxes are recalculated as extra withdrawals fund the tax bill. Any
            excess cash is reinvested in brokerage at full cost basis. Unfunded
            spending and taxes are explicitly tracked.
          </li>
          <li>
            Conversions transfer value between accounts; they do not create cash
            for spending. Conversion taxes are funded from the same withdrawal
            sequence. Roth withdrawals are assumed qualified, including
            applicable five-year rules.
          </li>
          <li>
            All accounts receive the same constant return after annual cash
            flows. Brokerage cost basis is allocated proportionately on sale.
            Loss deductions, dividends, and annual tax drag on unsold
            investments are excluded. HSA assets remain reserved for medical
            costs even if general spending runs short.
          </li>
          <li>
            Social Security input is a household amount in 2026 dollars, growing
            with the entered COLA and starting at the entered primary age.
            Pension income is constant in nominal dollars. Household composition
            and filing status remain unchanged throughout this projection.
          </li>
        </ul>
        <p>
          Federal tax estimates use 2026 ordinary income brackets, base and
          age-related standard deductions, capital-gains brackets stacked above
          ordinary taxable income, and the provisional-income formula for
          taxable Social Security. Future brackets and deductions grow at the
          entered assumption; Social Security taxation thresholds remain fixed.
          The state estimate is a flat rate on ordinary income excluding Social
          Security, plus gains.
        </p>
        <p>
          Excludes the temporary additional senior deduction, itemized
          deductions, credits, NIIT, Medicare premiums and IRMAA, state-specific
          exemptions, estate tax, early withdrawal penalties, and future law
          changes. Filing status is limited to single and married jointly. The
          result is a simplified comparison, not a tax return or a globally
          optimal plan.
        </p>
        <p>
          Ending wealth is the sum of account balances before any future
          liquidation taxes. Lower lifetime tax does not necessarily mean a
          better plan, especially if one strategy runs out of money earlier.
        </p>
        <p>
          Sources:{" "}
          <a href="https://www.irs.gov/pub/irs-drop/rp-25-32.pdf">
            IRS Revenue Procedure 2025-32 (2026 tax framework)
          </a>
          ,{" "}
          <a href="https://www.irs.gov/publications/p590b">
            IRS Publication 590-B (RMD tables)
          </a>
          , and{" "}
          <a href="https://www.irs.gov/publications/p915">
            IRS Publication 915 (Social Security taxation)
          </a>
          .
        </p>
      </section>
      <section id="privacy">
        <h2>Your scenarios</h2>
        <p>
          Calculations run in the browser. Inputs are not sent to an application
          API. Save stores one scenario per tool in this browser’s local
          storage; it is not encrypted and can be deleted using the Delete saved
          button. Ordinary web hosting may still collect access logs.
        </p>
        <p>
          Sharing is optional. A scenario link encodes all inputs in its URL
          fragment. Fragments are not part of the HTTP request, but anyone with
          the full link can read the inputs, and browser history, clipboard
          software, extensions, or screenshots may retain them. Do not put
          identifying information in a shared scenario.
        </p>
        <p>
          Printed reports include assumptions and model version. Use the
          browser’s print dialog to save a PDF.
        </p>
      </section>
    </article>
  );
}
