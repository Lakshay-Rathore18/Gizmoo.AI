#!/usr/bin/env node
// Fetch curated Pexels clips for ambient background loops.
// Picks landscape HD (~1920x1080 or 1366x720), 5-15s duration.
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const KEY = '9nEi5RSrYAIEmnH1bzLVasTOOWido5xYtD4CSXntftvuDo3zo9UoKRCs';
const RAW_DIR = path.join(process.cwd(), 'public/videos/src/raw');
fs.mkdirSync(RAW_DIR, { recursive: true });

const QUERIES = {
  // Section 1 — Capability backdrop (FourAgents): clean tech/dashboard/code feel
  capability: [
    'abstract blue particles dark',
    'glowing neural network animation',
    'ai data visualization dark',
    'minimal abstract green light',
  ],
  // Section 2 — Trades / business B-roll (Demo or HowItWorks): real Australian-feeling work
  trades: [
    'plumber working hands closeup',
    'electrician installing tools',
    'small business owner phone call',
    'tradesman truck van australia',
  ],
  // Section 3 — CTA / closing: aspirational, calm, premium
  cta: [
    'sunrise city aerial slow',
    'cinematic ocean drone',
    'forest mist drone slow',
    'cinematic abstract gold light',
  ],
};

function getJSON(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { Authorization: KEY } }, (res) => {
        let buf = '';
        res.on('data', (c) => (buf += c));
        res.on('end', () => {
          try {
            resolve(JSON.parse(buf));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const f = fs.createWriteStream(dest);
    https
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          downloadFile(res.headers.location, dest).then(resolve, reject);
          return;
        }
        res.pipe(f);
        f.on('finish', () => f.close(() => resolve(dest)));
      })
      .on('error', (e) => {
        fs.unlink(dest, () => reject(e));
      });
  });
}

function pickBestFile(video) {
  // Prefer HD 1920 or 1366, mp4, 25fps preferred
  const files = video.video_files || [];
  const hd = files
    .filter((f) => f.file_type === 'video/mp4' && f.width >= 1280 && f.width <= 2048)
    .sort((a, b) => Math.abs(1920 - a.width) - Math.abs(1920 - b.width));
  if (hd.length) return hd[0];
  return files.find((f) => f.file_type === 'video/mp4');
}

async function fetchCategory(name, queries) {
  console.log(`\n=== ${name} ===`);
  const picked = [];
  for (const q of queries) {
    const u = `https://api.pexels.com/videos/search?query=${encodeURIComponent(q)}&per_page=6&orientation=landscape&size=medium`;
    try {
      const j = await getJSON(u);
      const candidates = (j.videos || []).filter(
        (v) => v.duration >= 5 && v.duration <= 25 && v.width >= 1280,
      );
      for (const c of candidates.slice(0, 2)) {
        const f = pickBestFile(c);
        if (!f) continue;
        const dest = path.join(RAW_DIR, `${name}-${c.id}.mp4`);
        if (fs.existsSync(dest)) {
          picked.push({ id: c.id, name, dest, duration: c.duration, w: f.width, h: f.height });
          continue;
        }
        try {
          console.log(`  fetching ${name}/${c.id} ${f.width}x${f.height} ${c.duration}s ${(f.size / 1024 / 1024).toFixed(1)}MB`);
          await downloadFile(f.link, dest);
          picked.push({ id: c.id, name, dest, duration: c.duration, w: f.width, h: f.height });
        } catch (e) {
          console.warn(`  failed ${c.id}: ${e.message}`);
        }
        if (picked.filter((p) => p.name === name).length >= 4) break;
      }
      if (picked.filter((p) => p.name === name).length >= 4) break;
    } catch (e) {
      console.warn(`query failed: ${q}: ${e.message}`);
    }
  }
  return picked;
}

(async () => {
  const all = {};
  for (const [name, queries] of Object.entries(QUERIES)) {
    all[name] = await fetchCategory(name, queries);
  }
  fs.writeFileSync(path.join(RAW_DIR, 'manifest.json'), JSON.stringify(all, null, 2));
  console.log('\nDone. Manifest:', path.join(RAW_DIR, 'manifest.json'));
})();
