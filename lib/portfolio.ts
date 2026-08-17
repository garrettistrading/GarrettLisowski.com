export type VisualType = "trend" | "relative-strength" | "modeling";

export type Project = {
  slug: string;
  name: string;
  type: string;
  summary: string;
  role: string;
  tools: string[];
  outcome: string;
  visual: VisualType;
  proofPoints: string[];
  challenge: string;
  goal: string;
  responsibilities: string[];
  process: Array<{ title: string; body: string }>;
  decisions: string[];
  lessons: string;
  disclaimer?: string;
};

export type Experience = {
  period: string;
  role: string;
  organization: string;
  location: string;
  summary: string;
  evidence: string[];
};

export const profile = {
  name: "Garrett Lisowski",
  title: "Financial analyst",
  email: "Garrett@GarrettLisowski.com",
  location: "Winter Park, Florida",
};

export const projects: Project[] = [
  {
    slug: "market-trend-probability-indicator",
    name: "Market Trend Probability Indicator",
    type: "Market research framework",
    summary:
      "A multi-signal market research framework designed to synthesize trend, momentum, oscillator, and macro-correlation signals into a single directional market view.",
    role: "Research design, signal framework, historical evaluation",
    tools: ["Multi-signal scoring", "Forward testing", "Correlation analysis"],
    outcome:
      "A structured research system that compresses multiple analytical inputs into a more concise market-direction view.",
    visual: "trend",
    proofPoints: ["15 research inputs", "5 signal categories", "24 dated observations"],
    challenge:
      "Trend, momentum, oscillator, and macro-correlation inputs can point in different directions. Reviewing each signal independently makes it harder to form a consistent market view.",
    goal:
      "Build a repeatable framework that organizes diverse signals, preserves market context, and makes changes easier to evaluate over time.",
    responsibilities: [
      "Built a structured indicator framework covering trend signals, moving averages, oscillators, and macro correlations.",
      "Created a scoring approach that turns multiple inputs into a concise market-direction signal.",
      "Included historical forward-testing views to evaluate how signal changes evolved over time.",
      "Used correlation analysis across assets and macro indicators to add market context.",
    ],
    process: [
      {
        title: "Structure the inputs",
        body: "Grouped indicators by analytical purpose so trend, momentum, oscillator, and macro context could be reviewed without treating every input as interchangeable.",
      },
      {
        title: "Create a scoring layer",
        body: "Organized multiple signal states into a concise directional framework designed for consistent interpretation rather than predictive certainty.",
      },
      {
        title: "Evaluate through time",
        body: "Added historical forward-testing views and cross-asset correlation analysis to inspect how the signal changed as market context evolved.",
      },
    ],
    decisions: [
      "Separate signal categories before combining them into a directional view.",
      "Use historical evaluation to study behavior, not to imply guaranteed future performance.",
      "Keep proprietary inputs and live signal states out of the public presentation.",
    ],
    lessons:
      "A useful research framework does not remove uncertainty. It makes the evidence, context, and limits of a market view easier to examine.",
    disclaimer:
      "Presented as analytical research. Live signals, proprietary inputs, and trading recommendations are intentionally omitted.",
  },
  {
    slug: "relative-strength-portfolio-research",
    name: "Relative-Strength Portfolio Research System",
    type: "Portfolio analytics methodology",
    summary:
      "A research workflow for comparing major digital assets, assessing relative strength, and organizing market signals into a structured allocation research process.",
    role: "Research methodology, comparison design, planning views",
    tools: ["Relative-strength analysis", "Beta analysis", "Market segmentation"],
    outcome:
      "A repeatable research workflow that makes complex cross-asset comparisons and portfolio-balance planning easier to interpret.",
    visual: "relative-strength",
    proofPoints: ["9 connected research views", "5 decision stages", "3 relative-strength models"],
    challenge:
      "Cross-asset research combines trend, relative strength, beta, market capitalization, and selection criteria. Without a consistent framework, comparisons become difficult to reproduce or explain.",
    goal:
      "Organize cross-asset evidence into a structured research process that supports clearer comparison and rebalance planning.",
    responsibilities: [
      "Developed comparison frameworks for relative strength across BTC, ETH, SOL, and broader market segments.",
      "Organized trend signals, beta analysis, market-cap segmentation, and selection criteria into repeatable research tools.",
      "Built clear portfolio-balance and rebalance planning views.",
      "Designed the system to make complex cross-asset comparisons easier to interpret.",
    ],
    process: [
      {
        title: "Normalize the comparison",
        body: "Created a consistent structure for reviewing relative strength across major assets and broader market segments.",
      },
      {
        title: "Add decision context",
        body: "Combined trend, beta, market-cap segmentation, and selection criteria so no single comparison determined the research view.",
      },
      {
        title: "Design the planning view",
        body: "Organized portfolio-balance and rebalance research into a format that is easier to review and communicate.",
      },
    ],
    decisions: [
      "Separate research inputs from portfolio-planning outputs.",
      "Compare multiple market segments instead of relying on a single benchmark.",
      "Show historical research states while protecting holdings, balances, and sensitive live strategy details.",
    ],
    lessons:
      "Cross-asset research becomes more useful when every comparison follows the same structure and the planning logic remains inspectable.",
    disclaimer:
      "Presented as research methodology and portfolio analytics, not personalized financial advice. Historical research states are shown; holdings, balances, and sensitive live strategy details are omitted.",
  },
  {
    slug: "financial-modeling-reporting",
    name: "Financial Modeling and Reporting",
    type: "Operating and investment analysis",
    summary:
      "Financial analysis work supporting procurement, capital planning, forecasting, and executive decision-making.",
    role: "Financial modeling, forecasting, reporting, market analysis",
    tools: ["Microsoft Excel", "Scenario analysis", "Time-series analysis"],
    outcome:
      "Decision-ready analysis spanning procurement, capital expenditure, project viability, valuation, and weekly market reporting.",
    visual: "modeling",
    proofPoints: ["Excel pricing models", "CAPEX variance reporting", "Scenario and valuation analysis"],
    challenge:
      "Procurement, capital planning, project viability, and market research each require different inputs, but leadership still needs a clear and comparable view of assumptions, variance, and risk.",
    goal:
      "Build analytical models and reporting workflows that convert operating and financial data into practical decision support.",
    responsibilities: [
      "Built Excel pricing models and automated variance reporting for global supply-chain procurement decisions at b+h Polymers.",
      "Produced actual-versus-budget reporting for capital expenditure and facility expansion initiatives.",
      "Performed forecasting and scenario analysis to assess international project viability and key return metrics.",
      "Built time-series and valuation analyses across equities, fixed income, and commodities at Tyler Cole Agency.",
      "Delivered weekly market recommendations and analytical reporting to leadership.",
    ],
    process: [
      {
        title: "Define the decision",
        body: "Started with the operating or investment question, then identified the assumptions and inputs required to answer it.",
      },
      {
        title: "Build the model",
        body: "Structured pricing, variance, forecast, scenario, time-series, or valuation logic in a format that could be reviewed and updated.",
      },
      {
        title: "Communicate the result",
        body: "Translated model outputs into reporting that made material variances, scenarios, and implications clear to leadership.",
      },
    ],
    decisions: [
      "Match the model structure to the decision rather than forcing one template across every analysis.",
      "Make assumptions and actual-versus-budget variance visible in the reporting layer.",
      "Present complex analysis in a concise format built for executive review.",
    ],
    lessons:
      "The value of a model depends on more than technical accuracy; its assumptions, outputs, and implications also need to be clear to the people making the decision.",
  },
];

