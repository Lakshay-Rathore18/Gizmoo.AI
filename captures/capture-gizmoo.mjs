// Re-capture gizmoo.me with loading screen pre-dismissed
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const OUT = 'captures/gizmoo';
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
});
const page = await ctx.newPage();

// Pre-set sessionStorage so loading screen is skipped
await page.addInitScript(() => {
  try { sessionStorage.setItem('gizmoo-loaded', '1'); } catch (e) {}
});

const netLog = [];
page.on('request', r => netLog.push({ url: r.url(), method: r.method(), resourceType: r.resourceType() }));

console.log('[gizmoo] loading...');
await page.goto('https://gizmoo.me', { waitUntil: 'networkidle', timeout: 60000 }).catch(e => console.error('goto err', e.message));
await page.waitForTimeout(6000);

// Force-hide any remaining loading overlays
await page.evaluate(() => {
  document.querySelectorAll('[class*="loading" i], [class*="loader" i], [id*="loader" i]').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width > window.innerWidth * 0.5 && r.height > window.innerHeight * 0.5) {
      el.remove();
    }
  });
});
await page.waitForTimeout(1000);

const height = await page.evaluate(() => document.documentElement.scrollHeight);
console.log(`[gizmoo] height=${height}`);

await page.screenshot({ path: path.join(OUT, 'full.png'), fullPage: true, timeout: 120000 }).catch(e => console.error('fullpage err', e.message));

for (let pct = 0; pct <= 100; pct += 10) {
  await page.evaluate((p) => window.scrollTo({ top: document.documentElement.scrollHeight * (p / 100), behavior: 'instant' }), pct);
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(OUT, `scroll-${String(pct).padStart(3, '0')}.png`) });
}

await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
await page.waitForTimeout(800);

const styles = await page.evaluate(() => {
  const pick = (el) => {
    if (!el) return null;
    const s = getComputedStyle(el);
    const out = {};
    for (const k of ['backgroundColor','color','fontFamily','fontSize','fontWeight','letterSpacing','lineHeight','padding','margin','width','maxWidth','minHeight','display','gap','gridTemplateColumns','backdropFilter','filter','backgroundImage','borderRadius','textTransform']) out[k] = s[k];
    return out;
  };
  return {
    html: pick(document.documentElement),
    body: pick(document.body),
    main: pick(document.querySelector('main')),
    firstSection: pick(document.querySelector('section')),
    firstH1: pick(document.querySelector('h1')),
    firstH2: pick(document.querySelector('h2')),
    firstButton: pick(document.querySelector('button.btn-primary, a.btn-primary, button, a[class*="btn" i]')),
    nav: pick(document.querySelector('nav, header')),
    bodyText: document.body.innerText.slice(0, 2000),
    sectionCount: document.querySelectorAll('section').length,
    h1Text: [...document.querySelectorAll('h1')].map(e => e.innerText.slice(0, 200)),
    h2Text: [...document.querySelectorAll('h2')].map(e => e.innerText.slice(0, 200)).slice(0, 20),
  };
});
fs.writeFileSync(path.join(OUT, 'styles.json'), JSON.stringify(styles, null, 2));

console.log('[gizmoo] done');
await browser.close();
