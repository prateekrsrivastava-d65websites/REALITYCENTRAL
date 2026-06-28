export type Channel = "listing" | "social" | "email" | "ads" | "seller" | "followup" | "pipeline" | "cma" | "import";

export type PropertyInput = {
  address: string;
  city: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  propertyType: string;
  audience: string;
  tone: string;
  highlights: string;
  objections: string;
  agentName: string;
  brokerage: string;
  phone: string;
  email: string;
};

export type Asset = {
  id: Channel;
  title: string;
  subtitle: string;
  value: string;
  body: string;
  score: number;
};

export type LeadSignal = {
  name: string;
  source: string;
  temperature: "hot" | "warm" | "cold";
  activities: number;
  lastActivityDays: number;
  firstContactHours: number;
};

export type PipelineStage = {
  key: string;
  label: string;
  nextAction: string;
};
