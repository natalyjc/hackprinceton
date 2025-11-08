import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useScanStore } from '../store/useScanStore';
import { analyzeScan } from '../processing/analyze';

const MIN_PROCESSING_TIME_MS = 3000; // 3 seconds minimum

export default function AnalyzingScreen() {
  const router = useRouter();
  const { frames, imuSamples, headingSamples, scanStartTime, setCurrentResult, clearScan } = useScanStore();

  useEffect(() => {
    const processScan = async () => {
      // Get scan metadata
      const startedAt = scanStartTime || Date.now() - 12000;
      const durationSec = 12;

      // Wait minimum processing time for UX
      const startTime = Date.now();

      // Analyze scan data
      const result = analyzeScan(
        frames,
        imuSamples,
        headingSamples,
        startedAt,
        durationSec
      );

      // Ensure minimum processing time
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_PROCESSING_TIME_MS - elapsed);
      
      await new Promise(resolve => setTimeout(resolve, remaining));

      // Set result and navigate
      setCurrentResult(result);
      router.replace('/result');
    };

    if (frames.length > 0 || imuSamples.length > 0) {
      processScan();
    } else {
      // No data, go back
      router.back();
    }
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.text}>Analyzing lighting...</Text>
      <Text style={styles.subtext}>
        Processing {frames.length} frames and sensor data
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  subtext: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
});

