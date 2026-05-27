/**
 * Marketing ROI Calculator
 * Swift Tech Co. — https://swifttechco.com
 */

const CHANNELS = [
  "SEO (Search Engine Optimisation)",
  "PPC / Google Ads",
  "Facebook & Instagram Ads",
  "LinkedIn Ads",
  "Email Marketing",
  "Content Marketing",
  "Social Media Management",
  "Video Marketing",
];

const CONVERSION_RATES = {
  "SEO (Search Engine Optimisation)": 0.032,
  "PPC / Google Ads":                 0.028,
  "Facebook & Instagram Ads":         0.018,
  "LinkedIn Ads":                     0.022,
  "Email Marketing":                  0.045,
  "Content Marketing":                0.025,
  "Social Media Management":          0.012,
  "Video Marketing":                  0.020,
};

const INDUSTRIES = [
  "Technology / SaaS",
  "E-Commerce / Retail",
  "Financial Services",
  "Healthcare",
  "Real Estate",
  "Professional Services",
  "Education",
  "Manufacturing",
];

const CPA_MODIFIERS = {
  "Technology / SaaS":      1.4,
  "E-Commerce / Retail":    0.8,
  "Financial Services":     2.1,
  "Healthcare":             1.6,
  "Real Estate":            1.8,
  "Professional Services":  1.5,
  "Education":              1.0,
  "Manufacturing":          1.3,
};

const GOALS = [
  "Generate leads",
  "Drive online sales",
  "Build brand awareness",
  "Grow social following",
  "Increase website traffic",
];

/**
 * @param {string} channel
 * @param {string} industry
 * @param {number} monthlyBudget
 * @param {string} goal
 * @returns {{ clicks: number, leads: number, cpl: number, roi12moPct: number }}
 */
function calculate(channel, industry, monthlyBudget, goal) {
  if (!CONVERSION_RATES[channel]) throw new Error(`Unknown channel: ${channel}`);
  if (!CPA_MODIFIERS[industry])   throw new Error(`Unknown industry: ${industry}`);
  if (!GOALS.includes(goal))      throw new Error(`Unknown goal: ${goal}`);
  if (monthlyBudget <= 0)         throw new Error("monthlyBudget must be > 0");

  const cvr    = CONVERSION_RATES[channel];
  const cmod   = CPA_MODIFIERS[industry];
  const clicks = Math.round(monthlyBudget / (cmod * 2.5));
  const leads  = Math.round(clicks * cvr);
  const cpl    = leads > 0 ? Math.round(monthlyBudget / leads) : 0;
  const roi12  = Math.round(((leads * 12 * cmod * 85) - monthlyBudget * 12) / (monthlyBudget * 12) * 100);

  return { clicks, leads, cpl, roi12moPct: Math.max(roi12, -20) };
}

module.exports = { CHANNELS, INDUSTRIES, GOALS, CONVERSION_RATES, CPA_MODIFIERS, calculate };
