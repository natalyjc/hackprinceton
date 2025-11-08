'use client';

import { useState } from 'react';
import { Lightbulb, Droplets, Sun, Moon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LightingData {
  roomType: string;
  area: number;
  task: string;
  ambiance: string;
  naturalLight: string;
}

export default function LightingCalculator() {
  const [lightingData, setLightingData] = useState<LightingData>({
    roomType: 'living-room',
    area: 0,
    task: 'general',
    ambiance: 'warm',
    naturalLight: 'moderate',
  });

  const [results, setResults] = useState<any>(null);

  const calculateLighting = () => {
    // Base lumens per square foot based on room type
    const baseLumens: Record<string, number> = {
      'living-room': 15,
      'bedroom': 10,
      'kitchen': 30,
      'bathroom': 20,
      'office': 25,
      'dining': 20,
    };

    // Task-specific adjustments
    const taskMultipliers: Record<string, number> = {
      'general': 1.0,
      'reading': 1.5,
      'cooking': 1.8,
      'working': 2.0,
      'relaxing': 0.7,
    };

    // Natural light adjustments
    const naturalLightMultipliers: Record<string, number> = {
      'low': 1.3,
      'moderate': 1.0,
      'high': 0.7,
    };

    const baseLumenPerSqFt = baseLumens[lightingData.roomType] || 15;
    const taskMultiplier = taskMultipliers[lightingData.task] || 1.0;
    const naturalMultiplier = naturalLightMultipliers[lightingData.naturalLight] || 1.0;

    const totalLumens = lightingData.area * baseLumenPerSqFt * taskMultiplier * naturalMultiplier;

    // Color temperature recommendations
    const colorTemps: Record<string, number> = {
      'warm': 2700,
      'neutral': 3000,
      'cool': 4000,
      'daylight': 5000,
    };

    const recommendedTemp = colorTemps[lightingData.ambiance] || 3000;

    // Fixture recommendations
    const fixtures = Math.ceil(lightingData.area / 100);
    const lumensPerFixture = Math.ceil(totalLumens / fixtures);

    // Layer breakdown (ambient, task, accent)
    const ambientPercent = 0.6;
    const taskPercent = 0.3;
    const accentPercent = 0.1;

    const layers = {
      ambient: Math.round(totalLumens * ambientPercent),
      task: Math.round(totalLumens * taskPercent),
      accent: Math.round(totalLumens * accentPercent),
    };

    setResults({
      totalLumens: Math.round(totalLumens),
      recommendedTemp,
      fixtures,
      lumensPerFixture,
      layers,
      chartData: [
        { name: 'Ambient', lumens: layers.ambient },
        { name: 'Task', lumens: layers.task },
        { name: 'Accent', lumens: layers.accent },
      ],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Lightbulb className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Lighting Calculator</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Type
            </label>
            <select
              value={lightingData.roomType}
              onChange={(e) => setLightingData({ ...lightingData, roomType: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="living-room">Living Room</option>
              <option value="bedroom">Bedroom</option>
              <option value="kitchen">Kitchen</option>
              <option value="bathroom">Bathroom</option>
              <option value="office">Office/Study</option>
              <option value="dining">Dining Room</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Area (sq ft)
            </label>
            <input
              type="number"
              value={lightingData.area || ''}
              onChange={(e) => setLightingData({ ...lightingData, area: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Task
            </label>
            <select
              value={lightingData.task}
              onChange={(e) => setLightingData({ ...lightingData, task: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="general">General Use</option>
              <option value="reading">Reading</option>
              <option value="cooking">Cooking</option>
              <option value="working">Working/Studying</option>
              <option value="relaxing">Relaxing</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Desired Ambiance
            </label>
            <select
              value={lightingData.ambiance}
              onChange={(e) => setLightingData({ ...lightingData, ambiance: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="warm">Warm (2700K)</option>
              <option value="neutral">Neutral (3000K)</option>
              <option value="cool">Cool (4000K)</option>
              <option value="daylight">Daylight (5000K)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Natural Light Level
            </label>
            <select
              value={lightingData.naturalLight}
              onChange={(e) => setLightingData({ ...lightingData, naturalLight: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low (Few/No Windows)</option>
              <option value="moderate">Moderate (Some Windows)</option>
              <option value="high">High (Many/Large Windows)</option>
            </select>
          </div>

          <button
            onClick={calculateLighting}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
          >
            Calculate Lighting Needs
          </button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {results ? (
            <>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lighting Recommendations</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Lumens</p>
                    <p className="text-2xl font-bold text-gray-900">{results.totalLumens.toLocaleString()}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Color Temperature</p>
                    <p className="text-2xl font-bold text-gray-900">{results.recommendedTemp}K</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Recommended Fixtures</p>
                    <p className="text-2xl font-bold text-gray-900">{results.fixtures}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Lumens per Fixture</p>
                    <p className="text-2xl font-bold text-gray-900">{results.lumensPerFixture}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Lighting Layers</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={results.chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="lumens" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-white rounded-lg p-3">
                    <div className="flex items-center">
                      <Sun className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Ambient Lighting</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{results.layers.ambient.toLocaleString()} lm</span>
                  </div>
                  <div className="flex items-center justify-between bg-white rounded-lg p-3">
                    <div className="flex items-center">
                      <Lightbulb className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Task Lighting</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{results.layers.task.toLocaleString()} lm</span>
                  </div>
                  <div className="flex items-center justify-between bg-white rounded-lg p-3">
                    <div className="flex items-center">
                      <Moon className="h-5 w-5 text-purple-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Accent Lighting</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{results.layers.accent.toLocaleString()} lm</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-gray-50 rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
              <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Enter room details and click "Calculate Lighting Needs" to get recommendations</p>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-purple-50 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Droplets className="h-5 w-5 mr-2 text-purple-600" />
          Lighting Design Tips
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <span className="text-purple-600 mr-2">•</span>
            <span>Use a layered approach: 60% ambient, 30% task, 10% accent lighting</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-600 mr-2">•</span>
            <span>Warm light (2700-3000K) creates a cozy atmosphere, ideal for living rooms and bedrooms</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-600 mr-2">•</span>
            <span>Cool light (4000-5000K) enhances focus and productivity, perfect for offices and kitchens</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-600 mr-2">•</span>
            <span>Install dimmer switches to adjust lighting levels throughout the day</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
