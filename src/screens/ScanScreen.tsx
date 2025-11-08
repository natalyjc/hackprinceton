import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { useRouter } from 'expo-router';
import { useScanStore } from '../store/useScanStore';
import { useFrameProcessorHook } from '../processing/frameProcessor';
import { startSensors, stopSensors } from '../utils/sensors';
import ProgressRing from '../components/ProgressRing';

const SCAN_DURATION_MS = 12000; // 12 seconds

export default function ScanScreen() {
  const router = useRouter();
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSlowWarning, setShowSlowWarning] = useState(false);
  
  const startTimeRef = useRef<number>(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scanStartTimeRef = useRef<number>(0);
  
  const { addFrame, addImuSample, addHeadingSample, clearScan } = useScanStore();

  // Frame processor - use state to trigger updates
  const [scanStartTime, setScanStartTime] = useState(Date.now());
  const frameProcessor = useFrameProcessorHook(
    (feature) => {
      addFrame(feature);
    },
    isScanning,
    scanStartTime
  );

  useEffect(() => {
    // Request camera permission on mount
    if (!hasPermission) {
      requestPermission();
    }
    
    // Load history
    useScanStore.getState().loadHistory();
    
    return () => {
      stopSensors();
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }
    };
  }, [hasPermission, requestPermission]);

  const handleStartScan = async () => {
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Camera permission is required to scan.');
      return;
    }

    if (!device) {
      Alert.alert('Error', 'Camera not available.');
      return;
    }

    // Clear previous scan data
    clearScan();
    
    setIsScanning(true);
    setProgress(0);
    setShowSlowWarning(false);
    
    const startTime = Date.now();
    startTimeRef.current = startTime;
    scanStartTimeRef.current = startTime;
    setScanStartTime(startTime);
    useScanStore.getState().setScanStartTime(startTime);

    // Start sensors
    try {
      startSensors(addImuSample, addHeadingSample);
    } catch (error) {
      console.warn('Sensors not available, continuing with camera only:', error);
    }

    // Update progress
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(elapsed / SCAN_DURATION_MS, 1);
      setProgress(newProgress);
    }, 100);

    // Stop scan after duration
    scanTimeoutRef.current = setTimeout(() => {
      stopSensors();
      setIsScanning(false);
      
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }

      // Navigate to analyzing screen
      router.push('/analyzing');
    }, SCAN_DURATION_MS);
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Camera permission is required</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Camera not available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
          fps={30}
        />
        {isScanning && (
          <View style={styles.overlay}>
            <ProgressRing progress={progress} size={150} />
            <Text style={styles.progressText}>
              {Math.round(progress * 100)}%
            </Text>
          </View>
        )}
      </View>

      <View style={styles.controls}>
        <Text style={styles.hint}>
          {isScanning
            ? 'Turn slowly once in a circle for ~10 seconds'
            : 'Position yourself in the center of the room'}
        </Text>

        {showSlowWarning && (
          <Text style={styles.warning}>Move a bit slower</Text>
        )}

        <TouchableOpacity
          style={[styles.button, isScanning && styles.buttonDisabled]}
          onPress={handleStartScan}
          disabled={isScanning}
        >
          <Text style={styles.buttonText}>
            {isScanning ? 'Scanning...' : 'Start Scan'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  progressText: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  controls: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  hint: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  warning: {
    fontSize: 14,
    color: '#FF6B6B',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 200,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
});

