import React from 'react';
import { Sun } from 'lucide-react';

export default function Header() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-6 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
            <Sun className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">LightDesign AI</h1>
            <p className="text-sm text-white/90">Smart Lighting Solutions</p>
          </div>
        </div>
      </div>
    </div>
  );
}