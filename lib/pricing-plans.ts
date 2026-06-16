export interface PricingPlan {
  key: "SmallGroup" | "OneOnOne";
  title: string;
  price: string;
  priceCents: number;
  cadence: string;
  description: string;
  highlights: string[];
  badge?: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    key: "SmallGroup",
    title: "Small Group",
    price: "$150",
    priceCents: 15000,
    cadence: "/ student",
    description: "Interactive group sessions that keep learning social and engaging.",
    highlights: [
      "Interactive group session",
      "5–6 students per cohort",
      "Peer collaboration on projects",
      "Great value for siblings & friends",
    ],
    badge: "Most popular",
  },
  {
    key: "OneOnOne",
    title: "1-on-1",
    price: "$200",
    priceCents: 20000,
    cadence: "/ student",
    description: "Personalized individual support with pacing built around your child.",
    highlights: [
      "Personalized individual support",
      "Customized pacing",
      "Dedicated instructor attention",
      "Flexible scheduling",
    ],
  },
];

export const packageIncludes = [
  "6 weeks of online learning",
  "1.5-hour weekly live session",
  "1-hour weekly office hour for support",
  "Weekly assignments",
  "Final project deliverable",
  "Sessions held via Zoom or Google Meet",
];

export function getPricingPlan(key?: string | null) {
  return pricingPlans.find((plan) => plan.key === key);
}
