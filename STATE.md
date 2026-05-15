# State — Resume Build System

## Current Focus
- **Mobile devices rendering** — making both Classic + Dashboard responsive on mobile
- Current branch: `web_renderingDev` (Resume repo) — actively working on layout refinements

## Active Tasks
- [x] Dashboard: template + build.js + translations (DE/EN/ES) → static HTML
- [x] Dashboard: all 3 languages built and deployed to GitHub Pages
- [x] Classic: separated to own GitHub Pages repo
- [x] Production deployment: all trilingual resumes live
- [x] A4 print optimization: spacing, padding, overflow fixes
- [x] Root-relative paths for GitHub Pages serving
- [x] PDF proof versions generated
- [ ] Mobile/responsive rendering for all resume variants

## Last Known State
- **Dashboard**: Generated HTML at `dist/dashboard_{de,en,es}.html` — template.html + build.js pipeline working
- **Translations**: DE (complete), EN (complete, reviewed), ES (complete)
- **Classic**: In its own repo `Pingarron-Bernardo-Lebenslauf-Kl`, Clean/ removed from this workspace
- **GitHub Repos**:
  - Dashboard: `B-Pingarron/B-Pingarron-Dashboard-Lebenslauf`
  - Classic: `B-Pingarron/Pingarron-Bernardo-Lebenslauf-Kl`
- **Latest deploy**: `d97f200` — absolute final production deploy of all trilingual resumes
- **Current branch**: `web_renderingDev`

## Blocked By
- Nothing currently blocked — active development on mobile rendering

## Recent Changes
- `d97f200` fix: absolute final production deploy of all trilingual resumes
- `8e3ba86` fix: restore dashboard from rescued template and deploy
- `5889f54` fix: use root-relative paths for classic resume links
- `71ad25` fix: tighten vertical spacing for perfect A4 print
- `d41e802` PDF proof versions up
- `64cc2c0` fix: add .nojekyll to allow serving dist folders on GH Pages
