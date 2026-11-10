import { Loader2 } from "lucide-react";

export default function Loading({ text = "Analyzing profile…" }: { text?: string }) {
  return (
    <div className="flex items-center gap-2 text-slate-600">
      <Loader2 className="h-5 w-5 animate-spin" /> {text}
    </div>
  );
}
