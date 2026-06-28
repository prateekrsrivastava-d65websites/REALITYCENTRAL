import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BadgeDollarSign,
  BarChart3,
  Building2,
  CalendarCheck,
  Check,
  Clipboard,
  Download,
  Home,
  Import,
  ListChecks,
  Mail,
  Megaphone,
  MessageSquareText,
  Mic2,
  PanelsTopLeft,
  QrCode,
  ShieldAlert,
  Sparkles,
  Tags,
  Upload,
  Wand2,
  Workflow
} from "lucide-react";
import { buildMarketingKit, starterInput } from "./generator";
import type { Asset, Channel, FeatureBrief, PropertyInput } from "./types";
import "./styles.css";

const icons: Record<Channel, React.ReactNode> = {
  listing: <Home size={18} />,
  social: <Megaphone size={18} />,
  email: <Mail size={18} />,
  ads: <BarChart3 size={18} />,
  seller: <BadgeDollarSign size={18} />,
  followup: <MessageSquareText size={18} />,
  pipeline: <CalendarCheck size={18} />,
  cma: <BarChart3 size={18} />,
  import: <Import size={18} />,
  ops: <ListChecks size={18} />,
  seller_update: <PanelsTopLeft size={18} />,
  open_house: <QrCode size={18} />,
  objections: <ShieldAlert size={18} />,
  offer_room: <BadgeDollarSign size={18} />,
  photo_ai: <Sparkles size={18} />,
  voice: <Mic2 size={18} />,
  playbooks: <Workflow size={18} />,
  calendar: <Tags size={18} />
};

const featureBriefs: Record<Channel, FeatureBrief> = {
  listing: {
    job: "Turn rough property notes into polished MLS-ready copy.",
    roi: "Saves 30-60 minutes and makes the listing look more premium from day one.",
    next: "Paste this into MLS, Zillow, flyers, or your listing page."
  },
  social: {
    job: "Create launch posts without staring at a blank screen.",
    roi: "More consistent promotion means more buyer attention and seller confidence.",
    next: "Post the Instagram hook first, then reuse Facebook and LinkedIn copy."
  },
  email: {
    job: "Follow up with warm buyers before they go cold.",
    roi: "Faster follow-up creates more showings from the same lead flow.",
    next: "Send Email 1 to new buyer leads, then schedule the next two touches."
  },
  ads: {
    job: "Give paid campaigns clear hooks and CTAs.",
    roi: "Better hooks reduce wasted ad spend and improve showing intent.",
    next: "Use the Meta copy for awareness and retargeting copy for warm visitors."
  },
  seller: {
    job: "Show the seller exactly what you are doing to market the home.",
    roi: "Reduces anxious seller calls and helps justify your commission.",
    next: "Send this after launch or before the first weekly seller check-in."
  },
  followup: {
    job: "Convert showings into second showings, comps calls, or offers.",
    roi: "Most money is lost in slow follow-up. This closes that gap.",
    next: "Text every showing attendee within 60 minutes."
  },
  pipeline: {
    job: "Prioritize leads by urgency instead of memory.",
    roi: "Hot buyers get attention first, weak leads go into nurture.",
    next: "Call the highest-score lead and assign a next action to every lead."
  },
  cma: {
    job: "Explain pricing to sellers in plain language.",
    roi: "Better price conversations help win listings and avoid stale listings.",
    next: "Use this during listing presentations or price adjustment calls."
  },
  import: {
    job: "Standardize listing facts from MLS or property websites.",
    roi: "Cleaner data means faster generation and fewer embarrassing mistakes.",
    next: "Use this schema when wiring MLS, Zillow, Realtor, or Redfin imports."
  },
  ops: {
    job: "Run the first week after launch without forgetting steps.",
    roi: "A tighter launch window creates more activity while buyer attention is highest.",
    next: "Follow the 7-day plan and send the Day 4 seller update."
  },
  seller_update: {
    job: "Send sellers a calm weekly proof-of-work report.",
    roi: "Keeps sellers from wondering what you do all week.",
    next: "Send every Friday with traffic, feedback, objections, and next recommendation."
  },
  open_house: {
    job: "Turn open-house visitors into structured leads.",
    roi: "More follow-upable leads from the same event.",
    next: "Put this behind a QR code at the door."
  },
  objections: {
    job: "Track repeated buyer resistance and turn it into strategy.",
    roi: "Shows sellers when feedback is real market data, not random opinion.",
    next: "Log each objection after showings and review patterns weekly."
  },
  offer_room: {
    job: "Move interested buyers into serious offer conversations.",
    roi: "More hot buyers become real offers instead of vague interest.",
    next: "Use this checklist before every offer strategy call."
  },
  photo_ai: {
    job: "Use listing photos to find better marketing angles.",
    roi: "Better photo-led copy makes the property feel more specific and memorable.",
    next: "Wire this to Gemini vision when photo upload is enabled."
  },
  voice: {
    job: "Make every output sound like the agent, not generic AI.",
    roi: "Consistent voice builds trust and keeps agents from rewriting everything.",
    next: "Save this as the agent's default brand voice."
  },
  playbooks: {
    job: "Pick a proven strategy for the listing situation.",
    roi: "Repeatable playbooks reduce guesswork and speed up launch.",
    next: "Choose the closest playbook before generating final assets."
  },
  calendar: {
    job: "Plan two weeks of listing content from one intake.",
    roi: "More touches without daily content planning.",
    next: "Schedule Day 1-7 immediately after launch."
  }
};

