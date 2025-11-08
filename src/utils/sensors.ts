import { accelerometer, gyroscope, magnetometer } from 'react-native-sensors';
import { map, sampleTime } from 'rxjs/operators';
import type { ImuSample, HeadingSample } from '../store/useScanStore';

let gyroSubscription: any = null;
let accelSubscription: any = null;
let magSubscription: any = null;

let scanStartTime: number = Date.now();

/**
 * Reset scan start time (call when starting a new scan)
 */
export function resetScanStartTime() {
  scanStartTime = Date.now();
}

/**
 * Get monotonic timestamp in milliseconds relative to scan start
 */
function getTimestamp(): number {
  return Date.now() - scanStartTime;
}

/**
 * Calculate heading from magnetometer data (simplified)
 */
function calculateHeading(mx: number, my: number): number {
  // Simplified heading calculation (azimuth)
  let heading = Math.atan2(my, mx) * (180 / Math.PI);
  heading = (heading + 360) % 360;
  return heading;
}

/**
 * Start sensor subscriptions
 */
export function startSensors(
  onImuSample: (sample: ImuSample) => void,
  onHeadingSample: (sample: HeadingSample) => void
) {
  resetScanStartTime();
  // Gyroscope at ~100 Hz (sample every 10ms)
  gyroSubscription = gyroscope
    .pipe(sampleTime(10))
    .subscribe(({ x, y, z }) => {
      // Get corresponding accelerometer reading
      // For MVP, we'll sample accel at same rate
      onImuSample({
        t: getTimestamp(),
        gx: x,
        gy: y,
        gz: z,
        ax: 0, // Will be filled by accel subscription
        ay: 0,
        az: 0,
      });
    });

  // Accelerometer at ~100 Hz
  accelSubscription = accelerometer
    .pipe(sampleTime(10))
    .subscribe(({ x, y, z }) => {
      // Update last IMU sample with accel data
      // For MVP simplicity, we'll create separate samples
      onImuSample({
        t: getTimestamp(),
        ax: x,
        ay: y,
        az: z,
        gx: 0,
        gy: 0,
        gz: 0,
      });
    });

  // Magnetometer/Heading at ~10 Hz (sample every 100ms)
  magSubscription = magnetometer
    .pipe(sampleTime(100))
    .subscribe(({ x, y, z }) => {
      const heading = calculateHeading(x, y);
      onHeadingSample({
        t: getTimestamp(),
        deg: heading,
      });
    });
}

/**
 * Stop all sensor subscriptions
 */
export function stopSensors() {
  if (gyroSubscription) {
    gyroSubscription.unsubscribe();
    gyroSubscription = null;
  }
  if (accelSubscription) {
    accelSubscription.unsubscribe();
    accelSubscription = null;
  }
  if (magSubscription) {
    magSubscription.unsubscribe();
    magSubscription = null;
  }
}

/**
 * Fuse IMU samples by timestamp (nearest neighbor within ±20ms)
 */
export function fuseImuSamples(
  gyroSamples: ImuSample[],
  accelSamples: ImuSample[]
): ImuSample[] {
  const fused: ImuSample[] = [];
  const threshold = 20; // ms

  for (const gyro of gyroSamples) {
    // Find nearest accel sample
    let nearestAccel = accelSamples[0];
    let minDiff = Math.abs(gyro.t - nearestAccel.t);

    for (const accel of accelSamples) {
      const diff = Math.abs(gyro.t - accel.t);
      if (diff < minDiff) {
        minDiff = diff;
        nearestAccel = accel;
      }
    }

    if (minDiff <= threshold) {
      fused.push({
        t: gyro.t,
        gx: gyro.gx,
        gy: gyro.gy,
        gz: gyro.gz,
        ax: nearestAccel.ax,
        ay: nearestAccel.ay,
        az: nearestAccel.az,
      });
    } else {
      // Use gyro only if no match
      fused.push(gyro);
    }
  }

  return fused;
}

/**
 * Compute coverage in degrees by integrating gyro z (rotation rate)
 */
export function computeCoverage(imuSamples: ImuSample[]): number {
  if (imuSamples.length < 2) return 0;

  let totalRotation = 0;
  for (let i = 1; i < imuSamples.length; i++) {
    const dt = (imuSamples[i].t - imuSamples[i - 1].t) / 1000; // Convert to seconds
    const rotationRate = imuSamples[i].gz; // rad/s
    totalRotation += Math.abs(rotationRate * dt) * (180 / Math.PI); // Convert to degrees
  }

  return totalRotation;
}

