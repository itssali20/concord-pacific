/*
 * Creates smaller copies of every image in public/images (640, 1280 and 1920 px wide)
 * in public/img-sizes, so phones and tablets download an appropriately sized file.
 * Also records each original's width in src/data/image-widths.json for srcset.
 * Runs automatically before `npm run dev` and `npm run build`; unchanged images are skipped.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = path.join(root, 'public', 'images')
const out = path.join(root, 'public', 'img-sizes')
const manifest = path.join(root, 'src', 'data', 'image-widths.json')
const STEPS = [640, 1280, 1920]

const widths = {}
let made = 0
for (const file of fs.readdirSync(src).filter((f) => f.endsWith('.webp') && !f.startsWith('logo')).sort()) {
  const name = file.slice(0, -5)
  const input = path.join(src, file)
  const { width } = await sharp(input).metadata()
  widths[name] = width
  const mtime = fs.statSync(input).mtimeMs
  for (const step of STEPS.filter((s) => s < width)) {
    const dest = path.join(out, String(step), file)
    if (fs.existsSync(dest) && fs.statSync(dest).mtimeMs >= mtime) continue
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    await sharp(input).resize({ width: step }).webp({ quality: 78 }).toFile(dest)
    made++
  }
}
const json = `${JSON.stringify(widths, null, 2)}\n`
if (!fs.existsSync(manifest) || fs.readFileSync(manifest, 'utf8') !== json) fs.writeFileSync(manifest, json)
console.log(`Responsive images: ${Object.keys(widths).length} originals, ${made} new resized copies`)
