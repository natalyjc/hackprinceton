# Quick Start Guide

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Optional: Add API keys for AI features
OPENAI_API_KEY=your_key_here
WEATHER_API_KEY=your_key_here
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

### Room Analyzer
- Input room dimensions, orientation, and purpose
- Get AI-powered lighting recommendations
- Calculate optimal lumens and color temperature

### Window Recommendations
- Get personalized window suggestions
- Based on climate, orientation, budget, and priorities
- Energy efficiency ratings and cost estimates

### Lighting Calculator
- Calculate optimal lighting for any room
- Lighting layer breakdown (ambient, task, accent)
- Color temperature recommendations

### Photo Analysis
- Upload room photos for instant analysis
- AI-powered detection of lighting conditions
- Personalized improvement recommendations

## Next Steps

1. **Add AI Integrations**: See [docs/VALUABLE_INTEGRATIONS.md](./docs/VALUABLE_INTEGRATIONS.md)
2. **Set Up MCP Servers**: See [docs/AI_INTEGRATIONS.md](./docs/AI_INTEGRATIONS.md)
3. **Customize**: Modify components in `/components` directory
4. **Deploy**: Build and deploy to Vercel, Netlify, or your preferred platform

## Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── RoomAnalyzer.tsx
│   ├── WindowRecommender.tsx
│   ├── LightingCalculator.tsx
│   └── PhotoAnalyzer.tsx
├── docs/                  # Documentation
│   ├── AI_INTEGRATIONS.md
│   └── VALUABLE_INTEGRATIONS.md
└── README.md
```

## Troubleshooting

### Build Errors
- Make sure all dependencies are installed: `npm install`
- Check Node.js version (requires Node.js 18+)

### API Errors
- Verify API keys are set in `.env.local`
- Check API rate limits and quotas

### Styling Issues
- Ensure Tailwind CSS is properly configured
- Run `npm run build` to check for CSS errors

## Support

For questions or issues, please refer to:
- [AI Integrations Documentation](./docs/AI_INTEGRATIONS.md)
- [Valuable Integrations Guide](./docs/VALUABLE_INTEGRATIONS.md)
- [README](./README.md)
