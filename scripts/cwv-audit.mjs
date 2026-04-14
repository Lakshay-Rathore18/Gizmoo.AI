#!/usr/bin/env node
/**
 * Measure Core Web Vitals via Playwright using browser Performance APIs.
 * Usage: node scripts/cwv-audit.mjs
 */
import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'screenshots');
const url = 'https://gizmoo.me';

async function measureCWV(page) {
  // Inject web-vitals measurement before navigation
  await page.addInitScript(() => {
    window.__cwv = {};
    // CLS observer
    new PerformanceObserver((list) => {
      let cls = 0;
      for (const entry of list.getEntries()) cls += entry.value;
      window.__cwv.cls = cls;
    }).observe({ type: 'layout-shift', buffered: true });
    // LCP observer
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      window.__cwv.lcp = entries[entries.length - 1]?.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  });

  await page.goto(url, { waitUntil: 'networkidle' });

  // Wait a bit for all metrics to settle
  await page.waitForTimeout(3000);

  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    const fcp = paint.find(p => p.name === 'first-contentful-paint');

    return {
      fcp: fcp ? Math.round(fcp.startTime) : null,
      lcp: window.__cwv.lcp ? Math.round(window.__cwv.lcp) : null,
      cls: window.__cwv.cls != null ? parseFloat(window.__cwv.cls.toFixed(4)) : null,
      ttfb: nav ? Math.round(nav.responseStart) : null,
      domContentLoaded: nav ? Math.round(nav.domContentLoadedEventEnd) : null,
      loadComplete: nav ? Math.round(nav.loadEventEnd) : null,
      transferSize: nav ? nav.transferSize : null,
      domInteractive: nav ? Math.round(nav.domInteractive) : null,
    };
  });

  // TBT: measure long tasks
  const tbt = await page.evaluate(() => {
    return new Promise(resolve => {
      let total = 0;
      const obs = new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          total += Math.max(0, e.duration - 50);
        }
      });
      obs.observe({ type: 'longtask', buffered: true });
      setTimeout(() => { obs.disconnect(); resolve(Math.round(total)); }, 1000);
    });
  });
  metrics.tbt = tbt;

  return metrics;
}

async function checkAccessibility(page) {
  return page.evaluate(() => {
    const issues = [];
    // Images without alt
    document.querySelectorAll('img:not([alt])').forEach(img =>
      issues.push(`img missing alt: ${img.src.slice(0, 80)}`));
    // Buttons without accessible name
    document.querySelectorAll('button').forEach(btn => {
      if (!btn.textContent?.trim() && !btn.getAttribute('aria-label'))
        issues.push('button without accessible name');
    });
    // Links without text
    document.querySelectorAll('a').forEach(a => {
      if (!a.textContent?.trim() && !a.getAttribute('aria-label'))
        issues.push(`link without text: ${a.href?.slice(0, 60)}`);
    });
    // Missing lang attribute
    if (!document.documentElement.lang) issues.push('html missing lang attribute');
    // Color contrast (basic check for text readability)
    const meta = document.querySelector('meta[name="viewport"]');
    if (!meta) issues.push('missing viewport meta tag');
    // Skip link check
    const skipLink = document.querySelector('a[href="#main-content"]');
    if (!skipLink) issues.push('missing skip-to-content link');
    return { total: issues.length, issues };
  });
}

async function checkSEO(page) {
  return page.evaluate(() => {
    const checks = {};
    checks.title = !!document.title;
    checks.metaDescription = !!document.querySelector('meta[name="description"]');
    checks.canonical = !!document.querySelector('link[rel="canonical"]');
    checks.ogTitle = !!document.querySelector('meta[property="og:title"]');
    checks.ogDescription = !!document.querySelector('meta[property="og:description"]');
    checks.ogImage = !!document.querySelector('meta[property="og:image"]');
    checks.robots = !!document.querySelector('meta[name="robots"]');
    checks.structuredData = document.querySelectorAll('script[type="application/ld+json"]').length;
    checks.h1Count = document.querySelectorAll('h1').length;
    checks.geoRegion = !!document.querySelector('meta[name="geo.region"]');
    checks.geoPlacename = !!document.querySelector('meta[name="geo.placename"]');
    checks.speakable = document.querySelector('script[type="application/ld+json"]')?.textContent?.includes('SpeakableSpecification');
    return checks;
  });
}

async function run() {
  const browser = await chromium.launch();

  // Desktop audit
  console.log('=== Core Web Vitals Baseline — gizmoo.me ===');
  console.log('Date:', new Date().toISOString());
  console.log();

  for (const profile of ['desktop', 'mobile']) {
    const vp = profile === 'desktop'
      ? { width: 1440, height: 900 }
      : { width: 390, height: 844 };
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 2 });
    const page = await ctx.newPage();

    const cwv = await measureCWV(page);
    const a11y = await checkAccessibility(page);
    const seo = await checkSEO(page);

    console.log(`--- ${profile.toUpperCase()} (${vp.width}x${vp.height}) ---`);
    console.log(`  FCP  : ${cwv.fcp}ms`);
    console.log(`  LCP  : ${cwv.lcp}ms`);
    console.log(`  TBT  : ${cwv.tbt}ms`);
    console.log(`  CLS  : ${cwv.cls}`);
    console.log(`  TTFB : ${cwv.ttfb}ms`);
    console.log(`  DOM Interactive  : ${cwv.domInteractive}ms`);
    console.log(`  DOM Loaded       : ${cwv.domContentLoaded}ms`);
    console.log(`  Full Load        : ${cwv.loadComplete}ms`);
    console.log();
    console.log(`  Accessibility issues: ${a11y.total}`);
    if (a11y.issues.length) a11y.issues.forEach(i => console.log(`    - ${i}`));
    console.log();
    console.log(`  SEO checks:`, JSON.stringify(seo, null, 2).split('\n').join('\n  '));
    console.log();

    if (profile === 'desktop') {
      // Save full report
      const report = { date: new Date().toISOString(), url, desktop: { cwv, a11y, seo } };
      writeFileSync(join(outDir, 'cwv-baseline.json'), JSON.stringify(report, null, 2));
    }

    await ctx.close();
  }

  await browser.close();
  console.log('Report saved to screenshots/cwv-baseline.json');
}

run().catch((e) => { console.error(e); process.exit(1); });
