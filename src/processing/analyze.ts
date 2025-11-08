import type { FrameFeature, ImuSample, HeadingSample, ScanResult } from '../store/useScanStore';
import { ema, median, mean, std, clipOutliers, detectFlicker, clamp } from '../utils/math';
import { prefersWarmLight, prefersCoolLight } from '../utils/timeOfDay';
import { computeCoverage, fuseImuSamples } from '../utils/sensors';

/**
 * Analyze collected data and generate scan result
 */
export function analyzeScan(
  frames: FrameFeature[],
  imuSamples: ImuSample[],
  headingSamples: HeadingSample[],
  startedAt: number,
  durationSec: number
): ScanResult {
  // Separate gyro and accel samples for fusion
  // Note: Our sensor collection creates separate samples, so we filter by which values are non-zero
  const gyroSamples = imuSamples.filter(s => Math.abs(s.gx) > 0.001 || Math.abs(s.gy) > 0.001 || Math.abs(s.gz) > 0.001);
  const accelSamples = imuSamples.filter(s => Math.abs(s.ax) > 0.001 || Math.abs(s.ay) > 0.001 || Math.abs(s.az) > 0.001);
  
  // Fuse samples if we have both types, otherwise use what we have
  const fusedImu = gyroSamples.length > 0 && accelSamples.length > 0
    ? fuseImuSamples(gyroSamples, accelSamples)
    : gyroSamples.length > 0 ? gyroSamples : accelSamples;

  // Compute coverage
  const coverageDeg = computeCoverage(fusedImu);

  // Extract brightness values
  const brightnessValues = frames.map(f => f.y);
  const smoothedBrightness = ema(brightnessValues, 0.2);
  const cleanedBrightness = clipOutliers(smoothedBrightness);
  const medianBrightness = median(cleanedBrightness);

  // Uniformity score based on variance across headings
  // Map frames to headings using nearest neighbor
  const brightnessByHeading: number[] = [];
  for (const frame of frames) {
    // Find nearest heading sample
    let nearestHeading = headingSamples[0];
    let minDiff = Math.abs(frame.t - nearestHeading.t);
    
    for (const heading of headingSamples) {
      const diff = Math.abs(frame.t - heading.t);
      if (diff < minDiff) {
        minDiff = diff;
        nearestHeading = heading;
      }
    }
    
    if (minDiff < 500) { // Within 500ms
      brightnessByHeading.push(frame.y);
    }
  }

  const brightnessMean = mean(brightnessByHeading);
  const brightnessStd = std(brightnessByHeading);
  const coefficientOfVariation = brightnessMean > 0 ? brightnessStd / brightnessMean : 0;
  
  // Uniformity score: lower variance = higher score
  // Penalize if coverage < 240°
  const coveragePenalty = coverageDeg < 240 ? (240 - coverageDeg) / 240 * 20 : 0;
  const uniformityScore = clamp(100 - (coefficientOfVariation * 100) - coveragePenalty, 0, 100);

  // Warmth classification (majority vote)
  const warmthVotes = { warm: 0, neutral: 0, cool: 0 };
  for (const frame of frames) {
    if (frame.warmth) {
      warmthVotes[frame.warmth]++;
    }
  }
  
  let warmth: 'warm' | 'neutral' | 'cool' = 'neutral';
  if (warmthVotes.warm > warmthVotes.neutral && warmthVotes.warm > warmthVotes.cool) {
    warmth = 'warm';
  } else if (warmthVotes.cool > warmthVotes.neutral && warmthVotes.cool > warmthVotes.warm) {
    warmth = 'cool';
  }

  // Daylight detection (aggregate window hints)
  const windowHints = frames.filter(f => f.hasWindow === true).length;
  const windowRatio = frames.length > 0 ? windowHints / frames.length : 0;
  
  let daylight: 'low' | 'moderate' | 'high';
  if (windowRatio > 0.3) {
    daylight = 'high';
  } else if (windowRatio > 0.1) {
    daylight = 'moderate';
  } else {
    daylight = 'low';
  }

  // Flicker detection
  const { peak, noiseFloor } = detectFlicker(cleanedBrightness);
  const flickerRatio = noiseFloor > 0 ? peak / noiseFloor : 0;
  
  let flicker: 'none' | 'minor' | 'likely';
  if (flickerRatio > 3) {
    flicker = 'likely';
  } else if (flickerRatio > 1.5) {
    flicker = 'minor';
  } else {
    flicker = 'none';
  }

  // Scoring
  const scores = computeScores(
    uniformityScore,
    flicker,
    medianBrightness,
    warmth,
    daylight
  );

  // Generate fixes
  const fixes = generateFixes(
    warmth,
    medianBrightness,
    uniformityScore,
    daylight,
    flicker
  );

  return {
    startedAt,
    durationSec,
    coverageDeg,
    brightness: {
      median: medianBrightness,
      uniformityScore,
    },
    warmth,
    daylight,
    flicker,
    scores,
    fixes,
  };
}

