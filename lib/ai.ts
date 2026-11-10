import OpenAI from "openai";
import { AnalysisResult, InstagramProfile } from "./types";

const SYSTEM = `You are a business analyst. Given an Instagram business profile, return ONLY valid JSON with exactly these keys:
business_name (string), category (string), services (string[]), content_themes (string[]),
target_audience (string), contact_info ({email?, phone?, website?, location?}),
interest_level ("low"|"medium"|"high" = how promising a sales lead this business is),
tags (string[] of 3-8 short lowercase tags), recommended_action (string, one concrete next step),
summary (2-3 sentence string). Use only the provided data; never invent contact details.`;

export async function analyzeProfile(
  profile: InstagramProfile
): Promise<AnalysisResult> {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const res = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    response_format: { type: "json_object" },
    temperature: 0.3,
    messages: [
      { role: "system", content: SYSTEM },
      { role: "user", content: JSON.stringify(profile) },
    ],
  });

  const text = res.choices[0]?.message?.content;
  if (!text) throw new Error("Empty AI response");
  return JSON.parse(text) as AnalysisResult;
}
