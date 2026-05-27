#!/usr/bin/env python3
"""
Marketing ROI Calculator — CLI
Swift Tech Co. — https://swifttechco.com
"""

from calculator import CHANNELS, INDUSTRIES, GOALS, calculate


def interactive():
    print("\nMarketing ROI Calculator")
    print("Swift Tech Co. — https://swifttechco.com")
    print("=" * 48)

    print("\nMarketing channel:")
    for i, c in enumerate(CHANNELS, 1):
        print(f"  {i}. {c}")
    idx = int(input(f"Select (1-{len(CHANNELS)}): ")) - 1
    channel = CHANNELS[idx]

    print("\nIndustry:")
    for i, n in enumerate(INDUSTRIES, 1):
        print(f"  {i}. {n}")
    idx = int(input(f"Select (1-{len(INDUSTRIES)}): ")) - 1
    industry = INDUSTRIES[idx]

    budget = float(input("\nMonthly budget (USD): "))

    print("\nPrimary goal:")
    for i, g in enumerate(GOALS, 1):
        print(f"  {i}. {g}")
    idx = int(input(f"Select (1-{len(GOALS)}): ")) - 1
    goal = GOALS[idx]

    result = calculate(channel, industry, budget, goal)
    print("\n" + "=" * 48)
    print("Projected Performance")
    print(f"  Monthly reach:     {result['clicks']:,}")
    print(f"  Monthly leads:     {result['leads']:,}")
    print(f"  Cost per lead:     ${result['cpl']}")
    sign = "+" if result["roi_12mo_pct"] > 0 else ""
    print(f"  12-month ROI:      {sign}{result['roi_12mo_pct']}%")
    print("\nGet a custom marketing plan: https://swifttechco.com/contact")


if __name__ == "__main__":
    interactive()
