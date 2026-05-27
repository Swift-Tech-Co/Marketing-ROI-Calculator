#!/usr/bin/env node
/**
 * Marketing ROI Calculator — CLI
 * Swift Tech Co. — https://swifttechco.com
 */

const { CHANNELS, INDUSTRIES, GOALS, calculate } = require("./calculator");
const readline = require("readline");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(r => rl.question(q, r));

async function interactive() {
  console.log("\nMarketing ROI Calculator");
  console.log("Swift Tech Co. — https://swifttechco.com");
  console.log("=".repeat(48));

  console.log("\nMarketing channel:");
  CHANNELS.forEach((c, i) => console.log(`  ${i + 1}. ${c}`));
  const cIdx = parseInt(await ask(`Select (1-${CHANNELS.length}): `), 10) - 1;

  console.log("\nIndustry:");
  INDUSTRIES.forEach((n, i) => console.log(`  ${i + 1}. ${n}`));
  const iIdx = parseInt(await ask(`Select (1-${INDUSTRIES.length}): `), 10) - 1;

  const budget = parseFloat(await ask("\nMonthly budget (USD): "));

  console.log("\nPrimary goal:");
  GOALS.forEach((g, i) => console.log(`  ${i + 1}. ${g}`));
  const gIdx = parseInt(await ask(`Select (1-${GOALS.length}): `), 10) - 1;

  rl.close();

  const result = calculate(CHANNELS[cIdx], INDUSTRIES[iIdx], budget, GOALS[gIdx]);
  console.log("\n" + "=".repeat(48));
  console.log("Projected Performance");
  console.log(`  Monthly reach:  ${result.clicks.toLocaleString()}`);
  console.log(`  Monthly leads:  ${result.leads.toLocaleString()}`);
  console.log(`  Cost per lead:  $${result.cpl}`);
  const sign = result.roi12moPct > 0 ? "+" : "";
  console.log(`  12-month ROI:   ${sign}${result.roi12moPct}%`);
  console.log("\nGet a custom marketing plan: https://swifttechco.com/contact");
}

interactive().catch(e => { console.error(e.message); process.exit(1); });
