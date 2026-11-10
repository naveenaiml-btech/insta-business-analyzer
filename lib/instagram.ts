import { InstagramProfile } from "./types";

export function extractUsername(url: string): string | null {
  try {
    const u = new URL(url.trim());
    if (!/(^|\.)instagram\.com$/.test(u.hostname)) return null;
    const name = u.pathname.split("/").filter(Boolean)[0];
    return name && /^[A-Za-z0-9._]{1,30}$/.test(name) ? name : null;
  } catch {
    return null;
  }
}

// Controlled sample data. We do NOT scrape Instagram (violates its ToS).
const DEMO: Record<string, InstagramProfile> = {
  abcmarketing: {
    username: "abcmarketing",
    fullName: "ABC Marketing Agency",
    bio: "📈 Social media growth for local businesses | Ads • Branding • Reels | Book a free audit 👇",
    followers: 12400,
    following: 310,
    postsCount: 486,
    website: "https://abcmarketing.example.com",
    email: "hello@abcmarketing.example.com",
    phone: "+1 555 010 2030",
    recentCaptions: [
      "3 reasons your Reels aren't getting reach 🎥",
      "Client win: +240% leads in 60 days for a local gym 💪",
      "Free audit slots open this week — DM 'AUDIT'",
    ],
  },
};

export async function getInstagramProfile(
  username: string
): Promise<InstagramProfile> {
  // PRODUCTION: replace this body with an authorized Instagram Graph API
  // call, normalized to the InstagramProfile shape.
  const key = username.toLowerCase();
  if (DEMO[key]) return DEMO[key];

  return {
    username,
    fullName: username,
    bio: "Local small business sharing updates and offers.",
    followers: 1500,
    following: 400,
    postsCount: 80,
    recentCaptions: [
      "New this week in store!",
      "Thanks for the support, everyone ❤️",
    ],
  };
}
