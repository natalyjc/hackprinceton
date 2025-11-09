# LumoSpace - Smart Lighting & Window Solutions

An AI-powered web application that helps real estate lighting designers and homeowners make informed decisions about windows, lighting conditions, and room layouts. LumoSpace is a lightweight web app that analyzes room photos and returns actionable lighting recommendations. It’s built as a Vite + React frontend with a small Node/Express proxy server that forwards images to an AI model (Anthropic by default) and returns structured JSON the UI renders.

This README reflects the current code in the repo (client in `src/` and a small server in `server.js`). 

## Quick pitch

Upload a room photo, get an instant lighting score, window and fixture details, and three practical fixes to improve comfort and energy use — all from your phone.

## What this app does (features)

- Instant photo analysis: upload a room photo (including 360° panoramas) and receive structured results.
- Scan → Score → Fix: the UI shows a summarized score and top three improvements (fixtures, window suggestions, and energy estimates).
- Local history: analyses are saved in `localStorage` (up to 10 entries) so you can compare results over time.
- Privacy-first design: image processing can run through your local server; the server requires an Anthropic API key only if you want model-backed analysis.

## How it works (high level)

- Client (React / Vite): `src/` contains the UI — `LumoSpace.jsx` coordinates pages (Home / Analyze / History). Upload is handled in `ImageUploader.jsx`. Analysis rendering is in `AnalysisResults.jsx`.
- API proxy (Express): `server.js` exposes `POST /api/analyze` and forwards the base64 image to the Anthropic API using the server-side `ANTHROPIC_API_KEY`. The server returns the model text as `json` and `raw` for debugging.
- AI contract: the model is asked to return ONLY valid JSON with fields like `isPanoramic`, `roomType`, `windows`, `currentLighting`, `recommendations`, `energyEfficiency`, and `estimatedCost` so the frontend can render them directly.

## Tech stack

- Frontend: React 18, Vite, Tailwind CSS, Lucide icons
- Backend (optional proxy): Node.js + Express
- Storage: browser `localStorage` for history

## Running locally

1. Install dependencies:

```powershell
npm install
```

2. Start the API proxy (optional but required if you want AI analysis):

Set your Anthropic API key in an environment variable and run the server. On Windows PowerShell:

```powershell
$env:ANTHROPIC_API_KEY = 'sk-...'
npm run server
```

If you don't provide an API key the server will still run, but `/api/analyze` will return an error — useful for local UI development without model calls.

3. Start the frontend (dev mode):

```powershell
npm run dev
```

Open the browser to the address Vite prints (typically `http://localhost:5173`). The client expects the analysis API at `http://localhost:5000/api/analyze` by default — if you run the server on another host/port, adjust `src/services/aiService.js` accordingly.

Important npm scripts (from `package.json`):

- `npm run dev` — start Vite dev server
- `npm run build` — build production assets
- `npm run preview` — preview built site
- `npm run server` (or `npm start`) — run Express API proxy on port 5000

## API details

- Endpoint: `POST /api/analyze`
- Body (JSON): `{ base64Data: string, mediaType: string }` where `base64Data` is the file data without the data URI prefix and `mediaType` is the MIME type (e.g. `image/jpeg`).
- Server returns JSON: `{ ok: true, model, raw, json }` where `json` is the textual JSON the model returned (frontend parses it into an object).

## Privacy & data

- Images are read on the client and sent as base64 to the server. The server forwards the image to the configured AI provider (Anthropic by default). Keep your `ANTHROPIC_API_KEY` private and never commit it.
- History is stored locally in the browser (`localStorage`) and not shared unless you explicitly implement uploads.

## Developer notes & troubleshooting

- If `analyzeImageWithAI` fails with a network error, ensure the API proxy is running and `ANTHROPIC_API_KEY` is set.
- For local testing without an AI key, you can mock the `/api/analyze` response in `src/services/aiService.js` (the app expects a specific JSON structure — see the server prompt in `server.js`).

## Contributing

Contributions welcome — open a PR with focused changes. If you change the server behavior, document the new API contract in this README.

## License

ISC