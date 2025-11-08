'use client';

import { useState } from 'react';
import { Calculator, Lightbulb, TrendingUp } from 'lucide-react';

interface RoomData {
  roomType: string;
  length: number;
  width: number;
  height: number;
  orientation: string;
  windowCount: number;
  windowSize: string;
  purpose: string;
  naturalLight: string;
}

export default function RoomAnalyzer() {
  const [roomData, setRoomData] = useState<RoomData>({
    roomType: 'living-room',
    length: 0,
    width: 0,
    height: 0,
    orientation: 'north',
    windowCount: 0,
    windowSize: 'medium',
    purpose: 'general',
    naturalLight: 'moderate',
  });

  const [recommendations, setRecommendations] = useState<any>(null);

  const calculateRecommendations = () => {
    const area = roomData.length * roomData.width;
    const volume = area * roomData.height;

    // AI-powered calculations
    const windowAreaNeeded = area * 0.2; // 20% of floor area for windows
    const recommendedLumens = area * 20; // 20 lumens per square foot
    const recommendedColorTemp = roomData.purpose === 'bedroom' ? 2700 : 
                                  roomData.purpose === 'office' ? 5000 : 3000;

    // Orientation-based recommendations
    const orientationFactors: Record<string, { light: number; window: string }> = {
      north: { light: 1.2, window: 'Large windows recommended for north-facing rooms' },
      south: { light: 0.8, window: 'Medium windows with UV protection recommended' },
      east: { light: 1.0, window: 'Medium-large windows ideal for morning light' },
      west: { light: 1.0, window: 'Medium windows with shading for afternoon sun' },
    };

    const orientation = orientationFactors[roomData.orientation] || orientationFactors.north;

    setRecommendations({
      area,
      volume,
      windowAreaNeeded,
      recommendedLumens: recommendedLumens * orientation.light,
      recommendedColorTemp,
      orientation: orientation.window,
      fixtures: Math.ceil(area / 100),
      energyEfficiency: roomData.windowCount >= 2 ? 'Good' : 'Needs Improvement',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Calculator className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Room Analysis</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Type
            </label>
            <select
              value={roomData.roomType}
              onChange={(e) => setRoomData({ ...roomData, roomType: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="living-room">Living Room</option>
              <option value="bedroom">Bedroom</option>
              <option value="kitchen">Kitchen</option>
              <option value="bathroom">Bathroom</option>
              <option value="office">Office/Study</option>
              <option value="dining">Dining Room</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Length (ft)
              </label>
              <input
                type="number"
                value={roomData.length || ''}
                onChange={(e) => setRoomData({ ...roomData, length: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Width (ft)
              </label>
              <input
                type="number"
                value={roomData.width || ''}
                onChange={(e) => setRoomData({ ...roomData, width: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height (ft)
              </label>
              <input
                type="number"
                value={roomData.height || ''}
                onChange={(e) => setRoomData({ ...roomData, height: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Orientation
            </label>
            <select
              value={roomData.orientation}
              onChange={(e) => setRoomData({ ...roomData, orientation: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="north">North</option>
              <option value="south">South</option>
              <option value="east">East</option>
              <option value="west">West</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Windows
              </label>
              <input
                type="number"
                value={roomData.windowCount || ''}
                onChange={(e) => setRoomData({ ...roomData, windowCount: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Window Size
              </label>
              <select
                value={roomData.windowSize}
                onChange={(e) => setRoomData({ ...roomData, windowSize: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="extra-large">Extra Large</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Purpose
            </label>
            <select
              value={roomData.purpose}
              onChange={(e) => setRoomData({ ...roomData, purpose: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="general">General Use</option>
              <option value="relaxation">Relaxation</option>
              <option value="work">Work/Productivity</option>
              <option value="entertainment">Entertainment</option>
              <option value="cooking">Cooking</option>
            </select>
          </div>

          <button
            onClick={calculateRecommendations}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
          >
            Analyze Room
          </button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {recommendations ? (
            <>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-blue-600" />
                  AI Recommendations
                </h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600">Room Area</p>
                    <p className="text-2xl font-bold text-gray-900">{recommendations.area.toFixed(1)} sq ft</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600">Recommended Total Lumens</p>
                    <p className="text-2xl font-bold text-gray-900">{Math.round(recommendations.recommendedLumens)} lm</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600">Color Temperature</p>
                    <p className="text-2xl font-bold text-gray-900">{recommendations.recommendedColorTemp}K</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600">Recommended Fixtures</p>
                    <p className="text-2xl font-bold text-gray-900">{recommendations.fixtures}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600">Window Area Needed</p>
                    <p className="text-2xl font-bold text-gray-900">{recommendations.windowAreaNeeded.toFixed(1)} sq ft</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">Window Recommendation</p>
                    <p className="text-gray-900">{recommendations.orientation}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">Energy Efficiency</p>
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                      <p className="text-gray-900 font-semibold">{recommendations.energyEfficiency}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-gray-50 rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
              <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Enter room details and click "Analyze Room" to get AI-powered recommendations</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