export const experience: Experience[] = [
  {
    period: "Aug 2025 — Apr 2026",
    role: "Account Executive",
    organization: "Ingram Micro",
    location: "Buffalo, NY",
    summary: "Commercial account planning, forecasting, and cross-functional deal execution.",
    evidence: [
      "Managed more than 150 commercial and enterprise accounts against a $300,000 quota.",
      "Owned account planning, monthly and quarterly forecasting, and leadership reporting.",
      "Coordinated with partner managers, solution engineers, and operations teams to support deal execution and account growth.",
    ],
  },
  {
    period: "Mar 2025 — May 2025",
    role: "Account Executive",
    organization: "Odoo",
    location: "Buffalo, NY",
    summary: "Consultative SaaS discovery, pipeline development, and product demonstrations.",
    evidence: [
      "Generated $240,000 in qualified SaaS pipeline through commercial and enterprise outreach.",
      "Delivered more than 30 quarterly product demonstrations through consultative discovery.",
      "Supported onboarding and adoption by collaborating with implementation and product teams.",
    ],
  },
  {
    period: "Feb 2024 — Feb 2025",
    role: "Financial Analyst",
    organization: "b+h Polymers",
    location: "Remote",
    summary: "Procurement modeling, capital reporting, forecasting, and global market development.",
    evidence: [
      "Built Excel pricing models and automated variance reporting for global supply-chain procurement.",
      "Produced actual-versus-budget capital-expenditure reports for executive decision-making.",
      "Performed forecasting and scenario analysis for international project viability.",
      "Conducted B2B outreach across North American, European, and Asian markets, increasing qualified partner inquiries by 80%.",
      "Maintained relationships across the global plastics supply chain.",
    ],
  },
  {
    period: "Aug 2022 — Jan 2024",
    role: "Financial Analyst",
    organization: "Tyler Cole Agency",
    location: "Remote",
    summary: "Cross-asset market research, valuation analysis, and leadership reporting.",
    evidence: [
      "Produced time-series and valuation analyses across equities, fixed income, and commodities.",
      "Evaluated market trends, model outputs, and back-tested strategy results.",
      "Delivered weekly market research, positioning recommendations, and model findings.",
    ],
  },
  {
    period: "Aug 2023 — Feb 2025",
    role: "Futures Trader",
    organization: "Breakout · Contract",
    location: "Remote",
    summary: "Applied risk controls across futures, foreign exchange, and equities.",
    evidence: ["Applied risk controls, position sizing, and stop-loss protocols across futures, foreign exchange, and equities."],
  },
  {
    period: "May 2022 — Aug 2024",
    role: "Co-Founder",
    organization: "SFIN Media",
    location: "Remote",
    summary: "CRM automation and conversion workflow development.",
    evidence: ["Improved conversion rates by 30% and brand visibility by 15% through CRM automation and conversion workflows."],
  },
  {
    period: "Oct 2018 — Jan 2021",
    role: "Founder",
    organization: "Light Essentials",
    location: "Remote",
    summary: "Business operations, inventory, customer support, and financial analysis.",
    evidence: ["Managed marketing, inventory, support, and financial analysis using Salesforce and Excel."],
  },
];

