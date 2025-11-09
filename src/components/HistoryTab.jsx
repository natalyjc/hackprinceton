import React from 'react';
import { Clock, Trash2 } from 'lucide-react';

export default function HistoryTab({ history, loadHistoryItem, deleteHistoryItem }) {
  if (history.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <Clock className="w-16 h-16 mx-auto text-gray-400 mb-3" />
        <p className="text-gray-600 text-lg mb-2">No Analysis History</p>
        <p className="text-gray-500 text-sm">Your analyzed rooms will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 py-6">
      {history.map((item, index) => {
        const date = new Date(item.date);
        const dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

        return (
          <div
            key={index}
            onClick={() => loadHistoryItem(index)}
            className="bg-white rounded-xl shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div className="flex gap-4">
              {item.image && (
                <img
                  src={item.image}
                  alt="Room"
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900 capitalize">
                      {item.analysis.roomType}
                    </p>
                    <p className="text-xs text-gray-500">{dateStr}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteHistoryItem(index);
                    }}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-gray-600">Windows</p>
                    <p className="font-semibold">{item.analysis.windows.count}</p>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-gray-600">Fixtures</p>
                    <p className="font-semibold">
                      {item.analysis.recommendations.fixtures.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}