import React from 'react';
import { Camera, Clock } from 'lucide-react';

export default function TabNavigation({ activeTab, setActiveTab }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-2 mb-6">
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setActiveTab('photo')}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
            activeTab === 'photo'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Camera className="w-5 h-5" />
          Analyze
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
            activeTab === 'history'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Clock className="w-5 h-5" />
          History
        </button>
      </div>
    </div>
  );
}