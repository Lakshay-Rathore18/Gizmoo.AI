#!/usr/bin/env node
// Compose 3 cinematic ambient loops from raw Pexels clips using ffmpeg xfade.
// Each output: 3 clips × ~5s with 1s crossfade => ~13s loop.
// Outputs: <name>.mp4 (H.264 1280x720) + <name>-mobile.mp4 (640x360 baseline)
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const RAW = path.join(process.cwd(), 'public/videos/src/raw');
const OUT = path.join(process.cwd(), 'public/videos');
const manifest = JSON.parse(fs.readFileSync(path.join(RAW, 'manifest.json'), 'utf8'));

// Curated picks per section — narrow to 3 clips per category
// using IDs we know look right after eyeballing the categories.
const PICKS = {
  capability: ['capability-7101913', 'capability-29184317', 'capability-30739786'],
  trades: ['trades-7584762', 'trades-18780266', 'trades-34572318'],
  cta: ['cta-3121407', 'cta-35771870', 'cta-30060006'],
};

const CLIP_LEN = 5; // seconds each
const FADE = 1; // crossfade duration

function ffmpeg(args, label) {
  console.log(`\n[${label}] ffmpeg ${args.join(' ')}`);
  const r = spawnSync('ffmpeg', args, { stdio: 'inherit' });
  if (r.status !== 0) throw new Error(`ffmpeg failed for ${label} (status ${r.status})`);
}

function compose(name, ids, opts = {}) {
  const inputs = ids.map((id) => path.join(RAW, `${id}.mp4`));
  for (const f of inputs) if (!fs.existsSync(f)) throw new Error(`missing ${f}`);

  const w = opts.w ?? 1280;
  const h = opts.h ?? 720;
  const outFile = path.join(OUT, `${opts.outName || `showcase-${name}`}.mp4`);

  // Build filter_complex:
  // For each input: trim, setpts, scale, fps, format, label as v0/v1/v2
  // Then xfade [v0][v1]→[x1] offset=CLIP_LEN-FADE
  // Then xfade [x1][v2]→[out] offset=2*CLIP_LEN-2*FADE
  const N = inputs.length;
  const trims = inputs
    .map(
      (_, i) =>
        `[${i}:v]trim=0:${CLIP_LEN},setpts=PTS-STARTPTS,scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h},fps=30,format=yuv420p[v${i}]`,
    )
    .join(';');

  let xchain = '';
  if (N === 2) {
    xchain = `;[v0][v1]xfade=transition=fade:duration=${FADE}:offset=${CLIP_LEN - FADE}[outv]`;
  } else if (N === 3) {
    xchain =
      `;[v0][v1]xfade=transition=fade:duration=${FADE}:offset=${CLIP_LEN - FADE}[x1]` +
      `;[x1][v2]xfade=transition=fade:duration=${FADE}:offset=${2 * (CLIP_LEN - FADE)}[outv]`;
  } else {
    throw new Error('unsupported clip count');
  }

  const filter = trims + xchain;

  // Total duration = N * CLIP_LEN - (N-1) * FADE
  const totalDur = N * CLIP_LEN - (N - 1) * FADE;

  const args = [
    '-y',
    ...inputs.flatMap((f) => ['-i', f]),
    '-filter_complex',
    filter,
    '-map',
    '[outv]',
    '-an',
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    '24',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    '-t',
    String(totalDur),
    outFile,
  ];
  ffmpeg(args, name);
  console.log(`  → ${outFile}`);
  return outFile;
}

function downscaleMobile(src, name) {
  const out = path.join(OUT, `${name}.mp4`);
  ffmpeg(
    [
      '-y',
      '-i',
      src,
      '-vf',
      'scale=854:480:force_original_aspect_ratio=increase,crop=854:480',
      '-c:v',
      'libx264',
      '-preset',
      'slow',
      '-crf',
      '26',
      '-profile:v',
      'baseline',
      '-level',
      '3.1',
      '-pix_fmt',
      'yuv420p',
      '-movflags',
      '+faststart',
      '-an',
      out,
    ],
    `${name} mobile`,
  );
  return out;
}

function makePoster(src, name) {
  const out = path.join(OUT, `${name}-poster.jpg`);
  ffmpeg(['-y', '-ss', '0.5', '-i', src, '-vframes', '1', '-q:v', '4', out], `${name} poster`);
  return out;
}

(async () => {
  const built = {};
  for (const [name, ids] of Object.entries(PICKS)) {
    const desktop = compose(name, ids);
    const mobile = downscaleMobile(desktop, `showcase-${name}-mobile`);
    const poster = makePoster(desktop, `showcase-${name}`);
    built[name] = { desktop, mobile, poster };
  }
  console.log('\n--- summary ---');
  for (const [n, v] of Object.entries(built)) {
    console.log(n, JSON.stringify(v));
  }
})();
