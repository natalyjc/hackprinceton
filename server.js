// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Node 18+ has global fetch. If you're on older Node, install node-fetch@2 and uncomment below:
// const fetch = (...args) => import('node-fetch').then(({ default: f }) => f(...args));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Root endpoint - just for info
app.get('/', (req, res) => {
  res.json({
    message: 'LumoSpace API Server',
    endpoints: {
      'POST /api/analyze': 'Analyze room images for lighting design'
    },
    status: 'running'
  });
});

// Small helper to add a timeout so requests don't hang forever
async function fetchWithTimeout(url, options = {}, timeoutMs = 30000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

app.post('/api/analyze', async (req, res) => {
  try {
    const { base64Data, mediaType } = req.body || {};

    if (!base64Data || !mediaType) {
      return res.status(400).json({ ok: false, error: 'Missing base64Data or mediaType' });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY; // <-- use server-side key
    if (!apiKey) {
      return res.status(401).json({ ok: false, error: 'Missing ANTHROPIC_API_KEY on server' });
    }

    // Choose a sane default model; allow override via env
    const model = 'claude-sonnet-4-5-20250929';

    const response = await fetchWithTimeout('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: mediaType, // e.g. "image/jpeg" or "image/png"
                  data: base64Data,
                },
              },
              {
                type: 'text',
                text:
                  'Analyze this room image for lighting design. If it is a panoramic/360° image, ' +
                  'extract as much spatial information as possible. Provide ONLY valid JSON with these fields:\n' +
                  '{\n' +
                  '  "isPanoramic": boolean,\n' +
                  '  "roomType": "living room/bedroom/kitchen/etc",\n' +
                  '  "dimensions": "estimated width x length x height in meters",\n' +
                  '  "windows": {\n' +
                  '    "count": number,\n' +
                  '    "orientations": ["north","south","east","west"],\n' +
                  '    "sizes": ["small","medium","large"]\n' +
                  '  },\n' +
                  '  "currentLighting": {\n' +
                  '    "naturalLight": "poor/fair/good/excellent",\n' +
                  '    "artificialFixtures": number,\n' +
                  '    "issues": ["too dark","uneven lighting", "..."]\n' +
                  '  },\n' +
                  '  "recommendations": {\n' +
                  '    "fixtures": [{"type": "fixture type", "location": "where", "lumens": number, "colorTemp": "2700K/3000K/4000K"}],\n' +
                  '    "windows": [{"recommendation": "specific suggestion"}],\n' +
                  '    "improvements": ["improvement 1","improvement 2"]\n' +
                  '  },\n' +
                  '  "energyEfficiency": "current estimated efficiency rating",\n' +
                  '  "estimatedCost": "USD range for improvements"\n' +
                  '}\n',
              },
            ],
          },
        ],
      }),
    }, 45000); // 45s max

    // If Anthropic returns non-2xx, surface the error body
    if (!response.ok) {
      const errBody = await response.text().catch(() => '');
      return res.status(response.status).json({
        ok: false,
        error: `Anthropic error ${response.status}`,
        details: errBody,
      });
    }

    const data = await response.json();

    // Option A: pass through raw Anthropic response
    // res.json(data);

    // Option B: normalize to the JSON text we asked for (prevents frontend confusion)
    // Try to pull the assistant text from content
    let assistantText = '';
    try {
      const contentArr = data?.content || [];
      const textPart = contentArr.find(p => p.type === 'text');
      assistantText = textPart?.text || '';
    } catch {}

    return res.json({
      ok: true,
      model,
      raw: data,               // keep for debugging
      json: assistantText || '', // the JSON string you asked the model to return
    });
  } catch (err) {
    const isAbort = err?.name === 'AbortError';
    console.error('Analyze proxy error:', err);
    return res.status(500).json({
      ok: false,
      error: isAbort ? 'Upstream request timed out' : (err?.message || 'Unknown error'),
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`Accessible from network at http://YOUR_COMPUTER_IP:${PORT}`);
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (apiKey) {
    console.log(`✓ ANTHROPIC_API_KEY loaded (${apiKey.substring(0, 15)}...)`);
  } else {
    console.warn('⚠ WARNING: ANTHROPIC_API_KEY not found in environment');
  }
});