// Re-capture nk.studio — skip full-page screenshot (21k tall), use load event, longer timeouts
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const OUT = 'captures/nk';
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
});
ctx.setDefaultTimeout(120000);
const page = await ctx.newPage();

const netLog = [];
page.on('request', r => netLog.push({ url: r.url(), method: r.method(), resourceType: r.resourceType() }));

console.log('[nk] loading...');
await page.goto('https://nk.studio', { waitUntil: 'load', timeout: 90000 }).catch(e => console.error('goto err', e.message));
await page.waitForTimeout(8000);

const height = await page.evaluate(() => document.documentElement.scrollHeight);
console.log(`[nk] height=${height}`);

// Scroll-step screenshots (viewport-sized only)
for (let pct = 0; pct <= 100; pct += 10) {
  await page.evaluate((p) => window.scrollTo({ top: document.documentElement.scrollHeight * (p / 100), behavior: 'instant' }), pct);
  await page.waitForTimeout(1500);
  try {
    await page.screenshot({ path: path.join(OUT, `scroll-${String(pct).padStart(3, '0')}.png`), timeout: 30000 });
    console.log(`[nk] scroll ${pct}% captured`);
  } catch (e) { console.error(`[nk] scroll ${pct} err:`, e.message); }
}

await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
await page.waitForTimeout(1500);

// Styles
const styles = await page.evaluate(() => {
  const pick = (el) => {
    if (!el) return null;
    const s = getComputedStyle(el);
    const out = {};
    for (const k of ['backgroundColor','color','fontFamily','fontSize','fontWeight','letterSpacing','lineHeight','padding','margin','width','maxWidth','minHeight','display','gap','gridTemplateColumns','backdropFilter','filter','backgroundImage','borderRadius','textTransform']) out[k] = s[k];
    return out;
  };
  // Try to find green/mint-colored elements
  const mintEls = [];
  document.querySelectorAll('*').forEach(el => {
    const s = getComputedStyle(el);
    const match = (c) => /rgb\(\s*(\d+)/.exec(c);
    const rgb = (c) => {
      const m = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(c);
      return m ? [+m[1], +m[2], +m[3]] : null;
    };
    const col = rgb(s.color);
    const bg = rgb(s.backgroundColor);
    const check = (r) => r && r[1] > 140 && r[1] > r[0] + 20 && r[1] > r[2] - 40 && r[0] < 200;
    if ((check(col) || check(bg)) && el.innerText && el.innerText.length < 80) {
      mintEls.push({ tag: el.tagName, text: el.innerText.slice(0, 80), color: s.color, bg: s.backgroundColor, className: el.className.toString().slice(0, 100) });
    }
  });
  // Compile background colors of sections/divs to find palette
  const bgColors = {};
  document.querySelectorAll('section, div, main, body').forEach(el => {
    const bg = getComputedStyle(el).backgroundColor;
    if (bg && bg !== 'rgba(0, 0, 0, 0)') bgColors[bg] = (bgColors[bg] || 0) + 1;
  });

  return {
    html: pick(document.documentElement),
    body: pick(document.body),
    main: pick(document.querySelector('main')),
    firstSection: pick(document.querySelector('section')),
    firstH1: pick(document.querySelector('h1')),
    firstH2: pick(document.querySelector('h2')),
    firstButton: pick(document.querySelector('button, a[class*="btn" i], a[class*="cta" i]')),
    nav: pick(document.querySelector('nav, header')),
    fonts: [...document.fonts].map(f => ({ family: f.family, weight: f.weight, status: f.status })),
    bodyText: document.body.innerText.slice(0, 3000),
    sectionCount: document.querySelectorAll('section').length,
    h1Text: [...document.querySelectorAll('h1')].map(e => e.innerText.slice(0, 200)),
    h2Text: [...document.querySelectorAll('h2')].map(e => e.innerText.slice(0, 200)).slice(0, 30),
    mintEls: mintEls.slice(0, 50),
    bgColors,
  };
});
fs.writeFileSync(path.join(OUT, 'styles.json'), JSON.stringify(styles, null, 2));

// Canvas
const canvasInfo = await page.evaluate(() => {
  return [...document.querySelectorAll('canvas')].map((c, i) => {
    const r = c.getBoundingClientRect();
    let webgl = false, vs = null, fs = null;
    try {
      const gl = c.getContext('webgl2') || c.getContext('webgl');
      if (gl) {
        webgl = true;
        const prog = gl.getParameter(gl.CURRENT_PROGRAM);
        if (prog) {
          const shaders = gl.getAttachedShaders(prog) || [];
          for (const sh of shaders) {
            const t = gl.getShaderParameter(sh, gl.SHADER_TYPE);
            const src = gl.getShaderSource(sh);
            if (t === gl.VERTEX_SHADER) vs = src;
            if (t === gl.FRAGMENT_SHADER) fs = src;
          }
        }
      }
    } catch(e) {}
    return { i, w: c.width, h: c.height, rect: { x: r.x, y: r.y, w: r.width, h: r.height }, className: c.className, id: c.id, webgl, vs, fs };
  });
});
fs.writeFileSync(path.join(OUT, 'canvas.json'), JSON.stringify(canvasInfo, null, 2));

// Libs
const libs = await page.evaluate(() => ({
  gsap: !!window.gsap,
  ScrollTrigger: !!window.ScrollTrigger,
  Lenis: !!window.Lenis || !!window.lenis,
  three: !!window.THREE,
  smoothScrollBar: !!window.Scrollbar,
  globalKeys: Object.keys(window).filter(k => /gsap|lenis|scroll|three|smooth|aurora|cursor|motion/i.test(k)).slice(0, 80),
}));
fs.writeFileSync(path.join(OUT, 'libs.json'), JSON.stringify(libs, null, 2));

// Network subset
const interesting = netLog.filter(r => /\.(glsl|vert|frag|shader|woff2?|ttf|otf|webp|png|jpg|jpeg|mp4|webm|json)(\?|$)/i.test(r.url) || ['font','image','media'].includes(r.resourceType));
fs.writeFileSync(path.join(OUT, 'network.json'), JSON.stringify(interesting.slice(0, 200), null, 2));

// HTML
fs.writeFileSync(path.join(OUT, 'page.html'), await page.content());

console.log('[nk] done');
await browser.close();
