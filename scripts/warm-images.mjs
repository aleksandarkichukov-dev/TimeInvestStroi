// Генерира предварително всички снимки (AVIF) във всички размери, за да ги получава посетителят
// от кеша на сървъра, а не да чака генерирането при първото отваряне.
// Пуска се на сървъра след обновяване: node scripts/warm-images.mjs [http://127.0.0.1:ПОРТ]
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "src/content/images.json"), "utf8"));
const config = fs.readFileSync(path.join(root, "next.config.ts"), "utf8");
const list = (name) => (config.match(new RegExp(`${name}:\\s*\\[([^\\]]*)\\]`))?.[1] ?? "").split(",").map(Number).filter(Boolean);

let base = process.argv[2];
if (!base) {
  const yml = fs.existsSync(path.join(root, "app.yml")) ? fs.readFileSync(path.join(root, "app.yml"), "utf8") : "";
  base = `http://127.0.0.1:${yml.match(/NODE_PORT:\s*(\d+)/)?.[1] ?? 3000}`;
}

const widths = [...list("imageSizes"), ...list("deviceSizes")];
const qualities = [75, 85];
const jobs = [];
// Браузърът може да поиска и размер, по-голям от оригинала, затова генерираме всички.
for (const src of Object.keys(manifest)) {
  for (const width of widths) {
    jobs.push(`${base}/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${qualities[0]}`);
  }
}
// Снимката в началото на сайта е с качество 85.
for (const width of list("deviceSizes")) jobs.push(`${base}/_next/image?url=${encodeURIComponent("/img/misc/hero-lake-house.webp")}&w=${width}&q=85`);

let done = 0;
let failed = 0;
const started = Date.now();
async function worker() {
  while (jobs.length) {
    const url = jobs.shift();
    try {
      const res = await fetch(url, { headers: { accept: "image/avif,image/webp,*/*" } });
      await res.arrayBuffer();
      if (!res.ok) failed++;
    } catch {
      failed++;
    }
    if (++done % 200 === 0) console.log(`${done} готови…`);
  }
}
const total = jobs.length;
console.log(`Генериране на ${total} снимки през ${base}`);
await Promise.all([worker(), worker()]);
console.log(`Готово: ${total - failed} от ${total} за ${Math.round((Date.now() - started) / 1000)} s${failed ? `, ${failed} грешки` : ""}`);
