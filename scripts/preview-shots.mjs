// Cinematic preview screenshots for the redesign — 4 viewports x full-page.
// Saves to ./preview/<viewport>.png so they can be reviewed alongside the site.
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const URL = process.env.PREVIEW_URL || 'http://localhost:3001/';
const OUT = path.resolve('preview');
await mkdir(OUT, { recursive: true });

const viewports = [
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1280', width: 1280, height: 832 },
  { name: 'desktop-1920', width: 1920, height: 1080 },
];

const browser = await chromium.launch();
try {
  for (const v of viewports) {
    const ctx = await browser.newContext({
      viewport: { width: v.width, height: v.height },
      deviceScaleFactor: 1,
      reducedMotion: 'no-preference',
    });
    const page = await ctx.newPage();
    page.on('pageerror', (err) => console.error(`[${v.name}] pageerror:`, err.message));
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
    // Let kinetic + scroll-linked transforms settle
    await page.waitForTimeout(900);

    // Above-the-fold shot
    await page.screenshot({
      path: path.join(OUT, `${v.name}-fold.png`),
      fullPage: false,
    });
    // Full-page shot — pause animations to avoid mid-frame capture
    await page.addStyleTag({ content: `*,*::before,*::after{animation-play-state:paused !important; transition-duration:0s !important;}` });
    await page.screenshot({
      path: path.join(OUT, `${v.name}-full.png`),
      fullPage: true,
    });
    console.log(`[${v.name}] ${v.width}x${v.height} → fold + full saved`);
    await ctx.close();
  }
} finally {
  await browser.close();
}
console.log('OK preview shots written to ./preview');
