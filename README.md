# US Career Solutions — Live US Career Intelligence Platform & Open H-1B LCA Salary Dataset 2026

[![Next.js 15](https://img.shields.io/badge/Next.js-15.5.25-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Production Live](https://img.shields.io/badge/Production-Live%20Platform-emerald?style=for-the-badge&logo=vercel)](https://www.uscareersolutions.online)

**US Career Solutions** is a full-stack open career intelligence platform and live web application engineered to democratize access to certified U.S. salary disclosures, H-1B visa sponsorship analytics, cap-exempt institution pipelines, state-by-state net income comparisons, and AI ATS resume optimization.

* **Official Production Web Application:** [https://www.uscareersolutions.online](https://www.uscareersolutions.online)
* **Live Interactive H-1B Salary Search Engine:** [https://www.uscareersolutions.online/tools/lca-salary-search](https://www.uscareersolutions.online/tools/lca-salary-search)
* **State Tax & Take-Home Pay Comparison:** [https://www.uscareersolutions.online/tools/state-tax-compare](https://www.uscareersolutions.online/tools/state-tax-compare)
* **Top 10 State Tech & Visa Career Hubs:** [https://www.uscareersolutions.online/jobs/states](https://www.uscareersolutions.online/jobs/states)

---

## 📊 Open-Source H-1B LCA Prevailing Wage Dataset (2026)

This repository distributes open-source structured dataset files compiled from the **U.S. Department of Labor (DOL) Office of Foreign Labor Certification (OFLC)** Form ETA-9035/ETA-9035E public disclosure records and the **Bureau of Labor Statistics (BLS)** Occupational Employment and Wage Statistics (OEWS).

### Available Dataset Formats:
* 📄 **JSON:** [`datasets/us_h1b_lca_certified_salaries_2026.json`](./datasets/us_h1b_lca_certified_salaries_2026.json)
* 📊 **CSV:** [`datasets/us_h1b_lca_certified_salaries_2026.csv`](./datasets/us_h1b_lca_certified_salaries_2026.csv)

### Schema Specification:
| Field | Type | Description | Source Standard |
| :--- | :--- | :--- | :--- |
| `id` | String | Unique filing record identifier | Internal UUID |
| `job_title` | String | Certified job position title | Form ETA-9035 Section F |
| `soc_code` | String | Standard Occupational Classification Code | Federal SOC / O*NET |
| `soc_title` | String | Occupational group taxonomy | BLS Standard |
| `company` | String | Sponsoring employer legal name | SEC / Form ETA-9035 |
| `city` / `state` | String | Certified principal work location | U.S. Geographic County |
| `wage_level` | String | DOL Wage Level (Level I to IV) | OFLC Prevailing Wage Matrix |
| `base_salary_usd`| Integer | Guaranteed annual base compensation | Certified LCA Amount |
| `prevailing_wage_usd`| Integer | DOL minimum statutory prevailing wage | FLAG / BLS OEWS Baseline |
| `day1_green_card_policy`| Boolean | Corporate Day-1 / Fast-Track PERM policy | Historic Filing Analytics |
| `cap_exempt_organization`| Boolean | 501(c)(3) Higher Ed / Medical Research | 8 CFR § 214.2(h)(8)(iii)(F) |

---

## 🚀 Interactive Web Application Features

1. **[Live H-1B LCA Prevailing Wage Search Engine](https://www.uscareersolutions.online/tools/lca-salary-search):**
   * Real-time multi-parameter search by Company, Job Title, State, Minimum Salary, and Wage Level (Level I Entry through Level IV Fully Competent).
   * Live KPI telemetry: Dynamic median base salary, peak compensation, and DOL prevailing wage calculations.
   * Cap-Exempt toggle filtering 501(c)(3) universities and research hospitals exempt from the 85,000 lottery cap.

2. **[State-by-State Tax & Take-Home Pay Calculator](https://www.uscareersolutions.online/tools/state-tax-compare):**
   * Side-by-side net pay analysis comparing 0% income tax states (Texas, Florida, Washington) against high-tax tech hubs (California, New York, Massachusetts).
   * Exact Federal FICA (Social Security & Medicare), State Income Tax, and standard deduction calculations.

3. **[AI ATS Resume Scanner & Optimizer](https://www.uscareersolutions.online/tools/ats-scanner):**
   * Reverse-engineers enterprise Applicant Tracking Systems (Workday, Greenhouse, Taleo, Lever).
   * Generates a 0–100% ATS match score with missing keyword detection and semantic bullet-point rewriting.

4. **[US State Visa & Career Hubs](https://www.uscareersolutions.online/jobs/states):**
   * Dedicated deep-dive guides for California, Texas, New York, Washington, Massachusetts, Illinois, Florida, North Carolina, Georgia, and Virginia.

---

## 🛠️ Tech Stack & Architecture

* **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
* **Language:** TypeScript 5.0
* **Styling:** Tailwind CSS 3.4 & Lucide React
* **Pre-Rendering:** 100% Static Site Generation (SSG) across 57 static routes
* **SEO & E-E-A-T:** Complete `WebApplication`, `FAQPage`, and `JobPosting` JSON-LD Structured Data Schema
* **Hosting:** Vercel Global Edge Network

---

## 💻 Quick Start & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/dhshishirD/US_Career_Solutions.git
cd US_Career_Solutions

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Build for production (57 static pages)
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚖️ Open Data & Legal Disclaimer

All compensation records, prevailing wage levels, and occupational codes distributed in this repository are compiled from public disclosure records administered by the **U.S. Department of Labor (DOL) Office of Foreign Labor Certification (OFLC)** and the **Bureau of Labor Statistics (BLS)** under the Freedom of Information Act (FOIA). 

US Career Solutions is an independent career research project. We are not a law firm, not affiliated with the U.S. Department of Labor (DOL), USCIS, or any government agency. For official legal counsel or visa petition filings, consult a licensed immigration attorney registered with the American Immigration Lawyers Association (AILA).

---

## 🔗 Official Links & Resources

* **Live Web Platform:** [https://www.uscareersolutions.online](https://www.uscareersolutions.online)
* **LCA Search Engine:** [https://www.uscareersolutions.online/tools/lca-salary-search](https://www.uscareersolutions.online/tools/lca-salary-search)
* **Tax Comparison Engine:** [https://www.uscareersolutions.online/tools/state-tax-compare](https://www.uscareersolutions.online/tools/state-tax-compare)
* **Sponsorship Directory:** [https://www.uscareersolutions.online/jobs](https://www.uscareersolutions.online/jobs)