function App() {
  const [input, setInput] = useState<PropertyInput>(() => {
    const saved = localStorage.getItem("nonlinear-listing-input");
    return saved ? { ...starterInput, ...JSON.parse(saved) } : starterInput;
  });
  const [active, setActive] = useState<Channel>("listing");
  const [copied, setCopied] = useState(false);
  const kit = useMemo(() => buildMarketingKit(input), [input]);
  const asset = kit.find((item) => item.id === active) as Asset;
  const projectedHours = Math.round(kit.length * 0.75 * 10) / 10;

  const update = (key: keyof PropertyInput, value: string) => {
    const numeric = ["price", "beds", "baths", "sqft"].includes(key);
    const next = { ...input, [key]: numeric ? Number(value) : value };
    setInput(next);
    localStorage.setItem("nonlinear-listing-input", JSON.stringify(next));
  };

  const copy = async () => {
    await navigator.clipboard.writeText(asset.body);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const download = () => {
    const content = kit.map((item) => `# ${item.title}\n\n${item.body}`).join("\n\n---\n\n");
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${input.address || "listing"}-marketing-kit.md`.replace(/[^\w.-]+/g, "-");
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="mark"><Building2 size={22} /></div>
          <div>
            <strong>REALITYCENTRAL</strong>
            <span>Listing copilot</span>
          </div>
        </div>
        <nav>
          {kit.map((item) => (
            <button key={item.id} className={active === item.id ? "nav active" : "nav"} onClick={() => setActive(item.id)}>
              {icons[item.id]}
              <span>{item.title}</span>
              <small>{item.score}</small>
            </button>
          ))}
        </nav>
        <div className="plan">
          <span>ROI signal</span>
          <strong>$49/mo</strong>
          <p>One extra showing or saved seller saves the month.</p>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <h1>What should this listing say, prove, and trigger next?</h1>
          <p>Enter the property once. REALITYCENTRAL returns the copy, seller proof, lead actions, and launch plan an agent can use today.</p>
          </div>
          <div className="actions">
            <button className="secondary" onClick={download}><Download size={17} /> Export kit</button>
            <button className="primary" onClick={copy}>{copied ? <Check size={17} /> : <Clipboard size={17} />} {copied ? "Copied" : "Copy asset"}</button>
          </div>
        </header>

        <section className="metrics" aria-label="ROI highlights">
          <Metric icon={<Wand2 />} label="Assets generated" value={kit.length.toString()} />
          <Metric icon={<CalendarCheck />} label="Hours saved/listing" value={`${projectedHours}+`} />
          <Metric icon={<Sparkles />} label="Listing score" value={`${asset.score}/100`} />
          <Metric icon={<BadgeDollarSign />} label="Value angle" value="Day 1 ROI" />
        </section>

        <section className="grid">
          <div className="panel input-panel">
            <div className="panel-head">
              <div>
                <h2>Property Context</h2>
                <p>Edit the brief. The answer updates instantly.</p>
              </div>
              <button className="icon-button" title="Upload photos"><Upload size={18} /></button>
            </div>
            <div className="form-grid">
              <Field label="Address" value={input.address} onChange={(v) => update("address", v)} />
              <Field label="City" value={input.city} onChange={(v) => update("city", v)} />
              <Field label="Price" value={input.price} type="number" onChange={(v) => update("price", v)} />
              <Field label="Beds" value={input.beds} type="number" onChange={(v) => update("beds", v)} />
              <Field label="Baths" value={input.baths} type="number" onChange={(v) => update("baths", v)} />
              <Field label="Square feet" value={input.sqft} type="number" onChange={(v) => update("sqft", v)} />
              <Field label="Property type" value={input.propertyType} onChange={(v) => update("propertyType", v)} />
              <Field label="Target buyer" value={input.audience} onChange={(v) => update("audience", v)} />
            </div>
            <TextField label="Best features" value={input.highlights} onChange={(v) => update("highlights", v)} />
            <TextField label="Known objections" value={input.objections} onChange={(v) => update("objections", v)} />
            <div className="form-grid">
              <Field label="Agent" value={input.agentName} onChange={(v) => update("agentName", v)} />
              <Field label="Brokerage" value={input.brokerage} onChange={(v) => update("brokerage", v)} />
              <Field label="Phone" value={input.phone} onChange={(v) => update("phone", v)} />
              <Field label="Email" value={input.email} onChange={(v) => update("email", v)} />
            </div>
          </div>

          <div className="panel output-panel">
            <div className="panel-head">
              <div>
                <h2>{asset.title}</h2>
                <p>{asset.subtitle}</p>
              </div>
              <div className="pill">{asset.value}</div>
            </div>
            <div className="why-panel" aria-label="Why this feature matters">
              <div>
                <span>Job</span>
                <strong>{featureBriefs[asset.id].job}</strong>
              </div>
              <div>
                <span>ROI</span>
                <strong>{featureBriefs[asset.id].roi}</strong>
              </div>
              <div>
                <span>Next</span>
                <strong>{featureBriefs[asset.id].next}</strong>
              </div>
            </div>
            <pre>{asset.body}</pre>
          </div>
        </section>
      </section>
    </main>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="metric">
      <span>{icon}</span>
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}

function Field({ label, value, type = "text", onChange }: { label: string; value: string | number; type?: string; onChange: (value: string) => void }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="field wide">
      <span>{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
