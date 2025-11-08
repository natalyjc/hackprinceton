/**
 * Exponential Moving Average
 */
export function ema(values: number[], alpha: number = 0.2): number[] {
  if (values.length === 0) return [];
  
  const result: number[] = [values[0]];
  for (let i = 1; i < values.length; i++) {
    result.push(alpha * values[i] + (1 - alpha) * result[i - 1]);
  }
  return result;
}

/**
 * Calculate median of array
 */
export function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

/**
 * Calculate mean of array
 */
export function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

/**
 * Calculate standard deviation
 */
export function std(values: number[]): number {
  if (values.length === 0) return 0;
  const m = mean(values);
  const variance = values.reduce((sum, val) => sum + Math.pow(val - m, 2), 0) / values.length;
  return Math.sqrt(variance);
}

/**
 * Clip outliers using IQR method
 */
export function clipOutliers(values: number[], factor: number = 1.5): number[] {
  if (values.length < 4) return values;
  
  const sorted = [...values].sort((a, b) => a - b);
  const q1 = sorted[Math.floor(sorted.length * 0.25)];
  const q3 = sorted[Math.floor(sorted.length * 0.75)];
  const iqr = q3 - q1;
  const lower = q1 - factor * iqr;
  const upper = q3 + factor * iqr;
  
  return values.map(v => Math.max(lower, Math.min(upper, v)));
}

/**
 * Simple FFT for detecting periodic patterns (coarse flicker detection)
 * Returns peak strength relative to noise floor
 */
export function detectFlicker(signal: number[]): { peak: number; noiseFloor: number } {
  if (signal.length < 32) {
    return { peak: 0, noiseFloor: 0 };
  }

  // Simple autocorrelation-based flicker detection
  // For MVP: compute variance of differences
  const diffs: number[] = [];
  for (let i = 1; i < signal.length; i++) {
    diffs.push(Math.abs(signal[i] - signal[i - 1]));
  }
  
  const avgDiff = mean(diffs);
  const diffVariance = std(diffs);
  
  // Peak is high variance in differences (periodic changes)
  const peak = diffVariance;
  const noiseFloor = avgDiff * 0.1; // Estimate noise floor
  
  return { peak, noiseFloor };
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

