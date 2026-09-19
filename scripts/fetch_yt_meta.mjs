import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const portfolioPath = path.join(__dirname, '../src/data/portfolio.json');

const portfolio = JSON.parse(readFileSync(portfolioPath, 'utf8'));

// Collect all unique IDs
const idSet = new Set();
function walk(obj) {
  if (Array.isArray(obj)) { obj.forEach(walk); return; }
  if (obj && typeof obj === 'object') {
    if (obj.youtubeId) idSet.add(obj.youtubeId);
    Object.values(obj).forEach(walk);
  }
}
walk(portfolio);
const ids = [...idSet];
console.log(`Found ${ids.length} unique video IDs:`, ids);

// Thumbnail quality priority - try maxresdefault → sddefault → hqdefault → mqdefault
async function getBestThumb(id) {
  const qualities = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault'];
  for (const q of qualities) {
    const url = `https://img.youtube.com/vi/${id}/${q}.jpg`;
    try {
      const r = await fetch(url, { method: 'HEAD' });
      if (r.ok) {
        // YouTube returns a 120x90 placeholder for unavailable qualities
        const cl = r.headers.get('content-length');
        if (cl && parseInt(cl) < 2000) continue; // too small = placeholder
        return url;
      }
    } catch { }
  }
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

// Fetch title via oEmbed (no API key needed)
async function getTitle(id) {
  const isShort = ['HMZdb1qOtsw', '6RgnqcggJ1w', 'KasJHz8AbnE', 'c0v_SUjTg7Q', 'jKbeOSZSpmo', 'GM1W-e-oQAM', 'Jixhcs-PO7o', 'wyz9Ok6gDyA', '0Ph6MpGKq8I', 'LkDVvwnNx2s', '6KRlmvzYYx8', 'fdHWLuXTIBA', '_FQ7EBFkYY0', 'Adiz1O8JQig', 'sojAvbUGQew', 'hFGV4zHmXxY'].includes(id);
  const url = isShort
    ? `https://www.youtube.com/oembed?url=https://www.youtube.com/shorts/${id}&format=json`
    : `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
  try {
    const r = await fetch(url);
    if (r.ok) {
      const j = await r.json();
      if (j.title) {
        return j.title.replace(/#[a-zA-Z0-9_]+/g, "").replace(/\s+/g, " ").trim().replace(/[-|–—:]\s*$/, "").trim();
      }
      return null;
    }
  } catch { }
  // fallback: try the other URL format
  try {
    const url2 = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
    const r2 = await fetch(url2);
    if (r2.ok) { const j = await r2.json(); return j.title || null; }
  } catch { }
  return null;
}

console.log('\nFetching titles and thumbnails...');
const meta = {};
await Promise.all(ids.map(async id => {
  const [title, thumb] = await Promise.all([getTitle(id), getBestThumb(id)]);
  meta[id] = { title, thumb };
  console.log(`✓ ${id}: ${title || '(no title)'} | ${thumb}`);
}));

// Now patch the portfolio JSON
function patch(obj) {
  if (Array.isArray(obj)) { obj.forEach(patch); return; }
  if (obj && typeof obj === 'object') {
    if (obj.youtubeId && meta[obj.youtubeId]) {
      const m = meta[obj.youtubeId];
      if (m.thumb) obj.customThumb = m.thumb;
      if (m.title) obj.title = m.title;
    }
    Object.values(obj).forEach(patch);
  }
}
patch(portfolio);

writeFileSync(portfolioPath, JSON.stringify(portfolio, null, 2), 'utf8');
console.log('\n✅ portfolio.json updated with real titles and thumbnails!');
