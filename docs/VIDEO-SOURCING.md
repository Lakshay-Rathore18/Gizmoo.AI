# Video Sourcing + Encoding Pipeline

This site uses **two ambient background loops** as the only motion source:

| Slot | Path prefix | Poster | Intent |
|------|-------------|--------|--------|
| Hero | `/videos/hero.{av1.mp4,webm,mp4}` | `/videos/hero-poster.svg` | Slow drift — abstract mint/teal light, no hard cuts |
| Section (reserved) | `/videos/section.{av1.mp4,webm,mp4}` | `/videos/section-poster.svg` | Optional future use between RevenueLeak and Features |

Both slots are rendered through [`components/BackgroundVideo.tsx`](../components/BackgroundVideo.tsx),
which gates playback on `prefers-reduced-motion`, `NetworkGuard` (saveData +
slow effectiveType), and `IntersectionObserver`. Videos are `muted`,
`playsInline`, `loop`, `aria-hidden`, `tabIndex={-1}`, and cannot receive
pointer events.

## Target specs

- **Duration:** 8–14s seamless loop (first + last frame bit-identical)
- **Resolution:** 1920×1080 source; encode at 1280×720 — object-fit: cover hides edges
- **FPS:** 24 — lower fps is fine, the video is ambient
- **Bitrate budgets:**
  - AV1: ≤ 400 kbps (primary; modern iOS/Android/Chrome/Edge)
  - VP9/WebM: ≤ 600 kbps (fallback for Firefox)
  - H.264/MP4: ≤ 900 kbps (universal fallback; cap at ~1.2 MB)
- **No audio track** (strip it — saves bytes, avoids autoplay policy issues)
- **Colour:** matched to palette — `#070b0a` background, `#20e7b7` accent. Low
  saturation. No jump cuts. No faces.

## Sourcing

Creative Commons / royalty-free sources suitable for ambient reels:

1. **Pexels Videos** — `https://www.pexels.com/search/videos/abstract%20light/`
   - Recommended tags: `abstract`, `light`, `particles`, `slow motion`, `teal`, `mint`
2. **Pixabay** — `https://pixabay.com/videos/search/abstract/`
3. **Coverr** — `https://coverr.co/s?q=abstract`
4. **Mixkit** — `https://mixkit.co/free-stock-video/abstract/`

Filter to CC0 / royalty-free / no-attribution-required. Download the highest
mezzanine available (usually 1080p30 H.264).

### Download helper (Pexels API)

```bash
# Requires PEXELS_API_KEY env var. Get one at https://www.pexels.com/api/
curl -s -H "Authorization: $PEXELS_API_KEY" \
  "https://api.pexels.com/videos/search?query=abstract+teal+light&per_page=5&orientation=landscape" \
  | jq '.videos[] | {id, duration, url, files: [.video_files[] | select(.quality=="hd")]}'

# Then download a specific file:
curl -o raw.mp4 "<video_files[].link>"
```

## Encoding

Output three variants from the same source. Run from the project root.

### 1. Trim + loop-friendly source

```bash
# Cut a 12-second segment and cross-fade last 0.5s into first for seamless loop
ffmpeg -ss 00:00:02 -i raw.mp4 -t 12 -an -c:v libx264 -crf 18 source-trim.mp4
```

Review `source-trim.mp4` — verify the cut is on a motion-lull and loops cleanly.

### 2. AV1 (primary)

```bash
ffmpeg -i source-trim.mp4 \
  -c:v libsvtav1 -preset 6 -crf 38 \
  -svtav1-params tune=0:film-grain=0 \
  -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,fps=24" \
  -an -movflags +faststart \
  public/videos/hero.av1.mp4
```

Target output: 300–450 kB for 12s. `codecs=av01.0.05M.08` in the `<source>` tag
matches Main profile, level 5, 8-bit.

### 3. WebM / VP9 (Firefox fallback)

```bash
ffmpeg -i source-trim.mp4 \
  -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 -tile-columns 2 \
  -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,fps=24" \
  -an \
  public/videos/hero.webm
```

Target output: 400–600 kB.

### 4. H.264 / MP4 (universal fallback)

```bash
ffmpeg -i source-trim.mp4 \
  -c:v libx264 -preset slow -crf 26 -profile:v main -level 4.0 -pix_fmt yuv420p \
  -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,fps=24" \
  -an -movflags +faststart \
  public/videos/hero.mp4
```

Target output: 700–1100 kB. The `-movflags +faststart` moves the moov atom to
the start so playback begins before full download.

### 5. Poster

```bash
# Extract a representative frame at t=0
ffmpeg -ss 00:00:00 -i source-trim.mp4 -vframes 1 hero-poster-raw.png

# Optional: convert to SVG with a blur + colour-mapping filter for tiny file size
# Or keep as a compressed WebP:
cwebp -q 60 hero-poster-raw.png -o public/videos/hero-poster.webp
```

The current repo uses hand-authored SVG posters
(`public/videos/hero-poster.svg`, `public/videos/section-poster.svg`) that
match the palette without shipping a raster image. That is the preferred
default — only swap to WebP if the SVG feels too abstract.

## Verification

After dropping the encoded files into `public/videos/`:

```bash
# Byte budget check
ls -lh public/videos/hero.*

# Local preview
npm run dev
# Visit http://localhost:3000 — hero should show poster instantly, video
# fades in after first frame. On a slow 3G throttle, video is skipped and
# poster stays.
```

Check in DevTools:

- **Network panel:** `hero.av1.mp4` is the requested source on Chrome/Safari;
  `hero.webm` on Firefox; `hero.mp4` on legacy.
- **prefers-reduced-motion:** Enable OS setting; confirm video is removed from
  DOM (`display: none` via the reduced-motion CSS guard) and only the poster
  shows.
- **Save-Data:** DevTools → Network → throttle to "Slow 4G" or use
  `?save_data=1` query or set `Save-Data: on` header; `NetworkGuard` should
  hide the video tag.

## License / attribution

Track every source in `docs/VIDEO-CREDITS.md` (create when first video ships).
Format:

```
hero.mp4
  Source: Pexels / https://www.pexels.com/video/XXXXXXX/
  Author: John Doe
  License: Pexels License (no attribution required, commercial use allowed)
  Downloaded: 2026-04-25
  Trimmed: 00:00:02–00:00:14
```

Never ship a video without verifying the licence covers commercial use.

## Do not

- Do not add sound. Ever. Even muted on load, it creates an autoplay failure
  in some policies and increases file size.
- Do not loop a clip with a visible cut. Re-trim until it loops invisibly.
- Do not ship an MP4 that is more than 1.5 MB. That is the hard ceiling —
  re-encode at lower CRF or lower fps if you exceed it.
- Do not add a third ambient slot. Two is the scarcity budget; anything more
  turns the page into a reel and re-introduces the laggy feel we just killed.
