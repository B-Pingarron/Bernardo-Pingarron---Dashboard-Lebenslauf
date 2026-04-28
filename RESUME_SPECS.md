# Resume Project Specifications

## Overview
This directory contains two versions of Bernardo Pingarrón's resume:
- **Classic**: Text-based, traditional resume format
- **Dashboard**: Visual, dashboard-style resume with graphics and interactive elements

Both versions will be hosted as separate GitHub Pages repositories and are being prepared for multilingual support (German, English, Spanish).

---

## Directory Structure

```
05_JobHunt/Resume/
├── Clean/                          # Classic/text-based resume
│   ├── classic_de.html            # German version (main file)
│   ├── LICENSE                    # License file
│   └── [future: classic_en.html]  # English version (pending)
│   └── [future: classic_es.html]  # Spanish version (pending)
│
├── Dashboard/                      # Visual/dashboard resume
│   ├── dashboard_de.html          # German version (main file)
│   ├── dashboard_en.html          # English version (draft - needs review)
│   ├── LICENSE                    # License file
│   ├── components/                # Reusable HTML components
│   │   └── bernardo_resume_p1.html  # Early version component
│   ├── versions/                  # Historical versions for reference
│   │   └── v1/
│   │       └── bernardo_strengths_radar.html  # Unused radar component
│   └── Graphics/                  # All image assets
│       ├── donut_erfahrung.png
│       ├── linkedin_banner.png
│       ├── linkedin_banner_preview.png
│       ├── Radar1.png
│       ├── radar_beruflich.png
│       ├── radar_persoenlich.png
│       ├── timeline_karriere.png
│       └── Radar work competencies.svg
│
└── pdfs/                          # PDF exports organized by language
    ├── de/                        # German PDFs
    │   ├── classic_clean.pdf
    │   ├── classic_clean_test1.pdf
    │   ├── pingarron_bernardo_lebenslauf.pdf
    │   ├── dashboard_v2.pdf
    │   ├── dashboard_oldpurple.pdf
    │   └── cv.pdf
    ├── en/                        # English PDFs (pending)
    └── es/                        # Spanish PDFs (pending)
```

---

## File Naming Convention

**Pattern**: `{type}_{language}.html`

| Type | Description |
|------|-------------|
| `classic` | Text-based, traditional resume |
| `dashboard` | Visual, dashboard-style resume |

| Language | Code |
|----------|------|
| German | `de` |
| English | `en` |
| Spanish | `es` |

**Examples**:
- `classic_de.html` - Classic resume in German
- `dashboard_en.html` - Dashboard resume in English
- `classic_es.html` - Classic resume in Spanish

---

## GitHub Repositories

### Dashboard Resume
- **URL**: https://github.com/B-Pingarron/B-Pingarron-Dashboard-Lebenslauf
- **Contents**: Dashboard version with all language variants
- **Structure**: Root HTML files + components/ + Graphics/ + LICENSE

### Classic Resume
- **URL**: https://github.com/B-Pingarron/Pingarron-Bernardo-Lebenslauf-Kl
- **Contents**: Classic version with all language variants
- **Structure**: Root HTML files + LICENSE
- **Note**: PDFs are stored in the main `Resume/pdfs/` directory, not in the repo

---

## Translation Workflow

### Current Status
| File | Status |
|------|--------|
| `classic_de.html` | ✓ Complete |
| `classic_en.html` | ✗ Pending |
| `classic_es.html` | ✗ Pending |
| `dashboard_de.html` | ✓ Complete |
| `dashboard_en.html` | ⚠ Draft (needs review) |
| `dashboard_es.html` | ✗ Pending |

### Process
1. Review and complete `dashboard_en.html` for spelling and layout
2. Create `classic_en.html` from `classic_de.html`
3. Create `classic_es.html` from `classic_de.html`
4. Create `dashboard_es.html` from `dashboard_de.html`
5. Validate all links, paths, and references after translation

---

## Component Organization

### Dashboard Components
- **`components/`**: Contains reusable HTML components used in the dashboard
- **`versions/`**: Historical versions kept for reference but not actively used
- **`Graphics/`**: All image assets (PNG, SVG) used in the dashboard

### Notes
- `bernardo_strengths_radar.html` is NOT referenced in the current dashboard HTML
- `Radar work competencies.svg` has been moved to Graphics folder
- Early version files are preserved in `versions/v1/` for historical reference

---

## PDF Strategy

PDFs are stored centrally in `05_JobHunt/Resume/pdfs/` organized by language, not in individual GitHub repositories. This keeps the repos clean and focused on the HTML/CSS source files.

When ready to publish:
1. Export HTML to PDF in each language
2. Place in corresponding language folder (`de/`, `en/`, `es/`)
3. Optionally link to PDFs from the HTML resumes

---

## Next Steps

1. [ ] Complete/review `dashboard_en.html`
2. [ ] Create `classic_en.html`
3. [ ] Create `classic_es.html`
4. [ ] Create `dashboard_es.html`
5. [ ] Validate all internal links and image paths
6. [ ] Prepare initial commits for both GitHub repositories
7. [ ] Deploy to GitHub Pages

---

*Last updated: April 3, 2026*
*Session: Resume reorganization and internationalization planning*
