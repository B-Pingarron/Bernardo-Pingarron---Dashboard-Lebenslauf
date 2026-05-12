# Dashboard Chart Migration — Canvas JS → HTML/CSS

**Status:** COMPLETE ✅
**Started:** May 12, 2026
**Plan:** `.sisyphus/plans/2026-05-12-html-css-chart-migration.md`

---

## Why We're Doing This

Akasha (quality gate) identified that the template uses **3 rendering methods** for charts:

| Method | Charts | Print | Animated | Translatable | Testable |
|--------|--------|-------|----------|--------------|----------|
| HTML/CSS (PIP) | 1 | ✅ | ❌ | ✅ | ✅ |
| Canvas JS (Radar/Donut/Timeline) | 4 | ❌ | ✅ | ✅ | ❌ |
| Matplotlib SVGs (Orphaned) | 0 | ✅ | ❌ | ❌ | ❌ |

**Verdict:** Canvas fails the print test. A resume must print perfectly. HTML/CSS passes every test.

---

## What Changes

| Before | After |
|--------|-------|
| 5 Canvas elements | 3 inline SVGs + 1 CSS ring + 1 CSS grid |
| ~220 lines of JS | 0 lines of JS |
| Raster on print | Vector on print |
| 3 rendering methods | 1 rendering method (HTML/CSS) |
| `CHART_DATA` script injection | Pure `{{placeholder}}` replacement |

---

## File Inventory

### Files Modified

| File | Changes |
|------|---------|
| `src/template.html` | Replace Canvas elements with HTML/CSS equivalents, remove `<script>` block |
| `translations/de.json` | Add `radar_*_axis_*` keys, `donut_seg_*_pct` keys, remove `chart_data` |
| `translations/en.json` | Same as de.json |
| `translations/es.json` | Same as de.json |
| `scripts/build.js` | Remove CHART_DATA injection, simplify to placeholder-only |

### Files Deleted

| File | Reason |
|------|--------|
| `output/donut.svg` | Orphaned — notebook can regenerate |
| `output/kpi.svg` | Orphaned — notebook can regenerate |
| `output/pip.svg` | Orphaned — notebook can regenerate |
| `output/radar_beruflich.svg` | Orphaned — notebook can regenerate |
| `output/radar_persoenlich.svg` | Orphaned — notebook can regenerate |
| `output/radar_soft_skills.svg` | Orphaned — notebook can regenerate |
| `output/timeline.svg` | Orphaned — notebook can regenerate |

### Files Kept (Unchanged)

| File | Reason |
|------|--------|
| `generate_charts.ipynb` | Data source / analysis notebook — mini-project for later |
| `package.json` | Already exists, no changes needed |
| `data/*.json` | Source data files — used by notebook |

---

## Rendering Methods — Before & After

### Radar Charts (3×)

**Before:** Canvas JS — `drawRadar()` function, ~40 lines, animated polygon

**After:** Inline SVG — `<polygon>` elements, static, vector quality

```html
<!-- Each radar becomes an inline SVG -->
<svg class="radar-svg" viewBox="0 0 230 168">
  <!-- Grid hexagons at 33%, 66%, 100% -->
  <polygon class="grid-line" points="..."/>
  <polygon class="grid-line" points="..."/>
  <polygon class="grid-line-outer" points="..."/>
  
  <!-- Axis lines from center to vertices -->
  <line class="axis-line" x1="115" y1="90" x2="115" y2="20"/>
  
  <!-- Data shape -->
  <polygon class="radar-shape" fill="rgba(45,80,22,0.14)" stroke="#2D5016" points="..."/>
  
  <!-- Dots at vertices -->
  <circle class="radar-dot" cx="..." cy="..." fill="#2D5016"/>
  
  <!-- Labels -->
  <text class="radar-label" x="115" y="10">{{radar_1_axis_1}}</text>
</svg>
```

### Donut Chart (1×)

**Before:** Canvas JS — `drawDonut()` function, ~20 lines, animated arc segments

**After:** CSS `conic-gradient` — single div, zero JS

