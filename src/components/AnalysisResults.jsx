import React from 'react';
import { CheckCircle2, Sun, AlertCircle, Zap } from 'lucide-react';

export default function AnalysisResults({ analysis, imagePreview, resetAnalysis }) {
  return (
    <div className="space-y-4">
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Room"
          className="w-full h-48 object-cover rounded-xl shadow-lg"
        />
      )}

      <div className="bg-white rounded-xl shadow-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-bold text-gray-900">Analysis Complete</h3>
          </div>
          <button
            onClick={resetAnalysis}
            className="text-blue-600 font-medium text-sm hover:text-blue-700"
          >
            New
          </button>
        </div>

        {analysis.isPanoramic && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
            <span className="font-semibold text-purple-900 text-sm">
              360° Panoramic Detected
            </span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">Room Type</p>
            <p className="text-sm font-semibold text-gray-900 capitalize">
              {analysis.roomType}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">Dimensions</p>
            <p className="text-sm font-semibold text-gray-900">{analysis.dimensions}</p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-3 mb-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm flex items-center gap-2">
            <Sun className="w-4 h-4 text-blue-600" />
            Windows
          </h4>
          <div className="space-y-1 text-sm text-gray-700">
            <p>
              <span className="font-medium">Count:</span> {analysis.windows.count}
            </p>
            <p>
              <span className="font-medium">Orientation:</span>{' '}
              {analysis.windows.orientations.join(', ')}
            </p>
            <p>
              <span className="font-medium">Sizes:</span>{' '}
              {analysis.windows.sizes.join(', ')}
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-3 mb-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Current Lighting</h4>
          <div className="space-y-1 text-sm text-gray-700">
            <p>
              <span className="font-medium">Natural Light:</span>{' '}
              {analysis.currentLighting.naturalLight}
            </p>
            <p>
              <span className="font-medium">Fixtures:</span>{' '}
              {analysis.currentLighting.artificialFixtures}
            </p>
            {analysis.currentLighting.issues.length > 0 && (
              <div className="mt-2 space-y-1">
                {analysis.currentLighting.issues.map((issue, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs">{issue}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-3 mb-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm flex items-center gap-2">
            <Zap className="w-4 h-4 text-green-600" />
            Recommendations
          </h4>
          <div className="space-y-2">
            {analysis.recommendations.fixtures.map((fixture, i) => (
              <div key={i} className="bg-white rounded-lg p-2 border border-green-200">
                <p className="font-medium text-gray-900 text-sm">{fixture.type}</p>
                <p className="text-xs text-gray-600">
                  {fixture.location} • {fixture.lumens}lm • {fixture.colorTemp}
                </p>
              </div>
            ))}
            {analysis.recommendations.improvements.length > 0 && (
              <div className="mt-2 space-y-1">
                {analysis.recommendations.improvements.slice(0, 3).map((imp, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                    <CheckCircle2 className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{imp}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">Energy Rating</p>
            <p className="text-sm font-semibold text-gray-900 capitalize">
              {analysis.energyEfficiency}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">Est. Cost</p>
            <p className="text-sm font-semibold text-gray-900">
              {analysis.estimatedCost}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}