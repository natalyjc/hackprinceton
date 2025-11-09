# LumoSpace - Smart Lighting & Window Solutions

An AI-powered web application that helps real estate lighting designers and homeowners make informed decisions about windows, lighting conditions, and room layouts.

## Features

- **Room Analyzer**: Input room dimensions, orientation, and purpose to get AI-powered lighting recommendations
- **Window Recommendations**: Get personalized window suggestions based on climate, orientation, budget, and priorities
- **Lighting Calculator**: Calculate optimal lumens, color temperature, and fixture placement for any room
- **Photo Analysis**: Upload room photos for instant AI analysis and personalized recommendations

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern, responsive styling
- **Lucide React** - Beautiful icons
- **Recharts** - Data visualization

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## AI Integrations & MCP Servers

This application is designed to integrate with various AI services and MCP (Model Context Protocol) servers. See [AI_INTEGRATIONS.md](./docs/AI_INTEGRATIONS.md) for detailed information about recommended integrations.

### Recommended AI Services

1. **Image Analysis**: OpenAI Vision API, Google Cloud Vision API, or AWS Rekognition
2. **Natural Language Processing**: OpenAI GPT-4, Anthropic Claude
3. **Sun Position Calculations**: Solar position algorithms for window recommendations
4. **Energy Efficiency Calculations**: Building energy simulation APIs

### Recommended MCP Servers

1. **Weather API MCP**: Real-time weather data for climate-based recommendations
2. **Image Analysis MCP**: Room photo analysis and object detection
3. **Building Code MCP**: Local building codes and regulations
4. **Energy Star MCP**: Energy efficiency ratings and certifications

## Project Structure

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── RoomAnalyzer.tsx
│   ├── WindowRecommender.tsx
│   ├── LightingCalculator.tsx
│   └── PhotoAnalyzer.tsx
├── docs/
│   └── AI_INTEGRATIONS.md
└── package.json
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC