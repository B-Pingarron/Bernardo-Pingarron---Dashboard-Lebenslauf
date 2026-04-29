const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '../src/template.html');
const translationsDir = path.join(__dirname, '../translations');
const outputDir = path.join(__dirname, '../dist');

// Create dist dir if missing
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// Read template once //
const template = fs.readFileSync(templatePath, 'utf8'); 

// Process each translation file
fs.readdirSync(translationsDir).forEach(file => {
    if(!file.endsWith('.json')) return;

    const lang = path.basename(file, '.json');
    const translations = JSON.parse(fs.readFileSync(path.join(translationsDir, file), 'utf8'));

    let html = template;
    Object.entries(translations).forEach(([key, value]) => {
        html = html.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
    });
    html = html.replace('{{lang}}', lang);

   const outputPath = path.join(outputDir, `dashboard_${lang}.html`);
    fs.writeFileSync(outputPath, html, 'utf8');
    console.log(`Generated ${outputPath}`);
});

console.log('build complete');