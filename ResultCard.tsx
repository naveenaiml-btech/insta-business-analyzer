import { AnalysisRow } from "@/lib/types";
import TagList from "./TagList";

const level: Record<string, string> = {
  high: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-slate-100 text-slate-600",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-1 text-sm font-semibold text-slate-500">{title}</h4>
      <div className="text-sm text-slate-800">{children}</div>
    </div>
  );
}

export default function ResultCard({ r }: { r: AnalysisRow }) {
  const c = r.contact_info || {};
  const contact = [c.email, c.phone, c.website, c.location].filter(Boolean);
  return (
    <article className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold">{r.business_name}</h3>
          <p className="text-sm text-slate-500">
            @{r.username} · {r.category}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${level[r.interest_level] ?? level.low}`}
        >
          {r.interest_level} interest
        </span>
      </header>
      <p className="text-sm text-slate-700">{r.summary}</p>
      <Section title="Services">
        <TagList items={r.services} />
      </Section>
      <Section title="Content themes">
        <TagList items={r.content_themes} />
      </Section>
      <Section title="Target audience">{r.target_audience}</Section>
      <Section title="Contact info">
        {contact.length ? (
          <ul className="space-y-0.5 break-words">
            {contact.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        ) : (
          "None found"
        )}
      </Section>
      <Section title="Tags">
        <TagList items={r.tags} />
      </Section>
      <div className="rounded-lg bg-indigo-50 p-3 text-sm text-indigo-900">
        <strong>Recommended next action:</strong> {r.recommended_action}
      </div>
    </article>
  );
}
