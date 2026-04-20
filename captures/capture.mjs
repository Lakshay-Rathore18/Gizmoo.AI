// Playwright capture: screenshots at 10% scroll increments + DOM/style/canvas extraction
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const TARGET = process.argv[2];
const OUT = process.argv[3];
if (!TARGET || !OUT) {
  console.error('Usage: node capture.mjs <url> <outDir>');
  process.exit(1);
}

fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
});
const page = await ctx.newPage();

const netLog = [];
page.on('request', r => netLog.push({ url: r.url(), method: r.method(), resourceType: r.resourceType() }));
const consoleLog = [];
page.on('console', m => consoleLog.push({ type: m.type(), text: m.text() }));

console.log(`[${TARGET}] loading...`);
await page.goto(TARGET, { waitUntil: 'networkidle', timeout: 60000 }).catch(e => console.error('goto err', e.message));
await page.waitForTimeout(4000);

// Kill loading screens / cookie banners that could block capture
await page.evaluate(() => {
  const selectors = ['[class*="loading" i]', '[class*="loader" i]', '[id*="loader" i]', '[class*="cookie" i]', '[class*="consent" i]'];
  // Only hide elements that are full-screen overlays
  for (const s of selectors) {
    document.querySelectorAll(s).forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width > window.innerWidth * 0.8 && r.height > window.innerHeight * 0.8) {
        el.style.display = 'none';
      }
    });
  }
});

// Measure full page height
const height = await page.evaluate(() => Math.max(
  document.body.scrollHeight,
  document.documentElement.scrollHeight,
  document.body.offsetHeight,
  document.documentElement.offsetHeight
));
console.log(`[${TARGET}] height=${height}`);

// Full-page screenshot
await page.screenshot({ path: path.join(OUT, 'full.png'), fullPage: true, timeout: 120000 }).catch(e => console.error('fullpage err', e.message));

// Scroll-step screenshots at 10% increments (viewport-sized, not full)
for (let pct = 0; pct <= 100; pct += 10) {
  await page.evaluate((p) => window.scrollTo({ top: document.documentElement.scrollHeight * (p / 100), behavior: 'instant' }), pct);
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT, `scroll-${String(pct).padStart(3, '0')}.png`) });
}

// Reset scroll to top for DOM extraction
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
await page.waitForTimeout(800);

// Extract computed styles for key anchors
const styles = await page.evaluate(() => {
  const pick = (el) => {
    if (!el) return null;
    const s = getComputedStyle(el);
    const out = {};
    const keys = ['backgroundColor', 'color', 'fontFamily', 'fontSize', 'fontWeight', 'letterSpacing', 'lineHeight', 'padding', 'margin', 'width', 'maxWidth', 'minHeight', 'display', 'gap', 'gridTemplateColumns', 'backdropFilter', 'filter', 'backgroundImage', 'borderRadius', 'textTransform'];
    for (const k of keys) out[k] = s[k];
    return out;
  };
  return {
    html: pick(document.documentElement),
    body: pick(document.body),
    main: pick(document.querySelector('main')),
    firstSection: pick(document.querySelector('section')),
    firstH1: pick(document.querySelector('h1')),
    firstH2: pick(document.querySelector('h2')),
    firstButton: pick(document.querySelector('button, a[class*="btn" i]')),
    nav: pick(document.querySelector('nav, header')),
    fonts: [...document.fonts].map(f => ({ family: f.family, weight: f.weight, status: f.status })),
    bodyText: document.body.innerText.slice(0, 2000),
    sectionCount: document.querySelectorAll('section').length,
    h1Text: [...document.querySelectorAll('h1')].map(e => e.innerText.slice(0, 200)),
    h2Text: [...document.querySelectorAll('h2')].map(e => e.innerText.slice(0, 200)).slice(0, 20),
  };
});
fs.writeFileSync(path.join(OUT, 'styles.json'), JSON.stringify(styles, null, 2));

// Canvas / WebGL detection
const canvasInfo = await page.evaluate(() => {
  const canvases = [...document.querySelectorAll('canvas')];
  return canvases.map((c, i) => {
    const r = c.getBoundingClientRect();
    let webgl = false;
    let vertexShader = null;
    let fragmentShader = null;
    try {
      const gl = c.getContext('webgl2') || c.getContext('webgl');
      if (gl) {
        webgl = true;
        // Attempt to dump the currently attached program's shaders
        const prog = gl.getParameter(gl.CURRENT_PROGRAM);
        if (prog) {
          const shaders = gl.getAttachedShaders(prog) || [];
          for (const sh of shaders) {
            const src = gl.getShaderSource(sh);
            const type = gl.getShaderParameter(sh, gl.SHADER_TYPE);
            if (type === gl.VERTEX_SHADER) vertexShader = src;
            if (type === gl.FRAGMENT_SHADER) fragmentShader = src;
          }
        }
      }
    } catch (e) {}
    return { index: i, width: c.width, height: c.height, rect: { x: r.x, y: r.y, w: r.width, h: r.height }, className: c.className, webgl, vertexShader, fragmentShader };
  });
});
fs.writeFileSync(path.join(OUT, 'canvas.json'), JSON.stringify(canvasInfo, null, 2));

// Detect common libs
const libs = await page.evaluate(() => ({
  gsap: !!window.gsap,
  ScrollTrigger: !!window.ScrollTrigger,
  Lenis: !!window.Lenis || !!window.lenis,
  three: !!window.THREE,
  framerMotion: !!window.__FRAMER_MOTION__,
  globalKeys: Object.keys(window).filter(k => /gsap|lenis|scroll|three|smooth|aurora|cursor/i.test(k)).slice(0, 50),
}));
fs.writeFileSync(path.join(OUT, 'libs.json'), JSON.stringify(libs, null, 2));

// Network log (shaders/fonts/textures)
const interesting = netLog.filter(r => /\.(glsl|vert|frag|shader|woff2?|ttf|otf|webp|png|jpg|jpeg|mp4|webm|json)(\?|$)/i.test(r.url) || r.resourceType === 'font' || r.resourceType === 'image' || r.resourceType === 'media');
fs.writeFileSync(path.join(OUT, 'network.json'), JSON.stringify(interesting, null, 2));
fs.writeFileSync(path.join(OUT, 'console.json'), JSON.stringify(consoleLog, null, 2));

// Save HTML
const html = await page.content();
fs.writeFileSync(path.join(OUT, 'page.html'), html);

console.log(`[${TARGET}] done. out=${OUT}`);
await browser.close();
