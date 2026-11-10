# InstaInsight AI — Instagram Business Analyzer

An AI-powered app that turns an Instagram business profile URL into
structured business intelligence: category, services, content themes,
target audience, contact info, interest level, tags, and a recommended
next action — stored in Supabase and shown on a dashboard.

## Stack

- Next.js 15 (App Router, TypeScript, Tailwind CSS)
- OpenAI (server-side, JSON-mode analysis)
- Supabase (Postgres storage)
- lucide-react (icons)

## 1. Install dependencies

```bash
npm install
```

## 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query**, paste the contents of
   `supabase/schema.sql`, and run it.
3. Copy your Project URL and anon/public key from
   **Project Settings → API**.

## 3. Configure environment variables

Copy the example file and fill in your keys:

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-4o-mini
```

`OPENAI_API_KEY` must **never** be exposed to the browser — it's only
read inside the `/api/analyze` route, which runs on the server.

## 4. Run it

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), enter:

```
https://instagram.com/abcmarketing
```

and click **Analyze Profile**.

## How it works

```
Instagram URL
   ↓
lib/instagram.ts   (data provider — demo data by default)
   ↓
lib/ai.ts          (OpenAI structured JSON analysis)
   ↓
app/api/analyze     (saves to Supabase, returns result)
   ↓
app/dashboard       (renders the report)
```

## Going to production

The demo intentionally uses **controlled sample data** in
`lib/instagram.ts` instead of scraping live Instagram profiles, since
scraping violates Instagram's Terms of Service. To go to production:

1. Get access to an authorized Meta/Instagram API (e.g. the
   Instagram Graph API for business accounts you manage or that have
   granted permission).
2. Replace the body of `getInstagramProfile()` in `lib/instagram.ts`
   with a real API call, normalized to the same `InstagramProfile`
   shape. Nothing else in the app needs to change.
3. Enable Supabase Auth + Row Level Security (see the commented
   policy at the bottom of `supabase/schema.sql`).

## Project structure

```
insta-business-analyzer/
├── app/
│   ├── api/analyze/route.ts   Backend endpoint
│   ├── dashboard/page.tsx     Results dashboard
│   ├── layout.tsx
│   ├── page.tsx               Home / URL input
│   └── globals.css
├── components/
│   ├── AnalyzeForm.tsx
│   ├── ResultCard.tsx
│   ├── TagList.tsx
│   └── Loading.tsx
├── lib/
│   ├── ai.ts                  OpenAI prompt + call
│   ├── instagram.ts           Data provider (swap for real API)
│   ├── types.ts
│   └── supabase/
│       ├── client.ts
│       └── server.ts
└── supabase/schema.sql
```
