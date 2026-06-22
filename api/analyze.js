const parseRobots = (text, botName) => {
  const blocks = text.split(/\n[ \t]*\n/);
  for (const block of blocks) {
    const lines = block.split('\n').map(l => l.trim());
    const agents = lines
      .filter(l => /^user-agent:/i.test(l))
      .map(l => l.replace(/^user-agent:\s*/i, '').toLowerCase().trim());
    if (!agents.some(a => a === '*' || a === botName.toLowerCase())) continue;
    const disallows = lines
      .filter(l => /^disallow:/i.test(l))
      .map(l => l.replace(/^disallow:\s*/i, '').trim());
    if (disallows.some(d => d === '/' || d === '/*')) return true;
  }
  return false;
};

const fetchWithTimeout = (url, opts = {}, ms = 6000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  return fetch(url, { ...opts, signal: controller.signal })
    .finally(() => clearTimeout(id));
};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL required' });

  let origin, domain;
  try {
    const parsed = new URL(url.startsWith('http') ? url : 'https://' + url);
    origin = parsed.origin;
    domain = parsed.hostname.replace(/^www\./, '');
  } catch {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const checks = {};

  /* 1 — robots.txt: AI bots erişiyor mu? */
  try {
    const r = await fetchWithTimeout(`${origin}/robots.txt`, {
      headers: { 'User-Agent': 'CodLinex-AEO-Analyzer/1.0' }
    }, 5000);
    if (r.ok) {
      const txt = await r.text();
      const AI_BOTS = ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'anthropic-ai', 'Google-Extended'];
      const blocked = AI_BOTS.filter(bot => parseRobots(txt, bot));
      checks.robots = {
        pass: blocked.length === 0,
        blocked,
        score: blocked.length === 0 ? 25 : Math.max(5, 25 - blocked.length * 5),
        label: blocked.length === 0 ? 'AI bots have full access' : `${blocked.length} AI bot(s) blocked: ${blocked.join(', ')}`
      };
    } else {
      checks.robots = { pass: true, blocked: [], score: 18, label: 'No robots.txt — bots have open access' };
    }
  } catch {
    checks.robots = { pass: null, blocked: [], score: 10, label: 'Could not reach robots.txt' };
  }

  /* 2 — llms.txt */
  try {
    const r = await fetchWithTimeout(`${origin}/llms.txt`, {}, 4000);
    const exists = r.ok && r.status === 200;
    checks.llms = {
      pass: exists,
      score: exists ? 20 : 0,
      label: exists ? 'llms.txt found — AI-optimized content file' : 'llms.txt missing — AI engines lack structured context'
    };
  } catch {
    checks.llms = { pass: false, score: 0, label: 'llms.txt not found' };
  }

  /* 3 & 4 — Homepage: schema + meta */
  try {
    const r = await fetchWithTimeout(origin, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CodLinex-AEO-Analyzer/1.0)' }
    }, 8000);
    const html = await r.text();

    const hasSchema = /schema\.org|application\/ld\+json/i.test(html);
    checks.schema = {
      pass: hasSchema,
      score: hasSchema ? 20 : 0,
      label: hasSchema ? 'Schema.org markup found — great for AI parsing' : 'No structured data — AI engines guess your content'
    };

    const hasMeta = /<meta[^>]+name=["']description["'][^>]*>/i.test(html);
    const hasTitle = /<title[^>]*>[^<]{8,}<\/title>/i.test(html);
    const hasH1 = /<h1[^>]*>[^<]{5,}<\/h1>/i.test(html);
    const contentScore = (hasMeta ? 15 : 0) + (hasTitle ? 10 : 0) + (hasH1 ? 5 : 0);
    checks.content = {
      pass: hasMeta && hasTitle,
      hasMeta, hasTitle, hasH1,
      score: contentScore,
      label: hasMeta && hasTitle
        ? 'Title + meta description found — content is AI-readable'
        : `Missing: ${[!hasTitle && 'title', !hasMeta && 'meta description'].filter(Boolean).join(', ')}`
    };

    checks.https = {
      pass: origin.startsWith('https'),
      score: origin.startsWith('https') ? 10 : 0,
      label: origin.startsWith('https') ? 'HTTPS secure — trusted by AI crawlers' : 'HTTP only — lower crawler trust'
    };

  } catch {
    checks.schema  = { pass: false, score: 0, label: 'Could not fetch homepage' };
    checks.content = { pass: false, score: 0, label: 'Could not fetch homepage' };
    checks.https   = { pass: origin.startsWith('https'), score: origin.startsWith('https') ? 10 : 0, label: origin.startsWith('https') ? 'HTTPS secure' : 'HTTP only' };
  }

  const score  = Object.values(checks).reduce((s, c) => s + (c.score || 0), 0);
  const rating = score >= 65 ? 'high' : score >= 35 ? 'medium' : 'low';

  return res.status(200).json({ domain, score, rating, checks });
};
