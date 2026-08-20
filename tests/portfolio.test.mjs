import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("featured work contains the educational hedge model and evidence-backed research systems", async () => {
  const portfolio = await read("lib/portfolio.ts");
  assert.match(portfolio, /executive-deferred-compensation-trs-hedge-model/);
  assert.match(portfolio, /I built this independently with fictional plan data and sample values/);
  assert.match(portfolio, /market-trend-probability-indicator/);
  assert.match(portfolio, /relative-strength-portfolio-research/);
  assert.doesNotMatch(portfolio, /slug: "financial-modeling-reporting"/);
  assert.doesNotMatch(portfolio, /A live review path/);
});

test("SEO routes and canonical metadata are configured", async () => {
  const [layout, robots, sitemap] = await Promise.all([
    read("app/layout.tsx"),
    read("app/robots.ts"),
    read("app/sitemap.ts"),
  ]);
  assert.match(layout, /https:\/\/www\.garrettlisowski\.com/);
  assert.match(layout, /alternates: \{ canonical: "\/" \}/);
  assert.match(robots, /sitemap\.xml/);
  assert.match(sitemap, /projects\.map/);
});

test("research data uses semantic tables and mobile navigation supports Escape", async () => {
  const [evidence, preview, navigation] = await Promise.all([
    read("components/CaseEvidence.tsx"),
    read("components/ProjectVisual.tsx"),
    read("components/Navigation.tsx"),
  ]);
  assert.match(evidence, /<table className="full-signal-table">/);
  assert.match(evidence, /<table className="trs-exposure-table">/);
  assert.match(evidence, /<th scope="col">/);
  assert.match(preview, /<table className="mtpi-preview-matrix">/);
  assert.match(navigation, /event\.key !== "Escape"/);
});
