export type CallType = "Discovery" | "Cold call" | "Objections" | "Closing";
export type Prospect = {
  id: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  type: CallType;
  difficulty: "Warm" | "Balanced" | "Skeptical";
  color: string;
  brief: string;
  goal: string;
  opening: string;
  objections: string;
  product: string;
};
export type Criterion = {
  id: string;
  name: string;
  weight: number;
  description: string;
};
export type Scorecard = { id: string; name: string; criteria: Criterion[] };
export type Message = {
  role: "user" | "assistant";
  content: string;
  id?: string;
};
export type Review = {
  summary: string;
  outcome: string;
  scores: {
    criterion: string;
    score: number;
    evidence: string;
    coaching: string;
  }[];
  strengths: string[];
  improvements: string[];
  nextPractice: string;
  overall: number;
  source: "ai" | "guided";
};
export type Session = {
  id: string;
  title: string;
  prospect: string;
  type: string;
  date: string;
  seconds: number;
  messages: Message[];
  review: Review;
  scorecard: string;
  notes: string;
  mode: "guided" | "text" | "voice" | "upload";
};
export type Assignment = {
  id: string;
  title: string;
  prospectId: string;
  target: number;
  completed: boolean;
  due: string;
};
export type Workspace = {
  version: 1;
  prospects: Prospect[];
  scorecards: Scorecard[];
  activeScorecard: string;
  context: string;
  sessions: Session[];
  assignments: Assignment[];
};

