const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

app.post('/api/analyze', async (req, res) => {
  try {
    const { base64Data, mediaType } = req.body;
    const apiKey = process.env.VITE_ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not set' });
    }
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: mediaType,
                  data: base64Data,
                },
              },
              {
                type: 'text',
                text: `Analyze this room image for lighting design. If it's a panoramic/360° image, extract as much spatial information as possible. Provide your analysis in JSON format with these fields:\n{\n  "isPanoramic": boolean,\n  "roomType": "living room/bedroom/kitchen/etc",\n  "dimensions": "estimated width x length x height in meters",\n  "windows": {\n    "count": number,\n    "orientations": ["north/south/east/west"],\n    "sizes": ["small/medium/large"]\n  },\n  "currentLighting": {\n    "naturalLight": "poor/fair/good/excellent",\n    "artificialFixtures": number,\n    "issues": ["too dark", "uneven lighting", etc]\n  },\n  "recommendations": {\n    "fixtures": [{"type": "fixture type", "location": "where", "lumens": number, "colorTemp": "2700K/3000K/4000K"}],\n    "windows": [{"recommendation": "specific suggestion"}],\n    "improvements": ["improvement 1", "improvement 2"]\n  },\n  "energyEfficiency": "current estimated efficiency rating",\n  "estimatedCost": "USD range for improvements"\n}\nRespond ONLY with valid JSON, no markdown or explanation.`,
              },
            ],
          },
        ],
      }),
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: err.message || 'Unknown error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
