'use client';

import { useState, useRef } from 'react';
import { Camera, Upload, Image as ImageIcon, Sparkles, AlertCircle } from 'lucide-react';

export default function PhotoAnalyzer() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setLoading(true);
    // Simulate AI analysis (in production, this would call an actual AI service)
    setTimeout(() => {
      // Mock AI analysis results
      const mockAnalysis = {
        roomType: 'Living Room',
        existingLighting: {
          natural: 'High',
          artificial: 'Moderate',
          overall: 'Good',
        },
        windows: {
          count: 2,
          size: 'Large',
          orientation: 'South-facing',
          recommendation: 'Consider Low-E coating to reduce heat gain',
        },
        lightingIssues: [
          'Insufficient task lighting in reading area',
          'Shadows detected in corner areas',
          'Glare from windows during afternoon',
        ],
        recommendations: [
          'Add 2-3 floor lamps for ambient lighting',
          'Install window treatments to control glare',
          'Consider pendant lighting over seating area',
          'Add LED strip lighting under cabinets',
        ],
        colorTemperature: '2700K - 3000K (Warm)',
        estimatedLumens: '4500 - 6000 lm',
        improvements: [
          {
            area: 'Reading Corner',
            issue: 'Low light levels',
            solution: 'Add adjustable floor lamp (800-1000 lm)',
            priority: 'High',
          },
          {
            area: 'Window Area',
            issue: 'Excessive glare',
            solution: 'Install light-filtering blinds or curtains',
            priority: 'Medium',
          },
          {
            area: 'Overall Ambient',
            issue: 'Uneven lighting distribution',
            solution: 'Add 2-3 ceiling fixtures or track lighting',
            priority: 'High',
          },
        ],
      };
      setAnalysis(mockAnalysis);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Camera className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">AI Photo Analysis</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Image Upload */}
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
            {selectedImage ? (
              <div className="space-y-4">
                <img
                  src={selectedImage}
                  alt="Uploaded room"
                  className="max-h-64 mx-auto rounded-lg shadow-md"
                />
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setAnalysis(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-gray-600 mb-2">Upload a photo of your room</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Choose File
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>
            )}
          </div>

          {selectedImage && (
            <button
              onClick={analyzeImage}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Sparkles className="h-5 w-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Analyze Room
                </>
              )}
            </button>
          )}
        </div>

        {/* Analysis Results */}
        <div className="space-y-4">
          {analysis ? (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ImageIcon className="h-5 w-5 mr-2 text-blue-600" />
                  AI Analysis Results
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Room Assessment</h4>
                    <div className="bg-white rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Natural Light:</span>
                        <span className="text-sm font-semibold text-gray-900">{analysis.existingLighting.natural}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Artificial Light:</span>
                        <span className="text-sm font-semibold text-gray-900">{analysis.existingLighting.artificial}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Overall Rating:</span>
                        <span className="text-sm font-semibold text-green-600">{analysis.existingLighting.overall}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Windows Detected</h4>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        {analysis.windows.count} {analysis.windows.size.toLowerCase()} window(s), {analysis.windows.orientation}
                      </p>
                      <p className="text-xs text-blue-600 mt-2">{analysis.windows.recommendation}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Recommended Lighting</h4>
                    <div className="bg-white rounded-lg p-4 space-y-2">
                      <div>
                        <span className="text-xs text-gray-600">Color Temperature: </span>
                        <span className="text-xs font-semibold text-gray-900">{analysis.colorTemperature}</span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-600">Total Lumens: </span>
                        <span className="text-xs font-semibold text-gray-900">{analysis.estimatedLumens}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-yellow-600" />
                  Issues Detected
                </h4>
                <ul className="space-y-2">
                  {analysis.lightingIssues.map((issue: string, index: number) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Improvement Recommendations</h4>
                <div className="space-y-3">
                  {analysis.improvements.map((improvement: any, index: number) => (
                    <div key={index} className="bg-white rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="text-sm font-semibold text-gray-900">{improvement.area}</h5>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          improvement.priority === 'High' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {improvement.priority}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{improvement.issue}</p>
                      <p className="text-xs text-gray-900 font-medium">{improvement.solution}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                Upload a room photo and click "Analyze Room" to get AI-powered lighting recommendations
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">How It Works</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">1.</span>
            <span>Upload a clear photo of your room taken during daylight hours</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">2.</span>
            <span>Our AI analyzes the room's lighting conditions, window placement, and current fixtures</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">3.</span>
            <span>Receive personalized recommendations for improvements and optimal lighting solutions</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