export const prospects: Prospect[] = [
  {
    id: "maya",
    name: "Maya Chen",
    role: "VP of Operations",
    company: "Northstar Logistics",
    industry: "Logistics",
    type: "Discovery",
    difficulty: "Balanced",
    color: "blue",
    brief:
      "A 120-person logistics business is losing time to manual handoffs. Maya is exploring options, but has not quantified the cost of the problem.",
    goal: "Uncover the operational impact, map the decision process, and agree on a useful next step.",
    opening:
      "Thanks for making time. We are looking at ways to make our operations less manual, but I am not sure we need another platform.",
    objections:
      "We already have too many tools. Implementation could disrupt the team.",
    product:
      "An operations platform that connects order intake, task ownership, and reporting.",
  },
  {
    id: "marcus",
    name: "Marcus Reed",
    role: "Chief Financial Officer",
    company: "Clearwater Group",
    industry: "Professional services",
    type: "Objections",
    difficulty: "Skeptical",
    color: "amber",
    brief:
      "Your champion likes the solution. Marcus has joined to challenge the business case and ask why the team should spend money this quarter.",
    goal: "Understand the financial concern and build a credible value case without rushing to a discount.",
    opening:
      "I looked at your proposal. The price is higher than I expected. Why should we prioritize this over everything else?",
    objections:
      "The price is too high. The ROI is speculative. We can wait until next year.",
    product:
      "A $24,000-per-year workflow platform intended to reduce repetitive administrative work.",
  },
  {
    id: "elena",
    name: "Elena Torres",
    role: "Head of Revenue",
    company: "Brightwell Software",
    industry: "Software",
    type: "Cold call",
    difficulty: "Skeptical",
    color: "rose",
    brief:
      "Elena leads a growing sales team. You have 30 seconds to establish relevance before she returns to her next meeting.",
    goal: "Earn permission, connect to a relevant problem, and book a specific next conversation.",
    opening: "This is Elena. I have about thirty seconds before my next call.",
    objections:
      "Not interested. Send me an email. We already use a competitor.",
    product:
      "A sales coaching platform that helps managers review calls and train new hires.",
  },
  {
    id: "daniel",
    name: "Daniel Brooks",
    role: "Director of IT",
    company: "Meridian Manufacturing",
    industry: "Manufacturing",
    type: "Discovery",
    difficulty: "Balanced",
    color: "teal",
    brief:
      "Daniel is evaluating a system upgrade across three locations. Security, integration, and migration effort matter more to him than a long feature list.",
    goal: "Discover technical requirements, business stakeholders, and how the buying decision will be made.",
    opening:
      "Before we get into a demo, I need to understand how this would fit with the systems we already have.",
    objections:
      "Security review takes time. We cannot replace our existing ERP.",
    product:
      "An integration platform that connects existing ERP, inventory, and reporting systems.",
  },
  {
    id: "priya",
    name: "Priya Shah",
    role: "Founder",
    company: "Harbor Studio",
    industry: "Creative services",
    type: "Closing",
    difficulty: "Warm",
    color: "violet",
    brief:
      "Priya has seen the demo and agrees the problem matters. The decision keeps slipping because the implementation owner and next steps are unclear.",
    goal: "Surface the remaining concern and create a mutual action plan with a date and owner.",
    opening:
      "The team liked what we saw. We just have a lot going on right now. Could we revisit this next month?",
    objections: "We are too busy. I need to speak to my partner.",
    product: "A client project management platform with onboarding support.",
  },
  {
    id: "james",
    name: "James Walker",
    role: "Regional Sales Manager",
    company: "Summit Distribution",
    industry: "Distribution",
    type: "Objections",
    difficulty: "Balanced",
    color: "slate",
    brief:
      "James has a long relationship with his current vendor. He is open to a conversation but expects a clear reason to change.",
    goal: "Explore what works today, identify an unmet need, and earn the right to continue.",
    opening:
      "We have been with our current provider for five years. They know our business. What makes switching worth the risk?",
    objections:
      "Our current provider is fine. Switching is risky. My team will resist.",
    product:
      "A partner sales platform for account planning, quote follow-up, and pipeline visibility.",
  },
];
const c = (
  id: string,
  name: string,
  weight: number,
  description: string,
): Criterion => ({ id, name, weight, description });
export const scorecards: Scorecard[] = [
  {
    id: "consultative",
    name: "Consultative selling",
    criteria: [
      c(
        "opening",
        "Opening & relevance",
        15,
        "Earn permission and set a relevant agenda.",
      ),
      c(
        "discovery",
        "Discovery",
        30,
        "Ask open questions, follow up, and quantify business impact.",
      ),
      c(
        "value",
        "Value articulation",
        20,
        "Connect the solution to the buyer’s stated problem without unsupported claims.",
      ),
      c(
        "objections",
        "Objection handling",
        20,
        "Acknowledge the concern, clarify it, and respond with relevant evidence.",
      ),
      c(
        "next",
        "Next steps",
        15,
        "Agree on a specific action, owner, and timing.",
      ),
    ],
  },
  {
    id: "bant",
    name: "BANT qualification",
    criteria: [
      c(
        "budget",
        "Budget",
        25,
        "Understand available funding and the business case.",
      ),
      c(
        "authority",
        "Authority",
        25,
        "Identify the decision maker and other stakeholders.",
      ),
      c("need", "Need", 30, "Uncover a concrete problem and its impact."),
      c(
        "timeline",
        "Timeline",
        20,
        "Establish timing, urgency, and a next step.",
      ),
    ],
  },
  {
    id: "meddic",
    name: "MEDDIC discovery",
    criteria: [
      c("metrics", "Metrics", 20, "Quantify the measurable business impact."),
      c("buyer", "Economic buyer", 15, "Identify who controls the budget."),
      c(
        "criteria",
        "Decision criteria",
        15,
        "Understand how alternatives will be evaluated.",
      ),
      c(
        "process",
        "Decision process",
        15,
        "Map the evaluation, approval, and purchase process.",
      ),
      c(
        "pain",
        "Identify pain",
        20,
        "Understand the problem and cost of inaction.",
      ),
      c(
        "champion",
        "Champion",
        15,
        "Identify an internal advocate with influence and motivation.",
      ),
    ],
  },
];
export function initialWorkspace(): Workspace {
  return {
    version: 1,
    prospects,
    scorecards,
    activeScorecard: "consultative",
    context: "",
    sessions: [],
    assignments: [],
  };
}
export function weightedScore(scores: Review["scores"], card: Scorecard) {
  const total = card.criteria.reduce((a, c) => a + c.weight, 0);
  if (!total) return 0;
  return Math.round(
    card.criteria.reduce(
      (sum, c) =>
        sum +
        (scores.find((s) => s.criterion === c.name)?.score || 0) * c.weight,
      0,
    ) / total,
  );
}
export function validateScorecard(card: Scorecard) {
  return (
    !!card.name.trim() &&
    card.criteria.length > 0 &&
    card.criteria.length <= 12 &&
    card.criteria.every(
      (c) =>
        c.name.trim() &&
        c.description.trim() &&
        Number.isFinite(c.weight) &&
        c.weight > 0,
    ) &&
    card.criteria.reduce((a, c) => a + c.weight, 0) === 100 &&
    new Set(card.criteria.map((c) => c.name)).size === card.criteria.length
  );
}
export const sampleTranscript = `Rep: Thanks for meeting, Maya. Would it help to start with what is slowing your team down, then see whether a next conversation makes sense?\nBuyer: Yes. The biggest issue is handoffs. Orders bounce between operations and account managers.\nRep: What happens when a handoff gets missed?\nBuyer: Someone has to chase the order. We lose about ten hours a week across the team.\nRep: How does that affect your customers and what does that time cost you?\nBuyer: Deliveries get delayed, and we spend around $2,000 a month on overtime.\nRep: So reducing missed handoffs would protect delivery dates and lower overtime. Who else would weigh in on a change?\nBuyer: Our finance lead and IT director. I would own the rollout.\nRep: What would they need to see to approve it?\nBuyer: A credible payback and a plan that does not interrupt work.\nRep: That makes sense. We could map one workflow together and use your numbers to test the business case before considering a wider rollout.\nBuyer: I like that, but we already have too many tools.\nRep: I hear you. Is the main concern adding another login, or creating another place people have to update?\nBuyer: Duplicate updates.\nRep: Then we should make that a test for the workflow session. If we cannot remove duplicate work, we should not proceed. Would Tuesday at 10 work with you and your IT director?\nBuyer: Yes, send an agenda and I will invite him.`;
export function parseTranscript(text: string): Message[] {
  return text
    .split(/\n+/)
    .filter((x) => x.trim())
    .map((line) => ({
      role: /^(buyer|prospect|customer|assistant)\s*:/i.test(line)
        ? "assistant"
        : "user",
      content: line
        .replace(
          /^(rep|sales|seller|you|buyer|prospect|customer|assistant)\s*:\s*/i,
          "",
        )
        .trim(),
    }));
}
