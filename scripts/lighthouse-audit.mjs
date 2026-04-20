#!/usr/bin/env node
/**
 * Run Lighthouse via Playwright's Chromium and save results.
 * Usage: node scripts/lighthouse-audit.mjs
 */
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'screenshots');

const chromePath = 'C:\\Users\\roidr\\AppData\\Local\\ms-playwright\\chromium-1217\\chrome-win64\\chrome.exe';

async function run() {
  const chrome = await launch({
    chromePath,
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
  });

  const result = await lighthouse('https://gizmoo.me', {
    port: chrome.port,
    output: ['json', 'html'],
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  });

  writeFileSync(join(outDir, 'lighthouse-baseline.report.json'), result.report[0]);
  writeFileSync(join(outDir, 'lighthouse-baseline.report.html'), result.report[1]);

  const cats = result.lhr.categories;
  console.log('=== Lighthouse Baseline — gizmoo.me ===');
  for (const [k, v] of Object.entries(cats)) {
    console.log(`  ${k.padEnd(20)}: ${Math.round(v.score * 100)}/100`);
  }

  const a = result.lhr.audits;
  console.log('\nCore Web Vitals:');
  console.log('  FCP  :', a['first-contentful-paint']?.displayValue ?? 'n/a');
  console.log('  LCP  :', a['largest-contentful-paint']?.displayValue ?? 'n/a');
  console.log('  TBT  :', a['total-blocking-time']?.displayValue ?? 'n/a');
  console.log('  CLS  :', a['cumulative-layout-shift']?.displayValue ?? 'n/a');
  console.log('  SI   :', a['speed-index']?.displayValue ?? 'n/a');

  await chrome.kill().catch(() => {});
}

run().catch((e) => { console.error(e); process.exit(1); });
