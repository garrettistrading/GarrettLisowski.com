import {
  weightedScore,
  type Message,
  type Prospect,
  type Review,
  type Scorecard,
} from "./model";

// A transparent, deterministic practice fallback. Never represented as AI analysis.
export function guidedReply(messages: Message[], p: Prospect): string {
  const text =
    messages
      .filter((m) => m.role === "user")
      .at(-1)
      ?.content.toLowerCase() || "";
  if (/\b(ignore|system prompt|pretend|instructions)\b/.test(text))
    return "Let’s stay with the business conversation. What did you want to understand about our situation?";
  if (
    /\b(tuesday|wednesday|thursday|calendar|schedule|next week|next step)\b/.test(
      text,
    )
  )
    return "Tuesday at 10 could work. Please bring a clear agenda and include our operations lead. What should we prepare?";
  if (/\b(who|decision|stakeholder|approve|authority)\b/.test(text))
    return "I would sponsor the project. Our finance lead approves the budget, and IT needs to sign off on the implementation.";
  if (/\b(budget|cost|spend|price|roi|payback|hours|how much)\b/.test(text))
    return "We spend roughly $2,000 a month on overtime tied to manual work. I would need to see a credible payback using our numbers before committing budget.";
  if (
    /\b(timeline|quarter|urgent|deadline|timing|when would|when will|when are)\b/.test(
      text,
    )
  )
    return "We would like to make a decision this quarter. The deadline matters, but a rushed rollout would be worse than waiting.";
  if (
    /\b(concern|worried|risk|mean by|tell me more|understand|fair|hear you)\b/.test(
      text,
    )
  )
    return "My biggest concern is asking the team to change how they work and ending up with duplicate data entry. How would we test that before committing?";
  if (
    /\b(problem|challenge|process|today|happens?|handoffs?|impact|slowing|bottleneck|how do|what does)\b/.test(
      text,
    )
  )
    return "Our handoffs are inconsistent. People chase updates across email and spreadsheets, and customers feel it when an order slips. We have not measured the full impact yet.";
  if (/\b(permission|minute|seconds|agenda|time|thanks)\b/.test(text))
    return `I can give you a few minutes. ${p.objections.split(".")[0]}. What would you like to understand first?`;
  if (/\b(demo|platform|solution|features|software)\b/.test(text))
    return "Before the product walkthrough, can we connect this to the specific problem my team is trying to solve?";
  return "Can you make that more specific to our situation? I need to understand what would change for my team and why it matters.";
}
const cues: Record<string, RegExp> = {
  opening: /permission|agenda|thanks|minute|time|relevant/i,
  discovery: /what|how|why|tell me|impact|problem|challenge/i,
  value: /reduce|save|improve|because|means|cost|impact|payback/i,
  objections: /understand|hear you|concern|fair|risk|clarify|worried/i,
  next: /tuesday|wednesday|thursday|schedule|calendar|next step|next week|agenda/i,
  budget: /budget|spend|fund|cost|payback/i,
  authority: /who|approve|decision|stakeholder/i,
  need: /problem|challenge|impact|need|pain/i,
  timeline: /when|quarter|timeline|deadline|schedule/i,
  metrics: /how much|how many|cost|hours|percent|measure/i,
  buyer: /budget|approve|finance|decision maker/i,
  criteria: /criteria|evaluate|compare|important|requirements/i,
  process: /process|approve|steps|sign off/i,
  pain: /problem|challenge|impact|happen|cost of/i,
  champion: /sponsor|advocate|own|support|internal/i,
};
export function guidedReview(messages: Message[], card: Scorecard): Review {
  const rep = messages.filter((m) => m.role === "user");
  const scores = card.criteria.map((c) => {
    const regex = cues[c.id] || /\?/;
    const hits = rep.filter((m) => regex.test(m.content));
    const score = hits.length ? Math.min(80, 40 + hits.length * 10) : 0;
    return {
      criterion: c.name,
      score,
      evidence:
        hits[0]?.content.slice(0, 220) ||
        "No matching language found in the rep’s turns.",
      coaching: `${c.description} ${hits.length ? "Review whether the buyer’s answer was explored before moving on." : "Try an explicit question about this in your next attempt."}`,
    };
  });
  const strongest = [...scores].sort((a, b) => b.score - a.score)[0];
  const weakest = [...scores].sort((a, b) => a.score - b.score)[0];
  return {
    summary:
      "Guided practice review. This checklist detects language patterns; it does not judge meaning, tone, or sales ability.",
    outcome:
      "Practice completed; buyer commitment has not been independently assessed.",
    scores,
    strengths: strongest?.score
      ? [
          `Your language addressed ${strongest.criterion.toLowerCase()}. Check the quoted evidence below.`,
        ]
      : [
          "You completed a practice attempt. Review the missing criteria below.",
        ],
    improvements: [weakest?.coaching || "Ask a specific discovery question."],
    nextPractice: `Focus on ${weakest?.criterion.toLowerCase() || "discovery"} in your next session.`,
    overall: weightedScore(scores, card),
    source: "guided",
  };
}
