import 'react-native-reanimated';
import React from 'react';
import { useFrameProcessor } from 'react-native-vision-camera';
import { useSharedValue, runOnJS } from 'react-native-reanimated';
import type { Frame } from 'react-native-vision-camera';
import type { FrameFeature } from '../store/useScanStore';

// Worklet for frame processing
function processFrame(
  frame: Frame,
  scanStartTime: number,
  onFrameProcessed: (feature: FrameFeature) => void
) {
  'worklet';
  
  // Get relative timestamp in milliseconds
  // Frame timestamp is in nanoseconds, convert to ms and make relative
  const frameTimeNs = frame.timestamp;
  const frameTimeMs = frameTimeNs / 1000000; // Convert ns to ms
  const relativeTime = frameTimeMs - scanStartTime;
  
  // Simplified brightness estimation
  // Using frame exposure and ISO as proxy (if available)
  // Note: For MVP, we use metadata. Full pixel analysis would require native module.
  const exposure = (frame as any).exposure ?? 0.033; // Default 30fps exposure
  const iso = (frame as any).ISO ?? 100;
  
  // Rough luminance estimate: Y ≈ log(ISO * exposure) scaled
  // This is a heuristic - real implementation would analyze pixel data
  const y = Math.log10((iso * exposure) / 0.01) * 20; // Normalize to 0-100 range
  const clampedY = Math.max(0, Math.min(100, y));

  // Warmth estimation (simplified)
  // In production, analyze color temperature from pixels
  // For MVP: use white balance as proxy if available
  const wb = (frame as any).whiteBalance ?? { r: 1, g: 1, b: 1 };
  const warmthRatio = wb.r / (wb.b + 0.001);
  let warmth: 'warm' | 'neutral' | 'cool' | null = null;
  
  if (warmthRatio > 1.2) {
    warmth = 'warm';
  } else if (warmthRatio < 0.8) {
    warmth = 'cool';
  } else {
    warmth = 'neutral';
  }

  // Window detection (simplified)
  // Look for bright regions - in production, analyze spatial distribution
  // For MVP: flag if brightness is very high
  const hasWindow = clampedY > 70 ? true : null;

  runOnJS(onFrameProcessed)({
    t: relativeTime,
    y: clampedY,
    warmth,
    hasWindow,
  });
}

/**
 * Hook to create frame processor
 */
export function useFrameProcessorHook(
  onFrameProcessed: (feature: FrameFeature) => void,
  enabled: boolean,
  scanStartTime: number
) {
  const frameCount = useSharedValue(0);
  const scanStartTimeRef = useSharedValue(scanStartTime);

  // Update scan start time when it changes
  React.useEffect(() => {
    scanStartTimeRef.value = scanStartTime;
  }, [scanStartTime]);

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    
    if (!enabled) return;
    
    // Sample every 3rd frame (10 fps from 30 fps source)
    frameCount.value = (frameCount.value + 1) % 3;
    if (frameCount.value !== 0) return;

    // Use current scan start time from shared value
    const currentStartTime = scanStartTimeRef.value;
    processFrame(frame, currentStartTime, onFrameProcessed);
  }, [enabled]);

  return frameProcessor;
}

