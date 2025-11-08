import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type FrameFeature = {
  t: number;
  y: number;
  warmth: 'warm' | 'neutral' | 'cool' | null;
  hasWindow: boolean | null;
};

export type ImuSample = {
  t: number;
  ax: number;
  ay: number;
  az: number;
  gx: number;
  gy: number;
  gz: number;
};

export type HeadingSample = {
  t: number;
  deg: number;
};

export type ScanResult = {
  startedAt: number;
  durationSec: number;
  coverageDeg: number;
  brightness: { median: number; uniformityScore: number };
  warmth: 'warm' | 'neutral' | 'cool';
  daylight: 'low' | 'moderate' | 'high';
  flicker: 'none' | 'minor' | 'likely';
  scores: { comfort: number; circadian: number; overall: number };
  fixes: string[];
  roomName?: string;
};

interface ScanState {
  // Current scan data
  frames: FrameFeature[];
  imuSamples: ImuSample[];
  headingSamples: HeadingSample[];
  scanStartTime: number | null;
  
  // Current result
  currentResult: ScanResult | null;
  
  // History
  history: ScanResult[];
  
  // Actions
  addFrame: (frame: FrameFeature) => void;
  addImuSample: (sample: ImuSample) => void;
  addHeadingSample: (sample: HeadingSample) => void;
  setScanStartTime: (time: number) => void;
  setCurrentResult: (result: ScanResult) => void;
  clearScan: () => void;
  saveResult: (roomName?: string) => Promise<void>;
  loadHistory: () => Promise<void>;
  updateRoomName: (index: number, name: string) => Promise<void>;
}

const STORAGE_KEY = '@room_light_scan_history';
const MAX_HISTORY = 5;

export const useScanStore = create<ScanState>((set, get) => ({
  frames: [],
  imuSamples: [],
  headingSamples: [],
  scanStartTime: null,
  currentResult: null,
  history: [],

  addFrame: (frame) => {
    set((state) => ({ frames: [...state.frames, frame] }));
  },

  addImuSample: (sample) => {
    set((state) => ({ imuSamples: [...state.imuSamples, sample] }));
  },

  addHeadingSample: (sample) => {
    set((state) => ({ headingSamples: [...state.headingSamples, sample] }));
  },

  setScanStartTime: (time) => {
    set({ scanStartTime: time });
  },

  setCurrentResult: (result) => {
    set({ currentResult: result });
  },

  clearScan: () => {
    set({
      frames: [],
      imuSamples: [],
      headingSamples: [],
      scanStartTime: null,
      currentResult: null,
    });
  },

  saveResult: async (roomName?: string) => {
    const { currentResult, history } = get();
    if (!currentResult) return;

    const resultToSave = { ...currentResult, roomName };
    const newHistory = [resultToSave, ...history].slice(0, MAX_HISTORY);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      set({ history: newHistory, currentResult: resultToSave });
    } catch (error) {
      console.error('Failed to save result:', error);
    }
  },

  loadHistory: async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const history = JSON.parse(data);
        set({ history });
      }
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  },

  updateRoomName: async (index: number, name: string) => {
    const { history } = get();
    const newHistory = [...history];
    if (newHistory[index]) {
      newHistory[index] = { ...newHistory[index], roomName: name };
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
        set({ history: newHistory });
      } catch (error) {
        console.error('Failed to update room name:', error);
      }
    }
  },
}));

