import fs from "fs";
import path from "path";

const languages = {};

export function loadLanguages() {
  const dir = path.resolve("src/i18n");
  fs.readdirSync(dir).forEach(file => {
    if (file.endsWith(".json")) {
      const lang = file.replace(".json", "");
      languages[lang] = JSON.parse(fs.readFileSync(path.join(dir, file), "utf-8"));
    }
  });
}

// Very simple lookup with dot notation: "start.welcome"
export function t(ctx, key, vars = {}) {
  const lang = ctx.session?.lang || "pt";
  const text = key.split(".").reduce((obj, k) => obj?.[k], languages[lang]) || key;
  return Object.keys(vars).reduce((str, v) => str.replace(`{{${v}}}`, vars[v]), text);
}
