/**
 * Get time of day category for circadian scoring
 */
export function getTimeOfDay(): 'morning' | 'day' | 'evening' | 'night' {
  const hour = new Date().getHours();
  
  if (hour >= 8 && hour < 16) return 'day';
  if (hour >= 16 && hour < 18) return 'evening';
  if (hour >= 18 && hour < 23) return 'evening';
  return 'night';
}

/**
 * Check if current time prefers warm lighting (evening/night)
 */
export function prefersWarmLight(): boolean {
  const time = getTimeOfDay();
  return time === 'evening' || time === 'night';
}

/**
 * Check if current time prefers cool/neutral lighting (daytime)
 */
export function prefersCoolLight(): boolean {
  const time = getTimeOfDay();
  return time === 'day' || time === 'morning';
}

