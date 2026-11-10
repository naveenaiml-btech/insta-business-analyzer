import { NextResponse } from "next/server";
import { extractUsername, getInstagramProfile } from "@/lib/instagram";
import { analyzeProfile } from "@/lib/ai";
import { supabaseServer } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    const username = typeof url === "string" ? extractUsername(url) : null;
    if (!username) {
      return NextResponse.json(
        { error: "Enter a valid Instagram profile URL, like https://instagram.com/yourbrand" },
        { status: 400 }
      );
    }

    const profile = await getInstagramProfile(username);
    const analysis = await analyzeProfile(profile);

    const { data, error } = await supabaseServer()
      .from("analyses")
      .insert({
        instagram_url: url,
        username,
        ...analysis,
        raw_profile: profile,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return NextResponse.json({ result: data });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Something went wrong";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
