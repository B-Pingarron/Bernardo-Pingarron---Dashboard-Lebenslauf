const fs = require("fs"); const path = require("path");

const translationsDir = path.join(__dirname, "..", "translations");
const outputDir = path.join(__dirname, "..", "dist");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
fs.mkdirSync(path.join(outputDir, "mobile"), { recursive: true });

const translationFiles = fs.readdirSync(translationsDir).filter(f => f.endsWith(".json")).map(f => path.join(translationsDir, f));
const allTranslations = {};
for (const file of translationFiles) { const lang = path.basename(file, ".json"); allTranslations[lang] = JSON.parse(fs.readFileSync(file, "utf8")); }

function buildTemplate(templatePath, outPathFn) {
  const template = fs.readFileSync(templatePath, "utf8");
  for (const [lang, translations] of Object.entries(allTranslations)) {
    let html = template;
    Object.entries(translations).forEach(([key, value]) => {
      html = html.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value);
    });
    fs.writeFileSync(outPathFn(lang, translations), html, "utf8");
  }
}

// Desktop
buildTemplate(
  path.join(__dirname, "..", "src", "template.html"),
  (lang) => path.join(outputDir, `dashboard_${lang}.html`)
);

// Mobile
buildTemplate(
  path.join(__dirname, "..", "src", "template-mobile.html"),
  (lang) => path.join(outputDir, "mobile", `dashboard_${lang}.html`)
);

console.log("Dashboard build complete");
