const STORAGE_KEY = 'LumoSpace_history';
const MAX_HISTORY_ITEMS = 10;

export function loadHistory() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading history:', e);
  }
  return [];
}

export function saveToHistory(currentHistory, analysis, imagePreview) {
  try {
    const newHistory = [
      {
        date: new Date().toISOString(),
        analysis: analysis,
        image: imagePreview
      },
      ...currentHistory
    ];

    if (newHistory.length > MAX_HISTORY_ITEMS) {
      newHistory.length = MAX_HISTORY_ITEMS;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    return newHistory;
  } catch (e) {
    console.error('Error saving history:', e);
    return currentHistory;
  }
}

export function deleteFromHistory(currentHistory, index) {
  try {
    const newHistory = currentHistory.filter((_, i) => i !== index);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    return newHistory;
  } catch (e) {
    console.error('Error deleting from history:', e);
    return currentHistory;
  }
}