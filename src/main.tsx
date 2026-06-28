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
  Mail,
  Megaphone,
  MessageSquareText,
  Sparkles,
  Upload,
  Wand2
} from "lucide-react";
import { buildMarketingKit, starterInput } from "./generator";
import type { Asset, Channel, PropertyInput } from "./types";
import "./styles.css";

const icons: Record<Channel, React.ReactNode> = {
  listing: <Home size={18} />,
  social: <Megaphone size={18} />,
  email: <Mail size={18} />,
  ads: <BarChart3 size={18} />,
  seller: <BadgeDollarSign size={18} />,
  followup: <MessageSquareText size={18} />
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
            <strong>Nonlinear Listings</strong>
            <span>Agent revenue cockpit</span>
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
          <span>Launch offer</span>
          <strong>$49/mo</strong>
          <p>Unlimited drafts, seller reports, and follow-up scripts for solo agents.</p>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <h1>Turn one listing intake into a complete marketing engine.</h1>
            <p>Built for agents who need better copy, faster follow-up, cleaner seller proof, and more booked showings today.</p>
          </div>
          <div className="actions">
            <button className="secondary" onClick={download}><Download size={17} /> Export kit</button>
            <button className="primary" onClick={copy}>{copied ? <Check size={17} /> : <Clipboard size={17} />} {copied ? "Copied" : "Copy asset"}</button>
          </div>
        </header>

        <section className="metrics">
          <Metric icon={<Wand2 />} label="Assets generated" value={kit.length.toString()} />
          <Metric icon={<CalendarCheck />} label="Hours saved/listing" value={`${projectedHours}+`} />
          <Metric icon={<Sparkles />} label="Listing score" value={`${asset.score}/100`} />
          <Metric icon={<BadgeDollarSign />} label="Value angle" value="Day 1 ROI" />
        </section>

        <section className="grid">
          <div className="panel input-panel">
            <div className="panel-head">
              <div>
                <h2>Listing Intake</h2>
                <p>Change any detail and every asset updates instantly.</p>
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