```html
<div class="donut-wrap">
  <div class="donut-ring"></div>
  <div class="donut-center">
    <div class="donut-center-num">10+</div>
    <div class="donut-center-lbl">{{donut_text}}</div>
  </div>
</div>
```

```css
.donut-ring {
  width: 106px;
  height: 106px;
  border-radius: 50%;
  background: conic-gradient(
    var(--gold) 0% 65%,
    var(--forest) 65% 85%,
    var(--crimson) 85% 100%
  );
  -webkit-mask: radial-gradient(transparent 30px, #000 31px, #000 42px, transparent 43px);
  mask: radial-gradient(transparent 30px, #000 31px, #000 42px, transparent 43px);
}
```

### Timeline (1×)

**Before:** Canvas JS — `drawTimeline()` function, ~160 lines, animated lollipop stems

**After:** CSS grid with positioned elements — pure layout

```html
<div class="timeline-chart">
  <div class="timeline-axis"></div>
  <div class="timeline-year" style="left: calc(24px + (0/12) * (100% - 48px))">2013</div>
  
  <div class="timeline-role" style="left: ...; top: ...;">
    <div class="timeline-stem" style="height: 38px; color: var(--gold);"></div>
    <div class="timeline-dot" style="background: var(--gold);"></div>
    <div class="timeline-bar" style="width: 69px; background: var(--gold);"></div>
    <div class="timeline-label">
      <div class="timeline-label-name" style="color: var(--gold);">{{timeline_role_1_name}}</div>
      <div class="timeline-label-sub">{{timeline_role_1_sub}}</div>
    </div>
  </div>
</div>
```

---

## Translation Keys — New additions

### Radar axis labels (15 keys per language)

```
radar_1_axis_1 through radar_1_axis_5  (Professional: 5 axes)
radar_2_axis_1 through radar_2_axis_6  (Personal: 6 axes)
radar_3_axis_1 through radar_3_axis_5  (Soft Skills: 5 axes)
```

### Donut segment percentages (3 keys per language)

```
donut_seg_1_pct: "65"
donut_seg_2_pct: "20"
donut_seg_3_pct: "15"
```

### Timeline role labels (16 keys per language — 8 roles × 2 fields)

```
timeline_role_1_name through timeline_role_8_name
timeline_role_1_sub through timeline_role_8_sub
```

**Note:** Role names (Casa Negra, Kink Bar, etc.) are proper nouns — same across languages. Only `sub` fields need translation.

---

## Build System Changes

### Before
```javascript
// build.js injects CHART_DATA as <script> tag
if (translations.chart_data) {
    const chartDataScript = `<script>\nconst CHART_DATA = ${JSON.stringify(translations.chart_data)};\n<\/script>`;
    html = html.replace('<body>', `<body>\n${chartDataScript}`);
}
```

### After
```javascript
// build.js only does {{placeholder}} replacement — no special cases
Object.entries(translations).forEach(([key, value]) => {
    html = html.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
});
```

---

## Task Progress

| Task | Status | Commit |
|------|--------|--------|
| 1. Delete orphaned SVGs | ✅ Done | `a54eff8` |
| 2. Add chart label keys to JSONs | ✅ Done | `1b2f191` |
| 3. Replace Canvas radars with inline SVG | ✅ Done | `5818fc0` |
| 4. Replace Canvas donut with CSS conic-gradient | ✅ Done | `5818fc0` |
| 5. Replace Canvas timeline with CSS grid | ✅ Done | `5818fc0` |
| 6. Simplify build.js | ✅ Done | `5818fc0` |
| 7. Remove `<script>` from template | ✅ Done | `5818fc0` |
| 8. Final verification | ✅ Done | — |

---

## How to Verify

After migration, open `dist/dashboard_{de,en,es}.html` in browser and check:

1. **Radar charts** — 3 hexagonal grids with colored polygons, axis labels in correct language
2. **Donut chart** — colored ring with "10+" center, 3 legend rows
3. **Timeline** — 8 lollipop roles above/below axis, year labels
4. **Print preview** — File → Print → All content fits on one A4 page, vector quality
5. **No console errors** — F12 → Console → Should be empty
6. **All text translated** — DE/EN/ES all show correct language

---

*Last updated: May 12, 2026*
