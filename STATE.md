# Resume - State

## Current Focus
- Dashboard resume: DE ✅ done, EN 📝 draft (needs review), ES ⏳ pending
- Classic resume: DE ✅ done, EN ⏳ pending, ES ⏳ pending
- Updating all Context/State files to preserve context between sessions

## Active Tasks
- [ ] Review `dashboard_en.html` draft (status: needs review per RESUME_SPECS.md)
- [ ] Create `classic_en.html` from `classic_de.html` (text-based classic resume)
- [ ] Create `classic_es.html` and `dashboard_es.html` (Spanish versions)
- [ ] Deploy Dashboard repo to GitHub Pages: `B-Pingarron/B-Pingarron-Dashboard-Lebenslauf`
- [ ] Deploy Classic repo to GitHub Pages: `B-Pingarron/Pingarron-Bernardo-Lebenslauf-Kl`

## Last Known State
- **Dashboard notebook**: `Dashboard/generate_charts.ipynb` last executed 2026-04-29
  - Generates 7 SVGs: timeline.svg, radar_beruflich.svg, radar_persoenlich.svg, radar_soft_skills.svg, donut.svg, pip.svg, kpi.svg
  - Data source: `Dashboard/data/*.json` (7 JSON files)
- **Dashboard build**: `Dashboard/scripts/build.js`
  - Reads `src/template.html` + `translations/{de,en,es}.json`
  - Outputs `dist/dashboard_{de,en,es}.html`
- **Classic resume**: `Clean/classic_de.html` (325 lines, German, complete)
- **Specs**: `RESUME_SPECS.md` defines naming conventions and workflow

## Blocked By
- None

## Recent Changes
- 2026-04-29: Context/State files update initiative started
- 2026-04-29: `generate_charts.ipynb` executed, all 7 SVGs regenerated
- 2026-04-28: Dashboard build system design spec created (Momus-approved plan ready)
