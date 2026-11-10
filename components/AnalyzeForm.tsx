"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

export default function AnalyzeForm() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Analysis failed");
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="w-full max-w-xl space-y-3">
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://instagram.com/abcmarketing"
        inputMode="url"
        autoCapitalize="none"
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        required
      />
      <button
        disabled={loading}
        className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-indigo-300 disabled:opacity-50"
      >
        Analyze Profile
      </button>
      {loading && <Loading />}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