export const education = {
  school: "University at Buffalo, The State University of New York",
  degree: "Bachelor of Arts in Economics",
  minor: "Minor in International Business",
  details: ["GPA: 3.78 out of 4.0", "Dean’s List for five consecutive semesters"],
};

export const leadership = {
  organization: "University at Buffalo Student Investors Network",
  role: "Investment Research Vice-President",
  evidence: [
    "Helped a simulated portfolio outperform the S&P 500 by 12% through sector analysis across more than eight industries.",
    "Delivered weekly investment-committee research across more than 100 equities using Bloomberg Terminal and FactSet.",
  ],
};

export const skillGroups = [
  {
    title: "Analysis",
    skills: ["Financial modeling", "Investment and market analysis", "Forecasting", "Financial reporting", "Data analysis", "Valuation analysis", "Time-series analysis", "Scenario analysis"],
  },
  {
    title: "Tools",
    skills: ["Microsoft Excel", "Python", "Bloomberg Terminal", "FactSet", "HubSpot", "Odoo ERP", "Salesforce"],
  },
  {
    title: "Commercial and operational",
    skills: ["CRM automation", "Pipeline forecasting", "Client discovery", "Stakeholder communication", "Process improvement"],
  },
  { title: "Languages", skills: ["English — native", "Spanish — intermediate"] },
  {
    title: "Certifications",
    skills: ["HubSpot Inbound", "HubSpot Inbound Sales", "HubSpot Frictionless Sales", "HubSpot Revenue Operations", "HubSpot Sales Hub Software", "Microsoft Excel, Pearson Certified"],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
