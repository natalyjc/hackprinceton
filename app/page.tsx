'use client';

import { useState } from 'react';
import RoomAnalyzer from '@/components/RoomAnalyzer';
import WindowRecommender from '@/components/WindowRecommender';
import LightingCalculator from '@/components/LightingCalculator';
import PhotoAnalyzer from '@/components/PhotoAnalyzer';
import { Home as HomeIcon, Sparkles, Sun, Camera } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'analyzer' | 'windows' | 'lighting' | 'photo'>('analyzer');

  const tabs = [
    { id: 'analyzer' as const, label: 'Room Analyzer', icon: HomeIcon },
    { id: 'windows' as const, label: 'Window Recommendations', icon: Sun },
    { id: 'lighting' as const, label: 'Lighting Calculator', icon: Sparkles },
    { id: 'photo' as const, label: 'Photo Analysis', icon: Camera },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">LightDesign AI</h1>
                <p className="text-xs text-gray-500">Smart Lighting Solutions</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        {activeTab === 'analyzer' && (
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              AI-Powered Lighting Design Assistant
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get intelligent recommendations for windows, lighting conditions, and room layouts
              to create the perfect ambiance for any space.
            </p>
          </div>
        )}

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {activeTab === 'analyzer' && <RoomAnalyzer />}
          {activeTab === 'windows' && <WindowRecommender />}
          {activeTab === 'lighting' && <LightingCalculator />}
          {activeTab === 'photo' && <PhotoAnalyzer />}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <Sun className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Smart Window Analysis</h3>
            <p className="text-gray-600">
              Get recommendations based on room orientation, climate, and energy efficiency
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <Sparkles className="h-8 w-8 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Lighting Calculations</h3>
            <p className="text-gray-600">
              Calculate optimal lumens, color temperature, and fixture placement for any room
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <Camera className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI Photo Analysis</h3>
            <p className="text-gray-600">
              Upload room photos for instant analysis and personalized recommendations
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            Powered by AI • Helping homeowners create perfect lighting environments
          </p>
        </div>
      </footer>
    </div>
  );
}