/**
 * Compute comfort, circadian, and overall scores
 */
function computeScores(
  uniformityScore: number,
  flicker: 'none' | 'minor' | 'likely',
  medianBrightness: number,
  warmth: 'warm' | 'neutral' | 'cool',
  daylight: 'low' | 'moderate' | 'high'
): { comfort: number; circadian: number; overall: number } {
  // Flicker score
  const flickerScore = flicker === 'none' ? 100 : flicker === 'minor' ? 70 : 40;

  // Brightness band score (target mid-range: 40-70)
  let brightnessBandScore = 100;
  if (medianBrightness < 30) {
    brightnessBandScore = 40 + (medianBrightness / 30) * 30; // 40-70 for 0-30
  } else if (medianBrightness > 80) {
    brightnessBandScore = 70 - ((medianBrightness - 80) / 20) * 30; // 70-40 for 80-100
  }

  // Comfort score
  const comfort = 0.4 * uniformityScore + 0.3 * flickerScore + 0.3 * brightnessBandScore;

  // Warmth vs time score
  let warmthVsTimeScore = 50;
  if (prefersWarmLight()) {
    warmthVsTimeScore = warmth === 'warm' ? 100 : warmth === 'neutral' ? 70 : 40;
  } else if (prefersCoolLight()) {
    warmthVsTimeScore = warmth === 'cool' ? 100 : warmth === 'neutral' ? 80 : 50;
  }

  // Daylight score
  const daylightScore = daylight === 'low' ? 50 : daylight === 'moderate' ? 75 : 90;

  // Circadian score
  const circadian = 0.6 * warmthVsTimeScore + 0.4 * daylightScore;

  // Overall score
  const overall = Math.round((comfort + circadian) / 2);

  return {
    comfort: Math.round(comfort),
    circadian: Math.round(circadian),
    overall,
  };
}

/**
 * Generate recommendation fixes
 */
function generateFixes(
  warmth: 'warm' | 'neutral' | 'cool',
  medianBrightness: number,
  uniformityScore: number,
  daylight: 'low' | 'moderate' | 'high',
  flicker: 'none' | 'minor' | 'likely'
): string[] {
  const fixes: string[] = [];

  // Warmth fixes
  const time = new Date().getHours();
  if (warmth === 'warm' && time >= 8 && time < 16) {
    fixes.push('Swap main bulbs to neutral white 4000 K');
  } else if (warmth === 'cool' && time >= 18 && time < 23) {
    fixes.push('Use warmer bulbs (2700-3000 K) for evening');
  }

  // Brightness fixes
  if (medianBrightness < 30) {
    fixes.push('Add one task lamp near desk/sofa');
  } else if (medianBrightness > 80) {
    fixes.push('Consider dimming or adding window treatments');
  }

  // Uniformity fixes
  if (uniformityScore < 60) {
    fixes.push('Move a lamp ~1 m toward darkest corner');
  }

  // Daylight fixes
  if (daylight === 'low' && time >= 8 && time < 18) {
    fixes.push('Use lighter curtains or keep blinds open during day');
  }

  // Flicker fixes
  if (flicker === 'likely') {
    fixes.push('Replace LED driver or choose marked "flicker-free" bulbs');
  } else if (flicker === 'minor') {
    fixes.push('Consider upgrading to flicker-free LED bulbs');
  }

  // Limit to 5 fixes
  return fixes.slice(0, 5);
}

