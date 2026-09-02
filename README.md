# US Career Solutions (Vercel-Ready Platform)

A full-stack Next.js 15 web application engineered to aggregate valid daily USA job opportunities, provide visa sponsorship intelligence (H-1B, Cap-Exempt, OPT/CPT, US Remote W-8BEN), and deliver instant AI career care tools for international job seekers and your community followers.

---

## Key Features

1. **Everyday US Jobs Pipeline & Ingestion:**
   * Automated background sync powered by **Vercel Cron** (`/api/cron/sync-jobs`) scheduled daily at `06:00 UTC`.
   * Ingests and normalizes postings with location, salary range, ATS vendor detection, and visa eligibility categorization.
2. **Visa Sponsorship Radar:**
   * **H-1B Sponsor:** Verified companies with active USCIS/LCA filing history.
   * **Cap-Exempt H-1B:** Universities, academic medical centers (e.g. Mayo Clinic, Stanford, Johns Hopkins) that are **exempt from the 85,000 annual lottery cap**.
   * **OPT / STEM OPT Friendly:** Positions suitable for international students and recent graduates.
   * **US Remote (Contractor / W-8BEN):** Allows international candidates to work for US employers from their home country without physical visa relocation.
3. **On-the-Spot AI Career Care Tools:**
   * **AI ATS Resume Scanner & Tailorer (`/tools/ats-scanner`):** Analyzes resumes against target US job descriptions, generates a 0-100% ATS score, highlights missing keywords, and rewrites bullet points into US power-verb format.
   * **Company Visa Sponsor Radar (`/tools/visa-checker`):** Look up historical H-1B filings, approval rates, and Cap-Exempt status for US employers.
   * **Recruiter Outreach Generator (`/tools/outreach-gen`):** Generates custom LinkedIn connection notes, direct cold emails, and polite follow-up messages.
   * **Application Tracker CRM (`/tracker`):** Personal dashboard to track saved positions, applications, and interview stages with browser persistence.

---

## Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Verify production build:**
   ```bash
   npm run build
   ```

---

## Vercel 1-Click Deployment Guide

This project is pre-configured with `vercel.json` and standard Next.js App Router conventions for native Vercel deployment:

### Option A: Via GitHub (Recommended)
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of US Career Solutions"
   git remote add origin https://github.com/your-username/us-career-solutions.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your repository and click **Deploy**. Vercel will automatically detect Next.js and build with zero extra configuration.

### Option B: Via Vercel CLI
```bash
npx vercel
```

---

## Environment Variables on Vercel

In your Vercel Project Dashboard (`Settings` -> `Environment Variables`), configure the following keys:

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `CRON_SECRET` | Secret token to secure the automated cron endpoint | `generate-a-random-32-char-string` |
| `GEMINI_API_KEY` | *(Optional)* Google Gemini API key for advanced AI resume tailoring | Free key from [aistudio.google.com](https://aistudio.google.com) |
| `NEXT_PUBLIC_FACEBOOK_PAGE_URL` | Your official Facebook Page or Group link | `https://www.facebook.com/profile.php?id=61573335766965` |
| `NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL` | Your WhatsApp community invite link | `https://chat.whatsapp.com/...` |

> [!NOTE]
> Even if `GEMINI_API_KEY` is not provided, the platform includes a smart built-in semantic heuristic engine so the ATS Scanner and Outreach Generator work immediately for all users out-of-the-box!

---

## Automated Daily Job Ingestion (Vercel Cron)

The `vercel.json` file schedules automated daily runs:
```json
{
  "crons": [
    {
      "path": "/api/cron/sync-jobs",
      "schedule": "0 6 * * *"
    }
  ]
}
```
* On Vercel Hobby & Pro plans, Vercel automatically invokes `/api/cron/sync-jobs` every day at `06:00 UTC` with `Authorization: Bearer <CRON_SECRET>`.
* You can also trigger a manual sync anytime directly from the UI by clicking the **"Sync Fresh Jobs"** button in `/jobs`.
