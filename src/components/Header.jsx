import React from 'react';
import { Camera, Clock, Home } from 'lucide-react';
import logo from './Text Right Black.png';

export default function Header({ activePage, setActivePage }) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setActivePage('home')}
              className="flex items-center"
            >
              <img 
                src={logo}
                alt="LumoSpace Logo" 
                className="h-11 w-auto cursor-pointer"
              />
            </button>
            
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActivePage('home')}
                className={`flex items-center gap-2 font-medium transition-colors ${
                  activePage === 'home'
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <Home className="w-4 h-4" />
                Home
              </button>
              <button
                onClick={() => setActivePage('analyze')}
                className={`flex items-center gap-2 font-medium transition-colors ${
                  activePage === 'analyze'
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <Camera className="w-4 h-4" />
                Analyze
              </button>
              <button
                onClick={() => setActivePage('history')}
                className={`flex items-center gap-2 font-medium transition-colors ${
                  activePage === 'history'
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <Clock className="w-4 h-4" />
                My History
              </button>
            </nav>
          </div>
        </div>
        
        {/* Mobile menu */}
        <nav className="md:hidden flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => setActivePage('home')}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              activePage === 'home'
                ? 'text-blue-600'
                : 'text-gray-700'
            }`}
          >
            <Home className="w-4 h-4" />
            Home
          </button>
          <button
            onClick={() => setActivePage('analyze')}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              activePage === 'analyze'
                ? 'text-blue-600'
                : 'text-gray-700'
            }`}
          >
            <Camera className="w-4 h-4" />
            Analyze
          </button>
          <button
            onClick={() => setActivePage('history')}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              activePage === 'history'
                ? 'text-blue-600'
                : 'text-gray-700'
            }`}
          >
            <Clock className="w-4 h-4" />
            History
          </button>
        </nav>
      </div>
    </div>
  );
}
