export type Rule = {
  intent: string;
  patterns: RegExp[];
  reply: string;
};

export const RULES: Rule[] = [
  {
    intent: "payments",
    patterns: [/payment/i, /pay(ment|ing)?/i, /rent/i, /billing/i, /invoice/i],
    reply:
      "Payments & billing: you can manage them via your member portal. For FAQs, see: https://cohabs.com/faq.",
  },
  {
    intent: "bookings",
    patterns: [
      /book/i,
      /booking/i,
      /availability/i,
      /tour/i,
      /visit/i,
      /apply/i,
    ],
    reply:
      "Bookings & availability: browse current options on our website and request a visit from there.",
  },
  {
    intent: "maintenance",
    patterns: [
      /maintenance/i,
      /fix/i,
      /repair/i,
      /issue/i,
      /problem/i,
      /broken/i,
    ],
    reply:
      "Maintenance: please submit a request via your member portal. A teammate will follow up quickly.",
  },
  {
    intent: "house_rules",
    patterns: [
      /rules?/i,
      /quiet hours?/i,
      /guests?/i,
      /pets?/i,
      /smok(ing|e)/i,
    ],
    reply:
      "House rules: we encourage respect for neighbors, shared spaces, and quiet hours. Check your welcome guide for details.",
  },
  {
    intent: "locations",
    patterns: [/location/i, /city/i, /neighborhood/i, /area/i, /where/i],
    reply:
      "Locations: we operate in multiple neighborhoods; check the site map for exact addresses and availability.",
  },
  {
    intent: "community",
    patterns: [
      /community/i,
      /events?/i,
      /meet/i,
      /roommates?/i,
      /activities?/i,
    ],
    reply:
      "Community events: we host regular activities to connect members—watch your app/portal for the next ones.",
  },
];

export function matchRule(message: string): Rule | null {
  let best: { rule: Rule; score: number } | null = null;
  for (const rule of RULES) {
    let score = 0;
    for (const re of rule.patterns) {
      if (re.test(message)) score++;
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { rule, score };
    }
  }
  return best ? best.rule : null;
}
