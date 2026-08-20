export type VisualType = "deferred-comp" | "trend" | "relative-strength";

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
    slug: "executive-deferred-compensation-trs-hedge-model",
    name: "Executive Deferred Compensation TRS Hedge Model",
    type: "Independent educational model",
    summary:
      "I built this fictional model around one question: how could a company keep a changing deferred-compensation liability and its hedge aligned?",
    role: "Model design, settlement logic, and monthly controls",
    tools: ["Excel-style model design", "ETF proxy analysis", "Settlement checks"],
    outcome:
      "By the end, I could follow every handoff from plan balances to the trade order and settlement check.",
    visual: "deferred-comp",
    proofPoints: ["Fictional plan data", "4 ETF proxies", "4 control checks"],
    challenge:
      "Participant elections keep changing the liability. At the same time, the hedge has its own return, financing cost, and settlement terms. I wanted to see those moving parts in one place.",
    goal:
      "Every output needed to trace back to an input, and every exception needed a clear place to be reviewed.",
    responsibilities: [
      "I set up fictional participant balances, elections, contributions, distributions, and total exposure by plan option.",
      "I matched the fictional plan options to public ETF proxies and compared correlation, tracking error, fees, liquidity, and distributions.",
      "I calculated target notional, reweighting orders, the return leg, financing expense, and a simplified settlement.",
      "I added checks for allocations, prices, mappings, settlement differences, and reviewer sign-off.",
    ],
    process: [
      {
        title: "Aggregate the liability",
        body: "I rolled participant elections and plan activity into one exposure total for each plan option.",
      },
      {
        title: "Map and reweight",
        body: "I compared ETF proxies, applied the hedge ratio, and calculated the order needed to bring the swap back to target.",
      },
      {
        title: "Settle and control",
        body: "I separated return from financing, estimated the settlement, and added checks for anything that fell outside tolerance.",
      },
    ],
    decisions: [
      "I kept every plan balance fictional and labeled the figures as examples.",
      "I included distributions in total return instead of looking only at price change.",
      "I kept proxy quality, hedge results, and control checks on the same monthly review.",
    ],
    lessons:
      "The formulas were the easy part. The real work was making sure another person could trace the result, find an exception, and know what to check next.",
    disclaimer:
      "I built this independently with fictional plan data and sample values. It is not an Atlas model, client example, or copy of a proprietary platform. It is also not legal, tax, accounting, or investment advice. Real swap terms depend on the governing agreement.",
  },
  {
    slug: "market-trend-probability-indicator",
    name: "Market Trend Probability Indicator",
    type: "Market research workbook",
    summary:
      "I built this workbook to answer one recurring question: when market signals disagree, what does the overall setup actually say?",
    role: "Indicator selection, scoring logic, and historical testing",
    tools: ["Multi-signal scoring", "Forward testing", "Correlation analysis"],
    outcome:
      "The finished workbook gave me one place to compare 15 inputs, see the composite reading, and check how it changed over time.",
    visual: "trend",
    proofPoints: ["15 research inputs", "5 signal categories", "24 dated observations"],
    challenge:
      "Trend, momentum, oscillators, and macro correlations rarely line up perfectly. Looking at them one by one made it too easy to give one signal more weight than it deserved.",
    goal:
      "I wanted one process I could repeat without changing the rules to fit the market view I already had.",
    responsibilities: [
      "I grouped trend signals, moving averages, oscillators, and macro correlations by what each one was meant to tell me.",
      "I created the scoring logic that rolls the individual readings into one market view.",
      "I tracked the score through time so I could see how quickly the model changed direction.",
      "I added cross-asset correlations to keep the composite reading in context.",
    ],
    process: [
      {
        title: "Structure the inputs",
        body: "I grouped the indicators by purpose so a trend signal was not treated the same way as a macro correlation.",
      },
      {
        title: "Create a scoring layer",
        body: "I converted the readings to a common scale and averaged them into a directional score.",
      },
      {
        title: "Evaluate through time",
        body: "I logged the score by date and compared it with the surrounding market and macro data.",
      },
    ],
    decisions: [
      "I separated the signal groups before combining them.",
      "I used the history to study the model's behavior, not to claim what markets would do next.",
      "I kept proprietary inputs and live readings out of the public version.",
    ],
    lessons:
      "The score only looks objective. Judgment enters when I choose the inputs and decide how to group them. The useful part was making those choices visible.",
    disclaimer:
      "This is research, not a live signal or trading recommendation. The matrix is from January 17, 2025, and the testing series runs through February 5, 2025. I left out live readings and proprietary inputs.",
  },
  {
    slug: "relative-strength-portfolio-research",
    name: "Relative-Strength Portfolio Research System",
    type: "Portfolio analytics methodology",
    summary:
      "This started with a frustration: relative-strength research gets messy when every chart asks a different question.",
    role: "Comparison logic, research screens, and allocation views",
    tools: ["Relative-strength analysis", "Beta analysis", "Market segmentation"],
    outcome:
      "The finished workbook turned several market checks into one sequence I could run the same way each time.",
    visual: "relative-strength",
    proofPoints: ["9 connected research views", "5 decision stages", "3 relative-strength models"],
    challenge:
      "Relative strength, trend, beta, and market size answer different questions. Without a fixed order, it was easy to jump from one chart to another and lose the reasoning behind a choice.",
    goal:
      "I wanted the broad market view to come first, the pairwise comparisons second, and the candidate list last.",
    responsibilities: [
      "I built relative-strength comparisons across BTC, ETH, SOL, and broader market segments.",
      "I brought trend, beta, market size, and selection criteria into the same workbook.",
      "I created the portfolio-balance and rebalance planning views.",
      "I kept each research input separate until the final candidate screen.",
    ],
    process: [
      {
        title: "Normalize the comparison",
        body: "I used the same format for every pair so I could compare the readings without changing the rules.",
      },
      {
        title: "Add decision context",
        body: "I checked trend, beta, and market size before letting a relative-strength reading influence the candidate list.",
      },
      {
        title: "Design the planning view",
        body: "I carried the research into a balance view that showed what a rebalance would change.",
      },
    ],
    decisions: [
      "I kept the research inputs separate from the proposed allocation.",
      "I compared several market segments instead of relying on one benchmark.",
      "I showed historical model states without exposing holdings, balances, or live strategy details.",
    ],
    lessons:
      "The breakthrough was not another indicator. It was asking the same questions in the same order, which made the final choice easier to explain and challenge.",
    disclaimer:
      "This is a historical research snapshot, not personal financial advice. The chart traces recreate the workbook's layout; they are not price or performance series. I left out holdings, balances, and live strategy details.",
  },
];

