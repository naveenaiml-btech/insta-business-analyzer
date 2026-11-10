export default function TagList({ items }: { items?: string[] }) {
  if (!items?.length) return <span className="text-slate-400">None found</span>;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <span
          key={t}
          className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
        >
          {t}
        </span>
      ))}
    </div>
  );
}
