// Build garden.jtwebman.com: render plan.md -> public/index.html
// Usage: npm run build
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

const md = readFileSync("plan.md", "utf8");
const template = readFileSync("src/template.html", "utf8");
const styles = readFileSync("src/styles.css", "utf8");

let content = marked.parse(md);

// Wrap tables so wide ones scroll inside their own box instead of the whole page.
content = content
  .replace(/<table>/g, '<div class="tablewrap"><table>')
  .replace(/<\/table>/g, "</table></div>");

// Page title = text of the first H1.
const h1 = md.match(/^#\s+(.+?)\s*$/m);
const title = h1 ? h1[1].trim() : "Garden Plan";
const year = String(new Date().getFullYear());

// Function replacers avoid `$`-pattern interpretation in the injected strings.
const html = template
  .replaceAll("{{title}}", () => title)
  .replaceAll("{{year}}", () => year)
  .replace("{{styles}}", () => styles)
  .replace("{{content}}", () => content);

mkdirSync("public", { recursive: true });
writeFileSync("public/index.html", html);
console.log(`Built public/index.html — ${html.length.toLocaleString()} bytes, title: "${title}"`);