export const experience: Experience[] = [
  {
    period: "Aug 2025 - Apr 2026",
    role: "Account Executive",
    organization: "Ingram Micro",
    location: "Buffalo, NY",
    summary: "Managing more than 150 accounts taught me that a forecast is only as good as the conversations and follow-through behind it.",
    evidence: [
      "I managed more than 150 commercial and enterprise accounts against a $300,000 quota.",
      "I owned account plans, monthly and quarterly forecasts, and updates for leadership.",
      "I worked with partner managers, solution engineers, and operations to move deals forward and grow accounts.",
    ],
  },
  {
    period: "Mar 2025 - May 2025",
    role: "Account Executive",
    organization: "Odoo",
    location: "Buffalo, NY",
    summary: "Odoo taught me to understand a business quickly, ask better questions, and show the product in the context of the customer's actual work.",
    evidence: [
      "I generated $240,000 in qualified SaaS pipeline through commercial and enterprise outreach.",
      "I delivered more than 30 product demonstrations in a quarter after running discovery with each prospect.",
      "I worked with implementation and product teams when a customer needed help getting started.",
    ],
  },
  {
    period: "Feb 2024 - Feb 2025",
    role: "Financial Analyst",
    organization: "b+h Polymers",
    location: "Remote",
    summary: "At b+h Polymers, finance was practical: pricing, budgets, forecasts, and the operating questions sitting behind each number.",
    evidence: [
      "I built Excel pricing models and automated variance reporting for global supply-chain procurement.",
      "I prepared actual-versus-budget capital reports for executive review.",
      "I ran forecasts and scenarios to test whether international projects made financial sense.",
      "I also handled B2B outreach across North America, Europe, and Asia. Internal reporting showed an 80% increase in qualified partner inquiries during the engagement.",
      "I maintained relationships across the global plastics supply chain.",
    ],
  },
  {
    period: "Aug 2022 - Jan 2024",
    role: "Financial Analyst",
    organization: "Tyler Cole Agency",
    location: "Remote",
    summary: "This is where I learned to turn weekly market research into a view leadership could question, discuss, and act on.",
    evidence: [
      "I produced time-series and valuation work across equities, fixed income, and commodities.",
      "I reviewed market trends, model output, and back-tested strategy results.",
      "I delivered weekly research, positioning recommendations, and model findings.",
    ],
  },
  {
    period: "Aug 2023 - Feb 2025",
    role: "Futures Trader",
    organization: "Breakout, contract",
    location: "Remote",
    summary: "I traded with defined position sizes, exits, and risk limits.",
    evidence: ["I used position sizing, stop-loss rules, and risk limits across futures, foreign exchange, and equities."],
  },
  {
    period: "May 2022 - Aug 2024",
    role: "Co-Founder",
    organization: "SFIN Media",
    location: "Remote",
    summary: "I built the CRM workflows behind the team's lead follow-up and conversion process.",
    evidence: ["I built CRM automation and conversion workflows. Internal reporting attributed a 30% conversion-rate increase to the work."],
  },
  {
    period: "Oct 2018 - Jan 2021",
    role: "Founder",
    organization: "Light Essentials",
    location: "Remote",
    summary: "Running a small business taught me to stay close to the numbers and the customer at the same time.",
    evidence: ["I managed marketing, inventory, customer support, and financial analysis using Salesforce and Excel."],
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
    "I contributed sector research across more than eight industries to a simulated portfolio benchmarked against the S&P 500. Team reporting measured 12% relative outperformance.",
    "I delivered weekly investment-committee research covering more than 100 equities with Bloomberg Terminal and FactSet.",
  ],
};

export const skillGroups = [
  {
    title: "Analysis",
    skills: ["Financial modeling", "Investment and market analysis", "Forecasting", "Financial reporting", "Valuation analysis", "Time-series analysis", "Scenario analysis"],
  },
  {
    title: "Tools",
    skills: ["Microsoft Excel", "Python", "Bloomberg Terminal", "FactSet", "HubSpot", "Odoo ERP", "Salesforce"],
  },
  {
    title: "Commercial and operational",
    skills: ["Pipeline forecasting", "Client discovery", "Stakeholder communication", "Process improvement"],
  },
  { title: "Languages", skills: ["English, native", "Spanish, intermediate"] },
  {
    title: "Certifications",
    skills: ["HubSpot Inbound and Sales certifications", "HubSpot Revenue Operations", "Microsoft Excel certification (Pearson)"],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
