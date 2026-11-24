# DARKRA — Security Intelligence Dashboard

A fresh, clean Next.js 13 / React 18 starter implementation for the DARKRA SIH project.

## What's included
- Responsive security operations dashboard
- Security score, threat, vulnerability and event metrics
- Threat activity chart (Recharts)
- Threat posture distribution
- Searchable and filterable recent security events
- Simulated scan action and demo AI Analyst interaction
- Sidebar navigation for Overview, Vulnerability Scans, SIEM Logs, APT Detection, AI Analyst and Security Reports
- `.gitignore` excludes dependencies, build output and environment files

## Important scope note
This is newly generated starter source code inspired by the DARKRA dashboard concept. It is **not recovered original source code** and does not connect to the deployed Vercel dashboard, Supabase, real SIEM feeds, vulnerability scanners, Isolation Forest, One-Class SVM, SHAP, or an LLM. Dashboard metrics and scan/analyst results are demo data/placeholders. Do not present the demo values as live security findings.

## Requirements
- Node.js 18.17 or later
- npm

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Build
```bash
npm run build
npm start
```

## Suggested next engineering steps
1. Add Supabase server-side access and Row Level Security policies.
2. Implement authenticated API routes for scan jobs and event ingestion.
3. Connect validated SIEM/log sources and asset inventory.
4. Add Isolation Forest / One-Class SVM inference service and calibrated risk scoring.
5. Add SHAP explanations for model outputs.
6. Connect the AI Analyst to a server-side LLM endpoint with prompt-injection defenses.
7. Add audit logging, tests, rate limiting, secrets management and deployment checks.

## Push to GitHub
Create an empty GitHub repository named `DARKRA`, then run:
```bash
git init
git add .
git commit -m "Initial DARKRA dashboard source"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/DARKRA.git
git push -u origin main
```
Replace `YOUR-USERNAME` with your GitHub username. Never commit `.env` or API keys.
