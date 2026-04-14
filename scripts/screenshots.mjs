#!/usr/bin/env node
/**
 * Capture full-page screenshots of gizmoo.me (desktop + mobile).
 * Usage: npx playwright install chromium && node scripts/screenshots.mjs
 */
import { chromium } from 'playwright';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'screenshots');
const url = 'https://gizmoo.me';

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

async function run() {
  const browser = await chromium.launch();

  for (const vp of viewports) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    // Dismiss cookie banner if visible
    const banner = page.locator('button:has-text("Accept")');
    if (await banner.isVisible({ timeout: 2000 }).catch(() => false)) {
      await banner.click();
      await page.waitForTimeout(500);
    }
    const path = join(outDir, `gizmoo-${vp.name}-${new Date().toISOString().slice(0, 10)}.png`);
    await page.screenshot({ path, fullPage: true });
    console.log(`Saved ${path}`);
    await ctx.close();
  }

  await browser.close();
}

run().catch((e) => { console.error(e); process.exit(1); });
