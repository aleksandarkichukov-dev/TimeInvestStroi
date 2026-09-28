// Обработка на снимките: media-src/** (оригинали) -> public/img/** (WebP, макс. 2000px)
// и генериране на манифест src/content/images.json (ширина, височина, blur placeholder).
//
// Употреба: npm run images
// Добавяне на нов проект: сложете снимките в media-src/projects/<slug>/ и пуснете скрипта.

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "media-src");
const OUT = path.join(ROOT, "public", "img");
const MANIFEST = path.join(ROOT, "src", "content", "images.json");
const MAX = 2000;
const EXT = /\.(jpe?g|png|webp|avif|tiff?)$/i;

async function walk(dir) {
  let entries = [];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const files = await Promise.all(
    entries.map((e) => {
      const p = path.join(dir, e.name);
      return e.isDirectory() ? walk(p) : EXT.test(e.name) ? [p] : [];
    }),
  );
  return files.flat();
}

async function convert(file) {
  const rel = path.relative(SRC, file).replace(EXT, ".webp");
  const dest = path.join(OUT, rel);
  const [srcStat, destStat] = await Promise.all([fs.stat(file), fs.stat(dest).catch(() => null)]);
  if (destStat && destStat.mtimeMs >= srcStat.mtimeMs) return;
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await sharp(file)
    .rotate()
    .resize(MAX, MAX, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(dest);
}

async function pool(items, size, fn) {
  let i = 0;
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (i < items.length) await fn(items[i++]);
    }),
  );
}

const sources = await walk(SRC);
await pool(sources, 8, convert);

const manifest = {};
const outputs = (await walk(OUT)).filter((f) => f.endsWith(".webp")).sort();
await pool(outputs, 8, async (file) => {
  const img = sharp(file);
  const { width, height } = await img.metadata();
  const blur = await img.clone().resize(16, 16, { fit: "inside" }).webp({ quality: 40 }).toBuffer();
  const key = "/" + path.relative(path.join(ROOT, "public"), file).split(path.sep).join("/");
  manifest[key] = { w: width, h: height, blur: `data:image/webp;base64,${blur.toString("base64")}` };
});

const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]));
await fs.mkdir(path.dirname(MANIFEST), { recursive: true });
await fs.writeFile(MANIFEST, JSON.stringify(sorted, null, 1) + "\n");
console.log(`✓ ${sources.length} оригинала, ${outputs.length} изображения в манифеста`);
