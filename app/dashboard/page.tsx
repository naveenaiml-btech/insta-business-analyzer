import Link from "next/link";
import ResultCard from "@/components/ResultCard";
import { supabaseServer } from "@/lib/supabase/server";
import { AnalysisRow } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const { data, error } = await supabaseServer()
    .from("analyses")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  const rows = (data ?? []) as AnalysisRow[];

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link href="/" className="text-sm text-indigo-600 underline">
          Analyze another profile
        </Link>
      </div>
      {error && <p className="text-red-600">Could not load results: {error.message}</p>}
      {!rows.length && !error && (
        <p className="text-slate-500">
          No analyses yet. Go back and paste an Instagram URL to create your first report.
        </p>
      )}
      <div className="grid gap-6 md:grid-cols-2">
        {rows.map((r) => (
          <ResultCard key={r.id} r={r} />
        ))}
      </div>
    </main>
  );
}
