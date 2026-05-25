import Link from "next/link";
import { comparisonColumns, medicalDisclaimer } from "@/lib/constants";

export function ComplianceNote({ tool = false }: { tool?: boolean }) {
  return <p className={`compliance-note${tool ? " tool-compliance" : ""}`}>{medicalDisclaimer}</p>;
}

export function HeroGeneratorPanel() {
  return (
    <aside className="generator-panel" aria-label="Generator preview mockup">
      <div className="stack">
        <span className="eyebrow">Preview mockup</span>
        <label>
          Tattoo idea
          <textarea defaultValue="A fine-line snake wrapped around a peony, designed for the inner forearm." />
        </label>
        <div className="grid-2">
          <label>
            Style
            <select defaultValue="minimalist">
              <option value="minimalist">Minimalist</option>
              <option value="realism">Realism</option>
              <option value="traditional">Traditional</option>
            </select>
          </label>
          <label>
            Placement
            <select defaultValue="arm">
              <option value="arm">Arm</option>
              <option value="shoulder">Shoulder</option>
              <option value="wrist">Wrist</option>
            </select>
          </label>
        </div>
        <div className="preview-box">
          <div className="preview-art" aria-hidden="true" />
          <p>Reference blueprint preview, ready to discuss with your tattoo artist.</p>
        </div>
      </div>
    </aside>
  );
}

export function HowItWorksSteps() {
  const steps = [
    ["Describe", "Write your idea in plain English: subject, mood, size, and meaning."],
    ["Pick", "Choose a tattoo style and placement so the result is useful, not random."],
    ["Preview", "Use the reference to refine your direction before speaking with an artist."]
  ];
  return (
    <div className="grid-3">
      {steps.map(([title, body], index) => (
        <article className="card-dark" key={title}>
          <span className="eyebrow">Step {index + 1}</span>
          <h3>{title}</h3>
          <p>{body}</p>
        </article>
      ))}
    </div>
  );
}

export function TrustSignalGrid() {
  const items = [
    ["Free to try", "Start with 3 free designs daily before you commit to anything."],
    ["No signup required", "Explore the first version without creating an account."],
    ["Your blueprint", "Get a direction you can bring to a licensed tattoo artist."],
    ["For reference only", "Every design is framed as inspiration, not medical or tattoo advice."]
  ];
  return (
    <div className="grid-2">
      {items.map(([title, body]) => (
        <article className="card-dark" key={title}>
          <h3>{title}</h3>
          <p>{body}</p>
        </article>
      ))}
    </div>
  );
}

export function VisualComparison() {
  return (
    <div className="comparison" aria-label="Visual competitor comparison">
      {comparisonColumns.map((column) => (
        <article className={`compare-card${column.ours ? " ours" : ""}`} key={column.name}>
          {column.ours ? <span className="badge">Our advantage</span> : null}
          <h3 style={{ marginTop: column.ours ? 14 : 0 }}>{column.name}</h3>
          <p>{column.intro}</p>
          <div style={{ marginTop: 16 }}>
            {column.features.map(([feature, value, state]) => (
              <div className="compare-row" key={feature}>
                <span>{feature}</span>
                <strong className={`state-${state}`}>{value}</strong>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export function FAQAccordion({ items }: { items: Array<[string, string]> }) {
  return (
    <div className="stack">
      {items.map(([question, answer]) => (
        <details className="card-dark" key={question}>
          <summary style={{ cursor: "pointer", fontWeight: 800, fontSize: 18 }}>{question}</summary>
          <p style={{ marginTop: 14 }}>{answer}</p>
        </details>
      ))}
    </div>
  );
}

export function ExampleImagePlaceholder() {
  return <div className="placeholder">[示例图位置 — 小码提供]</div>;
}

export function ContentCTA({ title, href }: { title: string; href: string }) {
  return (
    <div className="card-paper stack">
      <span className="eyebrow">Try your idea</span>
      <h2>{title}</h2>
      <p>Open the generator with this direction in mind, then refine style, placement, and details.</p>
      <Link className="btn btn-primary" href={href}>
        {title}
      </Link>
    </div>
  );
}
