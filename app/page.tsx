import AnalyzeForm from "@/components/AnalyzeForm";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold">InstaInsight AI</h1>
      <p className="max-w-md text-center text-slate-600">
        Paste an Instagram business URL to get its category, services, audience,
        contact info and a recommended next step.
      </p>
      <AnalyzeForm />
      <Link href="/dashboard" className="text-sm text-indigo-600 underline">
        Open dashboard
      </Link>
    </main>
  );
}
