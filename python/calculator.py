"""
Marketing ROI Calculator
Swift Tech Co. — https://swifttechco.com

Estimates monthly reach, leads, cost per lead, and 12-month ROI for marketing campaigns
based on channel, industry, monthly budget, and primary goal.
"""

CHANNELS = [
    "SEO (Search Engine Optimisation)",
    "PPC / Google Ads",
    "Facebook & Instagram Ads",
    "LinkedIn Ads",
    "Email Marketing",
    "Content Marketing",
    "Social Media Management",
    "Video Marketing",
]

CONVERSION_RATES = {
    "SEO (Search Engine Optimisation)": 0.032,
    "PPC / Google Ads":                 0.028,
    "Facebook & Instagram Ads":         0.018,
    "LinkedIn Ads":                     0.022,
    "Email Marketing":                  0.045,
    "Content Marketing":                0.025,
    "Social Media Management":          0.012,
    "Video Marketing":                  0.020,
}

INDUSTRIES = [
    "Technology / SaaS",
    "E-Commerce / Retail",
    "Financial Services",
    "Healthcare",
    "Real Estate",
    "Professional Services",
    "Education",
    "Manufacturing",
]

CPA_MODIFIERS = {
    "Technology / SaaS":      1.4,
    "E-Commerce / Retail":    0.8,
    "Financial Services":     2.1,
    "Healthcare":             1.6,
    "Real Estate":            1.8,
    "Professional Services":  1.5,
    "Education":              1.0,
    "Manufacturing":          1.3,
}

GOALS = [
    "Generate leads",
    "Drive online sales",
    "Build brand awareness",
    "Grow social following",
    "Increase website traffic",
]


def calculate(channel: str, industry: str, monthly_budget: float, goal: str) -> dict:
    """
    Returns projected monthly reach, leads, CPL, and 12-month ROI.

    Args:
        channel: One of CHANNELS.
        industry: One of INDUSTRIES.
        monthly_budget: Monthly spend in USD (must be > 0).
        goal: One of GOALS.

    Returns:
        dict with keys: clicks, leads, cpl, roi_12mo_pct
    """
    if channel not in CONVERSION_RATES:
        raise ValueError(f"Unknown channel: {channel}")
    if industry not in CPA_MODIFIERS:
        raise ValueError(f"Unknown industry: {industry}")
    if goal not in GOALS:
        raise ValueError(f"Unknown goal: {goal}")
    if monthly_budget <= 0:
        raise ValueError("monthly_budget must be greater than 0")

    cvr  = CONVERSION_RATES[channel]
    cmod = CPA_MODIFIERS[industry]
    clicks = round(monthly_budget / (cmod * 2.5))
    leads  = round(clicks * cvr)
    cpl    = round(monthly_budget / leads) if leads > 0 else 0
    roi_12 = round(((leads * 12 * cmod * 85) - monthly_budget * 12) / (monthly_budget * 12) * 100)

    return {
        "clicks":      clicks,
        "leads":       leads,
        "cpl":         cpl,
        "roi_12mo_pct": max(roi_12, -20),
    }
