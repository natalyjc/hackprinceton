# Room Light Scan - MVP

A mobile MVP that scans a room for 10-15 seconds using the camera and sensors, then outputs a Room Light Score (0-100) and 3-5 lighting improvement recommendations.

## Features

- One-tap room scanning
- 10-15 second capture at 30 fps
- Analyzes brightness, warmth, flicker, daylight, and uniformity
- Generates overall score and actionable recommendations
- Works entirely on-device (no cloud/server required)
- Supports iOS and Android

## Tech Stack

- **React Native** with **Expo** (new architecture)
- **react-native-vision-camera** for camera access and frame processing
- **react-native-sensors** for accelerometer, gyroscope, and magnetometer
- **Zustand** for state management
- **AsyncStorage** for local history storage

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the Expo development server:
```bash
npm start
```

3. Run on iOS:
```bash
npm run ios
```

4. Run on Android:
```bash
npm run android
```

## Usage

1. **Scan Screen**: Tap "Start Scan" and slowly rotate in a circle for ~10 seconds
2. **Analyzing Screen**: Wait 3-5 seconds while the app processes the data
3. **Result Screen**: View your Room Light Score and recommendations

## Project Structure

```
src/
  ├── screens/          # Main app screens (Scan, Analyzing, Result)
  ├── components/       # Reusable components (ProgressRing)
  ├── store/           # Zustand state management
  ├── processing/      # Frame processing and analysis algorithms
  └── utils/           # Utility functions (sensors, math, timeOfDay)
```

## Notes

- Camera and motion sensor permissions are required
- The app works best with good lighting and when you rotate slowly
- Scan results are saved locally (last 5 scans)
- Frame processing uses simplified heuristics for MVP (full pixel analysis would require native modules)

## License

MIT
