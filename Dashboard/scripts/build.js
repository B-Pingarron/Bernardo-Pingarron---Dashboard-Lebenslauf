const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '../src/template.html');
const translationsDir = path.join(__dirname, '../translations');
const outputDir = path.join(__dirname, '../dist');

// Create dist dir if missing
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// Read template once
const template = fs.readFileSync(templatePath, 'utf8');

// Extract all {{placeholder}} keys from template for validation
const templateKeys = [...new Set(
    (template.match(/\{\{(\w+)\}\}/g) || []).map(m => m.replace(/\{\{|\}\}/g, ''))
)];

console.log(`Template has ${templateKeys.length} unique placeholders`);

// Collect all translation files and validate consistency
const translationFiles = fs.readdirSync(translationsDir)
    .filter(f => f.endsWith('.json'))
    .map(f => path.join(translationsDir, f));

const allTranslations = {};
let referenceKeys = null;

for (const file of translationFiles) {
    const lang = path.basename(file, '.json');
    let raw;

    try {
        raw = fs.readFileSync(file, 'utf8');
    } catch (err) {
        console.error(`\nERROR: Cannot read ${file}`);
        console.error(err.message);
        process.exit(1);
    }

    try {
        allTranslations[lang] = JSON.parse(raw);
    } catch (err) {
        console.error(`\nERROR: Malformed JSON in ${file}`);
        console.error(err.message);
        process.exit(1);
    }

    const keys = Object.keys(allTranslations[lang]).filter(k => k !== 'chart_data');

    // First file becomes reference for key consistency
    if (!referenceKeys) {
        referenceKeys = { lang, keys: new Set(keys) };
    } else {
        // Check that all languages have the same keys
        const missingInThis = [...referenceKeys.keys].filter(k => !keys.includes(k));
        const extraInThis = keys.filter(k => !referenceKeys.keys.has(k));

        if (missingInThis.length > 0) {
            console.error(`\nERROR: ${lang}.json is missing keys present in ${referenceKeys.lang}.json:`);
            console.error(`  ${missingInThis.join(', ')}`);
            process.exit(1);
        }
        if (extraInThis.length > 0) {
            console.warn(`WARNING: ${lang}.json has extra keys not in ${referenceKeys.lang}.json:`);
            console.warn(`  ${extraInThis.join(', ')}`);
        }
    }

    // Validate that all template placeholders have matching JSON keys
    const jsonKeys = new Set(keys);
    const missingFromJson = templateKeys.filter(k => !jsonKeys.has(k));

    if (missingFromJson.length > 0) {
        console.error(`\nERROR: ${lang}.json is missing keys for template placeholders:`);
        console.error(`  ${missingFromJson.join(', ')}`);
        process.exit(1);
    }

    console.log(`✓ ${lang}.json — ${keys.length} keys validated`);
}

// Build each language
console.log('\n--- Building ---');

for (const [lang, translations] of Object.entries(allTranslations)) {
    let html = template;

    // Replace {{placeholder}} patterns with translated values
    Object.entries(translations).forEach(([key, value]) => {
        html = html.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
    });

    // Post-build: verify no {{placeholders}} remain
    const remaining = html.match(/\{\{(\w+)\}\}/g);
    if (remaining) {
        console.error(`\nERROR: ${lang}.html has unresolved placeholders:`);
        console.error(`  ${remaining.join(', ')}`);
        process.exit(1);
    }

    const outputPath = path.join(outputDir, `dashboard_${lang}.html`);
    fs.writeFileSync(outputPath, html, 'utf8');
    console.log(`✓ Generated ${outputPath}`);
}

console.log('\nbuild complete');
