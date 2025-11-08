import React from 'react';
import { Camera } from 'lucide-react';
import ImageUploader from './ImageUploader';
import AnalysisResults from './AnalysisResults';

export default function AnalysisTab({
  analysis,
  analyzing,
  imagePreview,
  handleImageUpload,
  analyzeImage,
  resetAnalysis
}) {
  return (
    <div className="space-y-6">
      {!analysis ? (
        <>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-start gap-3">
              <Camera className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">AI-Powered Analysis</h3>
                <p className="text-sm text-gray-600">
                  Upload any room photo or 360° panoramic image for instant lighting analysis and recommendations.
                </p>
              </div>
            </div>
          </div>

          <ImageUploader
            imagePreview={imagePreview}
            handleImageUpload={handleImageUpload}
            analyzeImage={analyzeImage}
            analyzing={analyzing}
          />
        </>
      ) : (
        <AnalysisResults
          analysis={analysis}
          imagePreview={imagePreview}
          resetAnalysis={resetAnalysis}
        />
      )}
    </div>
  );
}