import React from 'react';
import { Upload, Zap } from 'lucide-react';

export default function ImageUploader({
  imagePreview,
  handleImageUpload,
  analyzeImage,
  analyzing
}) {
  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <label htmlFor="image-upload" className="block cursor-pointer">
          {imagePreview ? (
            <div>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-center text-sm text-gray-500">Tap to change image</p>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
              <Upload className="w-16 h-16 mx-auto text-gray-400 mb-3" />
              <p className="text-lg font-medium text-gray-700 mb-1">Upload Room Photo</p>
              <p className="text-sm text-gray-500">Tap to select from camera or gallery</p>
            </div>
          )}
        </label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {imagePreview && (
        <button
          onClick={analyzeImage}
          disabled={analyzing}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {analyzing ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing with AI...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" />
              Analyze Image with AI
            </span>
          )}
        </button>
      )}
    </>
  );
}